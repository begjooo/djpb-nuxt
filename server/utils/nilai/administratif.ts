import fs from "fs";

// NOMOR 1
// export function hitungPengumpulan(triwulan: string, waktuPengumpulan: string){
//   const waktuPengumpulanDate = new Date(waktuPengumpulan);
//   const tahunPengumpulan = waktuPengumpulanDate.getFullYear();

//   let tglBatas = '';
//   let bulanBatas = '';
//   if(triwulan === 'I'){
//     tglBatas = '31';
//     bulanBatas = '03';
//   } else if(triwulan === 'II'){
//     tglBatas = '30';
//     bulanBatas = '06';
//   } else if(triwulan === 'III'){
//     tglBatas = '30';
//     bulanBatas = '09';
//   } else if(triwulan === 'IV'){
//     tglBatas = '31';
//     bulanBatas = '12';
//   };
//   const batasTW = new Date(`${tahunPengumpulan}-${bulanBatas}-${tglBatas}T07:00:00Z`);
//   console.log(`batas triwulan ${triwulan} ${batasTW}`);
//   console.log(`waktu pengumpulan ${waktuPengumpulanDate}`);

//   const selisihWaktu = waktuPengumpulanDate.getTime() - batasTW.getTime();
//   const selisihHari = Math.round(selisihWaktu / (1000 * 3600 * 24));
//   console.log(`${selisihHari} hari setelah TW ${triwulan}`);
  
//   let nilai = 0;
//   if(selisihHari){
//     nilai = 60;
//     if(selisihHari <= 5){
//       nilai = 100;
//     } else if(selisihHari > 5 && selisihHari <= 10){
//       nilai = 90;
//     } else if(selisihHari > 10 && selisihHari <= 15){
//       nilai = 80;
//     } else if(selisihHari > 15 && selisihHari <= 20){
//       nilai = 70;
//     };
//   };
  
//   console.log(`nilai ketepatan waktu pengumpulan: ${nilai}`);
//   return nilai * 0.2 * 0.4;
// };

export function hitungPengumpulan(triwulan: string, waktuPengumpulan: string){
  const batasTW = new Date(triwulan);
  const waktuPengumpulanDate = new Date(waktuPengumpulan);
  console.log(`batas triwulan ${triwulan} ${batasTW}`);
  console.log(`waktu pengumpulan ${waktuPengumpulanDate}`);

  const selisihWaktu = waktuPengumpulanDate.getTime() - batasTW.getTime();
  const selisihHari = Math.round(selisihWaktu / (1000 * 3600 * 24));
  console.log(`${selisihHari} hari setelah batas TW ${batasTW}`);
  
  let nilai = 0;
  if(selisihHari){
    nilai = 60;
    if(selisihHari <= 5){
      nilai = 100;
    } else if(selisihHari > 5 && selisihHari <= 10){
      nilai = 90;
    } else if(selisihHari > 10 && selisihHari <= 15){
      nilai = 80;
    } else if(selisihHari > 15 && selisihHari <= 20){
      nilai = 70;
    };
  };
  
  console.log(`nilai ketepatan waktu pengumpulan: ${nilai}`);
  return nilai * 0.2 * 0.4;
};

// HITUNG KESESUAIAN FORMAT LAPORAN (NOMOR 2)
function hitungFormat(dataFormat: any){
  let nilaiFormat = 0;
  let keterangan = 'Bagian yang tidak lengkap: ';
  for (const bagian in dataFormat){
    if(dataFormat[bagian] === false){
      keterangan += `${bagian}, `;
    };

    if(bagian === 'Kata Pengantar' ||
        bagian === 'Executive Summary' ||
        bagian === 'Daftar Isi'){
      if(dataFormat[bagian] === true){
        nilaiFormat += 2.33;
      };
    } else {
      if(dataFormat[bagian] === true){
        nilaiFormat += 13;
      };
    };
  };
  keterangan = keterangan.replace(/.$/,'').replace(/.$/,'.');
  if(keterangan !== 'Bagian yang tidak lengkap.'){
    console.log(keterangan);
  } else {
    keterangan = 'Sudah mengikuti aturan penulisan.';
  };

  nilaiFormat = Math.round(nilaiFormat);
  console.log(`nilai kesesuaian format: ${nilaiFormat}`);
  const hasil = {
    nilai: nilaiFormat * 0.2,
    keterangan: keterangan,
  };
  return hasil;
};

