import { SchemaType } from "@google/generative-ai";

const ekstrakKegiatanNonPihakJsonSchema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      kegiatan: {
        type: SchemaType.STRING,
        nullable: false,
      },
      jenis: {
        type: SchemaType.STRING,
        nullable: false,
      },
      bidang: {
        type: SchemaType.STRING,
        nullable: false,
      },
      waktu: {
        type: SchemaType.STRING,
        nullable: false,
      },
      tempat: {
        type: SchemaType.STRING,
        nullable: false,
      },
      pihak: {
        type: SchemaType.STRING,
        nullable: false,
      },
      pejabat: {
        type: SchemaType.STRING,
        nullable: false,
      },
      inovasi: {
        type: SchemaType.STRING,
        nullable: true,
      },
      forum: {
        type: SchemaType.STRING,
        nullable: true,
      },
      publikasi: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
    },
    required: [
      "kegiatan",
      "jenis",
      "bidang",
      "waktu",
      "tempat",
      "pihak",
      "pejabat",
      "inovasi",
      "forum",
      "publikasi",
    ],
  },
};

const ekstrakKegiatanNonPihakJsonPrompt = `
dari dokumen terlampir, identifikasi dan analisis bagian yang secara KHUSUS membahas tentang 'Kegiatan'.
parse setiap informasi kegiatan seperti 'nama', 'jenis', 'bidang', 'waktu', 'tempat', 'pihak/unit yang terlibat', 'pejabat yang terlibat', 'inovasi', 'forum', dan 'publikasi' dari dokumen terlampir.

nama kegiatan harus sama persis seperti pada dokumen aslinya.
pihak/unit yang terlibat harus sama persis seperti pada dokumen aslinya.

dalam menentukan jenis kegiatan, lihat berdasarkan 'bab/bagian/sub-bab kegiatan' pada dokumen.
terdapat tiga 'jenis' kegiatan berdasarkan 'bab/bagian/sub-bab kegiatan', yaitu:
- Rutin/Periodik -> berikan 'rutin'
- Strategis/Tematik -> berikan 'strategis'
- Local Expert -> berikan 'expert'
ada di 'bab/bagian/sub-bab kegiatan' mana kegiatan berada?

untuk memilih 'bidang' kegiatan, pilih salah satu dari 'daftar bidang' di bawah:
- koordinasi, harmonisasi, dan sinkronisasi
- asistensi, pendampingan, dan pembinaan
- sosialisasi dan diseminasi
- publikasi
- sharing data dan informasi
- monitoring dan evaluasi

'pejabat yang terlibat' mempertimbangkan:
- golongan 'pejabat':
  - Pimpinan Daerah
    - Gubernur
    - Walikota
    - Bupati
    - Wakil Gubernur (Wagub)
    - Wakil Walikota (Wawali)
    - Wakil Bupati (Wabup)
  - Kepala Dinas
  - Kepala BPKAD
- adakah pejabat dalam kegiatan?
  - jika ada, apa golongan 'pejabatnya'?
  - jika tidak ada, berikan 'Lainnya'

apakah kegiatan membahas tentang suatu 'inovasi'?
- berikut daftar 'inovasi':
  - ketahanan pangan
  - stunting
  - local tax power
  - pengendalian inflasi
- jika TIDAK ADA, berikan null.

apakah kegiatan berupa FORUM atau TIM pada suatu DAERAH? sebutkan alasannya!
- jika TIDAK ADA, berikan null.

apakah terdapat 'publikasi' pada kegiatan tersebut?
- berikan true jika ADA, berikan false jika TIDAK ADA.

jika kegiatan memiliki SUB-KEGIATAN, JANGAN MASUKKAN 'induk kegiatan' melainkan MASUKKAN 'sub-sub kegiatan'.
contoh:
- Koordinasi dalam Penyusunan Tematik ALCo Regional -> induk
  - Dinas Pertanian Provinsi Sumut -> sub
    ...
  - Balai Besar Meteorologi Klimatologi dan Geofisika Wilayah I -> sub
    ...

maka nama kegiatannya menjadi:
- Koordinasi dalam Penyusunan Tematik ALCo Regional - Dinas Pertanian Provinsi Sumut
- Koordinasi dalam Penyusunan Tematik ALCo Regional - Balai Besar Meteorologi Klimatologi dan Geofisika Wilayah I

berikan jawaban dalam format JSON.

[
  {
    kegiatan: 'Nama Kegiatan',
    jenis: rutin, strategis, atau expert,
    bidang: pilih satu dari empat opsi 'daftar bidang' kegiatan,
    waktu: '9 September 2024',
    tempat: 'Tempat diselenggarakannya kegiatan',
    pihak: 'pihak A, pihak B, ...',
    pejabat: 'Gubernur, Walikota, Bupati, Wagub, Wawali, Wabup, atau Lainnya',
    inovasi: 'ketahanan pangan, stunting',
    forum: 'Ya, karena ...',
    publikasi: true atau false,
  },
  {
    kegiatan: 'Nama Kegiatan',
    jenis: Rutin/Periodik, Strategis/Tematik, atau Local Expert,
    bidang: pilih satu dari empat opsi 'daftar bidang' kegiatan,
    waktu: '15 September 2024',
    tempat: 'Tempat diselenggarakannya kegiatan',
    pihak: 'pihak A, pihak B, ...',
    pejabat: 'Gubernur, Walikota, Bupati, Wagub, Wawali, Wabup, atau Lainnya',
    inovasi: 'pengendalian inflasi',
    forum: 'Tidak, karena ...',
    publikasi: true atau false,
  },
  ...
]

`;

// tidak ada 'pihak terlibat'
// 'forum' jadi boolean, tidak ada alasan
const ekstrakKegiatanNonPihakJsonSchema2 = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      kegiatan: {
        type: SchemaType.STRING,
        nullable: false,
      },
      bidang: {
        type: SchemaType.STRING,
        nullable: false,
      },
      waktu: {
        type: SchemaType.STRING,
        nullable: false,
      },
      tempat: {
        type: SchemaType.STRING,
        nullable: false,
      },
      pejabat: {
        type: SchemaType.STRING,
        nullable: false,
      },
      inovasi: {
        type: SchemaType.STRING,
        nullable: true,
      },
      forum: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      publikasi: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
    },
    required: [
      "kegiatan",
      "bidang",
      "waktu",
      "tempat",
      "pejabat",
      "inovasi",
      "forum",
      "publikasi",
    ],
  },
};

const ekstrakKegiatanNonPihakJsonPrompt2 = `
dari dokumen terlampir, identifikasi dan analisis bagian yang secara KHUSUS membahas tentang 'Kegiatan'.
parse setiap informasi kegiatan seperti 'nama', 'bidang', 'waktu', 'tempat', 'pejabat yang terlibat', 'inovasi', 'forum', dan 'publikasi atau komunikasi' dari dokumen terlampir.

nama kegiatan harus sama persis seperti pada dokumen aslinya.

untuk memilih 'bidang' kegiatan, pilih salah satu dari 'daftar bidang' di bawah:
- koordinasi
- harmonisasi, dan sinkronisasi
- asistensi, pendampingan, dan pembinaan
- sosialisasi dan diseminasi
- publikasi dan komunikasi
- sharing data dan informasi
- monitoring dan evaluasi

'pejabat yang terlibat' mempertimbangkan:
- golongan 'pejabat':
  - Pimpinan Daerah
    - Gubernur
    - Walikota
    - Bupati
    - Wakil Gubernur (Wagub)
    - Wakil Walikota (Wawali)
    - Wakil Bupati (Wabup)
  - Kepala Dinas
  - Kepala BPKAD
- adakah pejabat dalam kegiatan?
  - jika ada, apa golongan 'pejabatnya'?
  - jika tidak ada, berikan 'Lainnya'

apakah rincian kegiatan membahas yang berkaitan dengan 'inovasi'?
- berikut daftar 'inovasi':
  - ketahanan pangan
  - stunting
  - local tax power
  - pengendalian inflasi
- jika TIDAK ADA, berikan null.

apakah kegiatan tergolong ke dalam 'FORUM atau TIM pada suatu DAERAH'? 
- jika BUKAN FORUM ATAU TIM DI DAERAH, berikan false.

apakah kegiatan tersebut melakukan 'publikasi' atau 'komunikasi'?
- pada bagian ini, kegiatan tersebut di publikasikan atau disampaikan ke publik melalui media massa atau pers.
- berikan true jika YA, berikan false jika TIDAK.

jika kegiatan memiliki SUB-KEGIATAN, JANGAN MASUKKAN 'induk kegiatan' melainkan MASUKKAN 'sub-sub kegiatan'.
  contoh:
  - Koordinasi dalam Penyusunan Tematik ALCo Regional -> induk
    - Dinas Pertanian Provinsi Sumut -> sub
      - Waktu dan Tempat
        ...
      - Unit/Pihak yang Terlibat
        ...
      - Rincian Kegiatan
        ...
    - Balai Besar Meteorologi Klimatologi dan Geofisika Wilayah I -> sub
      - Waktu dan Tempat
        ...
      - Unit/Pihak yang Terlibat
        ...
      - Rincian Kegiatan
        ...

  maka nama kegiatannya menjadi:
  - Koordinasi dalam Penyusunan Tematik ALCo Regional - Dinas Pertanian Provinsi Sumut
  - Koordinasi dalam Penyusunan Tematik ALCo Regional - Balai Besar Meteorologi Klimatologi dan Geofisika Wilayah I

SUB-KEGIATAN harus memiliki bagian 'waktu' dan 'tempat' tersendiri.
  contoh:
  - One on One Meeting Evaluasi Pelaksanaan Anggaran Satker -> induk
    a. Waktu dan Tempat
      ...
    b. Unit/Pihak yang Terlibat
      ...
    c. Rincian Kegiatan
      - Berikut hasil yang dicapai saat pelaksanaan kegiatan:
        - Polres:
          Realisasi anggaran sudah mencapai 34,34% dari pagu Rp12,59 miliar.
        - Kantor Kementerian Agama:
          Proyeksi belanja triwulan II diperkirakan masih kurang dari target triwulan II.
  
  maka kegiatan pada contoh di atas tidak memiliki SUB-KEGIATAN.


berikan jawaban dalam format JSON.

[
  {
    kegiatan: 'Nama Kegiatan',
    jenis: rutin, strategis, atau expert,
    bidang: pilih satu dari empat opsi 'daftar bidang' kegiatan,
    waktu: '9 September 2024',
    tempat: 'Tempat diselenggarakannya kegiatan',
    pejabat: 'Gubernur, Walikota, Bupati, Wagub, Wawali, Wabup, dan/atau Lainnya',
    inovasi: 'ketahanan pangan, stunting',
    forum: true atau false,
    publikasi: true atau false,
  },
  {
    kegiatan: 'Nama Kegiatan',
    jenis: Rutin/Periodik, Strategis/Tematik, atau Local Expert,
    bidang: pilih satu dari empat opsi 'daftar bidang' kegiatan,
    waktu: '15 September 2024',
    tempat: 'Tempat diselenggarakannya kegiatan',
    pejabat: 'Gubernur, Walikota, Bupati, Wagub, Wawali, Wabup, dan/atau Lainnya',
    inovasi: 'pengendalian inflasi',
    forum: true atau false,
    publikasi: true atau false,
  },
  ...
]

`;

