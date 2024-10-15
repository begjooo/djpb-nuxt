export default async function(driveItemId: string){
  const data = await $fetch(`/api/sites/drive-text`, {
    method: 'post',
    body: {
      driveItemId: driveItemId,
    },
  });
  return data;
};