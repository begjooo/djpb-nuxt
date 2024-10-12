export default defineEventHandler(async (event) => {
  const { driveItemId, tglPengumpulan } = await readBody(event);
  console.log(`/api/update-tanggal`);
  console.log(`${driveItemId}`);
  console.log(`${tglPengumpulan}`);
  console.log(`${typeof(tglPengumpulan)}`);

  await graphHandler.checkMandatorySiteColumns();
  let file = await graphHandler.getDriveItem(driveItemId);

  await graphHandler.updateSiteColumns(file.itemId, {
    'TanggalPengumpulan': tglPengumpulan,
  });

  console.log(`update ${tglPengumpulan} to ${file.name}: done`);
});