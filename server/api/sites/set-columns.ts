export default defineEventHandler(async (event) => {
  await graphHandler.checkMandatorySiteColumns();
  return 'set mandatory column success';
});