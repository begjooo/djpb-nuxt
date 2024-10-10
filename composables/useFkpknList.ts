export default async function(){
  console.log(`useFkpknList composables`);
  // const { data } = useFetch(`/api/fkpkn-list`);
  const data = await $fetch(`/api/fkpkn-list`);
  // const { data } = await useAsyncData(async () => await $fetch(`/api/fkpkn-list`));
  // const response = useState('fkpkn-list', () => data);
  // const data = useState('fkpkn-list', () => $fetch('/api/fkpkn-list'));
  // const data = useState('fkpkn-list', async () => await $fetch('/api/fkpkn-list'));
  // const dataUseState = useState('fkpkn-list', () => 'data');
  // console.log(dataUseState);
  return data;
};