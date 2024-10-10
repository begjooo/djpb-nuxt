import { hitungKetepatanWaktu, hitungNilaiAdministratif, hitungPengumpulan } from "../utils/nilai/administratif";
import { hitungNilaiSubstantif } from "../utils/nilai/substantif";

export default defineEventHandler(async (event) => {
  const { driveItemId } = await readBody(event);
  console.log(`[/api/update-nilai] driveItemId: ${driveItemId}`);

  await graphHandler.checkMandatorySiteColumns();
  let file = await graphHandler.getDriveItem(driveItemId);

  await graphHandler.checkMandatoryColumnsValue(file);
  file = await graphHandler.getDriveItem(driveItemId);

  console.log(`\nmenghitung nilai administratif ${file.name}`);
  // const nilaiKetepatanWaktu = hitungKetepatanWaktu(file.fields['KetepatanWaktu']);
  const nilaiKetepatanWaktu = hitungPengumpulan(file.fields['Triwulan'], file.fields['TanggalPengumpulan']);
  console.log(`nilai ketepatan waktu pengumpulan (8%) = ${nilaiKetepatanWaktu}`);

  const nilaiAdministratif = await hitungNilaiAdministratif(file);
  console.log(`nilai administratif (32%) = ${nilaiAdministratif}`);
  await graphHandler.updateSiteColumns(file.itemId, {
    'NilaiAdministratif': nilaiAdministratif,
  });

  console.log(`\nmenghitung nilai substantif ${file.name}`);
  const nilaiSubstantif = await hitungNilaiSubstantif(file);
  console.log(`nilai substantif (60%) = ${nilaiSubstantif}`);
  await graphHandler.updateSiteColumns(file.itemId, {
    'NilaiSubstantif': nilaiSubstantif,
  });

  console.log(`\nmenghitung nilai total ${file.name}`);
  const nilai = nilaiKetepatanWaktu + nilaiAdministratif + nilaiSubstantif;
  console.log(`nilai = ${nilai}`);
  await graphHandler.updateSiteColumns(file.itemId, {
    'Nilai': nilai,
  });

  console.log(`\nmenghitung ${file.name}: done`);
});