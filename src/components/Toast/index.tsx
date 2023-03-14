import Image from 'next/image'
import {
  Button,
  ToastAction,
  ToastDescription,
  ToastRoot,
  ToastTitle,
  ToastViewport,
  ToastProvider,
} from './styles'

import closeToast from '@/assets/x.svg'

interface ToastProps {
  title: string
  message: string
  open: boolean
  setOpen(): void
}

export function Toast({ open, message, title, setOpen }: ToastProps) {
  return (
    <ToastProvider swipeDirection="right">
      <ToastRoot open={open} onOpenChange={setOpen}>
        <ToastTitle>{title}</ToastTitle>
        <ToastDescription>{message}</ToastDescription>
        <ToastAction asChild altText="Goto schedule to undo">
          <Button>
            <Image src={closeToast} alt="" />
          </Button>
        </ToastAction>
      </ToastRoot>
      <ToastViewport />
    </ToastProvider>
  )
}
