export default async function(driveItemId: string){
  console.log(`[useUpdateSiteColumnn composables]`);
  const data = await $fetch(`/api/update-nilai`, {
    method: 'post',
    body: {
      driveItemId: driveItemId,
    },
  });
  return data;
};