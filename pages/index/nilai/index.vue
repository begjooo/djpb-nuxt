<script setup lang="ts">

const fkpknList = await useMapFilesAndFolder();
const fkpknListRef = ref({
  name: 'Folder Utama',
  children: fkpknList,
});
const currentFolderId = useState('selected-folder-id');
const currentFolderName = useState('selected-folder-name');
const fkpknListState = useState('files-in-folder');
const inputTanggal = ref('');

async function updateNilai(driveItemId: string){
  console.log(`update nilai: ${driveItemId}`);
  await useUpdateSiteColumn(driveItemId);
  await useFileList(currentFolderId.value);
};

async function updateTanggal(driveItemId: string, tanggal: string){
  console.log(`update tanggal pengumpulan: ${driveItemId}`);
  console.log(`tanggal pengumpulan: ${tanggal}`);
  await useUpdateDate(driveItemId, tanggal);
  await useFileList(currentFolderId.value);
};

async function updateTriwulan(driveItemId: string, triwulan: string){
  console.log(`update nilai: ${driveItemId}`);
  console.log(`triwulan: ${triwulan}`);
  await useUpdateTW(driveItemId, triwulan);
  await useFileList(currentFolderId.value);
};

async function hapusNilai(itemId: string, columnName: string){
  console.log(`hapus nilai ${columnName}: ${itemId}`);
  await useDeleteSiteColumnValue(itemId, columnName);
  await useFileList(currentFolderId.value);
};

const tableHeader = [
  'Nama FKPKN',
  'Triwulan',
  'Tanggal Pengumpulan',
  'Nilai Administratif (Poin 2-4)',
  'Nilai Substantif (Poin 5-8)',
  'Nilai Akhir'
];

const triwulanOptions = (id) => [
  [
    {
      label: 'Triwulan I',
      click: () => {
        updateTriwulan(id, 'I');
      },
    },
    {
      label: 'Triwulan II',
      click: () => {
        updateTriwulan(id, 'II');
      },
    },
    {
      label: 'Triwulan III',
      click: () => {
        updateTriwulan(id, 'III');
      },
    },
    {
      label: 'Triwulan IV',
      click: () => {
        updateTriwulan(id, 'IV');
      },
    },
  ],
];

</script>

<template>
  <div class="flex flex-row text-sm">
    <div class="p-2 basis-1/6 border-r">
      <ul>
        <TreePenilaian :item="fkpknListRef" />
      </ul>
    </div>

    <div class="basis-5/6">
      <div class="text-center text-xl font-bold text-amber-500 pt-4 pb-2">
        <UIcon name="i-material-symbols:folder-open-rounded" class="w-5 h-5" />
        {{ currentFolderName }}
      </div>
      <table class="table-fixed w-full">
        <thead>
          <tr class="">
            <!-- <th v-for="header in tableHeader" class="text-blue-900">{{ header }}</th> -->
            <th class="pb-2 text-blue-900">Laporan</th>
            <th class="pb-2 text-blue-900 w-1/12">Triwulan</th>
            <th class="pb-2 text-blue-900 w-2/12">Tanggal Pengumpulan</th>
            <th class="pb-2 text-blue-900 w-2/12">Nilai Administratif (32%)</th>
            <th class="pb-2 text-blue-900 w-2/12">Nilai Substantif (40%)</th>
            <th class="pb-2 text-blue-900 w-2/12">Nilai Akhir</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="file in fkpknListState" class="border-y-2 text-center hover:font-bold hover:bg-blue-100">
            <td class="text-right">
              <span class="pr-2">{{ file['name'] }}</span>
              <UTooltip text="Update Nilai" class="align-middle">
                <UButton
                  trailing-icon="i-material-symbols:refresh" size="2xs"
                  class="bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white"
                  @click="updateNilai(file['id'])" />
              </UTooltip>
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
                <span class="text-gray-400 italic">
                  Kosong
                  <UDropdown :items="triwulanOptions(file['id'])" :popper="{ placement: 'bottom-start' }" class="align-middle pl-2">
                    <UTooltip text="Pilih Triwulan" class="">
                      <UButton 
                        trailing-icon="i-heroicons-chevron-down-20-solid" size="2xs"
                        class="bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white" />
                    </UTooltip>
                  </UDropdown>
                </span>
              </div>
              <div v-else>
                {{ file['fields']['Triwulan'] }}
                <UTooltip text="Hapus" class="align-middle">
                  <UButton
                    trailing-icon="i-material-symbols:delete-outline-rounded" size="2xs"
                    class="bg-transparent text-red-300 border border-red-300 hover:bg-red-500 hover:text-white ml-4"
                    @click="hapusNilai(file['itemId'], 'Triwulan')" />
                </UTooltip>
              </div>
            </td>
            
            <td class="text-right">
              <div v-if="file['fields']['TanggalPengumpulan'] === undefined" class="flex justify-end">
                <input class="text-right text-gray-400" type="date" v-model="file['fields']['NewTanggalPengumpulan']" />
                <div v-if="file['fields']['NewTanggalPengumpulan'] !== undefined">
                  <UTooltip text="Update Tanggal" class="align-middle">
                    <UButton
                      trailing-icon="i-material-symbols:upload" size="2xs"
                      class="bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white ml-2"
                      @click="updateTanggal(file['id'], file['fields']['NewTanggalPengumpulan'])" />
                  </UTooltip>
                </div>
              </div>
              <div v-else>
                {{ new Date(file['fields']['TanggalPengumpulan']).toISOString().split('T')[0] }}
                <UTooltip text="Hapus" class="align-middle">
                  <UButton
                    trailing-icon="i-material-symbols:delete-outline-rounded" size="2xs"
                    class="bg-transparent text-red-300 border border-red-300 hover:bg-red-500 hover:text-white align-middle ml-4"
                    @click="hapusNilai(file['itemId'], 'TanggalPengumpulan')" />
                </UTooltip>
              </div>
            </td>
            
            <td class="text-right">
              <div v-if="file['fields']['NilaiAdministratif'] === undefined">
                <i class="text-gray-400">Kosong</i>
              </div>
              <div v-else>
                {{ file['fields']['NilaiAdministratif'] }}
                <UTooltip text="Hapus" class="align-middle">
                  <UButton
                    trailing-icon="i-material-symbols:delete-outline-rounded" size="2xs"
                    class="bg-transparent text-red-300 border border-red-300 hover:bg-red-500 hover:text-white align-middle ml-4"
                    @click="hapusNilai(file['itemId'], 'NilaiAdministratif')" />
                </UTooltip>
              </div>
            </td>

            <td class="text-right">
              <div v-if="file['fields']['NilaiSubstantif'] === undefined">
                <i class="text-gray-400">Kosong</i>
              </div>
              <div v-else>
                {{ file['fields']['NilaiSubstantif'] }}
                <UTooltip text="Hapus" class="align-middle">
                  <UButton
                    trailing-icon="i-material-symbols:delete-outline-rounded" size="2xs"
                    class="bg-transparent text-red-300 border border-red-300 hover:bg-red-500 hover:text-white align-middle ml-4"
                    @click="hapusNilai(file['itemId'], 'NilaiSubstantif')" />
                </UTooltip>
              </div>
            </td>

            <td class="text-right pr-10">
              <div v-if="file['fields']['Nilai'] === undefined">
                <i class="text-gray-400">0.0</i>
              </div>
              <div v-else>
                {{ file['fields']['Nilai'] }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
    
  </div>
</template>
