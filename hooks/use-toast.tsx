"use client"

import * as React from "react"
import { toast as sonnerToast } from "sonner"

type ToastVariant = "default" | "destructive" | "success" | "info" | "warning"

type ToastProps = {
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: ToastVariant
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

function toast({ title, description, variant = "default", duration, action }: ToastProps) {
  const message = title ?? description
  const options = {
    description: title ? description : undefined,
    duration,
    action: action
      ? {
          label: action.label,
          onClick: action.onClick,
        }
      : undefined,
  }

  let id: string | number

  switch (variant) {
    case "destructive":
      id = sonnerToast.error(message, options)
      break
    case "success":
      id = sonnerToast.success(message, options)
      break
    case "info":
      id = sonnerToast.info(message, options)
      break
    case "warning":
      id = sonnerToast.warning(message, options)
      break
    default:
      id = sonnerToast(message, options)
  }

  return {
    id,
    dismiss: () => sonnerToast.dismiss(id),
    update: () => {},
  }
}

function useToast() {
  return {
    toast,
    dismiss: (toastId?: string | number) => sonnerToast.dismiss(toastId),
  }
}

export { useToast, toast }
