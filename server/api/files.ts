export default defineEventHandler(async (event) => {
  let { driveItemId } = await readBody(event);
  if(driveItemId === undefined){
    driveItemId = '01KXXEPH4UOPPMFVEGGBDJI7QC2MX3CYFU';
  };
  const filesAndFolder = await graphHandler.mapFilesAndFolders(driveItemId);
  const files = filesAndFolder.filter((item: any) => item.type === 'file');
  return { driveItemId, files };
});