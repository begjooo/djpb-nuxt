export default async function(driveItemId: string){
  const data = await $fetch(`/api/sites/drive-item`, {
  // const { data } = await useFetch(`/api/sites/drive-item`, {
    method: 'post',
    body: {
      driveItemId: driveItemId,
    },
  });
  return data;
};