"use client"

import { Button } from "@/components/ui/button"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"

const AccountDailog = (
          {
            open,
            setOpen,
            heading,
            description="Select the account type you want to sync with ChatSync. ",
            children,
            handleClick,
            buttonLabel="Next",
            handleClose,
            ...btnAttributes

          }) => {
  return (
    <DialogRoot lazyMount onExitComplete={handleClose} open={open} onOpenChange={(e) => setOpen(e.open)} size={'lg'}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle fontSize={22} _icon={{
            fontSize:'xl',
            color:'red',
            display:'none'
          }}>{heading}</DialogTitle>
          <DialogDescription py={2}>{description}</DialogDescription>
        </DialogHeader>
        <DialogBody>
            {
                children
            }
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={handleClose}>Cancel</Button>
          </DialogActionTrigger>
          <Button {...btnAttributes} onClick={handleClick}>{buttonLabel}</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}


export default AccountDailog