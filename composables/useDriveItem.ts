export default async function(driveItemId: string){
  const data = await useFetch(`/api/drive-text`, {
    method: 'post',
    body: {
      driveItemId: driveItemId,
    },
  });
  return data;
};