<script setup lang="ts">

const props = defineProps({
  item: Object,
});

const isOpen = ref(false);
const isSelected = ref(false);

const isFolder = computed(() => {
  return props.item.children && props.item.children.length !== 0;
});

function toggle(){
  isOpen.value = !isOpen.value;
};

const fileList = ref([]);
const currentFolderName = useState('selected-folder-name', () => '');

async function selectedFolder(driveItemId: string, folderName: string){
  currentFolderName.value = folderName;
  await useFileList(driveItemId);
};

</script>

<template>
  <li>
    <span v-if="isFolder">
      <span @click="toggle">
        <span v-if="isFolder">
          <span v-if="!isOpen">
            <UIcon name="i-material-symbols:expand-circle-right-outline-rounded" class="w-6 h-6 align-middle" />
          </span>
          <span v-else>
            <UIcon name="i-material-symbols:expand-circle-down-outline-rounded" class="w-6 h-6 align-middle" />
          </span>
        </span>
      </span>
      <UButton color="black" variant="link"
        @click="selectedFolder(item.id, item.name)">
        {{ item.name }}
      </UButton>
    </span>
    <ul v-show="isOpen" v-if="isFolder" class="pl-2">
      <TreePenilaian v-for="item in item.children" :item="item" />
    </ul>
  </li>
</template>