import { Button } from "@/components/ui/button"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle
} from "@/components/ui/dialog"

const AccountRemove = ({open=false,setOpen,handleClick}) => {
  return (
    <DialogRoot role="alertdialog" open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our systems.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={()=>setOpen(false)}>Cancel</Button>
          </DialogActionTrigger>
          <Button colorPalette="red" onClick={()=>handleClick(open,"DELETE")}>Delete</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}


export default AccountRemove;