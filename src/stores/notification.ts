import { defineStore } from "pinia";
import { type Ref, ref, watch } from "vue";
import { usePiniaRefStore } from "../composables/usePiniaRefStore";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface Notification {
  title: string;
  message: string;
  extra?: string;
  type?: "success" | "error" | "info" | "warning" | "primary" | "secondary" | "neutral";
  image?: string;
  imageAlt?: string;
  actions?: {
    icon?: IconDefinition;
    text: string;
    onClick: () => void;
  }[];
  onDismiss?: () => void;
}

interface ActiveNotification extends Notification {
  open: boolean;
}

export const useNotificationStore = defineStore("notifications", () => {
  const notifications = ref<Ref<ActiveNotification>[]>([]);

  const addNotification = (notification: Notification) => {
    const activeNotification = ref<ActiveNotification>({ ...notification, open: true });
    notifications.value.push(activeNotification);

    watch(
      () => activeNotification.value.open,
      (open) => {
        if (!open) {
          const index = notifications.value.indexOf(activeNotification);
          notifications.value.splice(index, 1);
        }
      }
    );
  };

  return { notifications, addNotification };
});

export const useNotifications = () => usePiniaRefStore(useNotificationStore());
