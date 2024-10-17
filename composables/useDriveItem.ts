export default async function(driveItemId: string){
  // const data = await $fetch(`/api/sites/save-as-text`, {
  const { data } = await useFetch(`/api/sites/save-as-text`, {
    method: 'post',
    body: {
      driveItemId: driveItemId,
    },
  });
  // return data;
};