import { defineStore } from "pinia";
import { computed, onUnmounted, ref, watch, type ComputedRef, type Ref } from "vue";
import { usePiniaRefStore } from "../composables/usePiniaRefStore";

export const useSettingsStore = defineStore("settings", () => {
  const images = ref<File[]>([]);
  const imageWidth = ref<number>(90);
  const imageHeight = ref<number>(60);
  const imageGap = ref<number>(5);
  const imageAspectRatioX = ref<number>(3);
  const imageAspectRatioY = ref<number>(2);
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

  const printWidth = computed(
    () => imageWidth.value + (holeWidth.value + holeMarginInner.value + holeMarginOuter.value) * 2
  );
  const printHeight = computed(() => (imageHeight.value + imageGap.value) * imageCount.value);

  const holeCount = computed(() => Math.ceil(printHeight.value / (holeHeight.value + holeGap.value)));

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
    holeCount,
    printWidth,
    printHeight,
  };
});

export const useSettings = () => usePiniaRefStore(useSettingsStore());
