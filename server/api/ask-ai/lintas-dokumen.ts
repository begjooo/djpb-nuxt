export default defineEventHandler(async (event) => {
  console.log(`[/api/lintas-dokumen]: ask-ai`);
  const { query, sources } = await readBody(event);
  // console.log(`query: ${query}`);
  // console.log(`sources: ${sources}`);

  let allSources = '';
  for await (const id of sources){
    const file: DriveFile = await graphHandler.getDriveItem(id);
    let fileContent = file.fields['TextFormat'].replace(/(.{2000})/g, '$1\n');
    fileContent = fileContent.replace(/\"/g, '\'');
    fileContent = fileContent.replace(/\”/g, '\'');
    fileContent = fileContent.replace(/\“/g, '\'');
    fileContent = fileContent.replace(/\‘/g, '\'');
    fileContent = fileContent.replace(/\’/g, '\'');
    allSources += `=== ${file.name} ===\n${fileContent}\n===\n\n`
  };
  const response = await geminiHandler.processTextWithGemini(allSources, query);
  console.log(`[/api/lintas-dokumen]: done`);
  return response;
});