// update dari ekstrakKegiatanNonPihakJsonSchema2
// tidak ada 'pejabat' dan 'jenis'
const ekstrakKegiatanNonPihakJsonSchema3 = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      kegiatan: {
        type: SchemaType.STRING,
        nullable: false,
      },
      bidang: {
        type: SchemaType.STRING,
        nullable: false,
      },
      waktu: {
        type: SchemaType.STRING,
        nullable: false,
      },
      tempat: {
        type: SchemaType.STRING,
        nullable: false,
      },
      inovasi: {
        type: SchemaType.STRING,
        nullable: true,
      },
      forum: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      publikasi: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
    },
    required: [
      "kegiatan",
      "bidang",
      "waktu",
      "tempat",
      "inovasi",
      "forum",
      "publikasi",
    ],
  },
};

const ekstrakKegiatanNonPihakJsonPrompt3 = `
dari dokumen terlampir, identifikasi dan analisis bagian yang secara KHUSUS membahas tentang 'Kegiatan'.
parse setiap informasi kegiatan seperti 'nama', 'bidang', 'waktu', 'tempat', 'inovasi', 'forum', dan 'publikasi atau komunikasi' dari dokumen terlampir.

nama kegiatan harus sama persis seperti pada dokumen aslinya.

untuk memilih 'bidang' kegiatan, pilih salah satu dari 'daftar bidang' di bawah:
- koordinasi
- harmonisasi, dan sinkronisasi
- asistensi, pendampingan, dan pembinaan
- sosialisasi dan diseminasi
- publikasi dan komunikasi
- sharing data dan informasi
- monitoring dan evaluasi

apakah rincian kegiatan membahas yang berkaitan dengan 'inovasi'?
- berikut daftar 'inovasi':
  - ketahanan pangan
  - stunting
  - local tax power
  - pengendalian inflasi
- jika TIDAK ADA, berikan null.

apakah kegiatan tergolong ke dalam 'FORUM atau TIM pada suatu DAERAH'? 
- jika BUKAN FORUM ATAU TIM DI DAERAH, berikan false.

apakah kegiatan tersebut melakukan 'publikasi' atau 'komunikasi'?
- pada bagian ini, kegiatan tersebut di publikasikan atau disampaikan ke publik melalui media massa atau pers.
- berikan true jika YA, berikan false jika TIDAK.

jika kegiatan memiliki SUB-KEGIATAN, JANGAN MASUKKAN 'induk kegiatan' melainkan MASUKKAN 'sub-sub kegiatan'.
  contoh:
  - Koordinasi dalam Penyusunan Tematik ALCo Regional -> induk
    - Dinas Pertanian Provinsi Sumut -> sub
      - Waktu dan Tempat
        ...
      - Unit/Pihak yang Terlibat
        ...
      - Rincian Kegiatan
        ...
    - Balai Besar Meteorologi Klimatologi dan Geofisika Wilayah I -> sub
      - Waktu dan Tempat
        ...
      - Unit/Pihak yang Terlibat
        ...
      - Rincian Kegiatan
        ...

  maka nama kegiatannya menjadi:
  - Koordinasi dalam Penyusunan Tematik ALCo Regional - Dinas Pertanian Provinsi Sumut
  - Koordinasi dalam Penyusunan Tematik ALCo Regional - Balai Besar Meteorologi Klimatologi dan Geofisika Wilayah I

SUB-KEGIATAN harus memiliki bagian 'waktu' dan 'tempat' tersendiri.
  contoh:
  - One on One Meeting Evaluasi Pelaksanaan Anggaran Satker -> induk
    a. Waktu dan Tempat
      ...
    b. Unit/Pihak yang Terlibat
      ...
    c. Rincian Kegiatan
      - Berikut hasil yang dicapai saat pelaksanaan kegiatan:
        - Polres:
          Realisasi anggaran sudah mencapai 34,34% dari pagu Rp12,59 miliar.
        - Kantor Kementerian Agama:
          Proyeksi belanja triwulan II diperkirakan masih kurang dari target triwulan II.
  
  maka kegiatan pada contoh di atas tidak memiliki SUB-KEGIATAN.


berikan jawaban dalam format JSON.

[
  {
    kegiatan: 'Nama Kegiatan',
    bidang: pilih satu dari opsi 'daftar bidang' kegiatan,
    waktu: '9 September 2024',
    tempat: 'Tempat diselenggarakannya kegiatan',
    inovasi: pilih satu dari opsi 'inovasi' kegiatan,
    forum: true atau false,
    publikasi: true atau false,
  },
  {
    kegiatan: 'Nama Kegiatan',
    bidang: pilih satu dari opsi 'daftar bidang' kegiatan,
    waktu: '15 September 2024',
    tempat: 'Tempat diselenggarakannya kegiatan',
    inovasi: pilih satu dari opsi 'inovasi' kegiatan,
    forum: true atau false,
    publikasi: true atau false,
  },
  ...
]

`;

// update dari ekstrakKegiatanNonPihakJsonSchema3
// update forum
const ekstrakKegiatanNonPihakJsonSchema4 = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      kegiatan: {
        type: SchemaType.STRING,
        nullable: false,
      },
      waktu: {
        type: SchemaType.STRING,
        nullable: false,
      },
      tempat: {
        type: SchemaType.STRING,
        nullable: false,
      },
      bidang: {
        type: SchemaType.STRING,
        nullable: false,
      },
      inovasi: {
        type: SchemaType.STRING,
        nullable: true,
      },
      forum: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      publikasi: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
    },
    required: [
      "kegiatan",
      "waktu",
      "tempat",
      "bidang",
      "inovasi",
      "forum",
      "publikasi",
    ],
  },
};

