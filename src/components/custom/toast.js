import { toaster } from "../ui/toaster"


const toastSuccess = (title)=>{
    return toaster.create({
        title,
        type: 'success',
    })
}

const toastError = (title)=>{
    return toaster.create({
        title,
        type: 'error',
    })
}


export {toastError,toastSuccess}