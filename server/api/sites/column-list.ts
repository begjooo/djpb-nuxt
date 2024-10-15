export default defineEventHandler(async (event) => {
  const siteColumns = await graphHandler.getSiteColumns();
  return siteColumns;
});