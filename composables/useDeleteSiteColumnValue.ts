export default async function(itemId: string, columnName: string){
  const data = await $fetch(`/api/sites/delete-column-value`, {
    method: 'post',
    body: {
      itemId: itemId,
      columnName: columnName,
    },
  });
};