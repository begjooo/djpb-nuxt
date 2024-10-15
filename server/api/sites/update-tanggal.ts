export default defineEventHandler(async (event) => {
  const { driveItemId, tanggal, columnName } = await readBody(event);
  console.log(`\n/api/update-tanggal for ${columnName}`);
  console.log(`${tanggal}`);

  await graphHandler.checkMandatorySiteColumns();
  let file = await graphHandler.getDriveItem(driveItemId);

  await graphHandler.updateSiteColumns(file.itemId, {
    [columnName]: tanggal,
  });

  console.log(`update ${tanggal} to ${columnName} ${file.name}: done`);
});