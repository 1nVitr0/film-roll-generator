<template>
  <svg
    :width="printWidth"
    :height="printHeight"
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
    <rect :width="printWidth" :height="printHeight" fill="red" :mask="`url(#${maskId})`" />

    <!-- Images -->
    <g v-for="(image, idx) in images" :key="idx">
      <image
        :href="URL.createObjectURL(image)"
        :x="holeMarginOuter + holeWidth + holeMarginInner"
        :y="imageGap / 2 + idx * (imageHeight + imageGap)"
        :width="imageWidth"
        :height="imageHeight"
        :preserveAspectRatio="imageAspectRatioLocked ? `xMidYMid meet` : `none`"
      />
    </g>
  </svg>
</template>

<script lang="ts" setup>
import { useId } from "vue";
import { useSettings } from "../stores/settings";

const {
  images,
  imageWidth,
  imageHeight,
  imageGap,
  imageAspectRatioX,
  imageAspectRatioY,
  imageAspectRatioLocked,
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
</script>
