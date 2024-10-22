export default async function(driveItemId: string, field: string, value: string){
  console.log(driveItemId, field, value);
  const data = await $fetch(`/api/sites/revisi-column-value`, {
    method: 'post',
    body: {
      driveItemId: driveItemId,
      field: field,
      value: value,
    },
  });
  return data;
};