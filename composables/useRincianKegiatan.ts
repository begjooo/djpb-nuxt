export default async function(driveItemId: string, namaKegiatan: string){
  const rincianKegiatan = await $fetch(`/api/sites/rincian-kegiatan`, {
    method: 'post',
    body: {
      driveItemId: driveItemId,
      namaKegiatan: namaKegiatan,
    },
  });

  const analisisKegiatan = await $fetch(`/api/sites/analisis-kegiatan`, {
    method: 'post',
    body: {
      driveItemId: driveItemId,
      namaKegiatan: namaKegiatan,
    },
  });

  return { rincianKegiatan, analisisKegiatan };
};