<script setup lang="ts">
import type { SharepointFile } from "#imports";

// const { data: fkpknList, refresh: getFileList, execute} = await useFetch(
//     `/api/sites/map-files-and-folders`,
//     {immediate:true,}
//   );

const {
  fileList: fkpknList,
  getFileList,
  isFetchingFileList,
} = await useFileList();

const fkpknListRef = ref({
  name: "Folder Utama",
  children: fkpknList,
});
</script>

<template>
  <div class="p-2">
    <TreeItem :items="fkpknList as SharepointFile[]" />
  </div>
  Is it fetching: {{ isFetchingFileList }}
  <button @click="getFileList()">Refresh</button>
</template>
