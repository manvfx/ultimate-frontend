import { launchToast } from "~/plugins/unified-toasts/mod";


export function toast({ color, icon, title, duration, clickHandler, closeHandler, action, actionIcon, actionHandler }) {
  launchToast({
    color,
    icon,
    title,
    duration,
    clickHandler,
    closeHandler,
    action,
    actionIcon,
    actionHandler,
  });
}

export function toastSuccess({ color, icon, title, duration, clickHandler, closeHandler, action, actionIcon, actionHandler }) {
  launchToast({
    type: 'success',
    color,
    icon,
    title,
    duration,
    clickHandler,
    closeHandler,
    action,
    actionIcon,
    actionHandler,
  });
}

export function toastError({ color, icon, title, duration, clickHandler, closeHandler, action, actionIcon, actionHandler }) {
  launchToast({
    type: 'error',
    color,
    icon,
    title,
    duration: duration || 10000,
    clickHandler,
    closeHandler,
    action,
    actionIcon,
    actionHandler,
  });
}

export function toastWarning({ color, icon, title, duration, clickHandler, closeHandler, action, actionIcon, actionHandler }) {
  launchToast({
    type: 'warning',
    color,
    icon,
    title,
    duration,
    clickHandler,
    closeHandler,
    action,
    actionIcon,
    actionHandler,
  });
}

export function toastInfo({ color, icon, title, duration, clickHandler, closeHandler, action, actionIcon, actionHandler }) {
  launchToast({
    type: 'info',
    color,
    icon,
    title,
    duration,
    clickHandler,
    closeHandler,
    action,
    actionIcon,
    actionHandler,
  });
}
