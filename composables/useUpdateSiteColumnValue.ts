export default async function(driveItemId: string, columnName: string, value: string){
  const data = await $fetch(`/api/sites/update-column-value`, {
    method: 'post',
    body: {
      driveItemId: driveItemId,
      columnName: columnName,
      value: value,
    },
  });
};