const ekstrakKegiatanNonPihakJsonPrompt4 = `
anda merupakan seorang ahli dalam mem-parsing kegiatan serta mengkaji rincian dan hasil kegiatan pada laporan milik DJPb (Ditjen Pebendaharaan).

dari dokumen terlampir, identifikasi dan analisis bagian yang secara KHUSUS membahas tentang 'Kegiatan', lalu:
1. parse setiap informasi kegiatan seperti 'nama', 'waktu', dan 'tempat' setiap kegiatan pada dokumen terlampir.
2. parse bagian pada kegiatan tersebut dan analisis bagian yang secara KHUSUS membahas tentang rincian dan hasil kegiatan. lakukan analisis yang mendalam berkaitan dengan 'bidang', 'inovasi', 'forum/tim di daerah', dan 'publikasi/komunikasi' dari setiap kegiatan pada dokumen terlampir.

nama kegiatan harus sama persis seperti pada dokumen aslinya.
waktu cukup menyebutkan tanggalnya saja, seperti 3 Mei 2024.

berdasarkan rincian kegiatan, pilih salah satu dari 'daftar bidang' di bawah:
- koordinasi
- harmonisasi, dan sinkronisasi
- asistensi, pendampingan, dan pembinaan
- sosialisasi dan diseminasi
- publikasi dan komunikasi
- sharing data dan informasi
- monitoring dan evaluasi

berdasarkan rincian dan hasil kegiatan, apakah terdapat 'inovasi' pada bagian rincian atau hasil kegiatan tersebut?
- berikut daftar 'inovasi':
  - ketahanan pangan
  - stunting
  - local tax power atau atau local taxing power (pajak dan retribusi daerah)
  - pengendalian inflasi atau inflasi
- jika TIDAK ADA, berikan null.

berdasarkan daerah dilaksanakan, apakah kegiatan tersebut memenuhi 'KEGIATAN FORUM/TIM DI DAERAH'? 
- kriteria 'kegiatan forum/tim di daerah':
  - Kegiatan dilaksanakan di wilayah/tingkat/lingkup/cakupan DESA, KELURAHAN, atau KECAMATAN.
  - Kegiatan BERHUBUNGAN LANGSUNG dengan 'daerah' DESA, KELURAHAN, atau KECAMATAN.
  - Melibatkan pihak/stakeholder Non-DJPb yaitu melibatkan organisasi atau masyarakat di 'daerah' (DESA, KELURAHAN, atau KECAMATAN) tersebut, baik sebagai peserta, pengambil keputusan, atau pemangku kepentingan.
  - Mengatasi masalah atau peluang spesifik yang dihadapi masyarakat di 'daerah' (DESA, KELURAHAN, atau KECAMATAN).
  - Menerapkan ide dan solusi melalui proyek konkret yang bermanfaat bagi masyarakat di 'daerah' (DESA, KELURAHAN, atau KECAMATAN).
  - Memiliki rencana dan upaya untuk menjalankan kegiatan secara berkelanjutan, bukan hanya kegiatan satu kali.
- jika kegiatan dilaksanakan di wilayah/tingkat/lingkup/cakupan KOTA, KABUPATEN, atau PROVINSI, maka kegiatan tersebut BUKAN KEGIATAN FORUM/TIM DI DAERAH.
- seluruh kriteria 'kegiatan forum/tim di daerah' HARUS terpenuhi.
- berikan true jika seluruh kriteria 'kegiatan forum/tim di daerah' terpenuhi.
- jika tidak memenuhi kriteria 'kegiatan forum/tim di daerah', berikan false.

apakah kegiatan tersebut melakukan 'publikasi' atau 'komunikasi'?
- pada bagian ini, kegiatan tersebut di publikasikan atau disampaikan ke publik melalui media massa atau pers.
- berikan true jika YA, berikan false jika TIDAK.

jika kegiatan memiliki SUB-KEGIATAN, JANGAN MASUKKAN 'induk kegiatan' melainkan MASUKKAN 'sub-sub kegiatan'.
  contoh:
  - Koordinasi dalam Penyusunan Tematik ALCo Regional -> induk
    - Dinas Pertanian Provinsi Sumut -> sub
      - Waktu dan Tempat
        ...
      - Unit/Pihak yang Terlibat
        ...
      - Rincian Kegiatan
        ...
    - Balai Besar Meteorologi Klimatologi dan Geofisika Wilayah I -> sub
      - Waktu dan Tempat
        ...
      - Unit/Pihak yang Terlibat
        ...
      - Rincian Kegiatan
        ...

  maka nama kegiatannya menjadi:
  - Koordinasi dalam Penyusunan Tematik ALCo Regional - Dinas Pertanian Provinsi Sumut
  - Koordinasi dalam Penyusunan Tematik ALCo Regional - Balai Besar Meteorologi Klimatologi dan Geofisika Wilayah I

SUB-KEGIATAN harus memiliki bagian 'waktu' dan 'tempat' tersendiri.
  contoh:
  - One on One Meeting Evaluasi Pelaksanaan Anggaran Satker -> induk
    a. Waktu dan Tempat
      ...
    b. Unit/Pihak yang Terlibat
      ...
    c. Rincian Kegiatan
      - Berikut hasil yang dicapai saat pelaksanaan kegiatan:
        - Polres:
          Realisasi anggaran sudah mencapai 34,34% dari pagu Rp12,59 miliar.
        - Kantor Kementerian Agama:
          Proyeksi belanja triwulan II diperkirakan masih kurang dari target triwulan II.
  
  maka kegiatan pada contoh di atas tidak memiliki SUB-KEGIATAN.


berikan jawaban dalam format JSON.

[
  {
    kegiatan: 'Nama Kegiatan',
    waktu: '9 September 2024',
    tempat: 'Tempat diselenggarakannya kegiatan',
    bidang: pilih satu dari opsi 'daftar bidang' kegiatan,
    inovasi: pilih satu dari opsi 'inovasi' kegiatan,
    forum: true atau false,
    publikasi: true atau false,
  },
  {
    kegiatan: 'Nama Kegiatan',
    waktu: '15 September 2024',
    tempat: 'Tempat diselenggarakannya kegiatan',
    bidang: pilih satu dari opsi 'daftar bidang' kegiatan,
    inovasi: pilih satu dari opsi 'inovasi' kegiatan,
    forum: true atau false,
    publikasi: true atau false,
  },
  ...
]

`;

const ekstrakKegiatanPihakJsonSchema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      kegiatan: {
        type: SchemaType.STRING,
        nullable: false,
      },
      waktu: {
        type: SchemaType.STRING,
        nullable: false,
      },
      tempat: {
        type: SchemaType.STRING,
        nullable: false,
      },
      pihak: {
        type: SchemaType.STRING,
        nullable: false,
      },
    },
    required: [
      "kegiatan",
      "waktu",
      "tempat",
      "pihak",
    ],
  },
};

const ekstrakKegiatanPihakJsonPrompt = `
dari dokumen terlampir, identifikasi dan analisis bagian yang secara KHUSUS membahas tentang 'Kegiatan'.
parse setiap informasi kegiatan seperti 'nama', 'waktu', 'tempat', dan 'pihak/unit/peserta yang terlibat' dari dokumen terlampir.

nama kegiatan harus sama persis seperti pada dokumen aslinya.
waktu cukup menyebutkan tanggalnya saja, seperti 3 Mei 2024.
pihak/unit/peserta yang terlibat atau hadir harus sama persis seperti pada dokumen aslinya.

jika kegiatan memiliki SUB-KEGIATAN, JANGAN MASUKKAN 'induk kegiatan' melainkan MASUKKAN 'sub-sub kegiatan'.
  contoh:
  - Koordinasi dalam Penyusunan Tematik ALCo Regional -> induk
    - Dinas Pertanian Provinsi Sumut -> sub
      - Waktu dan Tempat
        ...
      - Unit/Pihak yang Terlibat
        ...
      - Rincian Kegiatan
        ...
    - Balai Besar Meteorologi Klimatologi dan Geofisika Wilayah I -> sub
      - Waktu dan Tempat
        ...
      - Unit/Pihak yang Terlibat
        ...
      - Rincian Kegiatan
        ...

  maka nama kegiatannya menjadi:
  - Koordinasi dalam Penyusunan Tematik ALCo Regional - Dinas Pertanian Provinsi Sumut
  - Koordinasi dalam Penyusunan Tematik ALCo Regional - Balai Besar Meteorologi Klimatologi dan Geofisika Wilayah I

SUB-KEGIATAN harus memiliki bagian 'waktu' dan 'tempat' tersendiri.
  contoh:
  - One on One Meeting Evaluasi Pelaksanaan Anggaran Satker -> induk
    a. Waktu dan Tempat
      ...
    b. Unit/Pihak yang Terlibat
      ...
    c. Rincian Kegiatan
      - Berikut hasil yang dicapai saat pelaksanaan kegiatan:
        - Polres:
          Realisasi anggaran sudah mencapai 34,34% dari pagu Rp12,59 miliar.
        - Kantor Kementerian Agama:
          Proyeksi belanja triwulan II diperkirakan masih kurang dari target triwulan II.
  
  maka kegiatan pada contoh di atas tidak memiliki SUB-KEGIATAN.berikan jawaban dalam format JSON.

[
  {
    kegiatan: 'Nama Kegiatan',
    waktu: '9 September 2024',
    tempat: 'Tempat diselenggarakannya kegiatan',
    pihak: 'pihak A, pihak B, ...',
  },
  {
    kegiatan: 'Nama Kegiatan',
    waktu: '15 September 2024',
    tempat: 'Tempat diselenggarakannya kegiatan',
    pihak: 'pihak A, pihak B, ...',
  },
  ...
]

`;

const kegiatanPrompt = `
dari dokumen terlampir, identifikasi dan analisis bagian yang secara KHUSUS membahas tentang 'Kegiatan'.
parse setiap informasi kegiatan seperti 'nama', 'jenis', 'bidang', 'waktu', 'tempat', dan 'pihak/unit yang terlibat' dari dokumen terlampir.

nama kegiatan harus sama persis seperti pada dokumen aslinya.
pihak/unit yang terlibat harus sama persis seperti pada dokumen aslinya.

dalam menentukan jenis kegiatan, lihat berdasarkan 'bab/bagian/sub-bab kegiatan' pada dokumen.
terdapat tiga 'jenis' kegiatan berdasarkan 'bab/bagian/sub-bab kegiatan', yaitu:
- Rutin/Periodik -> berikan 'rutin'
- Strategis/Tematik -> berikan 'strategis'
- Local Expert -> berikan 'expert'
ada di 'bab/bagian/sub-bab kegiatan' mana kegiatan berada?

untuk memilih 'bidang' kegiatan, pilih salah satu dari 'daftar bidang' di bawah:
- koordinasi, harmonisasi, dan sinkronisasi
- asistensi, pendampingan, dan pembinaan
- sosialisasi dan diseminasi
- publikasi
- sharing data dan informasi
- monitoring dan evaluasi

jika kegiatan memiliki SUB-KEGIATAN, JANGAN MASUKKAN 'induk kegiatan' melainkan MASUKKAN 'sub-sub kegiatan'.
  contoh:
  - Koordinasi dalam Penyusunan Tematik ALCo Regional -> induk
    - Dinas Pertanian Provinsi Sumut -> sub
      ...
    - Balai Besar Meteorologi Klimatologi dan Geofisika Wilayah I -> sub
      ...

  maka nama kegiatannya menjadi:
  - Koordinasi dalam Penyusunan Tematik ALCo Regional - Dinas Pertanian Provinsi Sumut
  - Koordinasi dalam Penyusunan Tematik ALCo Regional - Balai Besar Meteorologi Klimatologi dan Geofisika Wilayah I

berikan jawaban dalam format di bawah.

  kegiatan: 'Nama Kegiatan',
  jenis: rutin, strategis, atau expert,
  bidang: pilih satu dari empat opsi 'daftar bidang' kegiatan,
  waktu: '9 September 2024',
  tempat: 'Tempat diselenggarakannya kegiatan',
  pihak: 'pihak A, pihak B, ...',

  kegiatan: 'Nama Kegiatan',
  jenis: Rutin/Periodik, Strategis/Tematik, atau Local Expert,
  bidang: pilih satu dari empat opsi 'daftar bidang' kegiatan,
  waktu: '15 September 2024',
  tempat: 'Tempat diselenggarakannya kegiatan',
  pihak: 'pihak A, pihak B, ...',

  ...

`;

