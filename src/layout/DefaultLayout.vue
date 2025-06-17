<script setup lang="ts">
import { RouterView } from 'vue-router';
import FooterLayout from './FooterLayout.vue';
import HeaderLayout from './HeaderLayout.vue';
import SidebarLayout from './SidebarLayout.vue';
</script>

<template>
  <div class="flex flex-col h-dvh">
    <header class="print:hidden">
      <HeaderLayout />
      <SidebarLayout class="z-10" />
    </header>
    <main class="flex-1 overflow-hidden">
      <RouterView />
    </main>
    <footer class="flex-none print:hidden">
      <FooterLayout />
    </footer>
  </div>
</template>
