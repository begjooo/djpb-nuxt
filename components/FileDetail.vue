<script setup lang="ts">

const props = defineProps<{ file: SharepointItem }>();
const file = props.file;

const daftarKegiatan = ref(JSON.parse(file.fields['JSONKegiatanNonPihak']));
const detailKegiatanRef: any = ref('');
const analisisKegiatanRef: any = ref('');

async function getKegiatan(namaKegiatan: string){
  const { rincianKegiatan, analisisKegiatan } = await useRincianKegiatan(file.id, namaKegiatan);
  detailKegiatanRef.value = rincianKegiatan;
  analisisKegiatanRef.value = analisisKegiatan;
};

</script>

<template>
  <div class="w-full h-full border">
    <div class="m-1 flex border">
      <div class="m-1 border">Dokumen</div>
      <div class="m-1 border">{{ file.name }}</div>
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