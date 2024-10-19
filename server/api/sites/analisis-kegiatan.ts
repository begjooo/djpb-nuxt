export default defineEventHandler(async (event) => {
  const { driveItemId, namaKegiatan } = await readBody(event);
  console.log(`[/api/anlisis-kegiatan] ${namaKegiatan}`);
  const file = await graphHandler.getDriveItem(driveItemId);
  let aiReponse = null;
  let validText = file.fields['TextFormat'].replace(/(.{2000})/g, "$1\n");
  validText = validText.replace(/\"/g, "'");
  validText = validText.replace(/\”/g, "'");
  validText = validText.replace(/\“/g, "'");
  validText = validText.replace(/\‘/g, "'");
  validText = validText.replace(/\’/g, "'");
  const prompt = `Kegiatan yang diminta: ${namaKegiatan}\n${promptMap.get('analisisKegiatan')}`;
  try {
    aiReponse = await geminiHandler.processTextWithGemini(validText, prompt);
  } catch (error) {
    return error;
  };

  console.log(`[/api/anlisis-kegiatan] done`);
  return aiReponse;
});