<script setup lang="ts">

// const fkpknList = await useFkpknList();
// const fkpknListUseState = dataUseState();

const fkpknList = await useMapFilesAndFolder();
const fkpknListRef = ref({
  name: 'Folder Utama',
  children: fkpknList,
});

</script>

<template>
  <!-- <div class="p-2"> -->
    <!-- <div>ini useState: {{ fkpknListUseState }}</div> -->
    <!-- <div v-for="item in fkpknList">
      {{ item.name }} -->
      <!-- {{ item.fields }} -->
    <!-- </div> -->
  <!-- </div> -->
  
  <div class="p-2">
    <ul>
      <TreeItem :item="fkpknListRef" />
    </ul>
  </div>
</template>
