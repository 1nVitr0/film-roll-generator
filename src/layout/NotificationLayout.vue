<template>
  <ToastRoot v-for="(notification, index) of notifications" :key="index" v-model="notification.value.open"
    class="max-w-full shadow w-96 card md:card-side" :class="getNotificationClass(notification.value.type)">
    <figure v-if="notification.value.image" class="w-1/3 shrink-0 grow-0">
      <img :src="notification.value.image" :alt="notification.value.imageAlt" />
    </figure>
    <div class="p-4 card-body">
      <ToastTitle class="card-title">{{ notification.value.title }}</ToastTitle>
      <ToastDescription as="p">
        {{ notification.value.message }}
        <div class="mt-2 text-xl font-bold" v-if="notification.value.extra">{{ notification.value.extra }}
        </div>
      </ToastDescription>
      <div class="justify-end card-actions" v-if="notification.value.actions?.length">
        <ToastAction v-for="action of notification.value.actions" as-child :alt-text="action.text">
          <button class="btn" @click="action.onClick">
            <FontAwesomeIcon v-if="action.icon" :icon="action.icon" class="mr-2" />
            {{ action.text }}
          </button>
        </ToastAction>
      </div>
    </div>
    <ToastClose class="absolute top-1 right-1 btn btn-sm btn-circle btn-ghost">
      <FontAwesomeIcon :icon="faTimes" />
    </ToastClose>
  </ToastRoot>
  <ToastViewport class="fixed z-40 flex flex-col gap-4 bg-suc left-4 right-4 bottom-4 sm:left-auto" />
</template>

<script setup lang="ts">
import {
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastViewport,
  ToastClose
} from 'reka-ui'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useNotifications } from '../stores/notification'

const { notifications } = useNotifications()

const getNotificationClass = (type: string | undefined) => {
  switch (type) {
    case 'primary':
      return 'bg-primary text-primary-content'
    case 'secondary':
      return 'bg-secondary text-secondary-content'
    case 'info':
      return 'bg-info text-info-content'
    case 'success':
      return 'bg-success text-success-content'
    case 'accent':
      return 'bg-accent text-accent-content'
    case 'warning':
      return 'bg-warning text-warning-content'
    case 'error':
      return 'bg-error text-error-content'
    case 'neutral':
    default:
      return 'bg-neutral text-neutral-content'
  }
}
</script>
