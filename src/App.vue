<script setup lang="ts">
import { ToastProvider, TooltipProvider } from 'reka-ui'
import { RouterView } from 'vue-router'
import ConfirmDialog from './components/dialog/ConfirmDialog.vue'
import NotificationLayout from './layout/NotificationLayout.vue'
</script>

<template>
  <ToastProvider>
    <TooltipProvider>
      <RouterView />
      <NotificationLayout />
      <ConfirmDialog />
    </TooltipProvider>
  </ToastProvider>
</template>
