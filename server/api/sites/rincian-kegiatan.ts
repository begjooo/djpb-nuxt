export default defineEventHandler(async (event) => {
  const { driveItemId, namaKegiatan } = await readBody(event);
  console.log(`[/api/rincian-kegiatan] ${namaKegiatan}`);
  const file = await graphHandler.getDriveItem(driveItemId);
  let aiReponse = null;
  let validText = file.fields['TextFormat'].replace(/(.{2000})/g, "$1\n");
  validText = validText.replace(/\"/g, "'");
  validText = validText.replace(/\”/g, "'");
  validText = validText.replace(/\“/g, "'");
  validText = validText.replace(/\‘/g, "'");
  validText = validText.replace(/\’/g, "'");
  try {
    aiReponse = await geminiHandler.processTextWithGemini(validText, promptMap.get('rincianKegiatan') + namaKegiatan);

  } catch (error) {
    return error;
  };

  console.log(`[/api/rincian-kegiatan] done`);
  return aiReponse;
});