const nilaiAdministratifSchema = {
  type: SchemaType.OBJECT,
  properties: {
    format: {
      type: SchemaType.OBJECT,
      properties: {
        'Kata Pengantar': {
          type: SchemaType.BOOLEAN,
          nullable: false,
        },
        'Executive Summary': {
          type: SchemaType.BOOLEAN,
          nullable: false,
        },
        'Daftar Isi': {
          type: SchemaType.BOOLEAN,
          nullable: false,
        },
        'Latar Belakang': {
          type: SchemaType.BOOLEAN,
          nullable: false,
        },
        'Identifikasi Masalah': {
          type: SchemaType.BOOLEAN,
          nullable: false,
        },
        'Kegiatan Rutin': {
          type: SchemaType.BOOLEAN,
          nullable: false,
        },
        'Kegiatan Strategis': {
          type: SchemaType.BOOLEAN,
          nullable: false,
        },
        'Kegiatan Expert': {
          type: SchemaType.BOOLEAN,
          nullable: false,
        },
        'Kesimpulan': {
          type: SchemaType.BOOLEAN,
          nullable: false,
        },
        'Rekomendasi': {
          type: SchemaType.BOOLEAN,
          nullable: false,
        },
      },
      required: [
        'Kata Pengantar',
        'Executive Summary',
        'Daftar Isi',
        'Latar Belakang',
        'Identifikasi Masalah',
        'Kegiatan Rutin',
        'Kegiatan Strategis',
        'Kegiatan Expert',
        'Kesimpulan',
        'Rekomendasi',
      ],
    },
    desain: {
      type: SchemaType.OBJECT,
      properties: {
        nilai: {
          type: SchemaType.NUMBER,
          nullable: false,
        },
        alasan: {
          type: SchemaType.STRING,
          nullable: false,
        },
      },
      required: ['nilai', 'alasan'],
    },
    penulisan: {
      type: SchemaType.OBJECT,
      properties: {
        nilai: {
          type: SchemaType.NUMBER,
          nullable: false,
        },
        alasan: {
          type: SchemaType.STRING,
          nullable: false,
        },
      },
      required: ['nilai', 'alasan'],
    },
  },
  required: ['format', 'desain', 'penulisan'],
};

const nilaiAdministratifPrompt = `
anda merupakan seorang ahli dalam menilai dokumen.

'struktur dokumen' yang baik memiliki bagian/bab/sub-bab:
- Kata Pengantar
- Executive Summary/Ringkasan Eksekutif
- Daftar Isi
- Latar Belakang
- Identifikasi Masalah
- Kegiatan Rutin atau Kegiatan Periodik
- Kegiatan Strategis atau Kegiatan Tematik
- Kegiatan Local Expert
- Kesimpulan
- Rekomendasi

tugas anda adalah menilai dokumen yang diberikan dengan mempertimbangkan:
- struktur dokumen
  apakah dokumen memiliki 'struktur yang lengkap'? berikan true jika ADA, berikan false jika TIDAK ADA.
- desain dan layout
  - apakah dokumen memperhatikan estetika dan penyajian layout dengan baik? seperti:
    - penggunaan table yang baik dan jelas.
    - penggunaan daftar/list yang baik dan jelas.
    - penggunaan nomor atau simbol pada subjudul yang baik dan jelas.
  - apakah dokumen mudah dibaca oleh pembaca?
  - apakah desain atau gambar menghalangi tulisan?
  - apakah setiap kegiatan mengandung foto/gambar?
  berikan nilai dari range 90-99 beserta alasannya.
- teknik penulisan
  - apakah tata bahasa penulisan mengikuti cara penulisan yang BAKU?
    - adakah kata-kata tidak baku?
    - apakah penggunaan tanda baca sudah tepat?
    - apakah terdapat penjabaran pada singkatan?
  - apakah bagian/bab/sub-bab sudah disajikan secara runut dan koheren?
  - apakah urutan bagian/bab/sub-bab mengikuti 'struktur dokumen' yang baik?
  berikan nilai dari range 90-99 beserta alasannya.

berikan jawaban dalam format JSON di bawah.

{
  format: {
    Kata Pengantar: true atau false,
    executive_summary: true atau false,
    daftar_isi: true atau false,
    latar_belakang: true atau false,
    identifikasi_masalah: true atau false,
    kegiatan_rutin: true atau false,
    kegiatan_strategis: true atau false,
    kegiatan_expert: true atau false,
    kesimpulan: true atau false,
    rekomendasi: true atau false,
  },
  desain: {
    nilai: 90-99,
    alasan: '...',
  },
  penulisan: {
    nilai: 90-99,
    alasan: '...',
  },
}

`;

const kegiatanPihakJsonSchema = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      kegiatan: {
        type: SchemaType.STRING,
        nullable: false,
      },
      pihak: {
        type: SchemaType.STRING,
        nullable: false,
      },
      alasan: {
        type: SchemaType.STRING,
        nullable: false,
      },
      djpb: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      pemda: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      lainnya:  {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
    },
    required: [
      'kegiatan', 'pihak', 'alasan', 'djpb', 'pemda', 'lainnya',
    ],
  },
};

const kegiatanPihakJsonPrompt = `
dari daftar kegiatan terlampir, identifikasi dan analisis kelompok 'pihak yang terlibat' pada setiap kegiatan.

terdapat tiga kelompok 'jenis pihak', yaitu DJPb, Pemerintah Daerah (Pemda), dan Lainnya.
pihak Lainnya merupakan pihak yang BUKAN kelompok DJPb dan Pemda.
identifikasi dan analisis kelompok untuk SETIAP PIHAK dengan mempertimbangkan:
- apakah pihak A merupakan bagian dari DJPb?
- apakah pihak A merupakan bagian dari Pemda?
- apakah pihak A merupakan bagian dari Lainnya?
apabila terdapat pihak yang memenuhi kelompok 'jenis pihak', berikan true.

catatan:
- segala macam pihak dari Kementrian (Kemen...) merupakan kelompok Lainnya.
- segala macam pihak Universitas, Institut, Politeknik, Sekolah Tinggi merupakan kelompok Lainnya.
- segala macam pihak Badan Layanan Umum (BLU) merupakan kelompok Lainnya.
- segala macam pihak Badan Layanan Umum Daerah (BLUD) merupakan kelompok Pemda.
- segala macam pihak Rumah Sakit Umum (RSU) merupakan kelompok Lainnya.
- segala macam pihak Rumah Sakit Umum Daerah (RSUD) merupakan kelompok Pemda.

anda diizinkan menggunakan knowledge yang anda miliki untuk mengelompokan pihak berdasarkan jenis pihaknya namun tetap MENGUTAMAKAN catatan.
berikan alasan anda saat mengelompokan pihak yang terlibat.

berikan jawaban dalam format JSON di bawah.
[
  {
    kegiatan: 'Kegiatan A',
    pihak: 'pihak a, pihak s',
    alasan: '...',
    djpb: true atau false,
    pemda: true atau false,
    lainnya: true atau false,
  },
  {
    kegiatan: 'Kegiatan B',
    pihak: 'pihak g, pihak h',
    alasan: '...',
    djpb: true atau false,
    pemda: true atau false,
    lainnya: true atau false,
  },
]

`;

const kegiatanPihakJsonSchema2 = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      kegiatan: {
        type: SchemaType.STRING,
        nullable: false,
      },
      pihak: {
        type: SchemaType.STRING,
        nullable: false,
      },
      djpb: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      pemda: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      lainnya:  {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
    },
    required: [
      'kegiatan', 'pihak', 'djpb', 'pemda', 'lainnya',
    ],
  },
};

const kegiatanPihakJsonPrompt2 = `
dari daftar kegiatan terlampir, identifikasi dan analisis kelompok 'pihak yang terlibat' pada setiap kegiatan.

terdapat tiga kelompok 'jenis pihak', yaitu DJPb, Pemerintah Daerah (Pemda), dan Lainnya.
pihak Lainnya merupakan pihak yang BUKAN kelompok DJPb dan Pemda.
identifikasi dan analisis kelompok untuk SETIAP PIHAK dengan mempertimbangkan:
- apakah pihak A merupakan bagian dari DJPb?
- apakah pihak A merupakan bagian dari Pemda?
- apakah pihak A merupakan bagian dari Lainnya?
apabila terdapat pihak yang memenuhi kelompok 'jenis pihak', berikan true.

catatan:
- segala macam pihak dari Kementrian (Kemen...) merupakan kelompok Lainnya.
- segala macam pihak Universitas, Institut, Politeknik, Sekolah Tinggi merupakan kelompok Lainnya.
- segala macam pihak Badan Layanan Umum (BLU) merupakan kelompok Lainnya.
- segala macam pihak Badan Layanan Umum Daerah (BLUD) merupakan kelompok Pemda.
- segala macam pihak Rumah Sakit Umum (RSU) merupakan kelompok Lainnya.
- segala macam pihak Rumah Sakit Umum Daerah (RSUD) merupakan kelompok Pemda.

anda diizinkan menggunakan knowledge yang anda miliki untuk mengelompokan pihak berdasarkan jenis pihaknya namun tetap MENGUTAMAKAN catatan.
berikan alasan anda saat mengelompokan pihak yang terlibat.

berikan jawaban dalam format JSON di bawah.
[
  {
    kegiatan: 'Kegiatan A',
    pihak: 'pihak a, pihak s',
    djpb: true atau false,
    pemda: true atau false,
    lainnya: true atau false,
  },
  {
    kegiatan: 'Kegiatan B',
    pihak: 'pihak g, pihak h',
    djpb: true atau false,
    pemda: true atau false,
    lainnya: true atau false,
  },
]

`;

// nambah 'pejabat'
const kegiatanPihakJsonSchema3 = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      kegiatan: {
        type: SchemaType.STRING,
        nullable: false,
      },
      pihak: {
        type: SchemaType.STRING,
        nullable: false,
      },
      pejabat: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.STRING,
        }
      },
      djpb: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      pemda: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      lainnya: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      alasan: {
        type: SchemaType.STRING,
        nullable: false,
      },
    },
    required: [
      'kegiatan', 'pihak', 'pejabat', 'djpb', 'pemda', 'lainnya', 'alasan',
    ],
  },
};

