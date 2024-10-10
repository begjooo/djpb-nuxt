import fs from "fs";

export default defineEventHandler(async (event) => {
  const { driveItemId } = await readBody(event);
  await graphHandler.checkMandatorySiteColumns();
  let file = await graphHandler.getDriveItem(driveItemId);
  const txtFileName = file.name.replace('.pdf', '.txt');
  fs.writeFileSync(fileHandler.downloadDirPath + txtFileName, file.fields['TextFormat']);
  console.log('done');
  return file;
});