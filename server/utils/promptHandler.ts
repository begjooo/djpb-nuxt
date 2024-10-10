import { SchemaType } from "@google/generative-ai";

const kegiatanJsonPrompt = `

`;

const kegiatanJsonSchema = {

};

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

export const promptMap = new Map();

promptMap.set('KegiatanJSON', {
  prompt: kegiatanJsonPrompt,
  schema: kegiatanJsonSchema,
});

promptMap.set('nilaiAdministratif', {
  prompt: nilaiAdministratifPrompt,
  schema: nilaiAdministratifSchema,
});

promptMap.set('kegiatanPihak', {
  prompt: kegiatanPihakJsonPrompt2,
  schema: kegiatanPihakJsonSchema2,
});