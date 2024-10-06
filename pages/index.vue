<script setup lang="ts">

// import { graphHandler } from '../server/utils/graphHandler';

// const { data: siteColumns } = await useFetch(`/api/set-sites-columns`);
// console.log(siteColumns.value); 

const { data,execute } = await useFetch('/api/file-list');
const allFkpknList = ref([]);
function readFileRecursively(list: any[], result: any[]): any {
    for (const item of list) {
      if (item.type === "folder" && item.children.length !== 0) {
        readFileRecursively(item.children, result);
      } else if (item.type === "file") {
        result.push(item);
      }
    }
  }

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