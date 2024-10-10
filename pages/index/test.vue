<script setup lang="ts">

const responseUseState = useState('angka-1', () => 10);
const responseUseState2 = useState('angka-1', () => {
  return 10;
});
const responseUseState3 = useState('angka-3', () => {
  return 30;
});

const responseUseStateArrowX = useArrowX();
const responseUseStateArrowX2 = useState('arrow-x');
const responseUseStateFunctionX = useFunctionX();
const responseUseStateFunctionX2 = useState('function-x');
const responseUseStateFunctionY = useFunctionY();
const responseUseStateFunctionY2 = useState('function-y');
const responseUseStateAngka100 = useAngka100();

const responseUseRefVar2 = useRefVar2();

const responseUseStateString = useStateString();
const responseUseRefString = useRefString();
const responseUseRefString2 = useRefString2();

const inputData = ref('');
const responseUseInputFetch: any = ref('');

async function submitInput(){
  responseUseInputFetch.value = await useInputFetch(inputData.value);
  inputData.value = ''
};

const geminiFiles = await useGeminiFiles();
console.log(geminiFiles);

const tanggalInput = ref('');

async function submitTanggal(){
  const tw4 = new Date('2024-09-30');
  const date = new Date(tanggalInput.value);
  const sisaWaktu = date.getTime()- tw4.getTime();
  const selisihHari = Math.round(sisaWaktu / (1000 * 3600 * 24));
  console.log(selisihHari, 'hari');
  // tanggalInput.value = await useInputFetch(inputData.value);
  // inputData.value = ''
};

const driveId = '01KXXEPH7RMST3ILNUGZC3CTMKNAYTPLIT';
const driveItem = await useDriveItem(driveId);

const triwulanOptions = [
  [
    {
      label: 'Triwulan I',
      click: () => {
        console.log('Triwulan I');
      },
    },
    {
      label: 'Triwulan II',
      click: () => {
        console.log('Triwulan II');
      },
    },
    {
      label: 'Triwulan III',
      click: () => {
        console.log('Triwulan III');
      },
    },
    {
      label: 'Triwulan IV',
      click: () => {
        console.log('Triwulan IV');
      },
    },
  ],
];

</script>

<template>
  <div class="p-2">
    
    <div>Tempat untuk testing</div>
    
    <br>

    <div>useState</div>
    <div>responseUseState =
      <button class="hover:bg-blue-100 px-2 rounded" @click="responseUseState--">-</button>
      {{ responseUseState }}
      <button class="hover:bg-blue-100 px-2 rounded" @click="responseUseState++">+</button>
    </div>
    <div>responseUseState2 = {{ responseUseState2 }}</div>
    <div>responseUseState3 =
      <button class="hover:bg-blue-100 px-2 rounded" @click="responseUseState3 = responseUseState3 - 2">-</button>
      {{ responseUseState3 }}
      <button class="hover:bg-blue-100 px-2 rounded" @click="responseUseState3 = responseUseState3 + 2">+</button>
    </div>
    <div>responseUseStateArrowX = {{ responseUseStateArrowX }}</div>
    <div>responseUseStateArrowX2 = {{ responseUseStateArrowX2 }}</div>
    <div>responseUseStateFunctionX = {{ responseUseStateFunctionX }}</div>
    <div>responseUseStateFunctionX2 = {{ responseUseStateFunctionX2 }}</div>
    <div>responseUseStateFunctionY = {{ responseUseStateFunctionY }}</div>
    <div>responseUseStateFunctionY2 = {{ responseUseStateFunctionY2 }}</div>
    <div>responseUseStateAngka100 =
      <button class="hover:bg-blue-100 px-2 rounded" @click="responseUseStateAngka100--">-</button>
      {{ responseUseStateAngka100 }}
      <button class="hover:bg-blue-100 px-2 rounded" @click="responseUseStateAngka100++">+</button>
    </div>
    <div>responseUseRefVar2 =
      <button class="hover:bg-blue-100 px-2 rounded" @click="responseUseRefVar2--">-</button>
      {{ responseUseRefVar2 }}
      <button class="hover:bg-blue-100 px-2 rounded" @click="responseUseRefVar2++">+</button>
    </div>

    <div>
      useStateString <input class="border px-2" v-model="responseUseStateString" type="text" />
      {{ responseUseStateString }}
    </div>
    <div>
      useRefString <input class="border px-2" v-model="responseUseRefString" type="text" />
      {{ responseUseRefString }}
    </div>
    <div>
      useRefString2 <input class="border px-2" v-model="responseUseRefString2" type="text" />
      {{ responseUseRefString2 }}
    </div>

    <br>

    <div>
      <form @submit.prevent="submitInput" class="">
        <textarea
          class="border p-2 resize rounded-md md:w-auto"
          v-model="inputData"
          placeholder="query"></textarea>
        <div><button class="border px-2 w-14">></button></div>
      </form>
      <div>{{ responseUseInputFetch }}</div>
    </div>

    <br>

    <div class="flex gap-4">
      Gemini Files
      <div v-if="geminiFiles === undefined">Kosong</div>
      <div v-else>
        <div v-for="file in geminiFiles">
          {{ file.displayName }}
        </div>
      </div>
    </div>

    <br>

    <div>
      <div>
        <form @submit.prevent="submitTanggal" class="">
          <input class="border px-1" type="date" v-model="tanggalInput" />
          <div><button class="border px-2 w-14">></button></div>
        </form>
      </div>
      <div>{{ tanggalInput }}</div>
    </div>

    <br>

    <div>
      {{ driveItem.name }}
    </div>

    <div>
      <UDropdown :items="triwulanOptions" :popper="{ placement: 'bottom-start' }">
        <UButton color="blue" trailing-icon="i-heroicons-chevron-down-20-solid" size="2xs"/>
      </UDropdown>
    </div>

  </div>
</template>