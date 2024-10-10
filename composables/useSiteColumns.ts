export default async function(){
  const list = ref();
  const { data } = await useFetch(`/api/site-columns`);
  list.value = data.value;
  return list;
};