const kegiatanPihakJsonPrompt3 = `
dari daftar kegiatan terlampir, anda akan diberikan dua tugas, yaitu:
1. mengelompokan kegiatan berdasarkan 'pihak yang terlibat' menjadi tiga kelompok 'jenis pihak', yaitu DJPb, Pemerintah Daerah (Pemda), dan Lainnya.
  pihak Lainnya merupakan pihak yang BUKAN bagian dari kelompok DJPb dan Pemda.
  kelompokan SETIAP PIHAK dengan mempertimbangkan:
  - apakah pihak A merupakan bagian atau di bawah naungan DJPb? berikan true jika YA, false jika TIDAK
  - apakah pihak A merupakan bagian atau di bawah naungan Pemda? berikan true jika, false jika TIDAK
  - apakah pihak A merupakan bagian dari Lainnya?
  apabila terdapat pihak yang memenuhi kelompok 'jenis pihak', berikan true.
  utamakan dan ikuti catatan di bawah saat mengelompokan jenis pihak.
  catatan:
  - segala macam pihak/perwakilan yang berasal dari Kementrian (Kemen... atau Menteri), termasuk Kementrian Keuangan (Kemenkeu) itu sendiri, masuk ke dalam kelompok 'Lainnya'.
  - segala macam pihak/perwakilan yang berasal dari Universitas, Institut, Politeknik, Sekolah Tinggi masuk ke dalam kelompok 'Lainnya'.
  - segala macam pihak/perwakilan yang berasal dari Badan Layanan Umum (BLU) atau Badan Layanan Umum Daerah (BLUD) masuk ke dalam kelompok 'Lainnya'.
  - segala macam pihak/perwakilan yang berasal dari Rumah Sakit Umum (RSU) atau Rumah Sakit Umum Daerah (RSUD) masuk ke dalam kelompok 'Lainnya'.
  - local expert masuk ke dalam kelompok 'Lainnya'.

2. mengidentifikasi 'pejabat Pemerintah Daerah (Pemda)' pada setiap kegiatan dengan mempertimbangkan jabatannya.
  - tingkat jabatan:
    - Pimpinan Daerah
      - Gubernur atau Penanggung Jawab (Pj.) Gubernur
      - Walikota
      - Bupati
      - Wakil Gubernur (Wagub)
      - Wakil Walikota (Wawali)
      - Wakil Bupati (Wabup)
    - Kepala Dinas
    - Kepala BPKAD
  - adakah jabatan yang tercantum secara EKSPLISIT di dalam 'pihak yang terlibat' pada setiap kegiatan?
    - jika ada, apa jabatannya?
    - berikan ke dalam suatu array string.
  - contoh:
    - Kegiatan A
      - Pihak yang terlibat: Sekretaris BPKAD Kab. XXX, perwakilan OPD dan DPMK Daerah Kab. XXX, hadir pula Kepala Seksi Bank KPPN XXX beserta staf.
      maka tidak ada pejabat yang terlibat pada Kegiatan A karena Sekretasis dan Kepala Seksi Bank TIDAK ADA di dalam 'tingkat jabatan'.
      jawaban:
        pejabat: []
    - Kegiatan B
      - Pihak yang terlibat: Gubernur Papua Barat beserta jajaran, Seluruh OPD di Provinsi Papua Barat, Perwakilan Kemendagri, serta Perwakilan Bappenas.
      maka pejabat yang terlibat pada kegiatan B adalah Gubernur.
      jawaban:
        pejabat: ['Gubernur']
    - Kegiatan C
      - Pihak yang terlibat: Kepala Perwakilan BI di Provinsi Papua Barat, Ketua MRP Provinsi Papua Barat Daya, Kepala BP3OKP Papua Barat Daya, Pimpinan/ Kepala Daerah Kabupaten/ Kota lingkup Papua Barat Daya, Forkopimda, Pimpinan Instansi Vertikal serta dari unsur pengusaha atau swasta.
      maka pejabat yang terlibat pada kegiatan C adalah Walikota dan Bupati karena terdapat Pimpinan/ Kepala Daerah Kabupaten/ Kota lingkup Papua Barat Daya yang mewakili Walikota/ Bupati.
      jawaban:
        pejabat: ['Walikota', 'Bupati']
    - Kegiatan D
      - Pihak yang terlibat: seluruh Pemda dan OPD Lingkup Kabupaten Manokwari.
      maka tidak ada pejabat yang terlibat pada Kegiatan D karena tidak menyebutkan 'tingkat jabatan' secara eksplisit pada pihak yang terlibat.
      jawaban:
        pejabat: []

berikan alasan anda saat mengelompokan jenis pihak dan identifikasi pejabat.

berikan jawaban dalam format JSON di bawah.
[
  {
    kegiatan: 'Kegiatan A',
    pihak: 'pihak a, pihak s',
    pejabat: [ 'Gubernur', 'Walikota', 'Bupati', 'Wagub', 'Wawali', 'Wabup', 'Kepala Dinas', 'Kepala BPKAD' ],
    djpb: true atau false,
    pemda: true atau false,
    lainnya: true atau false,
    alasan: '',
  },
  {
    kegiatan: 'Kegiatan B',
    pihak: 'pihak g, pihak h',
    pejabat: [ 'Gubernur', 'Walikota', 'Bupati', 'Wagub', 'Wawali', 'Wabup', 'Kepala Dinas', 'Kepala BPKAD' ],
    djpb: true atau false,
    pemda: true atau false,
    lainnya: true atau false,
    alasan: '',
  },
]

`;

// fokus pengelompokan
const kegiatanPihakJsonSchema4 = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      kegiatan: {
        type: SchemaType.STRING,
        nullable: false,
      },
      pihak: {
        type: SchemaType.STRING,
        nullable: false,
      },
      djpb: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      pemda: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      lainnya: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      alasan: {
        type: SchemaType.STRING,
        nullable: false,
      },
    },
    required: [
      'kegiatan', 'pihak', 'djpb', 'pemda', 'lainnya', 'alasan',
    ],
  },
};

const kegiatanPihakJsonPrompt4 = `
dari daftar kegiatan terlampir, tugas anda adalah mengidentifikasi 'pihak yang terlibat' berdasarkan 'jenis pihak'.
terdapat tiga pihak, yaitu DJPb, Pemerintah Daerah (Pemda), dan Lainnya.
pihak Lainnya merupakan pihak yang BUKAN bagian dari kelompok DJPb dan Pemda.
kelompokan SETIAP PIHAK dengan mempertimbangkan:
- apakah pihak A merupakan bagian atau di bawah naungan DJPb? berikan true jika YA, false jika TIDAK
- apakah pihak A merupakan bagian atau di bawah naungan Pemda? berikan true jika, false jika TIDAK
- apakah pihak A merupakan bagian dari Lainnya?
apabila terdapat pihak yang memenuhi kelompok 'jenis pihak', berikan true.
utamakan dan ikuti catatan di bawah saat mengelompokan jenis pihak.
catatan:
- segala macam pihak/perwakilan yang berasal dari Kementrian (Kemen... atau Menteri), termasuk Kementrian Keuangan (Kemenkeu) itu sendiri, masuk ke dalam kelompok 'Lainnya'.
- segala macam pihak/perwakilan yang berasal dari Universitas, Institut, Politeknik, Sekolah Tinggi masuk ke dalam kelompok 'Lainnya'.
- segala macam pihak/perwakilan yang berasal dari Badan Layanan Umum (BLU) atau Badan Layanan Umum Daerah (BLUD) masuk ke dalam kelompok 'Lainnya'.
- segala macam pihak/perwakilan yang berasal dari Rumah Sakit Umum (RSU) atau Rumah Sakit Umum Daerah (RSUD) masuk ke dalam kelompok 'Lainnya'.
- local expert masuk ke dalam kelompok 'Lainnya'.

berikan alasan anda saat mengelompokan jenis pihak dan identifikasi pejabat.

contoh:
- Kegiatan A
  - Pihak yang terlibat: Pejabat Eselon II serta para pejabat dan pegawai instansi vertikal Kementerian Keuangan di wilayah XXX.
  analisis: 'instansi vertikal Kementerian Keuangan' bukan bagian dari DJPb maupun Pemda tetapi bagian dari kementrian atau pusat. maka 'instansi vertikal Kementerian Keuangan' termasuk ke dalam lainnya.
- Kegiatan B
  - Pihak yang terlibat: Direktur DDIOKK dan Tim Reguler Dana Otsus, DJPK, Direktur Fasilitasi Transfer dan Pembiayan Utang Daerah, Kemendagri, Direktur Regional 3 Bappenas, dan Kanwil Ditjen Perbendaharaan Provinsi XXX.
  analisis:
  - DDIOKK, Dana Otsus, Direktur Fasilitasi Transfer dan Pembiayan Utang Daerah, dan Direktur Regional 3 Bappenas bukan bagian dari DJPb maupun Pemda sehingga dimasukkan ke dalam lainnya.
  - begitu juga dengan Kemendagri yang merupakan bagian dari kementrian sehingga dimasukkan ke dalam lainnya.
  - sedangkan Kanwil Ditjen Perbendaharaan merupakan bagian dari DJPb.
  maka jawaban yang benar adalah djpb true, pemda false, dan lainnya true.
- Kegiatan C
  - Pihak yang terlibat: anggota perwakilan BP3OKP, serta seluruh BPKAD lingkup XXX, serta Kepala KPPN lingkup Kanwil DJPb XXX.
  analisis:
  - BP3OKP bukanlah bagian dari DJPb ataupun Pemda sehingga termasuk ke dalam lainnya.
  - BPKAD merupakan bagian dari Pemda.
  - Kepala KPPN lingkup Kanwil DJPb merupakan bagian dari DJPb.
  maka jawaban yang benar adalah djpb true, pemda true, dan lainnya true.

jawaban:
[
  {
    kegiatan: 'Kegiatan A',
    pihak: 'Pejabat Eselon II serta para pejabat dan pegawai instansi vertikal Kementerian Keuangan di wilayah XXX.',
    djpb: false,
    pemda: false,
    lainnya: true,
    alasan: 'instansi vertikal Kementerian Keuangan bukan bagian dari DJPb maupun Pemda sehingga instansi vertikal Kementerian Keuangan termasuk ke dalam lainnya.',
  },
  {
    kegiatan: 'Kegiatan B',
    pihak: 'Direktur DDIOKK dan Tim Reguler Dana Otsus, DJPK, Direktur Fasilitasi Transfer dan Pembiayan Utang Daerah, Kemendagri, Direktur Regional 3 Bappenas, dan Kanwil Ditjen Perbendaharaan Provinsi XXX.',
    djpb: true,
    pemda: false,
    lainnya: true,
    alasan: 'DDIOKK, Dana Otsus, Direktur Fasilitasi Transfer dan Pembiayan Utang Daerah, Kemendagri, dan Direktur Regional 3 Bappenas bukan bagian dari DJPb maupun Pemda sehingga dimasukkan ke dalam lainnya. begitu juga dengan Kemendagri yang merupakan bagian dari kementrian sehingga dimasukkan ke dalam lainnya. sedangkan Kanwil Ditjen Perbendaharaan merupakan bagian dari DJPb.',
  },
  {
    kegiatan: 'Kegiatan C',
    pihak: 'anggota perwakilan BP3OKP, serta seluruh BPKAD lingkup XXX, serta Kepala KPPN lingkup Kanwil DJPb XXX.',
    djpb: true,
    pemda: true,
    lainnya: true,
    alasan: 'BP3OKP bukanlah bagian dari DJPb ataupun Pemda sehingga termasuk ke dalam lainnya. BPKAD merupakan bagian dari Pemda. Kepala KPPN lingkup Kanwil DJPb merupakan bagian dari DJPb.',
  },
]

berikan jawaban dalam format JSON di bawah.
[
  {
    kegiatan: 'Kegiatan A',
    pihak: 'pihak a, pihak s',
    djpb: true atau false,
    pemda: true atau false,
    lainnya: true atau false,
    alasan: '',
  },
  {
    kegiatan: 'Kegiatan B',
    pihak: 'pihak g, pihak h',
    djpb: true atau false,
    pemda: true atau false,
    lainnya: true atau false,
    alasan: '',
  },
]

`;

