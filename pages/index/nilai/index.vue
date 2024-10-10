<script setup lang="ts">

const fkpknList = await useFkpknList();
const fkpknListRef: any = ref([]);
const inputTanggal = ref('');

fkpknListRef.value = fkpknList;

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
  'Waktu Pengumpulan (Poin 1)',
  'Nilai Administratif (Poin 2-4)',
  'Nilai Substantif (Poin 5-8)',
  'Nilai Akhir'
];

</script>

<template>
  <div class="py-2 text-sm">
    <table class="table-fixed w-full">
      <thead>
        <tr>
          <th v-for="header in tableHeader" class="text-blue-900">{{ header }}</th>
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
          
          <td class="text-right">
            <div v-if="file['fields']['KetepatanWaktu'] === undefined">
              <input class="text-right text-gray-400" type="date" v-model="file['fields']['KetepatanWaktu']" />
              <!-- <i class="text-gray-400">Kosong</i> -->
            </div>
            <div v-else>
              {{ file['fields']['KetepatanWaktu'] }} Kerja setelah TW sebelumnya
            </div>
          </td>
          
          <td class="text-right pr-12">
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

          <td class="text-right pr-12">
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

          <td class="text-right pr-12">
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
