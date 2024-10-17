// FILTER 'PIHAK' MENGGUNAKAN AI UNTUK KEPERLUAN NOMOR 5 DAN 7.b
async function analisisPihakKegiatan(daftarKegiatanJson: any[]): Promise<any> {
  let nomor = 1;
  let daftarKegiatanPihakString = '=== DAFTAR KEGIATAN BESERTA PIHAK YANG HADIR ===\n\n';
  daftarKegiatanJson.forEach((item: any) => {
    const text = `${nomor}. ${item.kegiatan}
    \t- Pihak yang hadir: ${item.pihak}
    \n`;
    daftarKegiatanPihakString += text;
    nomor++;
  });
  daftarKegiatanPihakString += '=== ===';
  // console.log(daftarKegiatanPihakString);

  let kegiatanPihakJson: any = null;
  try {
    const genAiResponse = await geminiHandler.processTextWithGemini(
      daftarKegiatanPihakString,
      promptMap.get('kegiatanPihak').prompt,
      promptMap.get('kegiatanPihak').schema,
    );
    kegiatanPihakJson = genAiResponse;
  } catch (error) {
    return error;
  };
  // console.log(`jumlah kegiatan pihak: ${kegiatanPihakJson.length}`);
  return kegiatanPihakJson;
};

function hitungKegiatanNonDjpb(daftarKegiatanJson: any[], totalKegiatan: number){
  const kegiatanNonDjpb = daftarKegiatanJson.filter((item: any) => {
      return item.pemda === true || item.lainnya === true;
  });
  const nKegiatanNonDjpb = kegiatanNonDjpb.length;
  // const nKegiatanNonDjpb = 41;
  console.log(`jumlah kegiatan eksternal non-DJPB: ${nKegiatanNonDjpb}/${totalKegiatan} kegiatan`);

  let nilaiKegiatan = 70;
  if(nKegiatanNonDjpb > 30){
    nilaiKegiatan = 100;
  } else if(nKegiatanNonDjpb >= 21 && nKegiatanNonDjpb <= 30){
    nilaiKegiatan = 90;
  } else if(nKegiatanNonDjpb >= 11 && nKegiatanNonDjpb <= 20){
    nilaiKegiatan = 80;
  };
  console.log(`nilai kegiatan eksternal non-DJPb: ${nilaiKegiatan}`);
  return nilaiKegiatan * 0.05;
};

// NILAI VARIASI BIDANG KEGIATAN (NOMOR 6)
function hitungVariasiBidang(daftarKegiatanJson: any[]){
  const bidangKegiatanArray: any[] = [];
  for (const item of daftarKegiatanJson){
    bidangKegiatanArray.push(item.bidang);
  };
  
  const bidangKegiatanUnique = [...new Set(bidangKegiatanArray)];
  console.log('bidang kegiatan:', bidangKegiatanUnique);

  const nBidangKegiatan = bidangKegiatanUnique.length;
  console.log(`jumlah variasi bidang kegiatan: ${nBidangKegiatan}`);

  let nilaiBidangKegiatan = 50;
  if(nBidangKegiatan == 2){
    nilaiBidangKegiatan = 60;
  } else if(nBidangKegiatan == 3){
    nilaiBidangKegiatan = 70;
  } else if(nBidangKegiatan == 4){
    nilaiBidangKegiatan = 80;
  } else if(nBidangKegiatan == 5){
    nilaiBidangKegiatan = 90;
  } else if(nBidangKegiatan == 6){
    nilaiBidangKegiatan = 100;
  } else if(nBidangKegiatan > 6){
    nilaiBidangKegiatan = 105;
  };
  console.log(`nilai variasi bidang kegiatan: ${nilaiBidangKegiatan}`);
  return nilaiBidangKegiatan * 0.15;
};

// NILAI PUBLIKASI/KOMUNIKASI (NOMOR 7.a)
function hitungPublikasi(daftarKegiatanJson: any[]){
  let adaPublikasi = false;
  // console.log(`kegiatan publikasi/komunikasi:`);
  for (const item of daftarKegiatanJson){
    if(item.publikasi === true){
      // console.log(`- ${item.kegiatan}`);
      adaPublikasi = true;
      break;
    };
  };
  let nilaiPublikasi = 80;
  if(adaPublikasi) nilaiPublikasi = 100;
  console.log(`adakah publikasi/komunikasi? ${adaPublikasi}`);
  console.log(`nilai publikasi/komunikasi: ${nilaiPublikasi}`);
  return nilaiPublikasi * 0.12;
};

