export default async function(driveItemId: string, tanggal: string, columnName: string){
  const data = await $fetch(`/api/sites/update-tanggal`, {
    method: 'post',
    body: {
      driveItemId: driveItemId,
      tanggal: tanggal,
      columnName: columnName,
    },
  });
  return data;
};