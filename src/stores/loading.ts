import { defineStore } from "pinia";
import { onUnmounted, ref, watch, type ComputedRef, type Ref } from "vue";
import { usePiniaRefStore } from "../composables/usePiniaRefStore";

export const useLoadingStore = defineStore("loading", () => {
  const loading = ref(false);

  return {
    loading,
  };
});

export const useLoading = (transient = false) => {
  const store = usePiniaRefStore(useLoadingStore());

  if (transient) {
    // Prevent leaking unbound loading state to other components
    onUnmounted(() => (store.loading.value = false));
  }

  const watchLoading = (...refs: (Ref<boolean> | ComputedRef<boolean>)[]) => {
    // Watch multiple refs and set the loading state to true if any of them is true
    watch(refs, (values) => (store.loading.value = values.some((value) => value)), {
      immediate: true,
    });
  };

  return { ...store, watchLoading };
};
