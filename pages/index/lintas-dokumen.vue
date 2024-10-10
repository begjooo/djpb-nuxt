<script setup lang="ts">

import { parseMarkdown } from '@nuxtjs/mdc/runtime'

const fkpknList = await useFkpknList();
const checkedFile = ref([]);

const inputQuery = ref('');
const responseAi = ref('');
let renderedResponseAi = '';

async function submitQuery(){
  if(checkedFile.value.length !== 0){
    responseAi.value = await useAskAi(inputQuery.value, checkedFile.value);
    renderedResponseAi = responseAi.value;
    // inputQuery.value = '';
  };
};


</script>

<template>
  <div class="flex">
    <div class="w-1/5 h-screen p-2 text-sm">
      <div>
        <ul v-for="item in fkpknList">
          <li class="py-1">
            <input type="checkbox" :id="item.id" :value="item.id" v-model="checkedFile" />
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>

    <div class="border w-4/5 p-2 place-content-stretch">
      <div>
        <form @submit.prevent="submitQuery" class="">
          <textarea
            class="border p-2 resize rounded-md md:w-auto max-w"
            v-model="inputQuery"
            placeholder="Kebutuhan anda"></textarea>
          <div><button class="text-blue-800 hover:bg-blue-200 rounded px-4 py-1 hover:font-bold">Tanya AI</button></div>
        </form>
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
