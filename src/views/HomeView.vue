<template>
  <div class="container flex flex-col max-h-full gap-4 py-5 mx-auto overflow-hidden lg:flex-row">
    <FilmStripSettings class="min-w-min" />
    <fieldset class="max-h-full p-4 overflow-hidden shadow card fieldset bg-base-200 grow">
      <legend class="fieldset-legend">Ausgabe</legend>
      <div class="w-full h-full overflow-auto" style="max-height: calc(100vh - 13rem);">
        <div class="bg-white card-body" :style="`width: ${pageWidth * 2}mm; height: ${pageHeight}mm;`">
          <FilmStripMask :images="images" />
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import FilmStripSettings from "../components/FilmStripSettings.vue";
import FilmStripMask from "../components/FilmStripMask.vue";
import { useSettings } from "../stores/settings";

const { images, pageWidth, pageHeight } = useSettings();
</script>
