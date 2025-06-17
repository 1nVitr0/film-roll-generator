import { faCheck, type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { onUnmounted, ref } from "vue";
import { useI18n } from "vue-i18n";

export interface ConfirmDialogOptions {
  onConfirm?: (comment: string) => void;
  onCancel?: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  confirmIcon?: IconDefinition | null;
  cancelText?: string;
  cancelIcon?: IconDefinition | null;
  showComment?: boolean;
}

const open = ref(false);
const title = ref("");
const message = ref("");
const comment = ref("");
const confirmText = ref("");
const confirmIcon = ref<IconDefinition | null>(faCheck);
const cancelText = ref("");
const cancelIcon = ref<IconDefinition | null>(null);
const confirmCallback = ref<() => void | undefined>();
const cancelCallback = ref<() => void | undefined>();
const showComment = ref(false);

export const useConfirmDialog = () => {
  const { t } = useI18n();

  const show = async (options: ConfirmDialogOptions = {}) => {
    open.value = true;
    title.value = options.title || t("dialog.confirm");
    message.value = options.message || t("dialog.confirmQuestion", { action: "" });
    confirmText.value = options.confirmText || t("dialog.confirm");
    confirmIcon.value = options.confirmIcon || faCheck;
    cancelText.value = options.cancelText || t("dialog.cancel");
    cancelIcon.value = options.cancelIcon || null;
    showComment.value = options.showComment || false;
    comment.value = "";

    return new Promise((resolve, reject) => {
      confirmCallback.value = () => {
        open.value = false;
        if (options.onConfirm) options.onConfirm(comment.value);
        resolve(comment.value || true);
      };
      cancelCallback.value = () => {
        open.value = false;
        if (options.onCancel) options.onCancel();
        resolve(false);
      };
    });
  };

  const confirm = () => {
    if (confirmCallback.value) confirmCallback.value();
  };

  const cancel = () => {
    if (cancelCallback.value) cancelCallback.value();
  };

  onUnmounted(() => {
    open.value = false;
  });

  return {
    open,
    title,
    message,
    confirmText,
    confirmIcon,
    cancelText,
    cancelIcon,
    comment,
    showComment,
    show,
    confirm,
    cancel,
  };
};
