import { defineStore } from "pinia";
import { computed, onUnmounted, ref, watch, type ComputedRef, type Ref } from "vue";
import { usePiniaRefStore } from "../composables/usePiniaRefStore";

export const useSettingsStore = defineStore("settings", () => {
  const images = ref<File[]>([]);
  const imageWidth = ref<number>(80);
  const imageHeight = ref<number>(60);
  const imageGap = ref<number>(5);
  const imageAspectRatioX = ref<number>(4);
  const imageAspectRatioY = ref<number>(3);
  const imageAspectRatioLocked = ref<boolean>(true);

  const holeWidth = ref<number>(8);
  const holeHeight = ref<number>(8);
  const holeGap = ref<number>(5);
  const holeRadius = ref<number>(2);
  const holeMarginInner = ref<number>(5);
  const holeMarginOuter = ref<number>(5);

  const pageWidth = ref<number>(297);
  const pageHeight = ref<number>(420);
  const pageMargin = ref<number>(10);

  const imageAspectRatio = computed(() => imageAspectRatioX.value / imageAspectRatioY.value);
  const imageCount = computed(() => images.value.length || 5);

  const stripWidth = computed(
    () => imageWidth.value + (holeWidth.value + holeMarginInner.value + holeMarginOuter.value) * 2
  );
  const totalHeight = computed(() => (imageHeight.value + imageGap.value) * imageCount.value);

  const imagesPerStrip = computed(() =>
    Math.floor((pageHeight.value - pageMargin.value * 2) / (imageHeight.value + imageGap.value))
  );
  const holesPerStrip = computed(() =>
    Math.ceil((pageHeight.value - pageMargin.value * 2) / (holeHeight.value + holeGap.value))
  );
  const stripsPerPage = computed(() => Math.floor((pageWidth.value - pageMargin.value * 2) / stripWidth.value));
  const totalStrips = computed(() => Math.ceil(imageCount.value / imagesPerStrip.value));

  const getAspectRatioNormalized = (width: number, height: number): [number, number] => {
    if (width === 0 || height === 0) return [1, 1];
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(width, height);
    return [width / divisor, height / divisor];
  };

  watch(
    [imageWidth, imageHeight, imageAspectRatioX, imageAspectRatioY, imageAspectRatioLocked],
    ([width, height, aspectX, aspectY, locked], [oldWidth, oldHeight, oldAspectX, oldAspectY]) => {
      const aspectRatio = aspectX / aspectY;
      const oldAspectRatio = oldAspectX / oldAspectY;

      console.log({ aspectRatio, oldAspectRatio, width, height, oldWidth, oldHeight });

      if ((locked && width !== oldWidth) || aspectX !== oldAspectX || aspectY !== oldAspectY) {
        imageHeight.value = Math.round(width / aspectRatio);
      } else if (locked && height !== oldHeight) {
        imageWidth.value = Math.round(height * aspectRatio);
      } else if (!locked) {
        const [x, y] = getAspectRatioNormalized(width, height);
        imageAspectRatioX.value = x;
        imageAspectRatioY.value = y;
      }
    },
    { deep: true }
  );

  return {
    images,
    imageWidth,
    imageHeight,
    imageGap,
    imageAspectRatio,
    imageAspectRatioX,
    imageAspectRatioY,
    imageAspectRatioLocked,
    holeWidth,
    holeHeight,
    holeGap,
    holeRadius,
    holeMarginInner,
    holeMarginOuter,
    pageWidth,
    pageHeight,
    pageMargin,
    imageCount,
    imagesPerStrip,
    holesPerStrip,
    stripsPerPage,
    totalStrips,
    stripWidth,
    totalHeight,
  };
});

export const useSettings = () => usePiniaRefStore(useSettingsStore());
