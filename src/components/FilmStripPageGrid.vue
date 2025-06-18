<template>
  <div class="grid grid-flow-row gap-4" :style="wrapperStyle">
    <FilmStripSvg v-for="(strip, idx) in strips" :key="idx" :images="strip"
      :class="{ 'max-w-full h-auto': !props.printView }" />
  </div>
</template>

<script setup lang="ts">
import { computed, type StyleValue } from "vue";
import { useSettings } from "../stores/settings";
import FilmStripSvg from "./FilmStripSvg.vue";

const props = defineProps<{
  printView?: boolean;
  maxStripWidth?: number;
  maxGap?: number;
}>();

const {
  images,
  imagesPerStrip,
  stripsPerPage,
  totalStrips,
  stripWidth,
  pageWidth,
} = useSettings();

const wrapperStyle = computed<StyleValue>(() => {
  const totalGap = Math.min(
    (pageWidth.value - stripWidth.value * stripsPerPage) / (stripsPerPage - 1),
    props.maxGap ?? 0
  );

  return props.printView
    ? { gridTemplateColumns: `repeat(${stripsPerPage.value}, ${stripWidth.value}mm)`, gap: `${totalGap || props.maxGap}px` }
    : { gridTemplateColumns: `repeat(auto-fill, minmax(${props.maxStripWidth ?? 200}px, 1fr))` };
});

const strips = computed(() => {
  const result = [];
  for (let i = 0; i < totalStrips.value; i++) {
    result.push(images.value.slice(i * imagesPerStrip.value, (i + 1) * imagesPerStrip.value));
  }
  return result;
});
</script>