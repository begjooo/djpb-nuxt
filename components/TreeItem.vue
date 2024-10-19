<script setup lang="ts">

const props = defineProps<{ items: SharepointItem[] }>();

interface DisplayItem extends SharepointItem {
  isOpen?: boolean,
}; 

const showItems = computed(() => {
  let modifiedItems: DisplayItem[];
  modifiedItems = props.items;
  return modifiedItems;
});

</script>

<template>
  <div v-for="item in showItems">
    <div>
      <div class="flex hover:bg-blue-200 hover:rounded hover:pl-1">
        <div>
          <span v-if="item.type === 'folder'">
            <span v-if="item.isOpen">
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

        <div @click="item.isOpen = !item.isOpen"
          :class="{ 'font-bold': item.type === 'folder' }"
          class="pl-2"
        >
          {{ item.name }}
        </div>
      </div>

      <div>
        <ul v-show="item.isOpen" v-if="item.type === 'folder'" class="pl-2">
          <TreeItem :items="item.children!" />
        </ul>
      </div>
    </div>
  </div>
</template>