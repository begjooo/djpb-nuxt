export default async function(){
  console.log(`useFkpknList composables`);
  // const { data } = useFetch(`/api/fkpkn-list`);
  const data = await $fetch(`/api/fkpkn-list`);
  // const { data } = await useAsyncData(async () => await $fetch(`/api/fkpkn-list`));
  // const response = useState('fkpkn-list', () => data);
  return data;
};