<script setup lang="ts">

const fkpknList = useState<SharepointItem[]>('folders-and-files');

const currentFolderId = useState<string>('current-folder-id');
const currentFolderName = useState<string>('current-folder-name', () => 'root');
const fkpknInFolder = useState<SharepointItem[]>('files-in-current-folder', () => {
  return fkpknList.value.filter((item: any) => item.type === 'file');
});

const fkpknListRef = ref({
  name: 'root',
  children: fkpknList,
});

async function updateNilai(driveItemId: string){
  console.log(`update nilai: ${driveItemId}`);
  await useUpdateNilai(driveItemId);
  await useFilesInFolder(currentFolderId.value);
};

async function updateTanggal(driveItemId: string, tanggal: string, columnName: string){
  console.log(`update ${columnName}: ${driveItemId}`);
  console.log(`${columnName}: ${tanggal}`);
  await useUpdateDate(driveItemId, tanggal, columnName);
  await useFilesInFolder(currentFolderId.value);
};

async function hapusNilai(itemId: string, columnName: string){
  console.log(`hapus nilai ${columnName}: ${itemId}`);
  await useDeleteSiteColumnValue(itemId, columnName);
  await useFilesInFolder(currentFolderId.value);
};

</script>

<template>
  <div class="flex flex-row text-sm">

    <div class="p-2 basis-1/6 border-r">
      <TreePenilaian :item="fkpknListRef" />
    </div>

    <div class="basis-5/6">
      <div class="text-center text-xl font-bold text-amber-500 pt-4 pb-2">
        <UIcon name="i-material-symbols:folder-open-rounded" class="w-5 h-5" />
        {{ currentFolderName }}
      </div>

      <table class="table-fixed w-full">
        <thead>
          <tr class="">
            <th class="pb-2 text-blue-900">Laporan</th>
            <th class="pb-2 text-blue-900 w-2/12">Batas Triwulan</th>
            <th class="pb-2 text-blue-900 w-2/12">Tanggal Pengumpulan</th>
            <th class="pb-2 text-blue-900 w-2/12">Nilai Administratif (32%)</th>
            <th class="pb-2 text-blue-900 w-2/12">Nilai Substantif (60%)</th>
            <th class="pb-2 text-blue-900 w-1/12">Nilai Akhir</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="file in fkpknInFolder" class="border-y-2 text-center hover:font-bold hover:bg-blue-100">
            <td class="text-right">
              <NuxtLink :to="`/nilai/${file['id']}`" class="pr-2">{{ file['name'] }}</NuxtLink>
              <UTooltip text="Update Nilai" class="align-middle">
                <UButton
                  trailing-icon="i-material-symbols:refresh" size="2xs"
                  class="bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white"
                  @click="updateNilai(file['id'])" />
              </UTooltip>
            </td>
            
            <td class="text-right">
              <div v-if="file['fields']['BatasTriwulan'] === undefined" class="flex justify-end">
                <input class="text-right text-gray-400" type="date" v-model="file['fields']['NewBatasTriwulan']" />
                <div v-if="file['fields']['NewBatasTriwulan'] !== undefined">
                  <UTooltip text="Update Batas Triwulan" class="align-middle">
                    <UButton
                      trailing-icon="i-material-symbols:upload" size="2xs"
                      class="bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white ml-2"
                      @click="updateTanggal(file['id'], file['fields']['NewBatasTriwulan'], 'BatasTriwulan')" />
                  </UTooltip>
                </div>
              </div>
              <div v-else>
                {{ new Date(file['fields']['BatasTriwulan']).toISOString().split('T')[0] }}
                <UTooltip text="Hapus" class="align-middle">
                  <UButton
                    trailing-icon="i-material-symbols:delete-outline-rounded" size="2xs"
                    class="bg-transparent text-red-300 border border-red-300 hover:bg-red-500 hover:text-white align-middle ml-4"
                    @click="hapusNilai(file['itemId'], 'BatasTriwulan')" />
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
                      @click="updateTanggal(file['id'], file['fields']['NewTanggalPengumpulan'], 'TanggalPengumpulan')" />
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
