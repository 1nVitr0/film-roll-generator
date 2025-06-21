import { ref } from "vue";
import type { SettingsTemplate } from "../stores/settings";

const templates: Record<string, SettingsTemplate> = {
  A3: {
    imageWidth: 74,
    imageHeight: 56,
    imageGap: 4,
    imageAspectRatioX: 4,
    imageAspectRatioY: 3,
    imageAspectRatioLocked: true,
    holeWidth: 5,
    holeHeight: 5,
    holeGap: 2,
    holeRadius: 1,
    holeMarginInner: 2,
    holeMarginOuter: 3,
    pageWidth: 297,
    pageHeight: 420,
    pageMargin: 2,
  },
  A4: {
    imageWidth: 74,
    imageHeight: 56,
    imageGap: 4,
    imageAspectRatioX: 4,
    imageAspectRatioY: 3,
    imageAspectRatioLocked: true,
    holeWidth: 5,
    holeHeight: 5,
    holeGap: 2,
    holeRadius: 1,
    holeMarginInner: 2,
    holeMarginOuter: 3,
    pageWidth: 210,
    pageHeight: 297,
    pageMargin: 2,
  },
};

export const useTemplates = () => {
  const templates = ref<Record<string, SettingsTemplate>>({
    A3: {
      imageWidth: 74,
      imageHeight: 56,
      imageGap: 4,
      imageAspectRatioX: 4,
      imageAspectRatioY: 3,
      imageAspectRatioLocked: true,
      holeWidth: 5,
      holeHeight: 5,
      holeGap: 2,
      holeRadius: 1,
      holeMarginInner: 2,
      holeMarginOuter: 3,
      pageWidth: 297,
      pageHeight: 420,
      pageMargin: 2,
    },
    A4: {
      imageWidth: 74,
      imageHeight: 56,
      imageGap: 4,
      imageAspectRatioX: 4,
      imageAspectRatioY: 3,
      imageAspectRatioLocked: true,
      holeWidth: 5,
      holeHeight: 5,
      holeGap: 2,
      holeRadius: 1,
      holeMarginInner: 2,
      holeMarginOuter: 3,
      pageWidth: 210,
      pageHeight: 297,
      pageMargin: 2,
    },
  });

  return {
    templates,
  };
};
