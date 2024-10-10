<script setup lang="ts">

const fkpknList = await useFkpknList();
// const fkpknListUseState = dataUseState();

</script>

<template>
  <div class="p-2">
    <!-- <div>ini useState: {{ fkpknListUseState }}</div> -->
    <div v-for="item in fkpknList">
      {{ item.name }}
      <!-- {{ item.fields }} -->
    </div>
  </div>
</template>
