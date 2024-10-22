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

  let kegiatanPihakJson: any = {};
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
  // console.log(`jumlah kegiatan eksternal non-DJPB: ${nKegiatanNonDjpb}/${totalKegiatan} kegiatan`);

  let nilaiKegiatan = 70;
  if(nKegiatanNonDjpb > 30){
    nilaiKegiatan = 100;
  } else if(nKegiatanNonDjpb >= 21 && nKegiatanNonDjpb <= 30){
    nilaiKegiatan = 90;
  } else if(nKegiatanNonDjpb >= 11 && nKegiatanNonDjpb <= 20){
    nilaiKegiatan = 80;
  };
  // console.log(`nilai kegiatan eksternal non-DJPb: ${nilaiKegiatan}`);
  const hasilAnalisis = {
    daftar: kegiatanNonDjpb.map((item: any) => item.kegiatan),
    jumlah: nKegiatanNonDjpb,
    totalKegiatan: totalKegiatan,
    nilai: nilaiKegiatan,
    nilaiAkhir: nilaiKegiatan * 0.05,
  };

  return hasilAnalisis;
};

// NILAI VARIASI BIDANG KEGIATAN (NOMOR 6)
function hitungVariasiBidang(daftarKegiatanJson: any[]){
  const bidangKegiatanArray: any[] = [];
  for (const item of daftarKegiatanJson){
    bidangKegiatanArray.push(item.bidang);
  };
  
  const bidangKegiatanUnique = [...new Set(bidangKegiatanArray)];
  // console.log('bidang kegiatan:', bidangKegiatanUnique);

  const nBidangKegiatan = bidangKegiatanUnique.length;
  // console.log(`jumlah variasi bidang kegiatan: ${nBidangKegiatan}`);

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
  // console.log(`nilai variasi bidang kegiatan: ${nilaiBidangKegiatan}`);
  const hasilAnalisis = {
    variasi: bidangKegiatanUnique,
    jumlah: nBidangKegiatan,
    nilai: nilaiBidangKegiatan,
    nilaiAkhir: nilaiBidangKegiatan * 0.15,
  };

  return hasilAnalisis;
};

// NILAI PUBLIKASI/KOMUNIKASI (NOMOR 7.a)
function hitungPublikasi(daftarKegiatanJson: any[]){
  // console.log(`kegiatan publikasi/komunikasi:`);
  const kegiatanPublikasi = daftarKegiatanJson.filter((item: any) => item.publikasi === true);

  let nilaiPublikasi = 80;
  if(kegiatanPublikasi.length !== 0) nilaiPublikasi = 100;
  // console.log(`nilai publikasi/komunikasi: ${nilaiPublikasi}`);
  const hasilAnalisis = {
    kegiatan: kegiatanPublikasi.map((item: any) => item.kegiatan),
    jumlah: kegiatanPublikasi.length,
    nilai: nilaiPublikasi,
    nilaiAkhir: nilaiPublikasi * 0.12,
  };

  return hasilAnalisis;
};

// NILAI KEGIATAN PEMDA (NOMOR 7.b)
function hitungKegiatanPemda(daftarKegiatanJson: any[], totalKegiatan: number){
  // console.log('kegiatan dengan pemda');
  const kegiatanPemda = daftarKegiatanJson.filter((item: any) => item.pemda === true);
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
  // console.log(`jumlah kegiatan dengan Pemda: ${nKegiatanPemda}/${totalKegiatan} kegiatan`);
  // console.log(`nilai jumlah kegiatan dengan Pemda: ${nilaiJumlah}`);

  const persentase = nKegiatanPemda / totalKegiatan;
  // console.log(`persentase kegiatan dengan Pemda: ${persentase * 100}%`);
  let nilaiPersentase = 70;
  if(persentase >= 0.8){
    nilaiPersentase = 100;
  } else if(persentase >= 0.6 && persentase < 0.8){
    nilaiPersentase = 90;
  } else if(persentase >= 0.5 && persentase < 0.6){
    nilaiPersentase = 80;
  };
  // console.log(`nilai persentase kegiatan Pemda: ${nilaiPersentase}`);

  const nilaiKegiatanPemda = (nilaiJumlah + nilaiPersentase) / 2;
  // console.log(`nilai kegiatan dengan Pemda: ${nilaiKegiatanPemda}`);

  const hasilAnalisis = {
    daftar: kegiatanPemda.map((item: any) => item.kegiatan),
    jumlah: nKegiatanPemda,
    totalKegiatan: totalKegiatan,
    persentase: persentase,
    nilai: nilaiKegiatanPemda,
    nilaiAkhir: nilaiKegiatanPemda * 0.12,
  };

  return hasilAnalisis;
};

