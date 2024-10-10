export default async function(){
  const list = ref();
  const data = await $fetch(`/api/gemini-files`);
  list.value = data;
  return list.value;
};