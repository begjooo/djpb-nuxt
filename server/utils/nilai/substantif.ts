
// FILTER 'PIHAK' MENGGUNAKAN AI UNTUK KEPERLUAN NOMOR 5 DAN 7.b
async function analisisPihakKegiatan(daftarKegiatanJson: any[]): Promise<any> {
  let nomor = 1;
  let daftarKegiatanPihakString = '=== DAFTAR KEGIATAN BESERTA PIHAK YANG TERLIBAT ===\n\n';
  daftarKegiatanJson.forEach((item: any) => {
    const text = `${nomor}. ${item.kegiatan}
    \t- Pihak yang terlibat: ${item.pihak}
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

    // const genAiResponse = [
    //     {
    //         "alasan": "Kanwil DJPb Provinsi Sumut, Kanwil DJP Sumut I, Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb, Kepala Daerah dan OPD Sumut, Perwakilan Bank Indonesia Sumut, Badan Pengawasan Keuangan dan Pembangunan Provinsi Sumut, media cetak/online merupakan bagian dari Lainnya.",
    //         "djpb": true,
    //         "kegiatan": "Konferensi Pers Badan Pusat Statistik (BPS) Provinsi Sumut",
    //         "lainnya": true,
    //         "pemda": true,
    //         "pihak": "Para Kepala Daerah dan OPD Sumut, Perwakilan Bank Indonesia Sumut, Badan Pengawasan Keuangan dan Pembangunan Provinsi Sumut, Kanwil DJPb Provinsi Sumut, Kanwil DJP Sumut I, Kanwil DJPb Provinsi Sumut dan media cetak/online."
    //     },
    //     {
    //         "alasan": "Pemerintah Kota Binjai yang terdiri dari Sekretaris Daerah, Inspektur, para Kepala SKPD dan pejabat pengelola keuangan merupakan bagian dari Pemda, Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Pembinaan Akuntansi dan Pelaporan Keuangan Pemerintah Daerah Bertajuk “Pendampingan Penyelesaian Tindak Lanjut Temuan atas LKPD dan Penyampaian Hasil Analisis Laporan Keuangan Pemerintah Daerah bagi Pemerintah Kota Binjai",
    //         "lainnya": false,
    //         "pemda": true,
    //         "pihak": "Pemerintah Kota Binjai yang terdiri dari Sekretaris Daerah, Inspektur, para Kepala SKPD dan pejabat pengelola keuangan serta Kanwil DJPb Provinsi Sumut."
    //     },
    //     {
    //         "alasan": "Para Pejabat Administrator, pengawas dan pelaksana dari Kemenkeu Satu Perwakilan Sumut merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Rapat ALCo Regional - Rapat Tingkat Deputies ALCo Regional Sumut Periode Realisasi sampai dengan 31 Maret 2024",
    //         "lainnya": false,
    //         "pemda": false,
    //         "pihak": "Para Pejabat Administrator, pengawas dan pelaksana dari Kemenkeu Satu Perwakilan Sumut."
    //     },
    //     {
    //         "alasan": "Para pejabat administrator, pengawas beserta jajarannya dari Kemenkeu Satu Perwakilan Sumut merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Rapat ALCo Regional - Rapat Tingkat Deputies ALCo Regional Sumut Periode Realisasi sampai dengan 30 April 2024",
    //         "lainnya": false,
    //         "pemda": false,
    //         "pihak": "Para pejabat administrator, pengawas beserta jajarannya dari Kemenkeu Satu Perwakilan Sumut."
    //     },
    //     {
    //         "alasan": "Para pejabat administrator, pengawas beserta jajarannya dari Kemenkeu Satu Perwakilan Sumut merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Rapat ALCo Regional - Rapat Tingkat Deputies ALCo Regional Sumut Periode Realisasi sampai dengan 31 Mei 2024",
    //         "lainnya": false,
    //         "pemda": false,
    //         "pihak": "Para pejabat administrator, pengawas beserta jajarannya dari Kemenkeu Satu Perwakilan Sumut."
    //     },
    //     {
    //         "alasan": "Para Kepala Kanwil Kemenkeu Satu Perwakilan Sumut beserta jajarannya merupakan bagian dari DJPb, Perwakilan dari Bank Indonesia (BI) dan Otoritas Jasa Keuangan (OJK) wilayah Sumut, para pejabat/pegawai lingkup Kemenkeu Satu Perwakilan Sumut merupakan bagian dari Lainnya.",
    //         "djpb": true,
    //         "kegiatan": "Konferensi Pers APBN Kita - Konferensi Pers APBN Kita Periode Realisasi sampai dengan 31 Maret 2024",
    //         "lainnya": true,
    //         "pemda": false,
    //         "pihak": "Para Kepala Kanwil Kemenkeu Satu Perwakilan Sumut beserta jajarannya, Perwakilan dari Bank Indonesia (BI) dan Otoritas Jasa Keuangan (OJK) wilayah Sumut, para pejabat/pegawai lingkup Kemenkeu Satu Perwakilan Sumut dan Media Online."
    //     },
    //     {
    //         "alasan": "Para Kepala Kanwil Kemenkeu Satu Perwakilan Sumut beserta jajarannya merupakan bagian dari DJPb, Perwakilan dari Bank Indonesia (BI) dan Otoritas Jasa Keuangan (OJK) wilayah Sumut, BPS Sumut, Kepala Biro Perekonomian Provinsi Sumut, dan Kepala Biro Administrasi Pembangunan Provinsi Sumut merupakan bagian dari Lainnya.",
    //         "djpb": true,
    //         "kegiatan": "Konferensi Pers APBN Kita - Konferensi Pers APBN Kita Periode Realisasi sampai 30 April 2024.",
    //         "lainnya": true,
    //         "pemda": false,
    //         "pihak": "Para Kepala Kanwil Kemenkeu Satu Perwakilan Sumut beserta jajarannya, Perwakilan dari Bank Indonesia (BI) dan Otoritas Jasa Keuangan (OJK) wilayah Sumut, BPS Sumut, Kepala Biro Perekonomian Provinsi Sumut, dan Kepala Biro Administrasi Pembangunan Provinsi Sumut, Kantor Perwakilan Lembaga Penjamin Simpanan I Medan serta para pejabat/pegawai lingkup Kemenkeu Satu Perwakilan Sumut dan Media Online."
    //     },
    //     {
    //         "alasan": "Para Kepala Kanwil Kemenkeu Satu Perwakilan Sumut beserta jajarannya merupakan bagian dari DJPb, Perwakilan dari Bank Indonesia (BI) dan Otoritas Jasa Keuangan (OJK) wilayah Sumut, para pejabat/pegawai lingkup Kemenkeu Satu Perwakilan Sumut merupakan bagian dari Lainnya.",
    //         "djpb": true,
    //         "kegiatan": "Konferensi Pers APBN Kita - Konferensi Pers APBN Kita Periode Realisasi sampai 31 Mei 2024.",
    //         "lainnya": true,
    //         "pemda": false,
    //         "pihak": "Para Kepala Kanwil Kemenkeu Satu Perwakilan Sumut beserta jajarannya, Perwakilan dari Bank Indonesia (BI) dan Otoritas Jasa Keuangan (OJK) wilayah Sumut, para pejabat/pegawai lingkup Kemenkeu Satu Perwakilan Sumut dan Media Online."
    //     },
    //     {
    //         "alasan": "Pejabat dan pegawai pada Kanwil Kemenag Provinsi Sumut merupakan bagian dari Lainnya, Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Pembinaan Akuntansi dan Pelaporan Keuangan Kanwil Kementerian Agama (Kemenag) Provinsi Sumut sebagai UAPPA-W",
    //         "lainnya": true,
    //         "pemda": false,
    //         "pihak": "Pejabat dan pegawai pada Kanwil Kemenag Provinsi Sumut dan Kanwil DJPb Provinsi Sumut."
    //     },
    //     {
    //         "alasan": "Satuan Kerja lingkup Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "One on One Meeting Evaluasi Pelaksanaan Anggaran Wilayah Triwulan II Tahun 2024",
    //         "lainnya": false,
    //         "pemda": false,
    //         "pihak": "Satuan Kerja lingkup Kanwil DJPb Provinsi Sumut dan Kanwil DJPb Provinsi Sumut."
    //     },
    //     {
    //         "alasan": "Satuan kerja lingkup Kementerian Pertahanan Provinsi Sumut merupakan bagian dari Lainnya, Kanwil DJPb Provinsi Sumut dan KPPN Medan II merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "One on One Meeting Evaluasi Pelaksanaan Anggaran Wilayah Triwulan II Tahun 2024 - Satuan Kerja Lingkup Kementerian Pertahanan Provinsi Sumut",
    //         "lainnya": true,
    //         "pemda": false,
    //         "pihak": "Satuan kerja lingkup Kementerian Pertahanan Provinsi Sumut, Kanwil DJPb Provinsi Sumut dan KPPN Medan II."
    //     },
    //     {
    //         "alasan": "Satuan kerja lingkup Kementerian Agama Provinsi Sumut merupakan bagian dari Lainnya, Kanwil DJPb Provinsi Sumut dan KPPN Medan II merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "One on One Meeting Evaluasi Pelaksanaan Anggaran Wilayah Triwulan II Tahun 2024 - Satuan Kerja Lingkup Kementerian Agama Provinsi Sumut",
    //         "lainnya": true,
    //         "pemda": false,
    //         "pihak": "Satuan kerja lingkup Kementerian Agama Provinsi Sumut, Kanwil DJPb Provinsi Sumut dan KPPN Medan II."
    //     },
    //     {
    //         "alasan": "Pejabat dan pengelola keuangan pada UINSU merupakan bagian dari Lainnya, Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Rapat Kegiatan Penyusunan Rencana Kerja dan Anggaran pada Satuan Kerja Universitas Islam negeri Sumatera Utara (UINSU)",
    //         "lainnya": true,
    //         "pemda": false,
    //         "pihak": "Pejabat dan pengelola keuangan pada UINSU dan Kanwil DJPb Provinsi Sumut."
    //     },
    //     {
    //         "alasan": "Pemerintah Kabupaten Langkat merupakan bagian dari Pemda, Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Pembinaan Akuntansi dan Pelaporan Keuangan Pemerintah Daerah Bertajuk “Penyampaian Hasil Analisis Laporan Keuangan Pemerintah Daerah dan Pelaksanaan Pendampingan Penyelesaian Tindak Lanjut Temuan atas LKPD bagi Pemerintah Kabupaten Langkat”",
    //         "lainnya": false,
    //         "pemda": true,
    //         "pihak": "Pemerintah Kabupaten Langkat dan Kanwil DJPb Provinsi Sumut."
    //     },
    //     {
    //         "alasan": "Pejabat perbendaharaan dari 15 Satuan Kerja lingkup KPPN Tanjung Balai merupakan bagian dari DJPb, Kanwil DJPb Provinsi Sumut dan KPPN Tanjung Balai merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Sosialisasi dan FGD Peraturan/Kebijakan Pelaksanaan Anggaran serta Pemaparan WBBM - KPPN Tanjung Balai",
    //         "lainnya": false,
    //         "pemda": false,
    //         "pihak": "Pejabat perbendaharaan dari 15 Satuan Kerja lingkup KPPN Tanjung Balai, Kanwil DJPb Provinsi Sumut dan KPPN Tanjung Balai."
    //     },
    //     {
    //         "alasan": "Pejabat Perbendaharaan lingkup KPPN Tebing Tinggi merupakan bagian dari DJPb, Kanwil DJPb Provinsi Sumut dan KPPN Tebing Tinggi merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Sosialisasi dan FGD Peraturan/Kebijakan Pelaksanaan Anggaran serta Pemaparan WBBM - KPPN Tebing Tinggi",
    //         "lainnya": false,
    //         "pemda": false,
    //         "pihak": "Pejabat Perbendaharaan lingkup KPPN Tebing Tinggi, Kanwil DJPb Provinsi Sumut dan KPPN Tebing Tinggi."
    //     },
    //     {
    //         "alasan": "BPKAD dan BLUD lingkup Sumut merupakan bagian dari Pemda, Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Focus Group Discussion (FGD) Asistensi Pembinaan BLUD: Optimalisasi Pengelolaan Aset BLUD",
    //         "lainnya": false,
    //         "pemda": true,
    //         "pihak": "BPKAD dan BLUD lingkup Sumut dan Kanwil DJPb Provinsi Sumut"
    //     },
    //     {
    //         "alasan": "Pejabat dan pegawai pada BLU Politeknik Negeri Medan merupakan bagian dari Lainnya, Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Monitoring dan Evaluasi Akuntansi dan Pelaporan Keuangan BLU - BLU Politeknik Negeri Medan",
    //         "lainnya": true,
    //         "pemda": false,
    //         "pihak": "Pejabat dan pegawai pada BLU Politeknik Negeri Medan dan Kanwil DJPb Provinsi Sumut."
    //     },
    //     {
    //         "alasan": "Pejabat dan pegawai pada BLU Politeknik Penerbanagn Medan merupakan bagian dari Lainnya, Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Monitoring dan Evaluasi Akuntansi dan Pelaporan Keuangan BLU - Politeknik Penerbangan Medan",
    //         "lainnya": true,
    //         "pemda": false,
    //         "pihak": "Pejabat dan pegawai pada BLU Politeknik Penerbanagn Medan dan Kanwil DJPb Provinsi Sumut."
    //     },
    //     {
    //         "alasan": "BPODT beserta jajarannya merupakan bagian dari Pemda, Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Pembinaan BLU Triwulan II Tahun 2024 - Badan Pelaksana Otorita Danau Toba (BPODT)",
    //         "lainnya": false,
    //         "pemda": true,
    //         "pihak": "BPODT beserta jajarannya, dan Kanwil DJPb Provinsi Sumut."
    //     },
    //     {
    //         "alasan": "Rumah Sakit Bhayangkara Tebing Tinggi merupakan bagian dari Lainnya, Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Pembinaan BLU Triwulan II Tahun 2024 - Rumah Sakit Bhayangkara Tebing Tinggi",
    //         "lainnya": true,
    //         "pemda": false,
    //         "pihak": "Rumah Sakit Bhayangkara Tebing Tinggi dan Kanwil DJPb Provinsi Sumut."
    //     },
    //     {
    //         "alasan": "Poltekes Medan merupakan bagian dari Lainnya, Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Pembinaan BLU Triwulan II Tahun 2024 - Politeknik Kesehatan (Poltekes) Medan",
    //         "lainnya": true,
    //         "pemda": false,
    //         "pihak": "Poltekes Medan dan Kanwil DJPb Provinsi Sumut."
    //     },
    //     {
    //         "alasan": "Kanwil DJPb Provinsi Sumut, KPPN Medan II, BPKAD, Inspektorat dan DPMD Kabupaten Langkat merupakan bagian dari DJPb, perangkat Desa Lalang merupakan bagian dari Lainnya.",
    //         "djpb": true,
    //         "kegiatan": "FGD Monitoring Penyaluran Dana Desa pada Kabupaten Langkat",
    //         "lainnya": true,
    //         "pemda": true,
    //         "pihak": "Kanwil DJPb Provinsi Sumut, KPPN Medan II, BPKAD, Inspektorat dan DPMD Kabupaten Langkat dan perangkat Desa Lalang."
    //     },
    //     {
    //         "alasan": "BPKAD, DPMPD dan Inspektorat Kabupaten Toba, Kabupaten Samosir, Kabupaten Tapanuli Utara, Kabupaten Humbang Hasundutan merupakan bagian dari Pemda, Kanwil DJPb Provinsi Sumut, KPPN Balige dan Institut Agama Kristen Negeri Tarutung merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Diseminasi Kajian Fiskal Regional (KFR) Triwulan I Tahun 2024.",
    //         "lainnya": true,
    //         "pemda": true,
    //         "pihak": "BPKAD, DPMPD dan Inspektorat Kabupaten Toba, Kabupaten Samosir, Kabupaten Tapanuli Utara, Kabupaten Humbang Hasundutan, Kanwil DJPb Provinsi Sumut, KPPN Balige dan Institut Agama Kristen Negeri Tarutung."
    //     },
    //     {
    //         "alasan": "BPKAD, DPMPD dan Inspektorat Kabupaten Toba, Kabupaten Samosir, Kabupaten Tapanuli Utara, Kabupaten Humbang Hasundutan merupakan bagian dari Pemda, Kanwil DJPb Provinsi Sumut dan KPPN Balige merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Monitoring dan Evaluasi Transfer ke Daerah dan Dana Desa - KPPN Balige",
    //         "lainnya": false,
    //         "pemda": true,
    //         "pihak": "BPKAD, DPMPD dan Inspektorat Kabupaten Toba, Kabupaten Samosir, Kabupaten Tapanuli Utara, Kabupaten Humbang Hasundutan, Kanwil DJPb Provinsi Sumut dan KPPN Balige."
    //     },
    //     {
    //         "alasan": "BPKAD, Bappeda, Dinas Koperasi Kota Tanjung Balai, Kabupaten Asahan dan Kabupaten Batubara merupakan bagian dari Pemda, Kanwil DJPb Provinsi Sumut dan KPPN Tanjung Balai merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Monitoring dan Evaluasi Transfer ke Daerah dan Dana Desa - KPPN Tanjung Balai",
    //         "lainnya": false,
    //         "pemda": true,
    //         "pihak": "BPKAD, Bappeda, Dinas Koperasi Kota Tanjung Balai, Kabupaten Asahan dan Kabupaten Batubara, Kanwil DJPb Provinsi Sumut dan KPPN Tanjung Balai."
    //     },
    //     {
    //         "alasan": "Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb, BPKAD Kota Binjai merupakan bagian dari Pemda.",
    //         "djpb": true,
    //         "kegiatan": "Sharing Session Pengelolaan Keuangan BLUD",
    //         "lainnya": false,
    //         "pemda": true,
    //         "pihak": "Kanwil DJPb Provinsi Sumut dengan BPKAD Kota Binjai"
    //     },
    //     {
    //         "alasan": "Pemerintah Provinsi Sumut merupakan bagian dari Pemda, Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb, Kantor Perwakilan Bank Indonesia Sumut, Bagian Perekonomian Setda Kota Medan dan Setdakab Deli Serdang merupakan bagian dari Lainnya.",
    //         "djpb": true,
    //         "kegiatan": "Rapat Koordinasi Pengendalian Inflasi Daerah",
    //         "lainnya": true,
    //         "pemda": true,
    //         "pihak": "Pemerintah Provinsi Sumut, Kanwil DJPb Provinsi Sumut, Kantor Perwakilan Bank Indonesia Sumut, Bagian Perekonomian Setda Kota Medan dan Setdakab Deli Serdang, KKPU Kanwil I Medan, Perum Bulog Sumut, dan PD. Pasar Kota Medan."
    //     },
    //     {
    //         "alasan": "Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb, pengelola keuangan RSUD Dr. R.M Djoelham Binjai merupakan bagian dari Pemda.",
    //         "djpb": true,
    //         "kegiatan": "Asistensi Pembinaan Pengelolaan Keuangan BLUD - RSUD Dr. R.M Djoelham Binjai",
    //         "lainnya": false,
    //         "pemda": true,
    //         "pihak": "Kanwil DJPb Provinsi Sumut dengan pengelola keuangan RSUD Dr. R.M Djoelham Binjai."
    //     },
    //     {
    //         "alasan": "Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb, pengelola keuangan RSU Haji Medan merupakan bagian dari Pemda.",
    //         "djpb": true,
    //         "kegiatan": "Asistensi Pembinaan Pengelolaan Keuangan BLUD - RSU Haji Medan",
    //         "lainnya": false,
    //         "pemda": true,
    //         "pihak": "Kanwil DJPb Provinsi Sumut dengan pengelola keuangan RSU Haji Medan."
    //     },
    //     {
    //         "alasan": "Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb, pengelola keuangan RSUD Sultan Sulaiman Serdang Bedagai merupakan bagian dari Pemda.",
    //         "djpb": true,
    //         "kegiatan": "Asistensi Pembinaan Pengelolaan Keuangan BLUD - RSUD Sultan Sulaiman Serdang Bedagai",
    //         "lainnya": false,
    //         "pemda": true,
    //         "pihak": "Kanwil DJPb Provinsi Sumut dengan pengelola keuangan RSUD Sultan Sulaiman Serdang Bedagai."
    //     },
    //     {
    //         "alasan": "Pemerintah Kabupaten Langkat merupakan bagian dari Pemda, Kanwil DJPb Provinsi Sumut dan KPPN Medan II merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Bimbingan Teknis Pembinaan Penatausahaan Keuangan Pemerintah Kabupaten/Kota",
    //         "lainnya": false,
    //         "pemda": true,
    //         "pihak": "Pemerintah Kabupaten Langkat, Kanwil DJPb Provinsi Sumut dan KPPN Medan II."
    //     },
    //     {
    //         "alasan": "Satuan Kerja lingkup Kepolisian Daerah Sumut merupakan bagian dari Lainnya, Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Rapat Kerja Teknis Fungsi Keuangan Tingkat Polda Sumut Tahun 2024",
    //         "lainnya": true,
    //         "pemda": false,
    //         "pihak": "Satuan Kerja lingkup Kepolisian Daerah Sumut dan Kanwil DJPb Provinsi Sumut."
    //     },
    //     {
    //         "alasan": "BPKAD, Bappeda, Dinas Koperasi, Bappeda Kota Tanjung Balai, Kabupaten Asahan dan Kabupaten Batubara merupakan bagian dari Pemda, Kanwil DJPb Provinsi Sumut dan KPPN Tanjung Balai merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "FGD Analisis Peluang Investasi Daerah dan Pemberdayaan UMKM",
    //         "lainnya": false,
    //         "pemda": true,
    //         "pihak": "BPKAD, Bappeda, Dinas Koperasi, Bappeda Kota Tanjung Balai, Kabupaten Asahan dan Kabupaten Batubara, Kanwil DJPb Provinsi Sumut dan KPPN Tanjung Balai."
    //     },
    //     {
    //         "alasan": "BPS, BULOG, Bappenas, Kementerian Pertanian, Kementerian Perdagangan dan seluruh Gubernur, Bupati, dan Walikota merupakan bagian dari Lainnya, Kementerian /Lembaga lingkup Sumut dan media merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Rapat Pengendalian Inflasi Tahun 2024",
    //         "lainnya": true,
    //         "pemda": false,
    //         "pihak": "BPS, BULOG, Bappenas, Kementerian Pertanian, Kementerian Perdagangan dan seluruh Gubernur, Bupati, dan Walikota serta Kementerian /Lembaga lingkup Sumut dan media."
    //     },
    //     {
    //         "alasan": "BPKAD lingkup Sumut merupakan bagian dari Pemda, Kanwil DJPb Provinsi Sumut dan KPKNL Medan merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "FGD Pengelolaan Aset Tetap bagi Pemerintah Daerah lingkup Provinsi Sumut",
    //         "lainnya": false,
    //         "pemda": true,
    //         "pihak": "BPKAD lingkup Sumut, Kanwil DJPb Provinsi Sumut dan KPKNL Medan."
    //     },
    //     {
    //         "alasan": "Perwakilan UAPPA-W merupakan bagian dari DJPb, Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Bimbingan Teknis Penyusunan Laporan Keuangan Unit Akuntansi dan Pelaporan Keuangan Pembantu Pengguna Anggaran Wilayah (UAPPA-W) Semester I Tahun 2024",
    //         "lainnya": false,
    //         "pemda": false,
    //         "pihak": "Perwakilan UAPPA-W dan Kanwil DJPb Provinsi Sumut."
    //     },
    //     {
    //         "alasan": "Pejabat dan pegawai Dinas Pertanian Provinsi Sumut merupakan bagian dari Pemda, Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Koordinasi dalam Penyusunan Tematik ALCo Regional - Dinas Pertanian Provinsi Sumut",
    //         "lainnya": false,
    //         "pemda": true,
    //         "pihak": "Pejabat dan pegawai Dinas Pertanian Provinsi Sumut dan Kanwil DJPb Provinsi Sumut."
    //     },
    //     {
    //         "alasan": "Koordinator Meteorologi dan Tim Kerja Meteorology Climatology Early Warning Systems (MCEWS) merupakan bagian dari Lainnya, Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Koordinasi dalam Penyusunan Tematik ALCo Regional - Balai Besar Meteorologi Klimatologi dan Geofisika Wilayah I",
    //         "lainnya": true,
    //         "pemda": false,
    //         "pihak": "Koordinator Meteorologi dan Tim Kerja Meteorology Climatology Early Warning Systems (MCEWS) dan Kanwil DJPb Provinsi Sumut."
    //     },
    //     {
    //         "alasan": "Pejabat dan Pegawai Dinas Pariwisata Provinsi Sumut merupakan bagian dari Pemda, Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Koordinasi dalam Penyusunan Tematik ALCo Regional - Dinas Pariwisata Provinsi Sumut",
    //         "lainnya": false,
    //         "pemda": true,
    //         "pihak": "Pejabat dan Pegawai Dinas Pariwisata Provinsi Sumut dan Kanwil DJPb Provinsi Sumut."
    //     },
    //     {
    //         "alasan": "Wakil Ketua dan anggota Komite IV DPD RI, Kepala Subbagian Tata Usaha Komite IV DPD RI, analis materi merupakan bagian dari Lainnya, pejabat administrator, pengawas dan pegawai Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Kunjungan Kerja Pimpinan Komite IV Dewan Perwakilan Daerah (DPD) RI",
    //         "lainnya": true,
    //         "pemda": false,
    //         "pihak": "Wakil Ketua dan anggota Komite IV DPD RI, Kepala Subbagian Tata Usaha Komite IV DPD RI, analis materi serta pejabat administrator, pengawas dan pegawai Kanwil DJPb Provinsi Sumut."
    //     },
    //     {
    //         "alasan": "BPKAD, Inspektorat, Dinas Kesehatan Kabupaten Serdang Bedagai, Direktur RSUD Sultan Sulaiaman Serdang Bedagai merupakan bagian dari Pemda, Kanwil DJPb Provinsi Sumut dan KPPN Tebing Tinggi merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Sharing Session Analisis laporan Keuangan BLUD RSUD Sultan Sulaiman periode Tahun 2022 dan 2023",
    //         "lainnya": false,
    //         "pemda": true,
    //         "pihak": "BPKAD, Inspektorat, Dinas Kesehatan Kabupaten Serdang Bedagai, Direktur RSUD Sultan Sulaiaman Serdang Bedagai, Kanwil DJPb Provinsi Sumut dan KPPN Tebing Tinggi."
    //     },
    //     {
    //         "alasan": "Local Expert Provinsi Sumut merupakan bagian dari Lainnya, Mahasiswa Fakultas Ekonomi dan Bisnis Universitas Sumatera Utara merupakan bagian dari Lainnya, Kanwil DJPb Provinsi Sumut merupakan bagian dari DJPb.",
    //         "djpb": true,
    //         "kegiatan": "Kuliah Umum APBN dan Sosialisasi Pemberdayaan UMKM Tahun 2024",
    //         "lainnya": true,
    //         "pemda": false,
    //         "pihak": "Local Expert Provinsi Sumut, Mahasiswa Fakultas Ekonomi dan Bisnis Universitas Sumatera Utara dan Kanwil DJPb Provinsi Sumut."
    //     },
    // ];

    kegiatanPihakJson = genAiResponse;
  } catch (error) {
    return error;
  };
  console.log(`jumlah kegiatan pihak: ${kegiatanPihakJson.length}`);

  // return daftarKegiatanPihakString;
  return kegiatanPihakJson;
};

function hitungKegiatanNonDjpb(daftarKegiatanJson: any[], totalKegiatan: number){
  const kegiatanNonDjpb = daftarKegiatanJson.filter((item: any) => {
      return item.pemda === true || item.lainnya === true;
  });
  const nKegiatanNonDjpb = kegiatanNonDjpb.length;
  // const nKegiatanNonDjpb = 41;
  console.log(`jumlah kegiatan eksternal non-DJPB: ${nKegiatanNonDjpb} dari ${totalKegiatan} kegiatan`);

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
  for (const item of daftarKegiatanJson){
    if(item.publikasi === true){
      adaPublikasi = true;
      break;
    };
  };
  let nilaiPublikasi = 80;
  if(adaPublikasi) nilaiPublikasi = 100;
  console.log(`nilai publikasi/komunikasi: ${nilaiPublikasi}`);
  return nilaiPublikasi * 0.12;
};

// NILAI KEGIATAN PEMDA (NOMOR 7.b)
function hitungKegiatanPemda(daftarKegiatanJson: any[], totalKegiatan: number){
  const kegiatanPemda = daftarKegiatanJson.filter((item: any) => {
      return item.pemda === true;
  });
  const nKegiatanPemda = kegiatanPemda.length;
  console.log(`jumlah kegiatan dengan Pemda: ${nKegiatanPemda} kegiatan`);

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
  console.log(`nilai jumlah kegiatan dengan Pemda: ${nilaiJumlah}`);
  
  console.log(`jumlah kegiatan dengan Pemda: ${nKegiatanPemda}/${totalKegiatan} kegiatan`);
  const persentase = nKegiatanPemda / totalKegiatan;
  console.log(`persentase: ${persentase * 100}%`);
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
    return item.forum !== null;
  });
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
  console.log(`nilai inovasi/tematik: ${nilaiInovasi}`);
  return nilaiInovasi * 0.12;
};

// NILAI KEGIATAN HIGH LEVEL MEETING (NOMOR 7.e)
function hitungJumlahKegiatanHighLevel(daftarKegiatanJson: any[]){
  const kegiatanHighLevel = daftarKegiatanJson.filter((item: any) => {
    return item.pejabat !== 'Lainnya';
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
    jenisPejabatArray.push(item.pejabat);
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
  console.log(`nilai kegiatan high level meeting (pejabat): ${nilaiPejabat} (${jenisPejabatUnique})`);
  return nilaiPejabat;
};

function hitungKegiatanHighLevel(daftarKegiatanJson: any[]){
  const nilaiJumlah = hitungJumlahKegiatanHighLevel(daftarKegiatanJson);
  const nilaiPejabat = hitungJenisPejabatKegiatanHighLevel(daftarKegiatanJson);
  const nilaiKegiatanHighLevel = (nilaiJumlah + nilaiPejabat) / 2;
  console.log(`nilai kegiatan high level meeting (total): ${nilaiKegiatanHighLevel}`);
  return nilaiKegiatanHighLevel * 0.12;
};

export async function hitungNilaiSubstantif(file: DriveFile): Promise<any> {
  let nilaiSubstantif = null;
  if(file.fields['NilaiSubstantif'] === undefined || file.fields['NilaiSubstantif'] === ''){
    const daftarKegiatanJson = JSON.parse(file.fields['KegiatanJSON']);
    const nKegiatan = daftarKegiatanJson.length;
    console.log(`jumlah total kegiatan: ${nKegiatan}`);
  
    // return daftarKegiatanJson;
  
    const pihakKegiatan = await analisisPihakKegiatan(daftarKegiatanJson);
    // console.log(pihakKegiatan);
    const jumlahDJPb = pihakKegiatan.filter((item: any) => item.djpb === true);
    console.log(`jumlah kegiatan DJPb: ${jumlahDJPb.length}`);
    const jumlahLainnya = pihakKegiatan.filter((item: any) => item.lainnya === true);
    console.log(`jumlah kegiatan Lainnya: ${jumlahLainnya.length}`);
    const nilaiKegiatanNonDjpb = hitungKegiatanNonDjpb(pihakKegiatan, nKegiatan);
    const nilaiKegiatanPemda = hitungKegiatanPemda(pihakKegiatan, nKegiatan);
    
    // return pihakKegiatan;
  
    const nilaiVariasiBidang = hitungVariasiBidang(daftarKegiatanJson);
    const nilaiPublikasi = hitungPublikasi(daftarKegiatanJson);
    const nilaiKegiatanForum = hitungKegiatanForum(daftarKegiatanJson);
    const nilaiInovasi = hitungInovasi(daftarKegiatanJson);
    const nilaiKegiatanHighLevel = hitungKegiatanHighLevel(daftarKegiatanJson);
    const nilaiRekomendasi = 93 * 0.2;
  
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