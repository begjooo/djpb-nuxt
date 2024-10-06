import { hitungKetepatanWaktu, hitungNilaiAdministratif } from "../penilaian/administratif";
import { hitungNilaiSubstantif } from "../penilaian/subtantif";


export default defineEventHandler(async (event) => {
  const { driveItemId } = await readBody(event);

  await graphHandler.setMandatorySiteColumns();
  let file = await graphHandler.getDriveItem(driveItemId);
  
  await graphHandler.fillMandatoryColumnContent(file);
  file = await graphHandler.getDriveItem(driveItemId);

  console.log(`\nmenghitung nilai administratif laporan FKPKN`);
  const nilaiKetepatanWaktu = hitungKetepatanWaktu(file.fields['KetepatanWaktu']);
  console.log(`nilai ketepatan waktu pengumpulan (8%) = ${nilaiKetepatanWaktu}`);

  const nilaiAdministratif = await hitungNilaiAdministratif(file);
  console.log(`nilai administratif (32%) = ${nilaiAdministratif}`);
  await graphHandler.updateSiteColumns(file.itemId, {
    'NilaiAdministratif': nilaiAdministratif,
  });

  console.log(`\nmenghitung nilai substantif laporan FKPKN`);
  const nilaiSubstantif = await hitungNilaiSubstantif(file);
  console.log(`nilai substantif (60%) = ${nilaiSubstantif}`);
  await graphHandler.updateSiteColumns(file.itemId, {
    'NilaiSubstantif': nilaiSubstantif,
  });

  console.log(`\nmenghitung nilai total laporan FKPKN`);
  const nilai = nilaiKetepatanWaktu + nilaiAdministratif + nilaiSubstantif;
  console.log(`nilai = ${nilai}`);
  await graphHandler.updateSiteColumns(file.itemId, {
    'Nilai': nilai,
  });
  
  return file;
});