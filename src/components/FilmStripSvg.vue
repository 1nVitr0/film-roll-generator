<template>
  <svg :width="`${stripWidth}mm`" :height="`${height}mm`" :viewBox="`0 0 ${stripWidth} ${height}`"
    xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd">
    <defs>
      <mask :id="maskId" mask-type="luminance">
        <!-- Image cutouts -->
        <path :d="`M 0 0 H ${stripWidth} V ${height} H 0 Z`" fill="white" rx="12" />
        <g fill="black">
          <template v-for="(n, idx) in (imageInfos.length || imagesPerStrip)" :key="idx">
            <rect :x="holeMarginOuter + holeWidth + holeMarginInner" :y="imageGap / 2 + idx * (imageHeight + imageGap)"
              :width="imageWidth" :height="imageHeight" />
          </template>
        </g>

        <!-- Side holes (left and right) -->
        <g fill="black">
          <template v-for="(n, idx) in holesPerStrip" :key="idx">
            <rect :x="holeMarginOuter" :y="holeGap / 2 + idx * (holeHeight + holeGap)" :width="holeWidth"
              :height="holeHeight" :rx="holeRadius" fill="black" />
            <rect :x="stripWidth - holeWidth - holeMarginOuter" :y="holeGap / 2 + idx * (holeHeight + holeGap)"
              :width="holeWidth" :height="holeHeight" :rx="holeRadius" />
          </template>
        </g>
      </mask>
    </defs>

    <!-- Film strip background -->
    <rect :width="stripWidth" :height="height" fill="black" :mask="`url(#${maskId})`" />

    <!-- Images -->
    <g v-for="(image, idx) in imageInfos">
      <rect :key="idx" :x="holeMarginOuter + holeWidth + holeMarginInner"
        :y="imageGap / 2 + idx * (imageHeight + imageGap)" :width="imageWidth" :height="imageHeight" fill="black" />
      <image :key="idx" :href="image.url" :x="holeMarginOuter + holeWidth + holeMarginInner"
        :y="imageGap / 2 + idx * (imageHeight + imageGap)" :width="shouldRotate(image) ? imageHeight : imageWidth"
        :height="shouldRotate(image) ? imageWidth : imageHeight" :transform="shouldRotate(image)
          ? `rotate(90, ${holeMarginOuter + holeWidth + holeMarginInner + imageWidth / 2}, ${imageGap / 2 + idx * (imageHeight + imageGap) + imageWidth / 2})`
          : undefined
          " />
    </g>
  </svg>
</template>

<script lang="ts" setup>
import { useId, toRef, computed } from "vue";
import { useSettings } from "../stores/settings";
import { useImageFiles, type ImageFileInfo } from "../composables/useImageFiles";

const props = defineProps<{
  images: File[];
}>();

const {
  imageWidth,
  imageHeight,
  imageGap,
  imageAspectRatioX,
  imageAspectRatioY,
  holeWidth,
  holeHeight,
  holeRadius,
  holeGap,
  holeMarginInner,
  holeMarginOuter,
  imagesPerStrip,
  holesPerStrip,
  stripWidth,
} = useSettings();

const maskId = useId();
const { imageInfos } = useImageFiles(toRef(props, "images"));

const height = computed(() =>
  (imageInfos.value.length || imagesPerStrip.value) * (imageHeight.value + imageGap.value)
);

const shouldRotate = (image: ImageFileInfo) => {
  return imageAspectRatioX.value > imageAspectRatioY.value && image.width < image.height;
};
</script>
