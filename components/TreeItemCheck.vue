<script setup lang="ts">

const props = defineProps({
  item: Object,
});

const isOpen = ref(false)
const isFolder = computed(() => {
  return props.item.children;
});

function toggle(){
  isOpen.value = !isOpen.value;
};

const selectedFiles = useState('selected-files-for-lintas-dok', () => []);

</script>

<template>
  <li>
    <div @click="toggle" :class="{ 'font-bold': isFolder}" class="hover:font-bold hover:bg-blue-200 hover:rounded">
      <span v-if="isFolder">
        <span v-if="isOpen">
          <UIcon name="i-material-symbols:folder-open-outline-rounded" />
        </span>
        <span v-else>
          <UIcon name="i-material-symbols:folder-outline-rounded" />
        </span>
      </span>
      <span v-else>
        <input type="checkbox" :id="item.id" :value="item.id" v-model="selectedFiles" class="mr-2" />
        <UIcon name="i-ic:outline-insert-drive-file" />
      </span>
      {{ item.name }}
    </div>
    <ul v-show="isOpen" v-if="isFolder" class="pl-2">
      <TreeItemCheck v-for="item in item.children" :item="item" />
    </ul>
  </li>
</template>