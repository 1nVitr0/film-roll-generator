<template>
  <PopupDialog v-model:open="open" :title="title" :description="message" no-close>
    <textarea
      v-if="showComment"
      v-model="comment"
      class="w-full h-24 my-4 textarea"
      :placeholder="$t('offer.add-comment')"
    ></textarea>
    <div class="flex justify-end gap-2">
      <button class="btn btn-neutral" @click="cancel">
        <FontAwesomeIcon v-if="cancelIcon" :icon="cancelIcon" />
        {{ cancelText }}
      </button>
      <button class="btn btn-primary" @click="confirm">
        <FontAwesomeIcon v-if="confirmIcon" :icon="confirmIcon" />
        {{ confirmText }}
      </button>
    </div>
  </PopupDialog>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useConfirmDialog } from "../../composables/useConfirmDialog";
import PopupDialog from "./PopupDialog.vue";

const {
  open,
  title,
  message,
  confirmText,
  cancelText,
  confirm,
  confirmIcon,
  cancel,
  cancelIcon,
  comment,
  showComment,
} = useConfirmDialog();
</script>
