export default defineEventHandler(async (event) => {
  const { nilai } = getQuery(event);
  console.log('nilai', nilai);
  if(nilai){
    console.log('nilai if terpenuhi', nilai);
    return nilai;
  } else {
    return 'input dari API dengan catatan query = null';
  };
});