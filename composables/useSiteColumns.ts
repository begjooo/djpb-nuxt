export default async function(){
  const list = useState('sites-column-list');
  const { data } = await useFetch(`/api/sites/column-list`);
  list.value = data.value;
};