// nambah 'pejabat' dari prompt4
const kegiatanPihakJsonSchema5 = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      kegiatan: {
        type: SchemaType.STRING,
        nullable: false,
      },
      pihak: {
        type: SchemaType.STRING,
        nullable: false,
      },
      djpb: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      pemda: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      lainnya: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      alasan: {
        type: SchemaType.STRING,
        nullable: false,
      },
      pejabat: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.STRING,
        },
      },
    },
    required: [
      'kegiatan', 'pihak', 'djpb', 'pemda', 'lainnya', 'alasan', 'pejabat',
    ],
  },
};

const kegiatanPihakJsonPrompt5 = `
dari daftar kegiatan terlampir, anda akan diberikan dua tugas, yaitu:
1. mengidentifikasi 'pihak yang terlibat' berdasarkan 'jenis pihak'.
  terdapat tiga pihak, yaitu DJPb, Pemerintah Daerah (Pemda), dan Lainnya.
  pihak Lainnya merupakan pihak yang BUKAN bagian dari kelompok DJPb dan Pemda.
  kelompokan SETIAP PIHAK dengan mempertimbangkan:
  - apakah pihak A merupakan bagian atau di bawah naungan DJPb? berikan true jika YA, false jika TIDAK
  - apakah pihak A merupakan bagian atau di bawah naungan Pemda? berikan true jika, false jika TIDAK
  - apakah pihak A merupakan bagian dari Lainnya?
  apabila terdapat pihak yang memenuhi kelompok 'jenis pihak', berikan true.
  utamakan dan ikuti catatan di bawah saat mengelompokan jenis pihak.
  catatan:
  - segala macam pihak/perwakilan yang berasal dari Kementrian (Kemen... atau Menteri), termasuk Kementrian Keuangan (Kemenkeu) itu sendiri, masuk ke dalam kelompok 'Lainnya'.
  - segala macam pihak/perwakilan yang berasal dari Universitas, Institut, Politeknik, Sekolah Tinggi masuk ke dalam kelompok 'Lainnya'.
  - segala macam pihak/perwakilan yang berasal dari Badan Layanan Umum (BLU) atau Badan Layanan Umum Daerah (BLUD) masuk ke dalam kelompok 'Lainnya'.
  - segala macam pihak/perwakilan yang berasal dari Rumah Sakit Umum (RSU) atau Rumah Sakit Umum Daerah (RSUD) masuk ke dalam kelompok 'Lainnya'.
  - local expert masuk ke dalam kelompok 'Lainnya'.

  berikan alasan anda saat mengelompokan jenis pihak dan identifikasi pejabat.

  contoh:
  - Kegiatan A
    - Pihak yang terlibat: Pejabat Eselon II serta para pejabat dan pegawai instansi vertikal Kementerian Keuangan di wilayah XXX.
    analisis: 'instansi vertikal Kementerian Keuangan' bukan bagian dari DJPb maupun Pemda tetapi bagian dari kementrian atau pusat. maka 'instansi vertikal Kementerian Keuangan' termasuk ke dalam lainnya.
  - Kegiatan B
    - Pihak yang terlibat: Direktur DDIOKK dan Tim Reguler Dana Otsus, DJPK, Direktur Fasilitasi Transfer dan Pembiayan Utang Daerah, Kemendagri, Direktur Regional 3 Bappenas, dan Kanwil Ditjen Perbendaharaan Provinsi XXX.
    analisis:
    - DDIOKK, Dana Otsus, Direktur Fasilitasi Transfer dan Pembiayan Utang Daerah, dan Direktur Regional 3 Bappenas bukan bagian dari DJPb maupun Pemda sehingga dimasukkan ke dalam lainnya.
    - begitu juga dengan Kemendagri yang merupakan bagian dari kementrian sehingga dimasukkan ke dalam lainnya.
    - sedangkan Kanwil Ditjen Perbendaharaan merupakan bagian dari DJPb.
    maka jawaban yang benar adalah djpb true, pemda false, dan lainnya true.
  - Kegiatan C
    - Pihak yang terlibat: anggota perwakilan BP3OKP, serta seluruh BPKAD lingkup XXX, serta Kepala KPPN lingkup Kanwil DJPb XXX.
    analisis:
    - BP3OKP bukanlah bagian dari DJPb ataupun Pemda sehingga termasuk ke dalam lainnya.
    - BPKAD merupakan bagian dari Pemda.
    - Kepala KPPN lingkup Kanwil DJPb merupakan bagian dari DJPb.
    maka jawaban yang benar adalah djpb true, pemda true, dan lainnya true.

  jawaban:
  [
    {
      kegiatan: 'Kegiatan A',
      pihak: 'Pejabat Eselon II serta para pejabat dan pegawai instansi vertikal Kementerian Keuangan di wilayah XXX.',
      djpb: false,
      pemda: false,
      lainnya: true,
      alasan: 'instansi vertikal Kementerian Keuangan bukan bagian dari DJPb maupun Pemda sehingga instansi vertikal Kementerian Keuangan termasuk ke dalam lainnya.',
    },
    {
      kegiatan: 'Kegiatan B',
      pihak: 'Direktur DDIOKK dan Tim Reguler Dana Otsus, DJPK, Direktur Fasilitasi Transfer dan Pembiayan Utang Daerah, Kemendagri, Direktur Regional 3 Bappenas, dan Kanwil Ditjen Perbendaharaan Provinsi XXX.',
      djpb: true,
      pemda: false,
      lainnya: true,
      alasan: 'DDIOKK, Dana Otsus, Direktur Fasilitasi Transfer dan Pembiayan Utang Daerah, Kemendagri, dan Direktur Regional 3 Bappenas bukan bagian dari DJPb maupun Pemda sehingga dimasukkan ke dalam lainnya. begitu juga dengan Kemendagri yang merupakan bagian dari kementrian sehingga dimasukkan ke dalam lainnya. sedangkan Kanwil Ditjen Perbendaharaan merupakan bagian dari DJPb.',
    },
    {
      kegiatan: 'Kegiatan C',
      pihak: 'anggota perwakilan BP3OKP, serta seluruh BPKAD lingkup XXX, serta Kepala KPPN lingkup Kanwil DJPb XXX.',
      djpb: true,
      pemda: true,
      lainnya: true,
      alasan: 'BP3OKP bukanlah bagian dari DJPb ataupun Pemda sehingga termasuk ke dalam lainnya. BPKAD merupakan bagian dari Pemda. Kepala KPPN lingkup Kanwil DJPb merupakan bagian dari DJPb.',
    },
  ]

2. mengidentifikasi 'pejabat Pemerintah Daerah (Pemda)' pada setiap kegiatan dengan mempertimbangkan jabatannya.
  - tingkat jabatan:
    - Pimpinan Daerah
      - Gubernur atau Penanggung Jawab (Pj.) Gubernur
      - Walikota
      - Bupati
      - Wakil Gubernur (Wagub)
      - Wakil Walikota (Wawali)
      - Wakil Bupati (Wabup)
    - Kepala Dinas
    - Kepala BPKAD
  - adakah jabatan yang tercantum secara EKSPLISIT di dalam 'pihak yang terlibat' pada setiap kegiatan?
    - jika ada, apa jabatannya?
    - berikan ke dalam suatu array string.
  - contoh:
    - Kegiatan A
      - Pihak yang terlibat: Sekretaris BPKAD Kab. XXX, perwakilan OPD dan DPMK Daerah Kab. XXX, hadir pula Kepala Seksi Bank KPPN XXX beserta staf.
      maka tidak ada pejabat yang terlibat pada Kegiatan A karena Sekretasis dan Kepala Seksi Bank TIDAK ADA di dalam 'tingkat jabatan'.
      jawaban:
        pejabat: []
    - Kegiatan B
      - Pihak yang terlibat: Gubernur Papua Barat beserta jajaran, Seluruh OPD di Provinsi Papua Barat, Perwakilan Kemendagri, serta Perwakilan Bappenas.
      maka pejabat yang terlibat pada kegiatan B adalah Gubernur.
      jawaban:
        pejabat: ['Gubernur']
    - Kegiatan C
      - Pihak yang terlibat: Kepala Perwakilan BI di Provinsi Papua Barat, Ketua MRP Provinsi Papua Barat Daya, Kepala BP3OKP Papua Barat Daya, Pimpinan/ Kepala Daerah Kabupaten/ Kota lingkup Papua Barat Daya, Forkopimda, Pimpinan Instansi Vertikal serta dari unsur pengusaha atau swasta.
      maka pejabat yang terlibat pada kegiatan C adalah Walikota dan Bupati karena terdapat Pimpinan/ Kepala Daerah Kabupaten/ Kota lingkup Papua Barat Daya yang mewakili Walikota/ Bupati.
      jawaban:
        pejabat: ['Walikota', 'Bupati']
    - Kegiatan D
      - Pihak yang terlibat: seluruh Pemda dan OPD Lingkup Kabupaten Manokwari.
      maka tidak ada pejabat yang terlibat pada Kegiatan D karena tidak menyebutkan 'tingkat jabatan' secara eksplisit pada pihak yang terlibat.
      jawaban:
        pejabat: []

berikan jawaban dalam format JSON di bawah.
[
  {
    kegiatan: 'Kegiatan A',
    pihak: 'pihak a, pihak s',
    djpb: true atau false,
    pemda: true atau false,
    lainnya: true atau false,
    alasan: '',
    pejabat: [ 'Gubernur', 'Walikota', 'Bupati', 'Wagub', 'Wawali', 'Wabup', 'Kepala Dinas', 'Kepala BPKAD' ],
  },
  {
    kegiatan: 'Kegiatan B',
    pihak: 'pihak g, pihak h',
    djpb: true atau false,
    pemda: true atau false,
    lainnya: true atau false,
    alasan: '',
    pejabat: [ 'Gubernur', 'Walikota', 'Bupati', 'Wagub', 'Wawali', 'Wabup', 'Kepala Dinas', 'Kepala BPKAD' ],
  },
]

`;

