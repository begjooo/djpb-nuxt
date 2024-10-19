import fs from "fs";
import https from "https";
import { parsePdfUrl } from "@ringkasan.net/parse-pdf-url";

class FileHandler {
  downloadDirPath: string;

  constructor(downloadDirPath: string){
    console.log('[server] fileHandler');
    this.downloadDirPath = downloadDirPath;
    
    if(!fs.existsSync('./public')){
      console.log(`[fileHandler] creating ./public dir`);
      fs.mkdirSync('./public');
    };

    if(!fs.existsSync(this.downloadDirPath)){
      console.log(`[fileHandler] creating ${this.downloadDirPath}`);
      fs.mkdirSync(this.downloadDirPath);
    };
  };

  flattenFiles(filesAndFolders: any[]){
    let children: any[] = [];
    const readFileRecursively = (list: any[]) => {
      for (const item of list){
        if (item.type === 'folder' && item.children.length !== 0){
          readFileRecursively(item.children);
        } else if (item.type === 'file'){
          children.push(item);
        };
      };
    };
    readFileRecursively(filesAndFolders);
    return children;
  };

  async downloadFile(url: string, fileName: string): Promise<void> {
    console.log(`downloading ${fileName} to ${this.downloadDirPath}`);
    const downloadPath = this.downloadDirPath + fileName;
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(downloadPath);
      https
        .get(url, (response) => {
          if (response.statusCode !== 200) {
            reject(
              new Error(`failed to download file: ${response.statusCode}`)
            );
          }
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            console.log(`${fileName} downloaded successfully`);
            resolve();
          });
          file.on("error", (error) => {
            console.error(`Error writing file: ${error}`);
            reject(error);
          });
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  };

  async pdfParse(filePath: string): Promise<string> {
    const url = filePath;
    const pdf = await parsePdfUrl(url);
    const pdfText = await pdf.getAllTexts();
    return pdfText;
  };

  isFileDownloaded(fileName: string): boolean {
    console.log(`check if ${fileName} is ready locally (./public/tmp/)`);
    if (fs.existsSync(fileHandler.downloadDirPath + fileName)){
      console.log(`${fileName} is ready locally`);
      const localPath = this.downloadDirPath + fileName;
      return true;
    } else {
      console.log(`${fileName} is not ready locally`);
      return false;
    };
  };
};

export const downloadDirPath = './public/tmp/';

export const fileHandler = new FileHandler(downloadDirPath);