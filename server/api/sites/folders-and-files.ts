export default defineEventHandler(async (event) => {
  console.log(`/api/sites/folders-and-files`);
  let rootFolderId = '01KXXEPH4UOPPMFVEGGBDJI7QC2MX3CYFU';
  const foldersAndFiles: SharepointFile[] = await graphHandler.mapFilesAndFolders(rootFolderId);
  return { foldersAndFiles, rootFolderId };
});