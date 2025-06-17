<template>
  <DialogRoot v-model:open="open" class="z-50">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 bg-black/50 backdrop-blur" />
      <DialogContent
        class="fixed z-50 flex flex-col w-full max-w-3xl p-4 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg max-h-dvh top-1/2 left-1/2 bg-base-100">
        <DialogTitle class="text-xl font-bold" v-if="$slots.title || title">
          <slot name="title">{{ title }}</slot>
        </DialogTitle>
        <DialogDescription class="mt-2 text-sm" v-if="$slots.description || description">
          <slot name="description">{{ description }}</slot>
        </DialogDescription>
        <div class="py-2 overflow-x-hidden overflow-y-auto grow">
          <slot />
        </div>
        <DialogClose class="absolute p-2 text-gray-500 top-2 right-2 hover:text-gray-700 cursor-pointer"
          v-if="!noClose">
          <FontAwesomeIcon :icon="faXmark" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle } from 'reka-ui';

defineProps({
  noClose: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
});

const open = defineModel('open', {
  type: Boolean,
  default: false,
});
</script>