// tidak ada 'alasan' dari prompt5
const kegiatanPihakJsonSchema6 = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      kegiatan: {
        type: SchemaType.STRING,
        nullable: false,
      },
      djpb: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      pemda: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      lainnya: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      pejabat: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.STRING,
        },
      },
    },
    required: [
      'kegiatan', 'djpb', 'pemda', 'lainnya', 'pejabat',
    ],
  },
};

const kegiatanPihakJsonPrompt6 = `
dari daftar kegiatan terlampir, anda akan diberikan dua tugas, yaitu:
1. mengidentifikasi 'pihak yang terlibat' berdasarkan 'jenis pihak'.
  terdapat tiga pihak, yaitu DJPb, Pemerintah Daerah (Pemda), dan Lainnya.
  pihak Lainnya merupakan pihak yang BUKAN bagian dari kelompok DJPb dan Pemda.
  apabila terdapat pihak yang memenuhi kelompok 'jenis pihak', berikan true.
  utamakan dan ikuti catatan di bawah saat mengelompokan jenis pihak.
  catatan:
  - segala macam pihak/perwakilan yang berasal dari Kementrian (Kemen... atau Menteri), termasuk Kementrian Keuangan (Kemenkeu) itu sendiri, masuk ke dalam kelompok 'Lainnya'.
  - segala macam pihak/perwakilan yang berasal dari Universitas, Institut, Politeknik, Sekolah Tinggi masuk ke dalam kelompok 'Lainnya'.
  - segala macam pihak/perwakilan yang berasal dari Badan Layanan Umum (BLU) atau Badan Layanan Umum Daerah (BLUD) masuk ke dalam kelompok 'Lainnya'.
  - segala macam pihak/perwakilan yang berasal dari Rumah Sakit Umum (RSU) atau Rumah Sakit Umum Daerah (RSUD) masuk ke dalam kelompok 'Lainnya'.
  - local expert masuk ke dalam kelompok 'Lainnya'.

  contoh:
  - Kegiatan A
    - Pihak yang terlibat: Pejabat Eselon II serta para pejabat dan pegawai instansi vertikal Kementerian Keuangan di wilayah XXX.
    analisis: 'instansi vertikal Kementerian Keuangan' bukan bagian dari DJPb maupun Pemda tetapi bagian dari kementrian atau pusat. maka 'instansi vertikal Kementerian Keuangan' termasuk ke dalam lainnya.
  - Kegiatan B
    - Pihak yang terlibat: Direktur DDIOKK dan Tim Reguler Dana Otsus, DJPK, Direktur Fasilitasi Transfer dan Pembiayan Utang Daerah, Kemendagri, Direktur Regional 3 Bappenas, dan Kanwil Ditjen Perbendaharaan Provinsi XXX.
    analisis:
    - DDIOKK, Dana Otsus, Direktur Fasilitasi Transfer dan Pembiayan Utang Daerah, dan Direktur Regional 3 Bappenas bukan bagian dari DJPb maupun Pemda sehingga dimasukkan ke dalam lainnya.
    - begitu juga dengan Kemendagri yang merupakan bagian dari kementrian sehingga dimasukkan ke dalam lainnya.
    - sedangkan Kanwil Ditjen Perbendaharaan merupakan bagian dari DJPb.
    maka jawaban yang benar adalah djpb true, pemda false, dan lainnya true.
  - Kegiatan C
    - Pihak yang terlibat: anggota perwakilan BP3OKP, serta seluruh BPKAD lingkup XXX, serta Kepala KPPN lingkup Kanwil DJPb XXX.
    analisis:
    - BP3OKP bukanlah bagian dari DJPb ataupun Pemda sehingga termasuk ke dalam lainnya.
    - BPKAD merupakan bagian dari Pemda.
    - Kepala KPPN lingkup Kanwil DJPb merupakan bagian dari DJPb.
    maka jawaban yang benar adalah djpb true, pemda true, dan lainnya true.

2. berdasarkan pihak yang hadir pada daftar kegiatan terlampir, identifikasi kegiatan mana saja yang secara INDIVIDU DIHADIRI oleh:
  daftar pejabat:
  - Gubernur atau Penanggung Jawab (Pj.) Gubernur atau Kepala/Pimpinan Daerah Provinsi
  - Walikota atau Penanggung Jawab (Pj.) Walikota atau Kepala/Pimpinan Daerah Kota
  - Bupati atau Penanggung Jawab (Pj.) Bupati atau Kepala/Pimpinan Daerah Kabupaten
  - Wakil Gubernur (Wagub) atau Kepala/Pimpinan Daerah Kabupaten
  - Wakil Walikota (Wawali) atau Kepala/Pimpinan Daerah Kabupaten
  - Wakil Bupati (Wabup) atau Kepala/Pimpinan Daerah Kabupaten
  - Kepala Dinas
  - Kepala BPKAD

pejabat pada 'daftar perjabat' harus TERTULIS dengan jelas di 'pihak yang hadir', bukan diwakili.
jika pihak yang terlibat hanya mencantumkan Pemerintah Kota XXX, maka tidak ada pejabat di dalamnya karena Pemerintah Kota terlalu luas dan tidak menyebutkan secara spesifik pejabat yang hadir.
  contoh:
  - Pihak yang hadir: BPKAD Kabupaten xxx dan Kanwil xxx -> tidak ada pejabat pada 'daftar pejabat' yang hadir.
  - Pihak yang hadir: Kepala BPKAD Provinsi xxx, dan pengelola/PIC ... -> pejabat yang hadir adalah Kepala BPKAD.
  - Pihak yang hadir: Pimpinan DPRD, Sekretaris Daerah, Forkopimda, ... -> tidak ada pejabat pada 'daftar pejabat' yang hadir karena Sekretaris tidak termasuk ke dalam 'daftar pejabat'.
pejabat hanya boleh yang tertera pada 'daftar pejabat'.

catatan dalam menentukan pejabat yang hadir pada setiap kegiatan:
- pejabat harus dari pemerintah daerah (Pemda).
- Pj. Gubernur setingkat dengan Gubernur sehingga jika jika pihak adalah Pj. Gubernur maka cukup masukan Gubernur saja.
- anda tidak boleh menggunakan logika anda sendiri, cukup parsing pejabat pada pihak yang hadir dengan mengacu kepada 'daftar pejabat'.
- anda hanya boleh mengidentifikasi pejabat yang hadir berdasarkan 'daftar pejabat yang diberikan'.
- anda tidak boleh menjawab jika pejabat pada 'daftar pejabat' tidak tertulis pada pihak yang hadir.

berikan jawaban dalam format JSON di bawah.
[
  {
    kegiatan: 'Kegiatan A',
    djpb: true atau false,
    pemda: true atau false,
    lainnya: true atau false,
    pejabat: [ 'Gubernur', 'Walikota', 'Bupati', 'Wagub', 'Wawali', 'Wabup', 'Kepala Dinas', 'Kepala BPKAD' ],
  },
  {
    kegiatan: 'Kegiatan B',
    djpb: true atau false,
    pemda: true atau false,
    lainnya: true atau false,
    pejabat: [ 'Gubernur', 'Walikota', 'Bupati', 'Wagub', 'Wawali', 'Wabup', 'Kepala Dinas', 'Kepala BPKAD'  ],
  },
]

`;

// dari prompt6 -> full JSON
const kegiatanPihakJsonSchema7 = {
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      kegiatan: {
        type: SchemaType.STRING,
        nullable: false,
      },
      djpb: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      pemda: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      lainnya: {
        type: SchemaType.BOOLEAN,
        nullable: false,
      },
      pejabat: {
        type: SchemaType.OBJECT,
        properties: {
          gubernur: {
            type: SchemaType.BOOLEAN,
            nullable: false,
          },
          walikota: {
            type: SchemaType.BOOLEAN,
            nullable: false,
          },
          bupati: {
            type: SchemaType.BOOLEAN,
            nullable: false,
          },
          wagub: {
            type: SchemaType.BOOLEAN,
            nullable: false,
          },
          wawali: {
            type: SchemaType.BOOLEAN,
            nullable: false,
          },
          wabup: {
            type: SchemaType.BOOLEAN,
            nullable: false,
          },
        },
        required: [
          'gubernur', 'walikota', 'bupati', 'wagub', 'wawali', 'wabup',
        ]
      },
    },
    required: [
      'kegiatan', 'djpb', 'pemda', 'lainnya', 'pejabat',
    ],
  },
};

