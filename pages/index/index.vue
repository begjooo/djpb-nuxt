<script setup lang="ts">

const {
  foldersAndFiles: fkpknList,
} = await useFoldersAndFiles();

</script>

<template>
  <div class="p-2">
    <TreeItem :items="fkpknList" />
  </div>
</template>
