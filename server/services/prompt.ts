import { SchemaType } from "@google/generative-ai";

export const promptMap = new Map();

export const testPrompt = `
dari dokumen terlampir, sebutkan:
- Judul Dokumen
- Masalah
- Kesimpulan
`;

export const extractKegiatanJsonSchema = {
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
      pihak:  {
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
      'kegiatan', 'jenis', 'bidang', 'waktu', 'tempat', 'pihak', 'pejabat', 'inovasi', 'forum', 'publikasi',
    ],
  },
};

export const extractKegiatanJsonPrompt = `
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

export const extractKegiatanJsonSchema2 = {
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
      pihak:  {
        type: SchemaType.STRING,
        nullable: false,
      },
    },
    required: [
      'kegiatan', 'jenis', 'bidang', 'waktu', 'tempat', 'pihak',
    ],
  },
};

export const extractKegiatanJsonPrompt2 = `
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

berikan jawaban dalam format JSON.

[
  {
    kegiatan: 'Nama Kegiatan',
    jenis: rutin, strategis, atau expert,
    bidang: pilih satu dari empat opsi 'daftar bidang' kegiatan,
    waktu: '9 September 2024',
    tempat: 'Tempat diselenggarakannya kegiatan',
    pihak: 'pihak A, pihak B, ...',
  },
  {
    kegiatan: 'Nama Kegiatan',
    jenis: Rutin/Periodik, Strategis/Tematik, atau Local Expert,
    bidang: pilih satu dari empat opsi 'daftar bidang' kegiatan,
    waktu: '15 September 2024',
    tempat: 'Tempat diselenggarakannya kegiatan',
    pihak: 'pihak A, pihak B, ...',
  },
  ...
]
`;

export const extractKegiatanPrompt = `
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
]
`;

export const nilaiAdministratifSchema = {
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

export const nilaiAdministratifPrompt = `
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

export const kegiatanPihakJsonSchema = {
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

export const kegiatanPihakJsonPrompt = `
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

export const kegiatanPihakJsonSchema2 = {
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

export const kegiatanPihakJsonPrompt2 = `
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