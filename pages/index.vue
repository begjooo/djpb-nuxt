<script setup lang="ts">

import { readFileRecursively } from '~/server/services/file-handler';

const { data } = await useFetch('/api/file-list');
let allFkpknList = ref([]);
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