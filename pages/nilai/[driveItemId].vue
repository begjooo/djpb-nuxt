<script setup lang="ts">

const { driveItemId } = useRoute().params;
const file = await useDriveItem(driveItemId.toString());

</script>

<template>
  <div class="p-2">
    <FileDetail :file="file" />
  </div>
</template>