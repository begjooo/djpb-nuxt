<script setup lang="ts">

import { parseMarkdown } from '@nuxtjs/mdc/runtime'

// const fkpknList = await useFkpknList();

const fkpknList = await useMapFilesAndFolder();
const fkpknListRef = ref({
  name: 'Folder Utama',
  children: fkpknList,
});

const checkedFile: any = useState('selected-files-for-lintas-dok');
const inputQuery = ref('');
const responseAi = ref('');
let renderedResponseAi = '';

async function submitQuery(){
  if(checkedFile.value.length !== 0){
    console.log(checkedFile.value);
    responseAi.value = await useAskAi(inputQuery.value, checkedFile.value);
    renderedResponseAi = responseAi.value;
    // inputQuery.value = '';
  };
};

</script>

<template>
  <div class="flex">

    <div class="w-1/5 h-screen p-2 text-sm">
      <div v-if="fkpknListRef">
        <ul>
          <TreeItemCheck :item="fkpknListRef" />
        </ul>
      </div>

    </div>

    <div class="border w-4/5 p-2 place-content-stretch">
      <div>
        <textarea
          class="border p-2 resize rounded-md md:w-auto max-w"
          v-model="inputQuery"
          placeholder="Kebutuhan anda"></textarea>
        <div>
          <UButton color="white"
            trailing-icon="i-mdi:chat-processing"
            class="text-blue-800 hover:bg-blue-200 rounded hover:font-bold rounded"
            label="Tanya AI"
            @click="submitQuery" />
        </div>
      </div>

      <div class="py-2">
        <div v-if="checkedFile.length === 0" >
          <div class="text-gray-500 italic">Pilih laporan terlebih dahulu...</div>
        </div>
        <div v-if="responseAi !== ''">
          <MDC :value="renderedResponseAi" class="border rounded-md md:w-auto p-2" />
        </div>
      </div>

    </div>

    <!-- <div class="w-1/5 h-screen px-2 text-right">
      <div>FKPKN Terpilih</div>
      <ul v-for="item in checkedFile">
        <li>{{ item }}</li>
      </ul>
    </div> -->
    
  </div>


</template>
