import * as fs from "node:fs";
import { downloadDirPath, downloadFile, isFileDownloaded } from "../services/file-handler";
import { checkActiveFileInGemini, isFileInGemini, processFileWithGemini, uploadFileToGemini } from "../services/gemini-ai";
import { nilaiAdministratifPrompt, nilaiAdministratifSchema, promptMap } from "../services/prompt";
import { DriveFile } from "../services/sites";

// NOMOR 1
export function hitungKetepatanWaktu(input: string){
  let nilai = 0;
  if(input !== undefined){
    nilai = 60;
    if(input === '1-5 Hari'){
      nilai = 100;
    } else if(input === '6-10 Hari'){
      nilai = 90;
    } else if(input === '11-15 Hari'){
      nilai = 80;
    } else if(input === '16-20 Hari'){
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
  if(!(await isFileInGemini(file))){
    if(!isFileDownloaded(file)){
      await downloadFile(file.downloadUrl, file.name);
      file.localPath = downloadDirPath + file.name;
    };
    await uploadFileToGemini(file);
  };
  await checkActiveFileInGemini(file);
  if(file.localPath){
    fs.unlinkSync((file.localPath));
  };

  promptMap.set('nilaiAdministratif', nilaiAdministratifPrompt);
  try {
    const genAiResponse = await processFileWithGemini(file, promptMap.get('nilaiAdministratif'), nilaiAdministratifSchema);
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