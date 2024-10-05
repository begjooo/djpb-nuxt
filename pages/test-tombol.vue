<script setup lang="ts">

import { ref } from 'vue';

const { data: pluginsToApi } = await useFetch('/api/test-api');

const { data: dataApi1 } = await useFetch(`/api/test-tombol`);
const nilai: any = ref('Awal');

function ubahVue(){
  nilai.value = 'Berubah';
  console.log('berubah vue');
};

function ubahApi1(){
  nilai.value = dataApi1.value;
  console.log('berubah api 1:', nilai.value);
};

async function ubahApi2(){
  const inputBaru = 'halo bandung';
  const dataApi2 = await $fetch(`/api/test-tombol?nilai=${inputBaru}`);
  nilai.value = dataApi2;
  console.log('berubah api 2:', nilai.value);
};

watch(nilai, async(nilaiBaru) => {
  if(nilaiBaru.includes('bandung')){
    console.log('watcher!');
  };
});

</script>

<template>
  <div>
    <p>{{ dataApi1 }}</p>
    <p>Nilai: {{ nilai }}</p>
    <p>
      <button
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded my-1"
          @click="ubahVue">
        ubah dari vue
      </button>
    </p>
    <p>
      <button
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded my-1"
          @click="ubahApi1">
        ubah dari api 1
      </button>
    </p>
    <p>
      <button
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded my-1"
          @click="ubahApi2">
        ubah dari api 2
      </button>
    </p>
  </div>

  <div>
    graphClient from plugins
    {{ pluginsToApi }}
  </div>
</template>