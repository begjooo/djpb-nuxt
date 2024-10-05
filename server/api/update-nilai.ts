import { hitungKetepatanWaktu, hitungNilaiAdministratif } from "../penilaian/administratif";
import { hitungNilaiSubstantif } from "../penilaian/subtantif";
import { getGraphClient } from "../services/graph-credential";
import { setMandatorySiteColumns, getDriveItem, fillMandatoryColumnContent, updateSiteColumns } from "../services/sites";

export default defineEventHandler(async (event) => {
  const { driveItemId } = await readBody(event);
  const graphClient = await getGraphClient();

  await setMandatorySiteColumns(graphClient);
  let file = await getDriveItem(graphClient, driveItemId);
  
  await fillMandatoryColumnContent(graphClient, file);
  file = await getDriveItem(graphClient, driveItemId);

  console.log(`\nmenghitung nilai administratif laporan FKPKN`);
  const nilaiKetepatanWaktu = hitungKetepatanWaktu(file.fields['KetepatanWaktu']);
  console.log(`nilai ketepatan waktu pengumpulan (8%) = ${nilaiKetepatanWaktu}`);

  const nilaiAdministratif = await hitungNilaiAdministratif(file);
  console.log(`nilai administratif (32%) = ${nilaiAdministratif}`);
  await updateSiteColumns(graphClient, file.itemId, {
    'NilaiAdministratif': nilaiAdministratif,
  });

  console.log(`\nmenghitung nilai substantif laporan FKPKN`);
  const nilaiSubstantif = await hitungNilaiSubstantif(file);
  console.log(`nilai substantif (60%) = ${nilaiSubstantif}`);
  await updateSiteColumns(graphClient, file.itemId, {
    'NilaiSubstantif': nilaiSubstantif,
  });

  console.log(`\nmenghitung nilai total laporan FKPKN`);
  const nilai = nilaiKetepatanWaktu + nilaiAdministratif + nilaiSubstantif;
  console.log(`nilai = ${nilai}`);
  await updateSiteColumns(graphClient, file.itemId, {
    'Nilai': nilai,
  });
  
  return file;
});