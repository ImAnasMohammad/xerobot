import { toastError, toastSuccess } from "@/components/custom/toast";
import { sendPost } from "@/utils/sendRequest";
import { redirect } from "next/navigation";



export const handleSubmit = async (automation,selectedPost) => {

    const { trigger,type } = automation;
    if (!selectedPost) {
      toastError("Please Select a Post");
      return;
    }

    if(!trigger){
      toastError("Please enter a trigger")
      return;
    }
    
    if(!type){
        toastError("Invalid Automation Type")
        return;
    }


    const automationDetails = await sendPost({
      url:'/api/automations',
      payload:{ ...automation, mediaId: selectedPost?.id }
    })


    if(automationDetails?.success){
      toastSuccess("Automation set Successfully.");
      redirect('/dashboard/automations');
    }else{
      toastError(automationDetails?.message || "Something went wrong")
    }
}