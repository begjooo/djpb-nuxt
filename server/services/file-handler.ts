import * as fs from "node:fs";
import * as https from "node:https";
import { parsePdfUrl } from "@ringkasan.net/parse-pdf-url";
import { DriveFile } from "./sites";

export const downloadDirPath = './public/tmp/';

export function readFileRecursively(object: any[], result: any[]): any {
  for(const item of object){
    if(item.type === 'folder' && item.children.length !== 0){
      readFileRecursively(item.children, result);
    } else if(item.type === 'file'){
      result.push(item);
    };
  };
};

export async function pdfParse(filePath: string): Promise<string> {
  const url = filePath;
  const pdf = await parsePdfUrl(url);
  const pdfText = await pdf.getAllTexts();
  return pdfText;
};

export function isFileDownloaded(file: DriveFile): boolean {
  console.log(`check if ${file.name} is ready locally (./public/tmp/)`);
  if(fs.existsSync(downloadDirPath + file.name)){
    console.log(`${file.name} is ready locally`);
    file.localPath = downloadDirPath + file.name;
    return true;
  } else {
    console.log(`${file.name} is not ready locally`);
    return false;
  };
};

export async function downloadFile(url: string, fileName: string): Promise<void> {
  console.log(`downloading ${fileName}`);

  const downloadPath = downloadDirPath + fileName;

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(downloadPath);
    https.get(url, (response) => {
      if(response.statusCode !== 200){
        reject(new Error(`failed to download file: ${response.statusCode}`));
      };

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`${fileName} downloaded successfully`);
        resolve();
      });

      file.on('error', (error) => {
        console.error(`Error writing file: ${error}`);
        reject(error);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
};

export async function getSharePointFile(file: DriveFile): Promise<void> {
  if(!isFileDownloaded(file)){
    try {
      await downloadFile(file.downloadUrl, file.name);
      file.localPath = downloadDirPath + file.name;
    } catch (error) {
      throw error;
    };
  };
};