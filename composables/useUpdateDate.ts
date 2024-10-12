export default async function(driveItemId: string, tglPengumpulan: string){
  const data = await $fetch(`/api/update-tanggal`, {
    method: 'post',
    body: {
      driveItemId: driveItemId,
      tglPengumpulan: tglPengumpulan,
    },
  });
  return data;
};