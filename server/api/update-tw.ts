export default defineEventHandler(async (event) => {
  const { driveItemId, tw } = await readBody(event);
  console.log(`/api/update-tw`);

  await graphHandler.checkMandatorySiteColumns();
  let file = await graphHandler.getDriveItem(driveItemId);

  await graphHandler.updateSiteColumns(file.itemId, {
    'Triwulan': tw,
  });

  console.log(`update triwulan ${tw} to ${file.name}: done`);
});