// NILAI KEGIATAN PEMDA (NOMOR 7.b)
function hitungKegiatanPemda(daftarKegiatanJson: any[], totalKegiatan: number){
  console.log('kegiatan dengan pemda');
  const kegiatanPemda = daftarKegiatanJson.filter((item: any) => {
    if(item.pemda === true){
      console.log('- ', item.kegiatan);
    };
    return item.pemda === true;
  });
  const nKegiatanPemda = kegiatanPemda.length;
  // console.log(`jumlah kegiatan dengan Pemda: ${nKegiatanPemda} kegiatan`);

  let nilaiJumlah = 80;
  if(nKegiatanPemda > 30){
    nilaiJumlah = 105;
  } else if(nKegiatanPemda >= 15 && nKegiatanPemda <= 30){
    nilaiJumlah = 100;
  } else if(nKegiatanPemda >= 12 && nKegiatanPemda <= 14){
    nilaiJumlah = 95;
  } else if(nKegiatanPemda >= 9 && nKegiatanPemda <= 11){
    nilaiJumlah = 90;
  };
  console.log(`jumlah kegiatan dengan Pemda: ${nKegiatanPemda}/${totalKegiatan} kegiatan`);
  console.log(`nilai jumlah kegiatan dengan Pemda: ${nilaiJumlah}`);

  const persentase = nKegiatanPemda / totalKegiatan;
  console.log(`persentase kegiatan dengan Pemda: ${persentase * 100}%`);
  let nilaiPersentase = 70;
  if(persentase >= 0.8){
    nilaiPersentase = 100;
  } else if(persentase >= 0.6 && persentase < 0.8){
    nilaiPersentase = 90;
  } else if(persentase >= 0.5 && persentase < 0.6){
    nilaiPersentase = 80;
  };
  console.log(`nilai persentase kegiatan Pemda: ${nilaiPersentase}`);

  const nilaiKegiatanPemda = (nilaiJumlah + nilaiPersentase) / 2;
  console.log(`nilai kegiatan dengan Pemda: ${nilaiKegiatanPemda}`);

  return nilaiKegiatanPemda * 0.12;
};

// NILAI KEGIATAN FORUM/TIM DI SUATU DAERAH (NOMOR 7.c)
function hitungKegiatanForum(daftarKegiatanJson: any[]){
  const kegiatanForum = daftarKegiatanJson.filter((item: any) => {
    return item.forum !== false;
  });
  // console.log(`kegiatan forum/tim di daerah:`);
  // console.log(kegiatanForum);
  const nKegiatanForum = kegiatanForum.length;
  console.log(`jumlah kegiatan forum/tim di suatu daerah: ${nKegiatanForum}`);
  
  let nilaiKegiatanForum = 70;
  if(nKegiatanForum == 1){
    nilaiKegiatanForum = 75;
  } else if(nKegiatanForum == 2){
    nilaiKegiatanForum = 80;
  } else if(nKegiatanForum == 3){
    nilaiKegiatanForum = 85;
  } else if(nKegiatanForum == 4){
    nilaiKegiatanForum = 90;
  } else if(nKegiatanForum == 5){
    nilaiKegiatanForum = 95;
  } else if(nKegiatanForum >= 6){
    nilaiKegiatanForum = 100;
  };
  console.log(`nilai kegiatan forum/tim di suatu daerah: ${nilaiKegiatanForum}`);
  return nilaiKegiatanForum * 0.12;
};

// NILAI INOVASI (NOMOR 7.d)
function hitungInovasi(daftarKegiatanJson: any[]){
  let adaInovasi = false;
  for (const item of daftarKegiatanJson){
    if(item.inovasi !== null){
      adaInovasi = true;
      break;
    };
  };
  let nilaiInovasi = 80;
  if(adaInovasi) nilaiInovasi = 100;
  console.log(`adakah publikasi/komunikasi? ${adaInovasi}`);
  console.log(`nilai inovasi/tematik: ${nilaiInovasi}`);
  return nilaiInovasi * 0.12;
};

// NILAI KEGIATAN HIGH LEVEL MEETING (NOMOR 7.e)
function hitungJumlahKegiatanHighLevel(daftarKegiatanJson: any[]){
  console.log('kegiatan high level meeting');
  const kegiatanHighLevel = daftarKegiatanJson.filter((item: any) => {
    if(item.pejabat.length !== 0){
      console.log('- ', item.kegiatan);
    };
    // return item.pejabat !== 'Lainnya';
    return item.pejabat.length !== 0;
  });
  const nKegiatanHighLevel = kegiatanHighLevel.length;
  console.log(`jumlah kegiatan high level meeting: ${nKegiatanHighLevel}`);

  let nilaiJumlah = 80;
  if(nKegiatanHighLevel > 8){
    nilaiJumlah = 110;
  } else if(nKegiatanHighLevel >= 6 && nKegiatanHighLevel <= 8){
    nilaiJumlah = 105;
  } else if(nKegiatanHighLevel >= 3 && nKegiatanHighLevel <= 5){
    nilaiJumlah = 100;
  } else if(nKegiatanHighLevel == 2){
    nilaiJumlah = 90;
  } else if(nKegiatanHighLevel == 1){
    nilaiJumlah = 85;
  };
  console.log(`nilai kegiatan high level meeting (jumlah): ${nilaiJumlah}`);
  return nilaiJumlah;
};

