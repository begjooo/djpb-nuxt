export default defineEventHandler(async (event) => {
  const filesAndFolder = await graphHandler.mapFilesAndFolders('01KXXEPH4UOPPMFVEGGBDJI7QC2MX3CYFU');
  return filesAndFolder;
});