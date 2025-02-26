import { toastError } from "@/components/custom/toast";

const showError = (query)=>{
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get(query);
    if(error){
        toastError(error);
    }
}

export default showError;
