<script setup lang="ts">

const fkpknList = await useFkpknList();
// const fkpknList = useState('fkpkn-list');

</script>

<template>
  <div class="p-2">
    <div v-for="item in fkpknList">
      {{ item.name }}
    </div>
  </div>
</template>
