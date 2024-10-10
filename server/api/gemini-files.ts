export default defineEventHandler(async (event) => {
  const geminiFiles = await geminiHandler.getAllGeminiFiles();
  return geminiFiles;
});