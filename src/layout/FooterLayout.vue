<template>
  <div class="">
    <RouterView class="grow" name="footer" />
    <div class="flex justify-end mt-4">
      <div class="rounded-b-none rounded-r-none badge badge-neutral badge-xl">
        {{ $t('global.version') }} {{ version }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const version = import.meta.env.VITE_APP_VERSION;
</script>