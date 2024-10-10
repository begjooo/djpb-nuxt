export default defineEventHandler(async (event) => {
  console.log(`fkpkn-list api`);
  const filesAndFolders = await graphHandler.mapFilesAndFolders('01KXXEPH4UOPPMFVEGGBDJI7QC2MX3CYFU');
  const flattenFiles = fileHandler.flattenFiles(filesAndFolders);
  return flattenFiles;
});