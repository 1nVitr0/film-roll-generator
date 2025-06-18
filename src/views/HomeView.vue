<template>
  <div class="container flex flex-col overflow-y-scroll max-h-full gap-4 py-5 mx-auto md:overflow-hidden md:flex-row">
    <FilmStripSettings class="min-w-min md:overflow-y-auto" />
    <fieldset class="md:max-h-full p-4 shadow card fieldset bg-base-200 grow flex max-w-full">
      <legend class="fieldset-legend">Ausgabe</legend>
      <div class="card-body p-0 overflow-y-auto h-full">
        <FilmStripPageGrid />
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import FilmStripPageGrid from "../components/FilmStripPageGrid.vue";
import FilmStripSettings from "../components/FilmStripSettings.vue";
import { onMounted, onUnmounted } from "vue";

const router = useRouter();

const beforePrint = () => router.push({ name: "print" });

onMounted(() => {
  window.addEventListener("beforeprint", beforePrint);
});

onUnmounted(() => {
  window.removeEventListener("beforeprint", beforePrint);
});
</script>
