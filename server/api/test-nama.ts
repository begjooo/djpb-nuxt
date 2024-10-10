export default defineEventHandler(async (event) => {
  // const { source } = await readBody(event);
  // console.log(`${source}: api menerima request dari composables`);
  const nama = `bagja`;
  return nama;
});