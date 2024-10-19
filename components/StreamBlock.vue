<script setup lang="ts">

const props = defineProps({
  teks: String,
  judul: String,
});

</script>

<template>
  <div>
    <div v-if="props.teks !== ''">
      <div class="font-bold text-xl">{{ props.judul }}</div>
      <MDC :value="props.teks!" />
    </div>
    <div v-else>
      Pilih kegiatan
    </div>
  </div>
</template>