// NILAI KEGIATAN FORUM/TIM DI SUATU DAERAH (NOMOR 7.c)
function hitungKegiatanForum(daftarKegiatanJson: any[]){
  const kegiatanForum = daftarKegiatanJson.filter((item: any) => {
    return item.forum === true;
  });
  // console.log(`kegiatan forum/tim di daerah:`);
  // console.log(kegiatanForum);
  const nKegiatanForum = kegiatanForum.length;
  // console.log(`jumlah kegiatan forum/tim di suatu daerah: ${nKegiatanForum}`);
  
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
  // console.log(`nilai kegiatan forum/tim di suatu daerah: ${nilaiKegiatanForum}`);
  const hasilAnalisis = {
    kegiatan: kegiatanForum.map((item: any) => item.kegiatan),
    jumlah: nKegiatanForum,
    nilai: nilaiKegiatanForum,
    nilaiAkhir: nilaiKegiatanForum * 0.12,
  };

  return hasilAnalisis;
};

// NILAI INOVASI (NOMOR 7.d)
function hitungInovasi(daftarKegiatanJson: any[]){
  // console.log(daftarKegiatanJson);
  const kegiatanInovasi = daftarKegiatanJson.filter((item: any) => {
    return item.inovasi !== null;
  });
  let nilaiInovasi = 80;
  if(kegiatanInovasi.length !== 0) nilaiInovasi = 100;
  // console.log(`nilai inovasi/tematik: ${nilaiInovasi}`);
  
  const hasilAnalisis = {
    kegiatan: kegiatanInovasi.map((item: any) => {
      return { kegiatan: item.kegiatan, inovasi: item.inovasi };
    }),
    jumlah: kegiatanInovasi.length,
    nilai: nilaiInovasi,
    nilaiAkhir: nilaiInovasi * 0.12,
  };

  return hasilAnalisis;
};

// NILAI KEGIATAN HIGH LEVEL MEETING (NOMOR 7.e)
function hitungJumlahKegiatanHighLevel(daftarKegiatanJson: any[]){
  const kegiatanHighLevel = daftarKegiatanJson.filter((item: any) => item.pejabat.length !== 0);
  const nKegiatanHighLevel = kegiatanHighLevel.length;
  // console.log(`jumlah kegiatan high level meeting: ${nKegiatanHighLevel}`);

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
  // console.log(`nilai kegiatan high level meeting (jumlah): ${nilaiJumlah}`);
  const hasilAnalisis = {
    daftar: kegiatanHighLevel.map((item: any) => {
      return {
        kegiatan: item.kegiatan,
        pejabat: item.pejabat,
      };
    }),
    jumlah: nKegiatanHighLevel,
    nilaiAkhir: nilaiJumlah,
  };

  return hasilAnalisis;
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
  // console.log('pejabat terlibat:', jenisPejabatUnique);

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
  // console.log(`nilai kegiatan high level meeting (pejabat): ${jenisPejabatUnique}`);
  const hasilAnalisis = {
    pejabat: jenisPejabatUnique,
    nilaiAkhir: nilaiPejabat,
  };

  return hasilAnalisis;
};

