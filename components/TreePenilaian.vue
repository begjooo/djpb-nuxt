<script setup lang="ts">

const props = defineProps({
  item: Object,
});

const isOpen = ref(false);
const isFolder = computed(() => {
  return props.item!.children && props.item!.children.length !== 0;
});

function toggle(){
  isOpen.value = !isOpen.value;
};

const currentFolderName = useState('selected-folder-name', () => '');

async function selectedFolder(driveItemId: string, folderName: string){
  currentFolderName.value = folderName;
  const files = props.item!.children.filter((item: any) => item.type === 'file');
  useState('files-in-folder').value = files;
  useState('selected-folder-id').value = driveItemId;
};

</script>

<template>
  <div>
    <span v-if="isFolder">
      <span @click="toggle">
        <span v-if="isFolder">
          <span v-if="!isOpen">
            <UIcon name="i-material-symbols:expand-circle-right-outline-rounded" class="w-5 h-5 align-middle" />
          </span>
          <span v-else>
            <UIcon name="i-material-symbols:expand-circle-down-outline-rounded" class="w-5 h-5 align-middle" />
          </span>
        </span>
      </span>
      <UButton color="black" variant="link"
        @click="selectedFolder(item!.id, item!.name)"
        class="p-0 pb-2 pl-1">
        {{ item!.name }}
      </UButton>
    </span>
    <span v-if="item!.type === 'file'" class="">
      <UIcon name="i-ic:outline-insert-drive-file" /> {{ item!.name }}
    </span>
    <ul v-show="isOpen" v-if="isFolder" class="pl-2 border-l border-amber-500 border-b pb-1 mb-1 rounded">
      <TreePenilaian v-for="item in item!.children" :item="item" />
    </ul>
  </div>
</template>