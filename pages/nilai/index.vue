<script setup lang="ts">

function readFileRecursively(list: any[], result: any[]): any {
    for (const item of list) {
      if (item.type === "folder" && item.children.length !== 0) {
        readFileRecursively(item.children, result);
      } else if (item.type === "file") {
        result.push(item);
      }
    }
  }

const tabelHeader = [
  'Nama FKPKN',
  'Waktu Pengumpulan (Poin 1)',
  'Nilai Administratif (Poin 2-4)',
  'Nilai Substantif (Poin 5-8)',
  'Nilai Akhir'
];

const { data } = await useFetch('/api/file-list');
const allFkpknList = ref([]);
readFileRecursively(data.value, allFkpknList.value);

async function updateNilai(driveItemId: string) {
  console.log(driveItemId);
  const nilai = await $fetch(`/api/update-nilai`, {
    method: 'post',
    body: {
      driveItemId: driveItemId,
    },
  });
  const updatedList = await $fetch(`/api/file-list`);
  let updatedListRecursive: any = [];
  readFileRecursively(updatedList, updatedListRecursive);
  allFkpknList.value = updatedListRecursive;
};

async function hapusNilai(itemId: string, columnName: string){
  const deteleColumnValue = await $fetch(`/api/delete-column-value`, {
    method: 'post',
    body: {
      itemId: itemId,
      columnName: columnName,
    },
  });
  console.log(deteleColumnValue);
  const updatedList = await $fetch(`/api/file-list`);
  let updatedListRecursive: any = [];
  readFileRecursively(updatedList, updatedListRecursive);
  allFkpknList.value = updatedListRecursive;
};

</script>

<template>
  <div>
    <table class="table-fixed w-full">
      <thead>
        <tr>
          <th v-for="header in tabelHeader" class="text-blue-900">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in allFkpknList" class="border-y-2 text-center hover:font-bold hover:bg-blue-100">
          <td class="text-right">
            <NuxtLink :to="`/nilai/${file['id']}`" class="hover:font-bold hover:text-blue-900">
              {{ file['name'] }}
            </NuxtLink>
            <button
                title="Update Nilai"
                class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-2 border border-blue-500 hover:border-transparent rounded my-1 ml-2"
                @click="updateNilai(file['id'])">
              V
            </button>
          </td>
          <td class="text-right">
            <div v-if="file['fields']['KetepatanWaktu'] === undefined">
              <i class="text-gray-400">Kosong</i>
            </div>
            <div v-else>
              {{ file['fields']['KetepatanWaktu'] }}
            </div>
          </td>
          <td>
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
          <td>
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
          <td>
            <div v-if="file['fields']['Nilai'] === undefined">
              <i class="text-gray-400">0.0</i>
            </div>
            <div v-else>
              {{ file['fields']['Nilai'] }}
              <button
                  title="Hapus Nilai"
                  class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white px-2 border border-red-500 hover:border-transparent rounded my-1"
                  @click="hapusNilai(file['itemId'], 'Nilai')">
                X
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>