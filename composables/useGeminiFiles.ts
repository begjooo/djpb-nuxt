export default async function(){
  const list = useState<DriveFile[]>('gemini-files', () => []);
  const data = await $fetch(`/api/gemini-files`);
  list.value = data;
  return list;
};