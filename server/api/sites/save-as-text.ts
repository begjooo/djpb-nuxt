import fs from "fs";

export default defineEventHandler(async (event) => {
  const { driveItemId } = await readBody(event);
  await graphHandler.checkMandatorySiteColumns();
  const file = await graphHandler.getDriveItem(driveItemId);
  if(!(await geminiHandler.isFileInGemini(file, 'text/plain'))){
    const txtFileName = file.name.replace('.pdf', '.txt');
    if(!(fileHandler.isFileDownloaded(txtFileName))){
      file.txtFilePath = fileHandler.downloadDirPath + txtFileName;
      fs.writeFileSync(file.txtFilePath, file.fields['TextFormat']);
    };
    await geminiHandler.uploadFileToGemini(file, file.txtFilePath, 'text/plain');
  };

  if(file.txtFilePath){
    fs.unlinkSync(file.txtFilePath);
  };

  // console.log(file);
  return file;
});