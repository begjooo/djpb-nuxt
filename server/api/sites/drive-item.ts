export default defineEventHandler(async (event) => {
  const { driveItemId } = await readBody(event);
  const file = await graphHandler.getDriveItem(driveItemId);
  return file;
});