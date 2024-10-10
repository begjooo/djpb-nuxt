export default defineEventHandler(async (event) => {
  const { isiData } = getQuery(event);
  console.log(`test-input query: ${isiData}`);
  return isiData;
});