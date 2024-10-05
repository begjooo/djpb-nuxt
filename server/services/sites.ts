import * as fs from "node:fs";
import { getSharePointFile, pdfParse } from "./file-handler";
import { getGraphClient } from "./graph-credential";
import { processTextWithGemini } from "./gemini-ai";
import { extractKegiatanJsonPrompt, extractKegiatanJsonPrompt2, extractKegiatanJsonSchema, extractKegiatanJsonSchema2, extractKegiatanPrompt, promptMap, testPrompt } from "./prompt";

const { defaultSiteId, defaultDriveId, defaultListId } = useRuntimeConfig();

export interface DriveFile {
  [field: string]: any;
};

export interface SiteColumn {
  [field: string]: any;
}

export const mandatoryColumns = [
  'Ketepatan Waktu',
  'Masalah atau Isu',
  'Kegiatan',
  'Kesimpulan dan Rekomendasi',
  'Nilai Administratif',
  'Nilai Substantif',
  'Nilai',
  'Text Format',
  'Kegiatan JSON',
];

export async function mapFilesAndFolders(itemId?: string): Promise<any> {
  const graphClient = await getGraphClient();
  const driveItems = await graphClient.api(`/sites/${defaultSiteId}/drive/items/${itemId}/children?expand=listItem`).get();
  const items = driveItems.value.map((item: any) => {
    if(item.folder){
      item.type = 'folder';
    } else {
      item.type = 'file';
      item.mimeType = item.file.mimeType;
      item.itemId = item.listItem.id;
      item.fields = item.listItem.fields;
    };
    return {
      name: item.name,
      id: item.id,
      type: item.type,
      mimeType: item.mimeType,
      downloadUrl: item['@microsoft.graph.downloadUrl'],
      itemId: item.itemId,
      fields: item.fields,
    };
  });
  
  const children: any = [];
  children.push(...items);
  const foldersArray = items.filter((item: any) => item.type === 'folder');
  
  for(const folder of foldersArray){
    const childrenBelow = await mapFilesAndFolders(folder.id);
    const folderItems = children.find((item: any) => item.id === folder.id);
    children[children.indexOf(folderItems)].children = childrenBelow;
  };

  return children;
};

async function getSiteColumns(graphClient: any, listId?: string): Promise<any> {
  let api = '';
  if(listId){
    api = `/sites/${defaultSiteId}/lists/${listId}/columns`;
  } else {
    api = `/sites/${defaultSiteId}/lists/${defaultListId}/columns`;
  };
  const columns = await graphClient.api(api).get();
  return columns.value;
};

async function createSiteColumn(graphClient: any, displayName: string, listId?: string): Promise<void> {
  console.log(`create ${displayName} column in SharePoint Sites`);
  const name = displayName.replace(/ /g, '');
  let columnDefinition = {
    description: '',
    enforceUniqueValues: false,
    hidden: false,
    indexed: false,
    displayName: displayName,
    name: name,
    text: {
       allowMultipleLines: true,
    },
  };

  let api = '';
  if(listId){
      api = `/sites/${defaultSiteId}/lists/${listId}/columns`;
  } else {
      api = `/sites/${defaultSiteId}/lists/${defaultListId}/columns`;
  };
  await graphClient.api(api).post(columnDefinition);

};

export async function setMandatorySiteColumns(graphClient: any, listId?:string): Promise<void> {
  console.log(`check mandatory columns in SharePoint Sites`);
  const columnList = await getSiteColumns(graphClient);
  const columnListName = columnList.map((column: any) => column.displayName);
  const notExistColumns = mandatoryColumns.filter((columnName: any) => {
    return !columnListName.includes(columnName);
  });

  if(notExistColumns.length !== 0){
    console.log(`create mandatory columns in SharePoint Sites`);
    for await (const column of notExistColumns){
      try {
        await createSiteColumn(graphClient, column);
      } catch (error) {
        throw error;
      };
    };
    console.log(`${notExistColumns} is added in SharePoint`);
  } else {
    console.log(`mandatory columns are already exist in SharePoint`);
  };
};

export async function getDriveItem(graphClient: any, driveItemId: any): Promise<any> {
    const driveItem = await graphClient
    .api(`/sites/${defaultSiteId}/drive/items/${driveItemId}?expand=listItem`)
    .get();
  
  return {
    name: driveItem.name,
    id: driveItem.id,
    itemId: driveItem.listItem.id,
    mimeType: driveItem.file.mimeType,
    downloadUrl: driveItem["@microsoft.graph.downloadUrl"],
    fields: driveItem.listItem.fields,
  };
};

export async function updateSiteColumns(graphClient: any, itemId: string, column: SiteColumn): Promise<void> {
  await graphClient.api(`/sites/${defaultSiteId}/lists/${defaultListId}/items/${itemId}/fields`,).update(column);
};

async function fillTextFormat(graphClient: any, file: DriveFile): Promise<void> {
  if(file.fields['TextFormat'] === undefined || file.fields['TextFormat'] === ''){
    console.log('fill Text Format column');
    await getSharePointFile(file);
    const pdfText = await pdfParse(file.localPath);
    const validText = pdfText.replace(/[\x00]/g, '');
    console.log(`updating Text Format column in SharePoint`);
    try {
      await updateSiteColumns(graphClient, file.itemId, { 'TextFormat': validText });
    } catch (error) {
      throw error;
    };
    fs.unlinkSync(file.localPath);
  };
  console.log('Text Format column is up to date');
};

async function fillKegiatanJson(graphClient: any, file: DriveFile): Promise<void> {
  if(file.fields['KegiatanJSON'] === undefined || file.fields['KegiatanJSON'] === ''){
    console.log(`fill Kegiatan JSON column`);
    // console.time('fill Kegiatan JSON column time:');
    let validText = file.fields['TextFormat'].replace(/(.{1000})/g, '$1\n');
    validText = validText.replace(/\"/g, '\'');
    validText = validText.replace(/\”/g, '\'');
    validText = validText.replace(/\“/g, '\'');
    validText = validText.replace(/\‘/g, '\'');
    validText = validText.replace(/\’/g, '\'');
    promptMap.set('KegiatanJSON', extractKegiatanJsonPrompt2);
    // promptMap.set('KegiatanJSON', extractKegiatanPrompt);
    let kegiatanJsonString = '';
    try {
      const genAiResponse = await processTextWithGemini(validText, promptMap.get('KegiatanJSON'), extractKegiatanJsonSchema2);
      // const genAiResponse = await processTextWithGemini(validText, promptMap.get('KegiatanJSON'));
      console.log(`jumlah seluruh kegiatan '${file.name}': ${genAiResponse.length}`);
      kegiatanJsonString = JSON.stringify(genAiResponse);
    } catch (error) {
      throw error;
    };

    try {
      console.log(`update '${file.name}' KegiatanJSON in SharePoint`);
      await updateSiteColumns(graphClient, file.itemId, { 'KegiatanJSON': kegiatanJsonString });
    } catch (error) {
      throw error;
    };
    // console.timeEnd('fill Kegiatan JSON column time:');
  };
};

export async function fillMandatoryColumnContent(graphClient: any, file: DriveFile): Promise<void> {
  console.log('fill empty mandatory column content');
  await fillTextFormat(graphClient, file);
  file = await getDriveItem(graphClient, file.id);
  await fillKegiatanJson(graphClient, file);
};