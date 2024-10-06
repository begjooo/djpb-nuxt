import * as fs from "node:fs";
import { getSharePointFile, pdfParse } from "./file-handler";
import { processTextWithGemini } from "./gemini-ai";
import { extractKegiatanJsonPrompt, extractKegiatanJsonPrompt2, extractKegiatanJsonSchema, extractKegiatanJsonSchema2, extractKegiatanPrompt, promptMap, testPrompt } from "./prompt";
import { graphClient } from "./graphHandler";



