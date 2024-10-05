<template>
  <div>
    <header class="bg-amber-300 text-blue-800 border-b-4 border-blue-800">
      <nav class="mx-auto p-4">
        <div class="my-2">
          <NuxtLink to="/" class="font-bold hover:bg-white p-2 rounded text-2xl">DJPb FKPKN AI Assistant</NuxtLink>
        </div>
        <ul class="flex gap-1">
          <li class="hover:bg-white rounded p-2 hover:font-bold"><NuxtLink to="/">Home</NuxtLink></li>
          <li class="hover:bg-white rounded p-2 hover:font-bold"><NuxtLink to="/nilai">Penilaian FKPKN</NuxtLink></li>
          <li class="hover:bg-white rounded p-2 hover:font-bold"><NuxtLink to="/lintas-fkpkn">Chat Lintas FKPKN</NuxtLink></li>
          <li class="hover:bg-white rounded p-2 hover:font-bold"><NuxtLink to="/sop">Chat SOP</NuxtLink></li>
          <li class="hover:bg-white rounded p-2 hover:font-bold"><NuxtLink to="/test-tombol">Test Tombol</NuxtLink></li>
        </ul>
      </nav>
    </header>
  </div>

  <div class="mx-auto p-4">
    <slot />
  </div>
</template>

<style scoped>
  .router-link-exact-active {
    font-weight: bold;
  }
</style>