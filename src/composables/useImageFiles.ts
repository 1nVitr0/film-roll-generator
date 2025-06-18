import { ref, watch, type Ref } from "vue";

export const useImageFiles = (files: Ref<File[]>) => {
  const imageInfos = ref<
    { file: File; url: string; name: string; width: number; height: number; size: number; type: string }[]
  >([]);

  watch(files, async (newFiles) => {
    imageInfos.value = await Promise.all(
      newFiles.map(async (file) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.src = url;
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        return {
          file,
          url,
          name: file.name,
          width: img.width,
          height: img.height,
          size: file.size,
          type: file.type,
        };
      })
    );
  });

  return {
    imageInfos,
  };
};
