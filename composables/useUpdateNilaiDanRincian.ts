export default async function(driveItemId: string){
  const data = await $fetch(`/api/sites/update-nilai-dan-rincian`, {
    method: 'post',
    body: {
      driveItemId: driveItemId,
    },
  });
  return data;
};