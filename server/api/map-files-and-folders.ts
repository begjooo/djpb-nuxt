export default defineEventHandler(async (event) => {
  const filesAndFolders = await graphHandler.mapFilesAndFolders('01KXXEPH4UOPPMFVEGGBDJI7QC2MX3CYFU');
  return filesAndFolders;
});