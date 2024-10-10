<script setup lang="ts">
</script>

<template>
  <header class="bg-amber-300 text-blue-800 border-b-4 border-blue-800">
    <div class="mx-auto p-4">
      <div class="my-2">
        <NuxtLink class="font-bold hover:bg-white p-2 rounded text-2xl" to="/">DJPb FKPKN AI Assistant</NuxtLink>
      </div>
      <ul class="flex gap-4">
        <li class="hover:bg-white rounded p-2 hover:font-bold"><NuxtLink to="/">Home</NuxtLink></li>
        <li class="hover:bg-white rounded p-2 hover:font-bold"><NuxtLink to="/nilai">Penilaian</NuxtLink></li>
        <li class="hover:bg-white rounded p-2 hover:font-bold"><NuxtLink to="/lintas-dokumen">Chat Lintas Dokumen</NuxtLink></li>
        <li class="hover:bg-white rounded p-2 hover:font-bold"><NuxtLink to="/sop">Chat dengan SOP</NuxtLink></li>
        <li class="hover:bg-white rounded p-2 hover:font-bold"><NuxtLink to="/test">Test</NuxtLink></li>
      </ul>
    </div>
  </header>

  <NuxtPage class=""/>

</template>