import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { type DriveFile } from "./graphHandler";

const { geminiApiKey } = useRuntimeConfig();

class GeminiHandler {
  genAi: GoogleGenerativeAI;
  fileManager: GoogleAIFileManager;

  constructor (geminiApiKey: string){
    this.genAi = new GoogleGenerativeAI(geminiApiKey);
    this.fileManager = new GoogleAIFileManager(geminiApiKey);
  };

  async getAllGeminiFiles(): Promise<DriveFile[]> {
    const listFiles = await this.fileManager.listFiles();
    return listFiles.files;
  };

  async isFileInGemini(file: DriveFile): Promise<boolean> {
    const listFiles = await this.getAllGeminiFiles();
    if (listFiles){
      const fileCheck = listFiles.find(item => item.displayName === file.name);
      if (fileCheck){
        console.log(`${file.name} is in Gemini`);
        file.uri = fileCheck.uri;
        file.state = fileCheck.state;
        file.geminiName = fileCheck.name;
        return true;
      } else {
        console.log(`${file.name} is not in Gemini`);
        return false;
      };
    } else {
      console.log(`${file.name} is not in Gemini`);
      return false;
    };
  };

  async uploadFileToGemini(file: DriveFile): Promise<DriveFile> {
    console.log(`upload "${file.name}" to Gemini ...`);
  
    const uploadFile = await this.fileManager.uploadFile(file.localPath, {
      mimeType: file.mimeType,
      displayName: file.name,
    });
  
    file.uri = uploadFile.file.uri;
    file.state = uploadFile.file.state;
    file.geminiName = uploadFile.file.name;
  
    return file;
  };

  async checkActiveFileInGemini(file: DriveFile): Promise<void> {
    console.log(`check if ${file.name} is ready to use in Gemini or not ...`);
    let fileCheck = await this.fileManager.getFile(file.geminiName);
    while (fileCheck.state === 'PROCESSING'){
      process.stdout.write('.');
      await new Promise((resolve) => setTimeout(resolve, 10_000));
      fileCheck = await this.fileManager.getFile(file.geminiName);
    };
  
    if (fileCheck.state !== 'ACTIVE'){
      throw Error(`${file.name} failed to process`);
    };
  
    console.log(`${file.name} in Gemini is ready to process!`);
  };

  async processTextWithGemini(source: string, prompt: string, jsonSchema?: any): Promise<string> {
    let model = null;
    if (jsonSchema){
      model = this.genAi.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: jsonSchema,
        },
      });
    } else {
      model = this.genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });
    };
    
    const content = `=== sumber dokumen ===
    ${source}
    ===
    
    ${prompt}
    `;
    // console.log(`\n${content}\n`);
    try {
      const result = await model.generateContent(content);
      if (jsonSchema){
        try {
          return JSON.parse(result.response.text());
        } catch (error) {
          throw error;
        };
      } else {
        return result.response.text();
      };
    } catch (error) {
      throw error;
    };
  };

  async processFileWithGemini(source: DriveFile, prompt: string, jsonSchema?: any): Promise<string> {
    let model = null;
    if (jsonSchema){
      model = this.genAi.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: jsonSchema,
        },
      });
    } else {
      model = this.genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });
    };
  
    const content: any[] = [
      {
        fileData: {
          mimeType: source.mimeType,
          fileUri: source.uri || '',
        },
      },
      {
        text: prompt,
      },
    ];
    
    try {
      const result = await model.generateContent(content);
      if (jsonSchema){
        try {
          return JSON.parse(result.response.text());  
        } catch (error) {
          throw error;
        };
      } else {
        return result.response.text();
      };
    } catch (error) {
      throw error;
    };
  };

  async countResponseToken(text: string): Promise<number> {
    const model = this.genAi.getGenerativeModel({
      model: 'gemini-1.5-flash'});
    const count = await model.countTokens(text);
    return count.totalTokens;
  };
};

export const geminiHandler = new GeminiHandler(geminiApiKey);