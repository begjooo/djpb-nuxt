export default async function(itemId: string, columnName: string){
  const data = await $fetch(`/api/delete-site-column-value`, {
    method: 'post',
    body: {
      itemId: itemId,
      columnName: columnName,
    },
  });
  return data;
};