import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import fs from "fs";
import type SharepointFile from "./SharepointFile";

const { azureClientId, azureTenantId, azureClientSecret } = useRuntimeConfig();
const { defaultSiteId, defaultDriveId, defaultListId } = useRuntimeConfig();

export interface SiteColumn {
  [field: string]: any;
}

export interface DriveFile {
  [field: string]: any;
}

class GraphHandler {
  defaultSiteId: string;
  defaultDriveId: string;
  defaultListId: string;
  mandatoryColumns: string[];
  graphClient: Client | undefined;

  constructor(
    azureOptions: {
      azureTenantId: string;
      azureClientId: string;
      azureClientSecret: string;
    },
    siteOptions: {
      defaultSiteId: string;
      defaultDriveId: string;
      defaultListId: string;
    },
    mandatoryColumns: string[]
  ) {
    this.defaultSiteId = siteOptions.defaultSiteId;
    this.defaultDriveId = siteOptions.defaultDriveId;
    this.defaultListId = siteOptions.defaultListId;
    this.mandatoryColumns = mandatoryColumns;

    try {
      const credential = new ClientSecretCredential(
        azureOptions.azureTenantId,
        azureOptions.azureClientId,
        azureOptions.azureClientSecret
      );

      const authProviders = new TokenCredentialAuthenticationProvider(
        credential,
        {
          scopes: ["https://graph.microsoft.com/.default"],
        }
      );

      this.graphClient = Client.initWithMiddleware({
        authProvider: authProviders,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async mapFilesAndFolders(itemId?: string): Promise<SharepointFile[]> {
    let driveItems = null;
    driveItems = await this.graphClient!.api(
      `/sites/${this.defaultSiteId}/drive/items/${itemId}/children?expand=listItem`
    ).get();

    const items = driveItems.value.map((item: any) => {
      if (item.folder) {
        item.type = "folder";
      } else {
        item.type = "file";
        item.mimeType = item.file.mimeType;
        item.itemId = item.listItem.id;
        item.fields = item.listItem.fields;
      }
      return {
        name: item.name,
        id: item.id,
        type: item.type,
        mimeType: item.mimeType,
        downloadUrl: item["@microsoft.graph.downloadUrl"],
        itemId: item.itemId,
        fields: item.fields,
      };
    });

    const children: SharepointFile[] = [];
    children.push(...items);
    const foldersArray = items.filter((item: any) => item.type === "folder");

    for (const folder of foldersArray) {
      const childrenBelow = await this.mapFilesAndFolders(folder.id);
      const folderItems = children.find((item: any) => item.id === folder.id);
      children[children.indexOf(folderItems as SharepointFile)].children =
        childrenBelow;
    }

    return children;
  }

  async getSiteColumns(listId?: string): Promise<any> {
    let api = "";
    if (listId) {
      api = `/sites/${this.defaultSiteId}/lists/${listId}/columns`;
    } else {
      api = `/sites/${this.defaultSiteId}/lists/${defaultListId}/columns`;
    }
    const columns = await this.graphClient!.api(api).get();
    return columns.value;
  }

  async createSiteColumn(displayName: string, listId?: string): Promise<void> {
    console.log(`create ${displayName} column in SharePoint Sites`);
    const name = displayName.replace(/ /g, "");
    let columnDefinition = {
      description: "",
      enforceUniqueValues: false,
      hidden: false,
      indexed: false,
      displayName: displayName,
      name: name,
      text: {
        allowMultipleLines: true,
      },
    };

    let api = "";
    if (listId) {
      api = `/sites/${this.defaultSiteId}/lists/${listId}/columns`;
    } else {
      api = `/sites/${this.defaultSiteId}/lists/${this.defaultListId}/columns`;
    }
    await this.graphClient!.api(api).post(columnDefinition);
  }

  async checkMandatorySiteColumns(listId?: string): Promise<void> {
    console.log(`check mandatory columns in SharePoint Sites`);
    const columnList = await this.getSiteColumns();
    const columnListName = columnList.map((column: any) => column.displayName);
    const notExistColumns = mandatoryColumns.filter((columnName: any) => {
      return !columnListName.includes(columnName);
    });

    if (notExistColumns.length !== 0) {
      console.log(`create mandatory columns in SharePoint Sites`);
      for await (const column of notExistColumns) {
        try {
          await this.createSiteColumn(column);
        } catch (error) {
          throw error;
        }
      }
      console.log(`${notExistColumns} is added in SharePoint`);
    } else {
      console.log(`mandatory columns are already exist in SharePoint`);
    }
  }

  async getDriveItem(driveItemId: any): Promise<any> {
    const driveItem = await this.graphClient!.api(
      `/sites/${this.defaultSiteId}/drive/items/${driveItemId}?expand=listItem`
    ).get();

    return {
      name: driveItem.name,
      id: driveItem.id,
      itemId: driveItem.listItem.id,
      mimeType: driveItem.file.mimeType,
      downloadUrl: driveItem["@microsoft.graph.downloadUrl"],
      fields: driveItem.listItem.fields,
    };
  }

  async updateSiteColumns(itemId: string, column: SiteColumn): Promise<void> {
    await this.graphClient!.api(
      `/sites/${this.defaultSiteId}/lists/${this.defaultListId}/items/${itemId}/fields`
    ).update(column);
  }

  async getSharePointFile(file: DriveFile): Promise<void> {
    if (!fileHandler.isFileDownloaded(file.fileName)) {
      try {
        await fileHandler.downloadFile(file.downloadUrl, file.name);
        file.localPath = fileHandler.downloadDirPath + file.name;
      } catch (error) {
        throw error;
      }
    }
  }

  async fillTextFormat(file: DriveFile): Promise<void> {
    if (
      file.fields["TextFormat"] === undefined ||
      file.fields["TextFormat"] === ""
    ) {
      await this.getSharePointFile(file);
      const pdfText = await fileHandler.pdfParse(file.localPath);
      const validText = pdfText.replace(/[\x00]/g, "");
      console.log(`updating Text Format column in SharePoint`);
      try {
        await this.updateSiteColumns(file.itemId, { TextFormat: validText });
      } catch (error) {
        throw error;
      }
      fs.unlinkSync(file.localPath);
    }
  }

  async fillKegiatanPihakJson(file: DriveFile): Promise<void> {
    if (
      file.fields["JSONKegiatanPihak"] === undefined ||
      file.fields["JSONKegiatanPihak"] === ""
    ) {
      let validText = file.fields["TextFormat"].replace(/(.{5000})/g, "$1\n");
      validText = validText.replace(/\"/g, "'");
      validText = validText.replace(/\”/g, "'");
      validText = validText.replace(/\“/g, "'");
      validText = validText.replace(/\‘/g, "'");
      validText = validText.replace(/\’/g, "'");

      console.log(`prompt ekstrak Kegiatan Pihak JSON`);
      let responseJsonToString = "";
      try {
        const genAiResponse = await geminiHandler.processTextWithGemini(
          validText,
          promptMap.get("ekstrakKegiatanPihakJSON").prompt,
          promptMap.get("ekstrakKegiatanPihakJSON").schema
        );
        // console.log(genAiResponse);
        console.log(`jumlah kegiatan pihak: ${genAiResponse.length}`);
        const tokenOutput = await geminiHandler.countResponseToken(
          JSON.stringify(genAiResponse)
        );
        console.log(`output token: ${tokenOutput}`);
        responseJsonToString = JSON.stringify(genAiResponse);
      } catch (error) {
        throw error;
      }

      console.log(`updating Kegiatan JSON column in SharePoint`);
      try {
        await this.updateSiteColumns(file.itemId, {
          ["JSONKegiatanPihak"]: responseJsonToString,
        });
      } catch (error) {
        throw error;
      }
    }
  }

  async fillKegiatanNonPihakJson(file: DriveFile): Promise<void> {
    if (
      file.fields["JSONKegiatanNonPihak"] === undefined ||
      file.fields["JSONKegiatanNonPihak"] === ""
    ) {
      let validText = file.fields["TextFormat"].replace(/(.{5000})/g, "$1\n");
      validText = validText.replace(/\"/g, "'");
      validText = validText.replace(/\”/g, "'");
      validText = validText.replace(/\“/g, "'");
      validText = validText.replace(/\‘/g, "'");
      validText = validText.replace(/\’/g, "'");

      console.log(`prompt ekstrak Kegiatan Non Pihak JSON`);
      let responseJsonToString = "";
      try {
        const genAiResponse = await geminiHandler.processTextWithGemini(
          validText,
          promptMap.get("ekstrakKegiatanNonPihakJSON").prompt,
          promptMap.get("ekstrakKegiatanNonPihakJSON").schema
        );
        // console.log(genAiResponse);
        console.log(`jumlah kegiatan non pihak: ${genAiResponse.length}`);
        const tokenOutput = await geminiHandler.countResponseToken(
          JSON.stringify(genAiResponse)
        );
        console.log(`output token: ${tokenOutput}`);
        responseJsonToString = JSON.stringify(genAiResponse);
      } catch (error) {
        throw error;
      }

      console.log(`updating JSON Kegiatan Non Pihak column in SharePoint`);
      try {
        await this.updateSiteColumns(file.itemId, {
          ["JSONKegiatanNonPihak"]: responseJsonToString,
        });
      } catch (error) {
        throw error;
      }
    }
  }

  async checkMandatoryColumnsValue(file: DriveFile): Promise<void> {
    console.log(`check mandatory columns value in SharePoint Sites`);
    await this.fillTextFormat(file);
    file = await this.getDriveItem(file.id);
    await this.fillKegiatanPihakJson(file);
    await this.fillKegiatanNonPihakJson(file);
  }
}

const mandatoryColumns = [
  "Text Format",
  "JSON Kegiatan Pihak",
  "JSON Kegiatan Non Pihak",
  "Batas Triwulan",
  "Tanggal Pengumpulan",
  "Nilai Administratif",
  "Nilai Substantif",
  "Nilai",
  "Masalah atau Isu",
  "Kegiatan",
  "Kesimpulan dan Rekomendasi",
];

export const graphHandler = new GraphHandler(
  { azureTenantId, azureClientId, azureClientSecret },
  { defaultSiteId, defaultDriveId, defaultListId },
  mandatoryColumns
);