function hitungKegiatanHighLevel(daftarKegiatanJson: any[]){
  // console.log('kegiatan high level meeting');
  const nilaiJumlah = hitungJumlahKegiatanHighLevel(daftarKegiatanJson);
  const nilaiPejabat = hitungJenisPejabatKegiatanHighLevel(daftarKegiatanJson);
  const nilaiKegiatanHighLevel = (nilaiJumlah.nilaiAkhir + nilaiPejabat.nilaiAkhir) / 2;
  // console.log(`nilai kegiatan high level meeting (total): ${nilaiKegiatanHighLevel}`);
  const hasilAnalisis = {
    jumlah: nilaiJumlah,
    pejabat: nilaiPejabat,
    nilai: nilaiKegiatanHighLevel,
    nilaiAkhir: nilaiKegiatanHighLevel * 0.12,
  };

  return hasilAnalisis;
};

// NILAI REKOMENDASI
async function hitungRekomendasi(source: string): Promise<any>{
  let hasilAnalisis: any = {};
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
    hasilAnalisis = genAiResponse;
  } catch (error) {
    throw error;
  };
  // console.log(`nilai rekomendasi: ${hasilAnalisis.nilai}`);
  hasilAnalisis.nilaiAkhir = hasilAnalisis.nilai * 0.2;
  
  return hasilAnalisis;
};

