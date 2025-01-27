import connectDB from "@/components/connections/db.connection";
import { success } from "./webhookResponse";
import Automations from "@/models/Automation";
import sendText from "../message/send/text";
import fetchAccessToken from "../../socialAccounts/fetchAccessToken";
import commentReply from "../comment/commentReply";
import sendLinks from "../message/send/links";
import sendGeneric from "../message/send/image";

const handleComment = async(data,id)=>{
    
    const mediaId = data?.media?.id;
    const text = data?.text;
    const recipientId = data?.from?.id;
    const recipientUsername = data?.from?.username;
    const commentId = data?.id;

    if(id===recipientId) return success();

    try{
        await connectDB();
        const automation = await Automations.findOneAndUpdate({mediaId},{ $inc: { commentCount: 1 } },{new:true});
        const accessToken = await fetchAccessToken('67961cd919edd878787df4f9',{streamId:1});

        if(accessToken?.success){
            // if(automation && text?.includes(automation.trigger)){
                const {accessKey} = accessToken;
                const message = "Hello thank you for reaching out. here is your link";
                const buttons = [
                    {  
                      type:"web_url",
                      url:"https://www.instagram.com/mailforfb083/",
                      title:"Profile3"
                    },
                    {  
                      type:"postback",
                      payload:"send",
                      title:"I followed"
                    },
                  ]
                  const elements = [
                    {
                      title: "THE MESSAGE TITLE",
                      image_url: "https://scontent.fvga2-1.fna.fbcdn.net/v/t39.2365-6/197000352_210164414260511_1056569475973147004_n.png?_nc_cat=101&ccb=1-7&_nc_sid=e280be&_nc_ohc=Y0adwKCg708Q7kNvgHVb6g9&_nc_zt=14&_nc_ht=scontent.fvga2-1.fna&_nc_gid=AvsA_ztUNhHQHvIerUtqjXJ&oh=00_AYCFs746NkY5mF2q2Onl7njujDStIJRs-SAgy0u0SNq70g&oe=67B19EAA",
                      subtitle: "THE MESSAGE SUBTITLE",
                      default_action: {
                        type: "web_url",
                        url: "https://www.instagram.com/p/DFQLMHLSdgX/?utm_source=ig_web_copy_link",
                      },
                      buttons
                    },
                  ];
                const sendMsg = await sendText(accessKey,id,{comment_id:commentId},automation?.direactMessage);
                const reply = await commentReply(accessKey,commentId,"Hello");
                const sendbtn = await sendLinks(accessKey,id,{id:recipientId},buttons,message)
                const sendGen = await sendGeneric(accessKey,id,{id:recipientId},elements)
                console.log(sendMsg,reply,sendbtn,sendGen)
            // }
        }
    }catch(err){
        console.log(err)
    }
    return success();
}

export default handleComment;