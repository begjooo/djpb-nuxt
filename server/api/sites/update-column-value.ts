export default defineEventHandler(async (event) => {
  const { driveItemId, columnName, value } = await readBody(event);
  console.log(`\n/api/sites/update-column-value for ${columnName} of ${driveItemId}`);

  await graphHandler.checkMandatorySiteColumns();
  let file = await graphHandler.getDriveItem(driveItemId);

  await graphHandler.updateSiteColumns(file.itemId, {
    [columnName]: value,
  });
  console.log(`${columnName} of ${file.name} is updated`);
});