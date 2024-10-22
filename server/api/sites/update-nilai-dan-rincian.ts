import { hitungNilaiAdministratif, hitungPengumpulan } from '../../utils/nilai/administratif-dan-rincian';
import { hitungNilaiSubstantif } from '../../utils/nilai/substantif-dan-rincian';

export default defineEventHandler(async (event) => {
  const { driveItemId } = await readBody(event);
  console.log(`[/api/update-nilai] driveItemId: ${driveItemId}`);

  await graphHandler.checkMandatorySiteColumns();
  let file = await graphHandler.getDriveItem(driveItemId);

  await graphHandler.checkMandatoryColumnsValue(file);
  file = await graphHandler.getDriveItem(driveItemId);

  console.log(`\nmenghitung nilai administratif ${file.name}`);
  const nilaiKetepatanWaktu = hitungPengumpulan(file.fields['BatasTriwulan'], file.fields['TanggalPengumpulan']);
  // console.log(nilaiKetepatanWaktu);
  console.log(`nilai ketepatan waktu pengumpulan (8%) = ${nilaiKetepatanWaktu.nilaiAkhir}`);

  const nilaiAdministratif = await hitungNilaiAdministratif(file);
  // console.log(nilaiAdministratif);
  console.log(`nilai administratif (32%) = ${nilaiAdministratif.nilaiAkhir}`);
  await graphHandler.updateSiteColumns(file.itemId, {
    'NilaiAdministratif': nilaiAdministratif.nilaiAkhir,
  });

  console.log(`\nmenghitung nilai substantif ${file.name}`);
  const nilaiSubstantif = await hitungNilaiSubstantif(file);
  // console.log(nilaiSubstantif);
  console.log(`nilai substantif (60%) = ${nilaiSubstantif.nilaiAkhir}`);
  await graphHandler.updateSiteColumns(file.itemId, {
    'NilaiSubstantif': nilaiSubstantif.nilaiAkhir,
  });

  console.log(`\nmenghitung nilai total ${file.name}`);
  const nilai = nilaiKetepatanWaktu.nilaiAkhir + nilaiAdministratif.nilaiAkhir + nilaiSubstantif.nilaiAkhir;
  console.log(`nilai = ${nilai}`);
  await graphHandler.updateSiteColumns(file.itemId, {
    'Nilai': nilai,
  });

  const nilaiAi = {
    ketepatanWaktu: nilaiKetepatanWaktu,
    administratif: nilaiAdministratif,
    substantif: nilaiSubstantif,
    total: nilai,
  };
  console.log(nilaiAi);
  await graphHandler.updateSiteColumns(file.itemId, {
    'NilaiAI': JSON.stringify(nilaiAi),
  });
  console.log(`\nmenghitung ${file.name}: done`);
});