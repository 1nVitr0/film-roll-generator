<template>
  <div class="container flex flex-col max-h-full gap-4 py-5 mx-auto lg:flex-row">
    <FilmStripSettings />
    <fieldset class="p-4 shadow card fieldset bg-base-200 grow">
      <legend class="fieldset-legend">Ausgabe</legend>
      <div class="card-body">
        <FilmStripMask />
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import FilmStripSettings from '../components/FilmStripSettings.vue';
import FilmStripMask from '../components/FilmStripMask.vue';
</script>