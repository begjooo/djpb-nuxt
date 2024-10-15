<script setup lang="ts">
import type SharepointFile from "~/utils/SharepointFile";

const props = defineProps<{ items: SharepointFile[] }>();


interface DisplayItem extends SharepointFile {
  isOpen?: boolean;
}

const showItems = computed(() => {
  let modifiedItems: DisplayItem[];
  modifiedItems = props.items;
  return modifiedItems;
});
</script>

<template>
  <div>
    <div v-for="item in showItems">
      <div>
        <div class="flex">
          <div>
            <span v-if="item.type == 'folder'">
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
          </div>
          <div
            @click="item.isOpen=!item.isOpen"
            :class="{ 'font-bold': item.type === 'folder' }"
            class="hover:bg-blue-200 hover:rounded"
          >
            {{ item!.name }} 
          </div>
        </div>

        <div>
          <ul v-show="item.isOpen" v-if="item.type == 'folder'" class="pl-2">
            <TreeItem :items="item!.children as SharepointFile[]" />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
