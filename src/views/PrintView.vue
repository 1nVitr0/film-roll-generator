<template>
  <FilmStripPageGrid print-view :maxGap="20" class="card-body bg-white" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import FilmStripPageGrid from "../components/FilmStripPageGrid.vue";

onMounted(() => {
  window.print();
});
</script>