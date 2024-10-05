<script setup lang="ts">

const item = ref();
const isLoading = ref(true);
const { data } = await useFetch(`/api/drive-item?driveItemId=01KXXEPH7RMST3ILNUGZC3CTMKNAYTPLIT`);
onMounted(async () => {
  item.value = data;
  isLoading.value = false;
});

let intervalId: NodeJS.Timeout;

watch(
  () => isLoading.value,
  (newLoading) => {
    if(newLoading === false){
      intervalId = setInterval(async () => {
        const update = await $fetch(`/api/drive-item?driveItemId=01KXXEPH7RMST3ILNUGZC3CTMKNAYTPLIT`);
        item.value = update;
      }, 5000); 
    } else {
      clearInterval(intervalId);
    };
  },
  { immediate: true },
);

</script>

<template>
  <div>
    <p>Lintas FKPKN</p>
    <div v-if="isLoading">Processing...</div>
    <div v-else>{{ item.fields['Nilai'] }}</div>
  </div>
</template>