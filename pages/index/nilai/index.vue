<script setup lang="ts">

const fkpknList = await useFkpknList();
const fkpknListRef: any = ref([]);
const inputTanggal = ref('');

fkpknListRef.value = fkpknList;

async function updateTanggal(driveItemId: string, triwulan: string, tanggal: date){
  console.log(`update nilai: ${driveItemId}`);
  console.log(`triwulan: ${triwulan}`);
  console.log(`tanggal input: ${tanggal}`);
  // await useUpdateSiteColumn(driveItemId);
  // fkpknListRef.value = await useFkpknList();
};

async function updateNilai(driveItemId: string, tanggal: string){
  console.log(`update nilai: ${driveItemId}`);
  console.log(`tanggal input: ${tanggal}`);
  await useUpdateSiteColumn(driveItemId);
  fkpknListRef.value = await useFkpknList();
};

async function hapusNilai(itemId: string, columnName: string){
  console.log(`hapus nilai: ${itemId}`);
  await useDeleteSiteColumnValue(itemId, columnName);
  fkpknListRef.value = await useFkpknList();
};

const tableHeader = [
  'Nama FKPKN',
  // 'Waktu Pengumpulan (Poin 1)',
  'Triwulan',
  'Tanggal Pengumpulan',
  // '',
  'Nilai Administratif (Poin 2-4)',
  'Nilai Substantif (Poin 5-8)',
  'Nilai Akhir'
];

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
  <div class="p-2 text-sm">
    <table class="table-fixed w-full">
      <thead>
        <tr class="text-right">
          <!-- <th v-for="header in tableHeader" class="text-blue-900">{{ header }}</th> -->
          <th class="text-blue-900">Laporan</th>
          <th class="text-blue-900 w-1/12">Triwulan</th>
          <th class="text-blue-900 w-2/12">Tanggal Pengumpulan</th>
          <th class="text-blue-900 w-2/12">Nilai Administratif (32%)</th>
          <th class="text-blue-900 w-2/12">Nilai Substantif (40%)</th>
          <th class="text-blue-900 w-2/12 pr-10">Nilai Akhir</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="file in fkpknListRef" class="border-y-2 text-center hover:font-bold hover:bg-blue-100">
          <td class="text-right">
            {{ file['name'] }}
            <button title="Update Nilai"
                class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-2 border border-blue-500 hover:border-transparent rounded my-1 ml-2"
                @click="updateNilai(file['id'], inputTanggal)">
              V
            </button>
          </td>
          
          <!-- <td class="text-right">
            <div v-if="file['fields']['KetepatanWaktu'] === undefined">
              <input class="text-right text-gray-400" type="date" v-model="file['fields']['KetepatanWaktu']" />
              <i class="text-gray-400">Kosong</i>
            </div>
            <div v-else>
              {{ file['fields']['KetepatanWaktu'] }} Kerja setelah TW sebelumnya
            </div>
          </td> -->
          
          <td class="text-right">
            <div v-if="file['fields']['Triwulan'] === undefined">
              <!-- <input class="text-right text-gray-400" type="date" v-model="file['fields']['Triwulan']" /> -->
              <div class="text-gray-400 italic">
                Kosong
                <UDropdown :items="triwulanOptions" :popper="{ placement: 'bottom-start' }">
                  <UButton color="blue" trailing-icon="i-heroicons-chevron-down-20-solid" size="2xs" />
                </UDropdown>
              </div>
            </div>
            <div v-else>
              {{ file['fields']['Triwulan'] }}
            </div>
          </td>
          
          <td class="text-right">
            <div v-if="file['fields']['TanggalPengumpulan'] === undefined">
              <!-- <input class="text-right text-gray-400" type="date" v-model="file['fields']['KetepatanWaktu']" /> -->
              <i class="text-gray-400">Kosong</i>
            </div>
            <div v-else>
              {{ new Date(file['fields']['TanggalPengumpulan']).toISOString().split('T')[0] }}
            </div>
          </td>
          
          <td class="text-right">
            <div v-if="file['fields']['NilaiAdministratif'] === undefined">
              <i class="text-gray-400">Kosong</i>
            </div>
            <div v-else>
              {{ file['fields']['NilaiAdministratif'] }}
              <button
                  title="Hapus Nilai"
                  class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white px-2 border border-red-500 hover:border-transparent rounded my-1"
                  @click="hapusNilai(file['itemId'], 'NilaiAdministratif')">
                X
              </button>
            </div>
          </td>

          <td class="text-right">
            <div v-if="file['fields']['NilaiSubstantif'] === undefined">
              <i class="text-gray-400">Kosong</i>
            </div>
            <div v-else>
              {{ file['fields']['NilaiSubstantif'] }}
              <button
                  title="Hapus Nilai"
                  class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white px-2 border border-red-500 hover:border-transparent rounded my-1"
                  @click="hapusNilai(file['itemId'], 'NilaiSubstantif')">
                X
              </button>
            </div>
          </td>

          <td class="text-right pr-10">
            <div v-if="file['fields']['Nilai'] === undefined">
              <i class="text-gray-400">0.0</i>
            </div>
            <div v-else>
              {{ file['fields']['Nilai'] }}
              <!-- <button
                  title="Hapus Nilai"
                  class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white px-2 border border-red-500 hover:border-transparent rounded my-1"
                  @click="hapusNilai(file['itemId'], 'Nilai')">
                X
              </button> -->
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
