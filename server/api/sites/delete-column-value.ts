export default defineEventHandler(async (event) => {
  const { itemId, columnName } = await readBody(event);
  await graphHandler.updateSiteColumns(itemId, {
    [columnName]: null,
  });
  console.log(`delete ${columnName} column value done`)
  return `delete ${columnName} column value done`;
});