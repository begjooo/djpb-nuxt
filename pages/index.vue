<script setup lang="ts">

const {
  foldersAndFiles: fkpknList,
} = await useFoldersAndFiles();

const data = useState('watcher-var');

onMounted(() => usePolling(10000));

</script>

<template>
  <div class="p-2">
    <TreeItem :items="fkpknList" />
    {{ data }}
  </div>
</template>
