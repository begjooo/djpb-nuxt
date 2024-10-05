<script setup lang="ts">

import { readFileRecursively } from '~/server/services/file-handler';

const { data: siteColumns } = await useFetch(`/api/set-sites-columns`);
console.log(siteColumns.value);

const { data } = await useFetch('/api/file-list');
const allFkpknList = ref([]);
readFileRecursively(data.value, allFkpknList.value);

</script>

<template>
  <div>
    Home
    <div v-for="item in allFkpknList">
      {{ item['name'] }}
    </div>
  </div>
</template>