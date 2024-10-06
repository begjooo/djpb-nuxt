import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";
import * as fs from "fs";
import * as https from "node:https";
import { processTextWithGemini } from "./gemini-ai";


// import { graphClient } from "./services/graph-credential-2";

const { azureClientId, azureTenantId, azureClientSecret } = useRuntimeConfig();
const { defaultSiteId, defaultDriveId, defaultListId } = useRuntimeConfig();

export interface DriveFile {
  [field: string]: any;
}

export interface SiteColumn {
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
        azureTenantId,
        azureClientId,
        azureClientSecret
      );
      const authProvider = new TokenCredentialAuthenticationProvider(
        credential,
        {
          scopes: ["https://graph.microsoft.com/.default"],
        }
      );
      this.graphClient = Client.initWithMiddleware({
        authProvider: authProvider,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async mapFilesAndFolders(itemId?: string): Promise<any> {
    let driveItems = null;
    try {
      driveItems = await this.graphClient!.api(
        `/sites/${defaultSiteId}/drive/items/${itemId}/children?expand=listItem`
      ).get();
    } catch (error) {
      return error;
    }

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

    const children: any = [];
    children.push(...items);
    const foldersArray = items.filter((item: any) => item.type === "folder");

    for (const folder of foldersArray) {
      const childrenBelow = await this.mapFilesAndFolders(folder.id);
      const folderItems = children.find((item: any) => item.id === folder.id);
      children[children.indexOf(folderItems)].children = childrenBelow;
    }

    return children;
  }

  async getSiteColumns(listId?: string): Promise<any> {
    let api = "";
    if (listId) {
      api = `/sites/${defaultSiteId}/lists/${listId}/columns`;
    } else {
      api = `/sites/${defaultSiteId}/lists/${defaultListId}/columns`;
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
      api = `/sites/${defaultSiteId}/lists/${listId}/columns`;
    } else {
      api = `/sites/${defaultSiteId}/lists/${defaultListId}/columns`;
    }
    await this.graphClient!.api(api).post(columnDefinition);
  }

  async setMandatorySiteColumns(listId?: string): Promise<void> {
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
      `/sites/${defaultSiteId}/drive/items/${driveItemId}?expand=listItem`
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
      `/sites/${defaultSiteId}/lists/${defaultListId}/items/${itemId}/fields`
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


  readFileRecursively(list: any[], result: any[]): any {
    for (const item of list) {
      if (item.type === "folder" && item.children.length !== 0) {
        this.readFileRecursively(item.children, result);
      } else if (item.type === "file") {
        result.push(item);
      }
    }
  }



  async fillTextFormat(file: DriveFile): Promise<void> {
    if (
      file.fields["TextFormat"] === undefined ||
      file.fields["TextFormat"] === ""
    ) {
      console.log("fill Text Format column");
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
    console.log("Text Format column is up to date");
  }

  async fillKegiatanJson(file: DriveFile): Promise<void> {
    if (
      file.fields["KegiatanJSON"] === undefined ||
      file.fields["KegiatanJSON"] === ""
    ) {
      console.log(`fill Kegiatan JSON column`);
      // console.time('fill Kegiatan JSON column time:');
      let validText = file.fields["TextFormat"].replace(/(.{1000})/g, "$1\n");
      validText = validText.replace(/\"/g, "'");
      validText = validText.replace(/\”/g, "'");
      validText = validText.replace(/\“/g, "'");
      validText = validText.replace(/\‘/g, "'");
      validText = validText.replace(/\’/g, "'");
      // promptMap.set('KegiatanJSON', extractKegiatanPrompt);
      let kegiatanJsonString = "";
      try {
        const genAiResponse = await processTextWithGemini(
          validText, 
          promptMap.get("KegiatanJSON").prompt, 
          promptMap.get("KegiatanJSON").schema
        );
        // const genAiResponse = await processTextWithGemini(validText, promptMap.get('KegiatanJSON'));
        console.log(
          `jumlah seluruh kegiatan '${file.name}': ${genAiResponse.length}`
        );
        kegiatanJsonString = JSON.stringify(genAiResponse);
      } catch (error) {
        throw error;
      }

      try {
        console.log(`update '${file.name}' KegiatanJSON in SharePoint`);
        await this.updateSiteColumns(file.itemId, {
          KegiatanJSON: kegiatanJsonString,
        });
      } catch (error) {
        throw error;
      }
      // console.timeEnd('fill Kegiatan JSON column time:');
    }
  }

  async fillMandatoryColumnContent(file: DriveFile): Promise<void> {
    console.log("fill empty mandatory column content");
    await this.fillTextFormat(file);
    file = await this.getDriveItem(file.id);
    await this.fillKegiatanJson(file);
  }
}

const mandatoryColumns = [
  "Ketepatan Waktu",
  "Masalah atau Isu",
  "Kegiatan",
  "Kesimpulan dan Rekomendasi",
  "Nilai Administratif",
  "Nilai Substantif",
  "Nilai",
  "Text Format",
  "Kegiatan JSON",
];

export const graphHandler = new GraphHandler(
  { azureTenantId, azureClientId, azureClientSecret },
  { defaultSiteId, defaultDriveId, defaultListId },
  mandatoryColumns
);
