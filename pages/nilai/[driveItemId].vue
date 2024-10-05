<script setup lang="ts">

const { driveItemId } = useRoute().params;
console.log(`${driveItemId} detail`);
const { data: file } = await useFetch(`/api/drive-item?driveItemId=${driveItemId}`);
const result = ref(file);


</script>

<template>
  <!-- <div>
    <div class="font-bold text-xl text-blue-900">{{ result.name }}</div>
    <div class="flex gap-2">
      Ketepatan Waktu Pengumpulan:
      <div v-if="result.fields['KetepatanWaktu']">
        <b>{{ result.fields['KetepatanWaktu'] }} Kerja</b> setelah TW sebelumnya
      </div>
      <div v-else>
        <i class="text-gray-600">Kosong</i>
      </div>
    </div>
    <div>Nilai Administratif: <b>{{ result.fields['NilaiAdministratif'] }}</b></div>
    <div>Nilai Substantif: <b>{{ result.fields['NilaiSubstantif'] }}</b></div>
    <div>Nilai Laporan: <b>{{ result.fields['Nilai'] }}</b></div>
  </div> -->

  <!-- <div>
    <table class="w-full">
      <tbody>
        <tr class="border-y-2">
          <td class="w-6/12">Ketepatan Waktu</td>
          <td>
            <div v-if="result.fields['KetepatanWaktu']">
              <b>{{ result.fields['KetepatanWaktu'] }} Kerja</b> setelah TW sebelumnya
            </div>
            <div v-else>
              <i class="text-gray-600">Kosong</i>
            </div>
          </td>
        </tr>
        <tr class="border-y-2">
          <td>Nilai Administratif</td>
          <td>{{ result.fields['NilaiAdministratif'] }}</td>
        </tr>
        <tr class="border-y-2">
          <td>Nilai Substantif</td>
          <td>{{ result.fields['NilaiSubstantif'] }}</td>
        </tr>
        <tr class="border-y-2">
          <td>Nilai Laporan</td>
          <td>{{ result.fields['Nilai'] }}</td>
        </tr>
        <tr class="border-y-2">
          <td>a</td>
          <td>b</td>
        </tr>
      </tbody>
    </table>
  </div> -->
  
  <div class="grid grid-cols-2">
    <div class="">Ketepatan Waktu</div>
    <div>{{ result.fields['NilaiAdministratif'] }}</div>
    <div>Nilai Administratif</div>
    <div>{{ result.fields['NilaiAdministratif'] }}</div>
    <div>Nilai Substantif</div>
    <div>{{ result.fields['NilaiSubstantif'] }}</div>
    <div>Nilai Akhir</div>
    <div>{{ result.fields['Nilai'] }}</div>
    <div>Masalah atau Isu</div>
    <div>{{ result.fields['MasalahatauIsu'] }}</div>
  </div>
</template>