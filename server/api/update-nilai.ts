import { hitungKetepatanWaktu, hitungNilaiAdministratif } from "../penilaian/administratif";
import { hitungNilaiSubstantif } from "../penilaian/subtantif";
import { setMandatorySiteColumns, getDriveItem, fillMandatoryColumnContent, updateSiteColumns } from "../services/sites";

export default defineEventHandler(async (event) => {
  const { driveItemId } = await readBody(event);

  await setMandatorySiteColumns();
  let file = await getDriveItem(driveItemId);
  
  await fillMandatoryColumnContent(file);
  file = await getDriveItem(driveItemId);

  console.log(`\nmenghitung nilai administratif laporan FKPKN`);
  const nilaiKetepatanWaktu = hitungKetepatanWaktu(file.fields['KetepatanWaktu']);
  console.log(`nilai ketepatan waktu pengumpulan (8%) = ${nilaiKetepatanWaktu}`);

  const nilaiAdministratif = await hitungNilaiAdministratif(file);
  console.log(`nilai administratif (32%) = ${nilaiAdministratif}`);
  await updateSiteColumns(file.itemId, {
    'NilaiAdministratif': nilaiAdministratif,
  });

  console.log(`\nmenghitung nilai substantif laporan FKPKN`);
  const nilaiSubstantif = await hitungNilaiSubstantif(file);
  console.log(`nilai substantif (60%) = ${nilaiSubstantif}`);
  await updateSiteColumns(file.itemId, {
    'NilaiSubstantif': nilaiSubstantif,
  });

  console.log(`\nmenghitung nilai total laporan FKPKN`);
  const nilai = nilaiKetepatanWaktu + nilaiAdministratif + nilaiSubstantif;
  console.log(`nilai = ${nilai}`);
  await updateSiteColumns(file.itemId, {
    'Nilai': nilai,
  });
  
  return file;
});