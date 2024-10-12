export default async function(driveItemId: string, tw: string){
  const data = await $fetch(`/api/update-tw`, {
    method: 'post',
    body: {
      driveItemId: driveItemId,
      tw: tw,
    },
  });
  return data;
};