function hitungJenisPejabatKegiatanHighLevel(daftarKegiatanJson: any[]){
  const jenisPejabatArray: any[] = [];
  daftarKegiatanJson.forEach((item: any) => {
    if(item.pejabat.length !== 0){
      item.pejabat.forEach((pejabat: any) => {
        jenisPejabatArray.push(pejabat);
      });
    };
  });
  const jenisPejabatUnique = [...new Set(jenisPejabatArray)];
  console.log('pejabat terlibat:', jenisPejabatUnique);

  let nilaiPejabat = 80;
  if(jenisPejabatUnique.includes('Gubernur') ||
      jenisPejabatUnique.includes('Walikota') ||
      jenisPejabatUnique.includes('Bupati')){
    nilaiPejabat = 100;
  } else if(jenisPejabatUnique.includes('Wagub') ||
      jenisPejabatUnique.includes('Wawali') ||
      jenisPejabatUnique.includes('Wabup')){
    nilaiPejabat = 90;
  };
  console.log(`nilai kegiatan high level meeting (pejabat): ${nilaiPejabat}`);
  return nilaiPejabat;
};

function hitungKegiatanHighLevel(daftarKegiatanJson: any[]){
  const nilaiJumlah = hitungJumlahKegiatanHighLevel(daftarKegiatanJson);
  const nilaiPejabat = hitungJenisPejabatKegiatanHighLevel(daftarKegiatanJson);
  const nilaiKegiatanHighLevel = (nilaiJumlah + nilaiPejabat) / 2;
  console.log(`nilai kegiatan high level meeting (total): ${nilaiKegiatanHighLevel}`);
  return nilaiKegiatanHighLevel * 0.12;
};

// NILAI REKOMENDASI
async function hitungRekomendasi(source: string): Promise<any>{
  let nilaiRekomendasi:any = null;
  let validText = source.replace(/(.{2000})/g, "$1\n");
  validText = validText.replace(/\"/g, "'");
  validText = validText.replace(/\”/g, "'");
  validText = validText.replace(/\“/g, "'");
  validText = validText.replace(/\‘/g, "'");
  validText = validText.replace(/\’/g, "'");

  try {
    const genAiResponse = await geminiHandler.processTextWithGemini(
      validText,
      promptMap.get('rekomendasi').prompt,
      promptMap.get('rekomendasi').schema,
    );
    nilaiRekomendasi = genAiResponse;
  } catch (error) {
    throw error;
  };
  console.log(`nilai rekomendasi: ${nilaiRekomendasi.nilai}`);
  return nilaiRekomendasi.nilai * 0.2;
};

export async function hitungNilaiSubstantif(file: DriveFile): Promise<any> {
  let nilaiSubstantif = null;
  if(file.fields['NilaiSubstantif'] === undefined || file.fields['NilaiSubstantif'] === ''){
    const daftarKegiatanPihakJson = JSON.parse(file.fields['JSONKegiatanPihak']);
    // console.log(daftarKegiatanPihakJson);
    const nKegiatanPihak = daftarKegiatanPihakJson.length;
    console.log(`jumlah total kegiatan: ${nKegiatanPihak}`);
  
    const pihakKegiatan = await analisisPihakKegiatan(daftarKegiatanPihakJson);
    console.log(pihakKegiatan);
    // const jumlahDJPb = pihakKegiatan.filter((item: any) => item.djpb === true);
    // console.log(`jumlah kegiatan DJPb: ${jumlahDJPb.length}`);
    const nilaiKegiatanNonDjpb = hitungKegiatanNonDjpb(pihakKegiatan, nKegiatanPihak);
    const nilaiKegiatanPemda = hitungKegiatanPemda(pihakKegiatan, nKegiatanPihak);
    const nilaiKegiatanHighLevel = hitungKegiatanHighLevel(pihakKegiatan);
  
    const daftarKegiatanNonPihakJson = JSON.parse(file.fields['JSONKegiatanNonPihak']);
    const nilaiVariasiBidang = hitungVariasiBidang(daftarKegiatanNonPihakJson);
    const nilaiPublikasi = hitungPublikasi(daftarKegiatanNonPihakJson);
    const nilaiKegiatanForum = hitungKegiatanForum(daftarKegiatanNonPihakJson);
    const nilaiInovasi = hitungInovasi(daftarKegiatanNonPihakJson);
    const nilaiRekomendasi= await hitungRekomendasi(file.fields['TextFormat']);
  
    nilaiSubstantif = nilaiKegiatanNonDjpb + nilaiVariasiBidang + nilaiPublikasi 
      + nilaiKegiatanPemda+ nilaiKegiatanForum + nilaiInovasi
      + nilaiKegiatanHighLevel + nilaiRekomendasi;
    nilaiSubstantif = nilaiSubstantif * 0.6;
  } else {
    nilaiSubstantif = parseFloat(file.fields['NilaiSubstantif']);
  };
  const nilaiAkhir = nilaiSubstantif;
  return nilaiAkhir;
};