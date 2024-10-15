<script setup lang="ts">

const props = defineProps({
  item: Object,
});

const isOpen = ref(false);
const isFolder = computed(() => {
  return props.item!.children;
});

function toggle(){
  isOpen.value = !isOpen.value;
};

</script>

<template>
  <div>
    <div @click="toggle" :class="{ 'font-bold': isFolder }" class="hover:bg-blue-200 hover:rounded ">
      <span v-if="isFolder">
        <span v-if="isOpen">
          <UIcon name="i-material-symbols:folder-open-outline-rounded" />
        </span>
        <span v-else>
          <UIcon name="i-material-symbols:folder-outline-rounded" />
        </span>
      </span>
      <span v-else>
        <UIcon name="i-ic:outline-insert-drive-file" />
      </span>
      {{ item!.name }}
    </div>
    <ul v-show="isOpen" v-if="isFolder" class="pl-2">
      <TreeItem v-for="item in item!.children" :item="item" />
    </ul>
  </div>
</template>