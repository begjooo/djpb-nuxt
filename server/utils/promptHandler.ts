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
    pejabat: [ 'Gubernur', 'Walikota', 'Bupati', 'Wagub', 'Wawali', 'Wabup', 'Kepala Dinas', 'Kepala BPKAD' ],
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

export const promptMap = new Map();

promptMap.set('ekstrakKegiatanNonPihakJSON', {
  prompt: ekstrakKegiatanNonPihakJsonPrompt3,
  schema: ekstrakKegiatanNonPihakJsonSchema3,
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