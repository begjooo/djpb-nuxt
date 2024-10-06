// import {GeminiHandler} from '@ringkasan.net/gemini-handler'
// const { geminiApiKey } = useRuntimeConfig();

// export const geminiHandler = new GeminiHandler(geminiApiKey)

import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { DriveFile } from "./graphHandler";

const { geminiApiKey } = useRuntimeConfig();
const genAi = new GoogleGenerativeAI(geminiApiKey);
const fileManager = new GoogleAIFileManager(geminiApiKey);

export async function getAllGeminiFiles(): Promise<DriveFile[]> {
  const listFiles = await fileManager.listFiles();
  return listFiles.files;
};

export async function isFileInGemini(file: DriveFile): Promise<boolean> {
  const listFiles = await getAllGeminiFiles();
  if(listFiles){
    console.log(`check if ${file.name} is uploaded in Gemini`);
    const fileCheck = listFiles.find(item => item.displayName === file.name);
    if(fileCheck){
      console.log(`${file.name} is uploaded in Gemini`);
      file.uri = fileCheck.uri;
      file.state = fileCheck.state;
      file.geminiName = fileCheck.name;
      return true;
    } else {
      console.log(`${file.name} is not uploaded in Gemini`);
      return false;
    };
  } else {
    console.log(`${file.name} is not uploaded in Gemini`);
    return false;
  };
};

export async function uploadFileToGemini(file: DriveFile): Promise<DriveFile> {
  console.log(`upload "${file.name}" to Gemini ...`);

  const uploadFile = await fileManager.uploadFile(file.localPath, {
    mimeType: file.mimeType,
    displayName: file.name,
  });

  file.uri = uploadFile.file.uri;
  file.state = uploadFile.file.state;
  file.geminiName = uploadFile.file.name;

  return file;
};

export async function checkActiveFileInGemini(file: DriveFile): Promise<void> {
  console.log(`check if ${file.name} is ready to use in Gemini or not ...`);
  let fileCheck = await fileManager.getFile(file.geminiName);
  while (fileCheck.state === 'PROCESSING'){
    process.stdout.write('.');
    await new Promise((resolve) => setTimeout(resolve, 10_000));
    fileCheck = await fileManager.getFile(file.geminiName);
  }

  if(fileCheck.state !== 'ACTIVE'){
    throw Error(`${file.name} failed to process`);
  }

  console.log(`${file.name} in Gemini is ready to process!`);
};

export async function processTextWithGemini(source: string, prompt: string, jsonSchema?: any): Promise<string> {
  let model = null;
  if(jsonSchema){
    model = genAi.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: jsonSchema,
      },
    });
  } else {
    model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });
  };
  
  const content = `=== sumber dokumen ===
  ${source}
  ===
  
  ${prompt}
  `;
  
  try {
    const result = await model.generateContent(content);
    console.log(result.response.text());
    if(jsonSchema){
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

export async function processFileWithGemini(source: DriveFile, prompt: string, jsonSchema?: any): Promise<string> {
  let model = null;
  if(jsonSchema){
    model = genAi.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: jsonSchema,
      },
    });
  } else {
    model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });
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
  // console.log(content);
  try {
    const result = await model.generateContent(content);
    if(jsonSchema){
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