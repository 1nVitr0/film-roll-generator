<template>
  <form class="flex flex-col gap-2">
    <fieldset class="p-4 shadow card fieldset bg-base-200">
      <legend class="fieldset-legend">{{ $t('film-strip.image-selection') }}</legend>

      <label class="label">{{ $t('film-strip.image', 2) }}</label>
      <input type="file" class="file-input" multiple accept="image/*"
        @change="images = [...($event.target as HTMLInputElement).files!]" />
    </fieldset>

    <fieldset class="p-4 shadow card fieldset bg-base-200">
      <legend class="fieldset-legend">{{ $t('film-strip.image-size') }}</legend>

      <label class="label">{{ $t('film-strip.width') }}</label>
      <div class="flex items-center gap-2">
        <input type="range" min="0" max="100" v-model="imageWidth" class="range" />
        <div class="w-32 gap-0 input input-sm input-bordered">
          <input type="number" min="0" max="100" v-model="imageWidth" class="grow" />
          <span class="opacity-50">mm</span>
        </div>
      </div>

      <label class="label">{{ $t('film-strip.height') }}</label>
      <div class="flex items-center gap-2">
        <input type="range" min="0" max="100" v-model="imageHeight" class="range" />
        <div class="w-32 gap-0 input input-sm input-bordered">
          <input type="number" min="0" max="100" v-model="imageHeight" class="grow" />
          <span class="opacity-50">mm</span>
        </div>
      </div>

      <label class="label">{{ $t('film-strip.aspect-ratio') }}</label>
      <div class="flex items-center gap-2">
        <input type="number" min="0" max="100" v-model="imageAspectRatioX" class="input" />
        zu
        <input type="number" min="0" max="100" v-model="imageAspectRatioY" class="input" />
        <button class="btn btn-sm" :class="{ 'btn-primary': imageAspectRatioLocked }"
          @click.prevent="imageAspectRatioLocked = !imageAspectRatioLocked">
          <FontAwesomeIcon :icon="faLink" />
        </button>
      </div>

      <div class="divider"></div>

      <label class="label">{{ $t('film-strip.gap') }}</label>
      <div class="flex items-center gap-2">
        <input type="range" min="0" max="100" v-model="imageGap" class="range" />
        <div class="w-32 gap-0 input input-sm input-bordered">
          <input type="number" min="0" max="100" v-model="imageGap" class="grow" />
          <span class="opacity-50">mm</span>
        </div>
      </div>
    </fieldset>

    <fieldset class="p-4 shadow card fieldset bg-base-200">
      <legend class="fieldset-legend">{{ $t('film-strip.filmstrip', 2) }}</legend>

      <label class="label">{{ $t('film-strip.hole-width') }}</label>
      <div class="flex items-center gap-2">
        <input type="range" min="0" max="100" v-model="holeWidth" class="range" />
        <div class="w-32 gap-0 input input-sm input-bordered">
          <input type="number" min="0" max="100" v-model="holeWidth" class="grow" />
          <span class="opacity-50">mm</span>
        </div>
      </div>

      <label class="label">{{ $t('film-strip.hole-height') }}</label>
      <div class="flex items-center gap-2">
        <input type="range" min="0" max="100" v-model="holeHeight" class="range" />
        <div class="w-32 gap-0 input input-sm input-bordered">
          <input type="number" min="0" max="100" v-model="holeHeight" class="grow" />
          <span class="opacity-50">mm</span>
        </div>
      </div>

      <label class="label">{{ $t('film-strip.hole-radius') }}</label>
      <div class="flex items-center gap-2">
        <input type="range" min="0" max="100" v-model="holeRadius" class="range" />
        <div class="w-32 gap-0 input input-sm input-bordered">
          <input type="number" min="0" max="100" v-model="holeRadius" class="grow" />
          <span class="opacity-50">mm</span>
        </div>
      </div>

      <label class="label">{{ $t('film-strip.hole-gap') }}</label>
      <div class="flex items-center gap-2">
        <input type="range" min="0" max="100" v-model="holeGap" class="range" />
        <div class="w-32 gap-0 input input-sm input-bordered">
          <input type="number" min="0" max="100" v-model="holeGap" class="grow" />
          <span class="opacity-50">mm</span>
        </div>
      </div>

      <label class="label">{{ $t('film-strip.hole-margin-inner') }}</label>
      <div class="flex items-center gap-2">
        <input type="range" min="0" max="100" v-model="holeMarginInner" class="range" />
        <div class="w-32 gap-0 input input-sm input-bordered">
          <input type="number" min="0" max="100" v-model="holeMarginInner" class="grow" />
          <span class="opacity-50">mm</span>
        </div>
      </div>

      <label class="label">{{ $t('film-strip.hole-margin-outer') }}</label>
      <div class="flex items-center gap-2">
        <input type="range" min="0" max="100" v-model="holeMarginOuter" class="range" />
        <div class="w-32 gap-0 input input-sm input-bordered">
          <input type="number" min="0" max="100" v-model="holeMarginOuter" class="grow" />
          <span class="opacity-50">mm</span>
        </div>
      </div>
    </fieldset>

    <fieldset class="p-4 shadow card fieldset bg-base-200">
      <legend class="fieldset-legend">{{ $t('film-strip.page-format') }}</legend>

      <label class="label">{{ $t('film-strip.width') }}</label>
      <div class="flex items-center gap-2">
        <input type="range" min="0" max="300" v-model="pageWidth" class="range" />
        <div class="w-32 gap-0 input input-sm input-bordered">
          <input type="number" min="0" max="300" v-model="pageWidth" class="grow" />
          <span class="opacity-50">mm</span>
        </div>
      </div>

      <label class="label">{{ $t('film-strip.height') }}</label>
      <div class="flex items-center gap-2">
        <input type="range" min="0" max="500" v-model="pageHeight" class="range" />
        <div class="w-32 gap-0 input input-sm input-bordered">
          <input type="number" min="0" max="500" v-model="pageHeight" class="grow" />
          <span class="opacity-50">mm</span>
        </div>
      </div>

      <label class="label">{{ $t('film-strip.gap') }}</label>
      <div class="flex items-center gap-2">
        <input type="range" min="0" max="500" v-model="pageMargin" class="range" />
        <div class="w-32 gap-0 input input-sm input-bordered">
          <input type="number" min="0" max="100" v-model="pageMargin" class="grow" />
          <span class="opacity-50">mm</span>
        </div>
      </div>
    </fieldset>
  </form>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { useSettings } from "../stores/settings";

const {
  images,
  imageWidth,
  imageHeight,
  imageAspectRatioX,
  imageAspectRatioY,
  imageAspectRatioLocked,
  imageGap,
  holeWidth,
  holeHeight,
  holeRadius,
  holeGap,
  holeMarginInner,
  holeMarginOuter,
  pageWidth,
  pageHeight,
  pageMargin,
} = useSettings();
</script>
