<script setup lang="ts">

const props = defineProps<{ file: SharepointItem }>();
const file = props.file;

const daftarKegiatan = ref(JSON.parse(file.fields['JSONKegiatanNonPihak']));
const detailKegiatanRef: any = ref('');
const analisisKegiatanRef: any = ref('');

const hasilAi = ref(JSON.parse(file.fields['NilaiAI']));

async function getKegiatan(namaKegiatan: string){
  const { rincianKegiatan, analisisKegiatan } = await useRincianKegiatan(file.id, namaKegiatan);
  detailKegiatanRef.value = rincianKegiatan;
  analisisKegiatanRef.value = analisisKegiatan;
};

const displayKegiatanNonDjpb = ref(false);
const displayKegiatanPemda = ref(false);
const displayKegiatanHighLevel = ref(false);
const displayKegiatanPublikasi = ref(false);
const displayKegiatanForum = ref(false);
const displayKegiatanInovatif= ref(false);

</script>

<template>
  <div class="w-full h-full border">
    <div class="m-1 flex border">
      <div class="m-1 border">Dokumen</div>
      <div class="m-1 border">{{ file.name }}</div>
    </div>
    
    <div class="m-1 border grid grid-cols-6">
      <div class="p-1 border col-span-5 text-center font-bold text-orange-600">Hasil Penilaian <i>Generative</i> AI</div>
      <div class="p-1 border row-span-2 text-center content-center font-bold text-blue-900">Revisi</div>

      <div class="p-1 border text-center font-bold text-blue-900">Parameter</div>
      <div class="p-1 border col-span-3 text-center font-bold text-blue-900">Rincian</div>
      <div class="p-1 border text-center font-bold text-blue-900">Nilai</div>

      <div class="p-1 border text-center content-center">Ketepatan Waktu</div>

      <div class="p-1 border col-span-3">
        <div>Batas Waktu Triwulan <b>{{ new Date(hasilAi.ketepatanWaktu.batas).toISOString().split('T')[0] }}</b></div>
        <div>Tanggal Pengumpulan Laporan <b>{{ new Date(hasilAi.ketepatanWaktu.pengumpulan).toISOString().split('T')[0] }}</b></div>
        <div>Keterangan <b>{{ hasilAi.ketepatanWaktu.alasan }}</b></div>
      </div>
      <div class="p-1 border text-center content-center font-bold">{{ hasilAi.ketepatanWaktu.nilai }}</div>
      <div class="p-1 border">Revisi</div>

      <div class="p-1 border text-center content-center row-span-3">Administratif</div>

      <div class="p-1 border col-span-3">
        <div class="italic text-orange-600">Format Laporan</div>
        <div v-for="(bagian, key) in hasilAi.administratif.format" :key="key">
          <span v-if="key.toString() !== 'nilai' && key.toString() !== 'alasan'">
            <span v-if="bagian === true">
              <UIcon name="icon-park-outline:success" class="w-5 h-5 align-middle text-blue-900" />
            </span>
            <span v-else>
              <UIcon name="material-symbols:error-circle-rounded" class="w-5 h-5 align-middle text-red-500" />
            </span>
            {{ key }}
          </span>
        </div>
        <br>
        <div><b>{{ hasilAi.administratif.format.alasan }}</b></div>
      </div>
      <div class="p-1 border text-center content-center font-bold">{{ hasilAi.administratif.format.nilai }}</div>
      <div class="p-1 border">Revisi</div>
      
      <div class="p-1 border col-span-3">
        <div class="italic text-orange-600">Desain dan Layout</div>
        <div>{{ hasilAi.administratif.desain.alasan }}</div>
      </div>
      <div class="p-1 border text-center content-center font-bold">{{ hasilAi.administratif.desain.nilai }}</div>
      <div class="p-1 border">Revisi</div>
      
      <div class="p-1 border col-span-3">
        <div class="italic text-orange-600">Teknik Penulisan</div>
        <div>{{ hasilAi.administratif.penulisan.alasan }}</div>
      </div>
      <div class="p-1 border text-center content-center font-bold">{{ hasilAi.administratif.penulisan.nilai }}</div>
      <div class="p-1 border">Revisi</div>

      <div class="p-1 border text-center content-center row-span-8">Substantif</div>

      <div class="p-1 border col-span-3">
        <div class="italic text-orange-600">Kegiatan bersama Pihak Eksternal Non-DJPb</div>
        <div>{{ hasilAi.substantif.nondjpb.jumlah }} kegiatan dari {{ hasilAi.substantif.nondjpb.totalKegiatan }} kegiatan.</div>
        <br>
        <div>
          <button @click="displayKegiatanNonDjpb = !displayKegiatanNonDjpb">
            <span class="italic text-blue-900">Daftar Kegiatan </span>
            <span v-if="displayKegiatanNonDjpb">
              <UIcon name="material-symbols:expand-circle-down" class="w-5 h-5 align-middle text-blue-900" />
            </span>
            <span v-else>
              <UIcon name="material-symbols:expand-circle-up" class="w-5 h-5 align-middle text-blue-900" />
              <br>...
            </span>
          </button>
        </div>
        <div v-if="displayKegiatanNonDjpb" v-for="kegiatan in hasilAi.substantif.nondjpb.daftar" class="border-b border-gray-400 py-0.5">
          {{ kegiatan }}
        </div>
      </div>
      <div class="p-1 border text-center content-center font-bold">{{ hasilAi.substantif.nondjpb.nilai }}</div>
      <div class="p-1 border">Revisi</div>

      <div class="p-1 border col-span-3">
        <div class="italic text-orange-600">Kegiatan bersama Pemerintah Daerah</div>
        <div>{{ hasilAi.substantif.pemda.jumlah }} kegiatan dari {{ hasilAi.substantif.pemda.totalKegiatan }} kegiatan (<b>{{ hasilAi.substantif.pemda.persentase * 100 }}%</b>).</div>
        <br>
        <div>
          <button @click="displayKegiatanPemda = !displayKegiatanPemda">
            <span class="italic text-blue-900">Daftar Kegiatan </span>
            <span v-if="displayKegiatanPemda">
              <UIcon name="material-symbols:expand-circle-down" class="w-5 h-5 align-middle text-blue-900" />
            </span>
            <span v-else>
              <UIcon name="material-symbols:expand-circle-up" class="w-5 h-5 align-middle text-blue-900" />
              <br>...
            </span>
          </button>
        </div>
        <div v-if="displayKegiatanPemda" v-for="kegiatan in hasilAi.substantif.pemda.daftar" class="border-b border-gray-400 py-0.5">
          {{ kegiatan }}
        </div>
      </div>
      <div class="p-1 border text-center content-center font-bold">{{ hasilAi.substantif.pemda.nilai }}</div>
      <div class="p-1 border">Revisi</div>

      <div class="p-1 border col-span-3">
        <div class="italic text-orange-600">Kegiatan High Level Meeting</div>
        <div>{{ hasilAi.substantif.pejabat.jumlah.jumlah }} kegiatan <i>high level meeting</i></div>
        <div>Nilai berdasarkan jumlah kegiatan <i>high level meeting</i> <b>{{ hasilAi.substantif.pejabat.jumlah.nilaiAkhir }}</b></div>
        <div>Nilai berdasarkan keterlibatan pejabat <b>{{ hasilAi.substantif.pejabat.pejabat.nilaiAkhir }}</b></div>
        <br>
        <div>
          <button @click="displayKegiatanHighLevel = !displayKegiatanHighLevel">
            <span class="italic text-blue-900">Daftar Kegiatan </span>
            <span v-if="displayKegiatanHighLevel">
              <UIcon name="material-symbols:expand-circle-down" class="w-5 h-5 align-middle text-blue-900" />
            </span>
            <span v-else>
              <UIcon name="material-symbols:expand-circle-up" class="w-5 h-5 align-middle text-blue-900" />
              <br>...
            </span>
          </button>
        </div>
        <div v-if="displayKegiatanHighLevel" v-for="kegiatan in hasilAi.substantif.pejabat.jumlah.daftar" class="flex border-b border-gray-400 py-0.5">
          <div class="w-2/3 content-center">{{ kegiatan.kegiatan }}</div>
          <div class="w-1/3 content-center">
            <div v-for="pejabat in kegiatan.pejabat">
              - {{ pejabat }}
            </div>
          </div>
        </div>
      </div>
      <div class="p-1 border text-center content-center font-bold">{{ hasilAi.substantif.pejabat.nilai }}</div>
      <div class="p-1 border">Revisi</div>

      <div class="p-1 border col-span-3">
        <div class="italic text-orange-600">Variasi Bidang Kegiatan</div>
        <div>Jumlah variasi bidang kegiatan <b>{{ hasilAi.substantif.bidang.jumlah }}</b></div>
        <div v-for="variasi in hasilAi.substantif.bidang.variasi" class="italic">
          - {{ variasi }}
        </div>
      </div>
      <div class="p-1 border text-center content-center font-bold">{{ hasilAi.substantif.bidang.nilai }}</div>
      <div class="p-1 border">Revisi</div>

      <div class="p-1 border col-span-3">
        <div class="italic text-orange-600">Kegiatan Komunikasi atau Publikasi</div>
        <div>
          <button @click="displayKegiatanPublikasi = !displayKegiatanPublikasi">
            <span class="italic text-blue-900">Daftar Kegiatan </span>
            <span v-if="displayKegiatanPublikasi">
              <UIcon name="material-symbols:expand-circle-down" class="w-5 h-5 align-middle text-blue-900" />
            </span>
            <span v-else>
              <UIcon name="material-symbols:expand-circle-up" class="w-5 h-5 align-middle text-blue-900" />
              <br>...
            </span>
          </button>
        </div>
        <div v-if="displayKegiatanPublikasi" v-for="kegiatan in hasilAi.substantif.publikasi.kegiatan" class="flex border-b border-gray-400 py-0.5">
          {{ kegiatan }}
        </div>
      </div>
      <div class="p-1 border text-center content-center font-bold">{{ hasilAi.substantif.publikasi.nilai }}</div>
      <div class="p-1 border">Revisi</div>

      <div class="p-1 border col-span-3">
        <div class="italic text-orange-600">Kegiatan Forum atau Tim di Daerah</div>
        <div>Jumlah kegiatan forum atau tim di daerah <b>{{ hasilAi.substantif.forum.jumlah }} kegiatan</b></div>
        <br>
        <div>
          <button @click="displayKegiatanForum = !displayKegiatanForum">
            <span class="italic text-blue-900">Daftar Kegiatan </span>
            <span v-if="displayKegiatanForum">
              <UIcon name="material-symbols:expand-circle-down" class="w-5 h-5 align-middle text-blue-900" />
            </span>
            <span v-else>
              <UIcon name="material-symbols:expand-circle-up" class="w-5 h-5 align-middle text-blue-900" />
              <br>...
            </span>
          </button>
        </div>
        <div v-if="displayKegiatanForum" v-for="kegiatan in hasilAi.substantif.forum.kegiatan" class="flex border-b border-gray-400 py-0.5">
          {{ kegiatan }}
        </div>
      </div>
      <div class="p-1 border text-center content-center font-bold">{{ hasilAi.substantif.forum.nilai }}</div>
      <div class="p-1 border">Revisi</div>

      <div class="p-1 border col-span-3">
        <div class="italic text-orange-600">Kegiatan yang bersifat Inovatif atau Tematik</div>
        <div>Jumlah kegiatan yang bersifat inovatif atau tematik <b>{{ hasilAi.substantif.inovasi.jumlah }} kegiatan</b></div>
        <br>
        <div>
          <button @click="displayKegiatanInovatif = !displayKegiatanInovatif">
            <span class="italic text-blue-900">Daftar Kegiatan </span>
            <span v-if="displayKegiatanInovatif">
              <UIcon name="material-symbols:expand-circle-down" class="w-5 h-5 align-middle text-blue-900" />
            </span>
            <span v-else>
              <UIcon name="material-symbols:expand-circle-up" class="w-5 h-5 align-middle text-blue-900" />
              <br>...
            </span>
          </button>
        </div>
        <div v-if="displayKegiatanInovatif" v-for="kegiatan in hasilAi.substantif.inovasi.kegiatan" class="flex border-b border-gray-400 py-0.5">
          <div class="w-2/3 content-center">{{ kegiatan.kegiatan }}</div>
          <div class="w-1/3 content-center text-center italic">{{ kegiatan.inovasi }}</div>
        </div>
      </div>
      <div class="p-1 border text-center content-center font-bold">{{ hasilAi.substantif.inovasi.nilai }}</div>
      <div class="p-1 border">Revisi</div>

      <div class="p-1 border col-span-3">
        <div class="italic text-orange-600">Rekomendasi</div>
        <div>{{ hasilAi.substantif.rekomendasi.alasan }}</div>
      </div>
      <div class="p-1 border text-center content-center font-bold">{{ hasilAi.substantif.rekomendasi.nilai }}</div>
      <div class="p-1 border">Revisi</div>
      
      <div class="p-1 border text-center content-center">Nilai Total</div>

      <div class="p-1 border col-span-3">
        <div>Ketepatan Waktu (8%) + Nilai Administratif (32%) + Nilai Substantif (60%)</div>
      </div>
      <div class="p-1 border text-center content-center font-bold">{{ hasilAi.total }}</div>
      <div class="p-1 border"></div>
      
    </div>
    
    <div class="m-1 border flex">
      <div class="m-1 border w-2/12">
        <div class="m-1 border text-center">{{ daftarKegiatan.length }} Kegiatan</div>
        <div class="m-1 border max-h-screen overflow-auto">
          <div v-for="kegiatan of daftarKegiatan">
            <button
              @click="getKegiatan(kegiatan.kegiatan)"
              class="text-left hover:font-bold text-sm py-1 pr-2 border-b"
            >
              {{ kegiatan.kegiatan }}
            </button>
          </div>
        </div>
      </div>
      <div class="m-1 border w-6/12 h-screen overflow-auto rounded">
        <StreamBlock :teks="detailKegiatanRef" judul="Rincian Kegiatan" />
      </div>
      <div class="m-1 border w-4/12 h-screen overflow-auto rounded">
        <StreamBlock :teks="analisisKegiatanRef" judul="Analisis Kegiatan" />
      </div>
    </div>
  </div>
</template>