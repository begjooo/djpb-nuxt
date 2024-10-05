<script setup lang="ts">

const { $graphClient } = useNuxtApp();
const test1 = $graphClient;
const test2 = useNuxtApp().graphClient;

</script>

<template>
  <div>
    SOP {{ $graphClient }} {{ test1 }} {{ test2 }}
  </div>
</template>