const kegiatanPihakJsonPrompt7 = `
dari daftar kegiatan terlampir, anda akan diberikan dua tugas, yaitu:
1. mengidentifikasi 'pihak yang terlibat' berdasarkan 'jenis pihak'.
  terdapat tiga pihak, yaitu DJPb, Pemerintah Daerah (Pemda), dan Lainnya.
  pihak Lainnya merupakan pihak yang BUKAN bagian dari kelompok DJPb dan Pemda.
  kelompokan SETIAP PIHAK dengan mempertimbangkan:
  - apakah pihak A merupakan bagian atau di bawah naungan DJPb? berikan true jika YA, false jika TIDAK
  - apakah pihak A merupakan bagian atau di bawah naungan Pemda? berikan true jika, false jika TIDAK
  - apakah pihak A merupakan bagian dari Lainnya?
  apabila terdapat pihak yang memenuhi kelompok 'jenis pihak', berikan true.
  utamakan dan ikuti catatan di bawah saat mengelompokan jenis pihak.
  catatan:
  - segala macam pihak/perwakilan yang berasal dari Kementrian (Kemen... atau Menteri), termasuk Kementrian Keuangan (Kemenkeu) itu sendiri, masuk ke dalam kelompok 'Lainnya'.
  - segala macam pihak/perwakilan yang berasal dari Universitas, Institut, Politeknik, Sekolah Tinggi masuk ke dalam kelompok 'Lainnya'.
  - segala macam pihak/perwakilan yang berasal dari Badan Layanan Umum (BLU) atau Badan Layanan Umum Daerah (BLUD) masuk ke dalam kelompok 'Lainnya'.
  - segala macam pihak/perwakilan yang berasal dari Rumah Sakit Umum (RSU) atau Rumah Sakit Umum Daerah (RSUD) masuk ke dalam kelompok 'Lainnya'.
  - local expert masuk ke dalam kelompok 'Lainnya'.

  contoh:
  - Kegiatan A
    - Pihak yang terlibat: Pejabat Eselon II serta para pejabat dan pegawai instansi vertikal Kementerian Keuangan di wilayah XXX.
    analisis: 'instansi vertikal Kementerian Keuangan' bukan bagian dari DJPb maupun Pemda tetapi bagian dari kementrian atau pusat. maka 'instansi vertikal Kementerian Keuangan' termasuk ke dalam lainnya.
  - Kegiatan B
    - Pihak yang terlibat: Direktur DDIOKK dan Tim Reguler Dana Otsus, DJPK, Direktur Fasilitasi Transfer dan Pembiayan Utang Daerah, Kemendagri, Direktur Regional 3 Bappenas, dan Kanwil Ditjen Perbendaharaan Provinsi XXX.
    analisis:
    - DDIOKK, Dana Otsus, Direktur Fasilitasi Transfer dan Pembiayan Utang Daerah, dan Direktur Regional 3 Bappenas bukan bagian dari DJPb maupun Pemda sehingga dimasukkan ke dalam lainnya.
    - begitu juga dengan Kemendagri yang merupakan bagian dari kementrian sehingga dimasukkan ke dalam lainnya.
    - sedangkan Kanwil Ditjen Perbendaharaan merupakan bagian dari DJPb.
    maka jawaban yang benar adalah djpb true, pemda false, dan lainnya true.
  - Kegiatan C
    - Pihak yang terlibat: anggota perwakilan BP3OKP, serta seluruh BPKAD lingkup XXX, serta Kepala KPPN lingkup Kanwil DJPb XXX.
    analisis:
    - BP3OKP bukanlah bagian dari DJPb ataupun Pemda sehingga termasuk ke dalam lainnya.
    - BPKAD merupakan bagian dari Pemda.
    - Kepala KPPN lingkup Kanwil DJPb merupakan bagian dari DJPb.
    maka jawaban yang benar adalah djpb true, pemda true, dan lainnya true.

2. parse kegiatan high level meeting.
  kriteria kegiatan high level meeting:
  - terdapat Pejabat:
    - Gubernur atau Penanggung Jawab (Pj.) Gubernur
    - Walikota atau Penanggung Jawab (Pj.) Walikota
    - Bupati atau Penanggung Jawab (Pj.) Bupati
    - Wakil Gubernur (Wagub)
    - Wakil Walikota (Wawali)
    - Wakil Bupati (Wabup)
  - Pj. Gubernur setingkat dengan Gubernur sehingga jika jika pihak adalah Pj. Gubernur maka cukup masukan Gubernur saja.
  - pejabat harus tercantum dengan EKSPLISIT dan JELAS di dalam 'pihak yang terlibat' pada kegiatan tersebut.
  - penjabat harus SPESIFIK dan JELAS, tidak boleh umum.
    contoh: Pemerintah Daerah -> tidak ada pejabat yang tercantum pada Pemerintah Daerah.
  - jika ada masukan berikan true.

berikan jawaban dalam format JSON di bawah.
[
  {
    kegiatan: 'Kegiatan A',
    djpb: true atau false,
    pemda: true atau false,
    lainnya: true atau false,
    pejabat: {
      gubernur: true atau false,
      walikota: true atau false,
      bupati: true atau false,
      wagub: true atau false,
      walikota: true atau false,
      wabup: true atau false,
    },
  },
  {
    kegiatan: 'Kegiatan B',
    djpb: true atau false,
    pemda: true atau false,
    lainnya: true atau false,
    pejabat:  {
      gubernur: true atau false,
      walikota: true atau false,
      bupati: true atau false,
      wagub: true atau false,
      walikota: true atau false,
      wabup: true atau false,
    },
  },
]

`;

const rekomendasiSchema = {
  type: SchemaType.OBJECT,
  properties: {
    nilai: {
      type: SchemaType.NUMBER,
      nullable: false,
    },
    alasan: {
      type: SchemaType.STRING,
      nullable: false,
    },
  },
  required: [
    'nilai', 'alasan',
  ],
};

const rekomendasiPrompt = `
dari dokumen terlampir, identifikasi bagian yang secara KHUSUS membahas mengenai rekomendasi. lalu nilai lah isi rekomendasi dari range 90-99 dengan mempertimbangkan:
- apakah disampaikan dengan jelas dan rinci?
- apakah isi rekomendasi terukur?
- apakah terdapat bagian yang secara khusus membahas stakeholder (pemangku kepentingan) di dalam rekomendasi?
- apakah hal-hal yang direkomendasikan dapat diimplementasikan?
- apakah topik pada rekomendasi sudah spesifik atau tematik?

berikan dalam format JSON di bawah.
{
  nilai: 90-99,
  alasan: '...',
}

`;

const rincianKegiatanPrompt = `
anda adalah seorang ahli dalam memparsing dan mengekstrak kegiatan pada suatu dokumen.
tugas anda adalah memparsing kegiatan yang diminta dan mengekstrak isi dari kegiatan berdasarkan dokumen terlampir.
isi kegiatan yang harus anda ekstrak adalah:
- nama kegiatan
- waktu kegiatan
- tempat kegiatan
- pihak/unit yang terlibat/hadir
- rincian kegiatan
- hasil kegiatan

berikan jawaban dengan urutan:
- nama
- waktu
- tempat
- pihak yang terlibat
- rincian
- hasil

========================

Kegiatan yang diminta: `;

const analisisKegiatanPrompt = `
anda adalah seorang ahli dalam memparsing dan mengekstrak kegiatan pada suatu dokumen.
tugas anda menganalisis kegiatan yang diminta.
dalam melaksanakan tugas anda, terdapat tahapan yang harus anda lakukan, yaitu:
1. parsing kegiatan yang diminta dan ekstrak isi dari kegiatan berdasarkan dokumen terlampir.
  isi kegiatan yang harus anda ekstrak adalah:
  - nama kegiatan
  - waktu kegiatan
  - tempat kegiatan
  - pihak/unit yang terlibat/hadir
  - rincian kegiatan
  - hasil kegiatan

2. analisis kegiatan berdasarkan hasil parsing dan ekstraksi anda dengan mempertimbangkan:
  - apakah kegiatan melibatkan pihak eksternal Non-DJPb (Ditje Perbendaharaan)?
  - apakah kegiatan melibatkan Pemerintah Daerah (Pemda)?
  - apakah kegiatan tersebut memenuhi kriteria kegiatan forum/tim daerah? sebutkan alasan berdasarkan kriterianya.
  - adakah pejabat pemda tingkat gubernur, walikota, bupati atau para wakilnya pada kegiatan tersebut?

tidak perlu memberikan rincian kegiatan pada jawaban.
berikan markdown pada jawaban.

hanya berikan jawaban dari hasil analisis anda dengan format di bawah.
**Pihak Non-DJPb**: aaa, bbb -> hanya masukan pihak dari yang bukan dari DJPb dan Pemda.

**Pemda**: aaa, bbb -> hanya masukan pihak dari Pemda.

**Forum/Tim di Daerah**: Ya, karena ...

**Pejabat Pemda**: Tidak ada pejabat di tingkat gubernur, walikota, maupun bupati pada kegiatan ini.

`;

export const promptMap = new Map();

promptMap.set('ekstrakKegiatanNonPihakJSON', {
  prompt: ekstrakKegiatanNonPihakJsonPrompt4,
  schema: ekstrakKegiatanNonPihakJsonSchema4,
});

promptMap.set('ekstrakKegiatanPihakJSON', {
  prompt: ekstrakKegiatanPihakJsonPrompt,
  schema: ekstrakKegiatanPihakJsonSchema,
});

promptMap.set('nilaiAdministratif', {
  prompt: nilaiAdministratifPrompt,
  schema: nilaiAdministratifSchema,
});

promptMap.set('kegiatanPihak', {
  prompt: kegiatanPihakJsonPrompt6,
  schema: kegiatanPihakJsonSchema6,
});

promptMap.set('rekomendasi', {
  prompt: rekomendasiPrompt,
  schema: rekomendasiSchema,
});

promptMap.set('rincianKegiatan', rincianKegiatanPrompt);
promptMap.set('analisisKegiatan', analisisKegiatanPrompt);