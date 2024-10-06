import * as fs from "node:fs";
import * as https from "node:https";
import { parsePdfUrl } from "@ringkasan.net/parse-pdf-url";

class FileHandler {
  downloadDirPath: string;
  constructor(downloadDirPath: string) {
    this.downloadDirPath = downloadDirPath;
  }
  async downloadFile(url: string, fileName: string): Promise<void> {
    console.log(`downloading ${fileName}`);
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
  }

  async pdfParse(filePath: string): Promise<string> {
    const url = filePath;
    const pdf = await parsePdfUrl(url);
    const pdfText = await pdf.getAllTexts();
    return pdfText;
  }

  isFileDownloaded(fileName: string): boolean {
    console.log(`check if ${fileName} is ready locally (./public/tmp/)`);
    if (fs.existsSync(fileHandler.downloadDirPath + fileName)) {
      console.log(`${fileName} is ready locally`);
      const localPath = downloadDirPath + fileName;
      return true;
    } else {
      console.log(`${fileName} is not ready locally`);
      return false;
    }
  }

}
const downloadDirPath = "./public/tmp/";

export const fileHandler = new FileHandler(downloadDirPath);
