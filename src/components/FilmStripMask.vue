<template>
  <svg
    :width="`${printWidth}mm`"
    :height="`${printHeight}mm`"
    :viewBox="`0 0 ${printWidth} ${printHeight}`"
    xmlns="http://www.w3.org/2000/svg"
    fill-rule="evenodd"
  >
    <defs>
      <mask :id="maskId" mask-type="luminance">
        <!-- Image cutouts -->
        <path :d="`M 0 0 H ${printWidth} V ${printHeight} H 0 Z`" fill="white" rx="12" />
        <g fill="black">
          <template v-for="(n, idx) in imageCount" :key="idx">
            <rect
              :x="holeMarginOuter + holeWidth + holeMarginInner"
              :y="imageGap / 2 + idx * (imageHeight + imageGap)"
              :width="imageWidth"
              :height="imageHeight"
            />
          </template>
        </g>

        <!-- Side holes (left and right) -->
        <g fill="black">
          <template v-for="(n, idx) in holeCount" :key="idx">
            <!-- Left holes -->
            <rect
              :x="holeMarginOuter"
              :y="holeGap / 2 + idx * (holeHeight + holeGap)"
              :width="holeWidth"
              :height="holeHeight"
              :rx="holeRadius"
              fill="black"
            />
            <!-- Right holes -->
            <rect
              :x="printWidth - holeWidth - holeMarginOuter"
              :y="holeGap / 2 + idx * (holeHeight + holeGap)"
              :width="holeWidth"
              :height="holeHeight"
              :rx="holeRadius"
            />
          </template>
        </g>
      </mask>
    </defs>

    <!-- Film strip background -->
    <rect :width="printWidth" :height="printHeight" fill="black" :mask="`url(#${maskId})`" />

    <!-- Images -->
    <g v-for="(image, idx) in imageInfos">
      <rect
        :key="idx"
        :x="holeMarginOuter + holeWidth + holeMarginInner"
        :y="imageGap / 2 + idx * (imageHeight + imageGap)"
        :width="imageWidth"
        :height="imageHeight"
        fill="black"
      />
      <image
        :key="idx"
        :href="image.url"
        :x="holeMarginOuter + holeWidth + holeMarginInner"
        :y="imageGap / 2 + idx * (imageHeight + imageGap)"
        :width="shouldRotate(image) ? imageHeight : imageWidth"
        :height="shouldRotate(image) ? imageWidth : imageHeight"
        :transform="
          shouldRotate(image)
            ? `rotate(90, ${holeMarginOuter + holeWidth + holeMarginInner + imageWidth / 2}, ${imageGap / 2 + idx * (imageHeight + imageGap) + imageWidth / 2})`
            : undefined
        "
      />
    </g>
  </svg>
</template>

<script lang="ts" setup>
import { useId, computed, toRef } from "vue";
import { useSettings } from "../stores/settings";
import { useImageFiles } from "../composables/useImageFiles";

const props = defineProps<{
  images: File[];
}>();

const {
  imageWidth,
  imageHeight,
  imageGap,
  imageAspectRatio,
  imageAspectRatioX,
  imageAspectRatioY,
  holeWidth,
  holeHeight,
  holeRadius,
  holeGap,
  holeMarginInner,
  holeMarginOuter,
  imageCount,
  holeCount,
  printWidth,
  printHeight,
} = useSettings();

const maskId = useId();
const { imageInfos } = useImageFiles(toRef(props, "images"));

const shouldRotate = (image) => {
  return imageAspectRatioX.value > imageAspectRatioY.value && image.width < image.height;
};
</script>