// ANALSIS PDF UNTUK NOMOR 2-4
async function analisisPDF(file: DriveFile): Promise<any> {
  if(!(await geminiHandler.isFileInGemini(file, 'application/pdf'))){
    if(!fileHandler.isFileDownloaded(file.name)){
      await fileHandler.downloadFile(file.downloadUrl, file.name);
      file.localPath = fileHandler.downloadDirPath + file.name;
    };
    await geminiHandler.uploadFileToGemini(file, file.localPath, 'application/pdf');
  };
  await geminiHandler.checkActiveFileInGemini(file);
  if(file.localPath){
    fs.unlinkSync((file.localPath));
  };

  try {
    const genAiResponse = await geminiHandler.processFileWithGemini(
      file, 
      promptMap.get('nilaiAdministratif').prompt,
      promptMap.get('nilaiAdministratif').schema,
    );
    return genAiResponse;
  } catch (error) {
    return error;
  };
};

export async function hitungNilaiAdministratif(file: DriveFile): Promise<any> {
  let nilaiFormat = null;
  let nilaiDesain = null;
  let nilaiPenulisan = null;
  let nilaiAdministratif = null;

  if(file.fields['NilaiAdministratif'] === undefined || file.fields['NilaiAdministratif'] === ''){
    const hasilAnalisis = await analisisPDF(file);
    console.log(hasilAnalisis);
    // const hasilAnalisis = {
    //     "format": {
    //         "Kata Pengantar": true,
    //         "Executive Summary": true,
    //         "Daftar Isi": true,
    //         "Identifikasi Masalah": true,
    //         "Kegiatan Expert": true,
    //         "Kegiatan Rutin": true,
    //         "Kegiatan Strategis": true,
    //         "Kesimpulan": true,
    //         "Latar Belakang": true,
    //         "Rekomendasi": true,
    //     },
    //     "desain": {
    //         "alasan": "Desain dokumen memenuhi estetika dan penyajian layout dengan baik. Terdapat tabel dan list yang jelas. Penggunaan nomor dan simbol pada subjudul juga baik dan jelas. Dokumen mudah dibaca oleh pembaca. Desain dan gambar tidak menghalangi tulisan. Setiap kegiatan tidak mengandung foto/gambar.",
    //         "nilai": 100,
    //     },
    //     "penulisan": {
    //         "alasan": "Tata bahasa penulisan sudah mengikuti cara penulisan yang baku. Tidak terdapat kata-kata tidak baku. Penggunaan tanda baca sudah tepat. Singkatan dijabarkan.  Bagian, bab dan sub-bab sudah disajikan secara runut dan koheren. Urutan bagian, bab dan sub-bab mengikuti struktur dokumen yang baik. ",
    //         "nilai": 100,
    //     },
    // };

    nilaiFormat = hitungFormat(hasilAnalisis.format);
    nilaiDesain = hasilAnalisis.desain.nilai;
    console.log(`nilai desain dan layout: ${nilaiDesain}`);
    nilaiPenulisan = hasilAnalisis.penulisan.nilai;
    console.log(`nilai teknik penulisan: ${nilaiPenulisan}`);
  
    nilaiAdministratif = nilaiFormat.nilai + (nilaiDesain * 0.3) +
      (nilaiPenulisan * 0.3);
    nilaiAdministratif = nilaiAdministratif * 0.4;
  } else {
    nilaiAdministratif = parseFloat(file.fields['NilaiAdministratif']);
  };
  const nilaiAkhir = nilaiAdministratif;
  return nilaiAkhir;
};