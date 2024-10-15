<script setup lang="ts">

const fkpknList = useState('map-files-and-folders');
const fkpknListRef = ref({
  name: 'Folder Utama',
  children: fkpknList,
});

</script>

<template>
  
  <div class="p-2">
    <TreeItem :item="fkpknListRef" />
  </div>
</template>