export async function hitungNilaiSubstantif(file: DriveFile): Promise<any> {
  let nilaiSubstantif = null;
  let hasilAnalisis: any = {};
  if(file.fields['NilaiSubstantif'] === undefined || file.fields['NilaiSubstantif'] === ''){
    const daftarKegiatanPihakJson = JSON.parse(file.fields['JSONKegiatanPihak']);
    // console.log(daftarKegiatanPihakJson);
    const nKegiatanPihak = daftarKegiatanPihakJson.length;
    console.log(`jumlah total kegiatan: ${nKegiatanPihak}`);
  
    const pihakKegiatan = await analisisPihakKegiatan(daftarKegiatanPihakJson);
    // const pihakKegiatan = [ { djpb: true,
    //   kegiatan: 'Penyusunan Pagu Indikatif Polda Lampung TA 2025',
    //   lainnya: true,
    //   pejabat: [],
    //   pemda: true },
    // { djpb: true,
    //   kegiatan: 'Focus Group Discussion BLUD Lampung Tengah',
    //   lainnya: true,
    //   pejabat: [],
    //   pemda: true },
    // { djpb: true,
    //   kegiatan: 'Monitoring Dan Evaluasi Dana Transfer Ke Daerah',
    //   lainnya: false,
    //   pejabat: [],
    //   pemda: true },
    // { djpb: true,
    //   kegiatan: 'Konfirmasi Data Kajian Fiskal Regional (KFR)',
    //   lainnya: true,
    //   pejabat: [],
    //   pemda: false },
    // { djpb: true,
    //   kegiatan: 'FGD Dampak Program KPR Sejahtera FLPP',
    //   lainnya: true,
    //   pejabat: [],
    //   pemda: true },
    // { djpb: true,
    //   kegiatan: 'Pembinaan Sistem Akuntansi Pemerintah Daerah Kabupaten Lampung Tengah',
    //   lainnya: false,
    //   pejabat: [],
    //   pemda: true },
    // { djpb: true,
    //   kegiatan:
    //    'Pembinaan Sistem Akuntansi Pemerintah Daerah dan Monitoring Dana Desa pada Kabupaten Tulang Bawang Barat',
    //   lainnya: false,
    //   pejabat: [],
    //   pemda: true },
    // { djpb: true,
    //   kegiatan:
    //    'Pembinaan Sistem Akuntansi Pemerintah Daerah dan Monitoring Dana Desa pada Kabupaten Tulang Bawang',
    //   lainnya: false,
    //   pejabat: [],
    //   pemda: true },
    // { djpb: true,
    //   kegiatan: 'Evaluasi Pelaksanaan Anggaran (EPA) Triwulan II 2024',
    //   lainnya: false,
    //   pejabat: [],
    //   pemda: true },
    // { djpb: true,
    //   kegiatan: 'Rapat Koordinasi Pengendalian Inflasi Minggu ke-5 Mei 2024',
    //   lainnya: true,
    //   pejabat: [ 'Gubernur' ],
    //   pemda: true },
    // { djpb: true,
    //   kegiatan:
    //    'Sosialisasi IKPA & Evaluasi Pelaksanaan Program dan Kegiatan lingkup Bawaslu Lampung',
    //   lainnya: false,
    //   pejabat: [],
    //   pemda: false },
    // { djpb: true,
    //   kegiatan: 'Monev IKPA TW II Satker Polda Lampung',
    //   lainnya: false,
    //   pejabat: [],
    //   pemda: false },
    // { djpb: true,
    //   kegiatan: 'Sosialisasi Implementasi Kartu Kredit Pemerintah Tahun 2024',
    //   lainnya: true,
    //   pejabat: [],
    //   pemda: false },
    // { djpb: false,
    //   kegiatan: 'Focus Group Discussion Maturity Rating BLU',
    //   lainnya: true,
    //   pejabat: [],
    //   pemda: false },
    // { djpb: true,
    //   kegiatan:
    //    'Pembinaan/Pendampingan Penyelesaian Permasalahan Laporan Keuangan Tingkat UAPPA-W Triwulan II Tahun 2024 - Kejaksaan Tinggi Lampung',
    //   lainnya: false,
    //   pejabat: [],
    //   pemda: false },
    // { djpb: true,
    //   kegiatan:
    //    'Pembinaan/Pendampingan Penyelesaian Permasalahan Laporan Keuangan Tingkat UAPPA-W Triwulan II Tahun 2024 - Pengadilan Tinggi Agama Bandar Lampung',
    //   lainnya: false,
    //   pejabat: [],
    //   pemda: false },
    // { djpb: true,
    //   kegiatan:
    //    'Pembinaan Sistem Akuntansi Pemerintah Daerah dan Monev MoU pada Pemerintah Provinsi Lampung',
    //   lainnya: false,
    //   pejabat: [],
    //   pemda: true },
    // { djpb: true,
    //   kegiatan: 'Monitoring Pengelolaan Dana Desa Pada Desa Batuliman Indah',
    //   lainnya: false,
    //   pejabat: [],
    //   pemda: true },
    // { djpb: true,
    //   kegiatan: 'Diseminasi Kajian Fiskal Regional (KFR) Triwulan I 2024',
    //   lainnya: true,
    //   pejabat: [],
    //   pemda: true },
    // { djpb: true,
    //   kegiatan: 'Monitoring dan Evaluasi Kredit Usaha Rakyat (KUR) Semester I Tahun 2024',
    //   lainnya: true,
    //   pejabat: [],
    //   pemda: true },
    // { djpb: true,
    //   kegiatan: 'Kegiatan Sosialisasi Pemberdayaan UMKM KPPN Tipe A2 Liwa',
    //   lainnya: false,
    //   pejabat: [],
    //   pemda: false },
    // { djpb: true,
    //   kegiatan:
    //    'Focus Group Discussion (FGD) Asistensi Ekspor ke Australia kepada UMKM di Provinsi Lampung',
    //   lainnya: true,
    //   pejabat: [],
    //   pemda: false },
    // { djpb: true,
    //   kegiatan: 'Sharing Session Analisis Peluang Investasi Daerah (APID)',
    //   lainnya: false,
    //   pejabat: [],
    //   pemda: true },
    // { djpb: true,
    //   kegiatan: 'Identifikasi Peluang Investasi Di Kabupaten Lampung Barat',
    //   lainnya: false,
    //   pejabat: [],
    //   pemda: true },
    // { djpb: true,
    //   kegiatan: 'Capacity Building Forum Investasi Lampung (FOILA)',
    //   lainnya: true,
    //   pejabat: [],
    //   pemda: true },
    // { djpb: true,
    //   kegiatan:
    //    'Focus Group Discussion Pengelolaan keuangan Daerah dalam rangka pelaksanaan Community of Practice Financial Advisor – Alumni PKN STAN',
    //   lainnya: true,
    //   pejabat: [],
    //   pemda: true },
    // { djpb: false,
    //   kegiatan:
    //    'Pemantauan Pengelolaan Properti Investasi pada Dinas Perikanan dan Kelautan Provinsi Lampung',
    //   lainnya: false,
    //   pejabat: [],
    //   pemda: true },
    // { djpb: true,
    //   kegiatan:
    //    'Keikutsertaan Kanwil DJPb Provinsi Lampung Dalam Workshop Penyusunan Materi Promosi Investasi',
    //   lainnya: true,
    //   pejabat: [],
    //   pemda: true },
    // { djpb: true,
    //   kegiatan: 'Rapat ALCo Regional Tingkat Deputies Realisasi s.d. 31 Maret 2024',
    //   lainnya: true,
    //   pejabat: [],
    //   pemda: false },
    // { djpb: true,
    //   kegiatan: 'Rapat ALCo Regional Tingkat Deputies untuk realisasi s.d. 30 April 2024',
    //   lainnya: true,
    //   pejabat: [],
    //   pemda: true },
    // { djpb: true,
    //   kegiatan: 'Rapat ALCo Regional Tingkat Deputies untuk realisasi s.d. 31 Mei 2024',
    //   lainnya: true,
    //   pejabat: [],
    //   pemda: true },
    // { djpb: true,
    //   kegiatan: 'FGD Kebijakan KUR Tahun 2024 dan Aplikasi SIKP',
    //   lainnya: true,
    //   pejabat: [],
    //   pemda: true } ];
    
      // console.log(pihakKegiatan);
    // const jumlahDJPb = pihakKegiatan.filter((item: any) => item.djpb === true);
    // console.log(`jumlah kegiatan DJPb: ${jumlahDJPb.length}`);
    const nilaiKegiatanNonDjpb = hitungKegiatanNonDjpb(pihakKegiatan, nKegiatanPihak);
    // console.log(nilaiKegiatanNonDjpb);
    hasilAnalisis.nondjpb = nilaiKegiatanNonDjpb;
    const nilaiKegiatanPemda = hitungKegiatanPemda(pihakKegiatan, nKegiatanPihak);
    // console.log(nilaiKegiatanPemda);
    hasilAnalisis.pemda = nilaiKegiatanPemda;
    const nilaiKegiatanHighLevel = hitungKegiatanHighLevel(pihakKegiatan);
    // console.log(nilaiKegiatanHighLevel);
    hasilAnalisis.pejabat = nilaiKegiatanHighLevel;
  
    const daftarKegiatanNonPihakJson = JSON.parse(file.fields['JSONKegiatanNonPihak']);
    const nilaiVariasiBidang = hitungVariasiBidang(daftarKegiatanNonPihakJson);
    // console.log(nilaiVariasiBidang);
    hasilAnalisis.bidang = nilaiVariasiBidang;
    const nilaiPublikasi = hitungPublikasi(daftarKegiatanNonPihakJson);
    // console.log(nilaiPublikasi);
    hasilAnalisis.publikasi = nilaiPublikasi;
    const nilaiKegiatanForum = hitungKegiatanForum(daftarKegiatanNonPihakJson);
    // console.log(nilaiKegiatanForum);
    hasilAnalisis.forum = nilaiKegiatanForum;
    const nilaiInovasi = hitungInovasi(daftarKegiatanNonPihakJson);
    // console.log(nilaiInovasi);
    hasilAnalisis.inovasi = nilaiInovasi;
    const nilaiRekomendasi= await hitungRekomendasi(file.fields['TextFormat']);
    // console.log(nilaiRekomendasi);
    hasilAnalisis.rekomendasi = nilaiRekomendasi;
  
    nilaiSubstantif = nilaiKegiatanNonDjpb.nilaiAkhir + nilaiVariasiBidang.nilaiAkhir
      + nilaiPublikasi.nilaiAkhir + nilaiKegiatanPemda.nilaiAkhir 
      + nilaiKegiatanForum.nilaiAkhir + nilaiInovasi.nilaiAkhir
      + nilaiKegiatanHighLevel.nilaiAkhir + nilaiRekomendasi.nilaiAkhir;
    hasilAnalisis.nilai = nilaiSubstantif;
    nilaiSubstantif = nilaiSubstantif * 0.6;
  } else {
    nilaiSubstantif = parseFloat(file.fields['NilaiSubstantif']);
  };
  
  hasilAnalisis.nilaiAkhir = nilaiSubstantif;
  
  return hasilAnalisis;
};