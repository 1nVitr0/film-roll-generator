<script setup lang="ts">
import { ToastProvider, TooltipProvider } from 'reka-ui'
import { useI18n } from 'vue-i18n'
import { RouterView } from 'vue-router'
import ConfirmDialog from './components/dialog/ConfirmDialog.vue'
import NotificationLayout from './layout/NotificationLayout.vue'
import { useNotifications } from './stores/notification'


const { t } = useI18n()
const { addNotification } = useNotifications()
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
