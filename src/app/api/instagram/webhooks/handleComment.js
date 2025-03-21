
import { failed, success } from "./webhookResponse";
import sendText from "../message/send/text";
import sendCommentReply from "../comment/sendCommentReply";
import sendLinks from "../message/send/links";
import sendGeneric from "../message/send/image";
import { getByMediaId } from "../../automations/handleGet";
import { incrementCount } from "../../automations/handlePut";
import { decrypt } from "@/utils/encryption";
import { updateResetPermissions } from "../../socialAccounts/accounts/handlePut";
import getReplyCommentResponse from "../../automations/getResponse/replyCommentResponse";
import getDMCommentResponse from "../../automations/getResponse/DMCommentResponse";
import getBlendCommentResponse, { covertButtons } from "../../automations/getResponse/blendCommentResponse";

const handleComment = async (data, id) => {
    const mediaId = data?.media?.id;
    const text = data?.text;
    const recipientId = data?.from?.id;
    const recipientUsername = data?.from?.username;
    const commentId = data?.id;

    // Ignore comments from the same user (self-comments)
    if (id === recipientId) return success();


    // Fetch automation settings for this mediaId
    const automationsRes = await getByMediaId(mediaId);


    if (!automationsRes?.success) {
        return failed();
    }

    // Process automation triggers
    for (const automation of automationsRes?.automations || []) {

        if (automation?.trigger?.toLowerCase() === text?.toLowerCase()) {
            
            // Increment received count for automation tracking
            await incrementCount(mediaId, 0);

            const access_token = decrypt(automation?.accountId?.accessKey);

            let replyCommentRes = null;
            let DMCommentRes = null;
            let blendCommentRes = null;

            if(automation?.type === 'reply-comment'){
                const commentReplyRes = await getReplyCommentResponse(automation._id);
                if(commentReplyRes?.success){
                    const {reply} = commentReplyRes.commentReply;
                    replyCommentRes = await sendCommentReply(access_token, commentId, reply);
                }
            }
            
            if(automation?.type === 'dm-comment'){
                const commentDMRes = await getDMCommentResponse(automation._id);
                if(commentDMRes?.success){
                    const {dm} = commentDMRes.commentDM;
                    DMCommentRes = await sendText(access_token,id, {comment_id:commentId}, dm);
                }
            }

            if(automation?.type === 'blend-comment'){
                const commentBlendRes = await getBlendCommentResponse(automation._id);
                if(commentBlendRes?.success){
                    const {reply='',dm=''} = commentBlendRes.commentBlend;
                    let buttons = covertButtons(commentBlendRes.commentBlend.buttons || []);
                    DMCommentRes = await sendLinks(access_token, id,{comment_id:commentId},buttons,dm);
                    if(reply){
                        replyCommentRes = await sendCommentReply(access_token, commentId, reply);
                    }
                }
            }

            if(
                (replyCommentRes?.success || replyCommentRes===null ) &&
                (DMCommentRes?.success || DMCommentRes===null ) &&
                (blendCommentRes?.success || blendCommentRes===null )
            ){
                await incrementCount(mediaId, 1);
            }



            // // Send image/generic template (if configured)
            // if (imageUrl!='') {
            //     const {imageTitle='',imageSubTitile='',imageDefaultAction=''} = automation
            //     const elements = [{
            //         title:imageTitle,
            //         image_url:imageUrl,
            //         subtitle:imageSubTitile,
            //         default_action: {
            //             type: "web_url",
            //             url: imageDefaultAction,
            //         },
            //         buttons
            //     }];
                
            //     imgRes = await sendGeneric(access_token,id,{comment_id:commentId}, elements);
            // }

        }
    }

    return success();
};

export default handleComment;





// try{
//   await connectDB();
//   const automation = await Automations.findOneAndUpdate({mediaId},{ $inc: { commentCount: 1 } },{new:true});
//   const accessToken = await fetchAccessToken('67961cd919edd878787df4f9',{streamId:1});

//   if(accessToken?.success){
//       // if(automation && text?.includes(automation.trigger)){
//           const {accessKey} = accessToken;
//           const message = "Hello thank you for reaching out. here is your link";
//           const buttons = [
//               {  
//                 type:"web_url",
//                 url:"https://www.instagram.com/mailforfb083/",
//                 title:"Profile3"
//               },
//               {  
//                 type:"postback",
//                 payload:"send",
//                 title:"I followed"
//               },
//             ]
//             const elements = [
//               {
//                 title: "THE MESSAGE TITLE",
//                 image_url: "https://scontent.fvga2-1.fna.fbcdn.net/v/t39.2365-6/197000352_210164414260511_1056569475973147004_n.png?_nc_cat=101&ccb=1-7&_nc_sid=e280be&_nc_ohc=Y0adwKCg708Q7kNvgHVb6g9&_nc_zt=14&_nc_ht=scontent.fvga2-1.fna&_nc_gid=AvsA_ztUNhHQHvIerUtqjXJ&oh=00_AYCFs746NkY5mF2q2Onl7njujDStIJRs-SAgy0u0SNq70g&oe=67B19EAA",
//                 subtitle: "THE MESSAGE SUBTITLE",
//                 default_action: {
//                   type: "web_url",
//                   url: "https://www.instagram.com/p/DFQLMHLSdgX/?utm_source=ig_web_copy_link",
//                 },
//                 buttons
//               },
//             ];
//           const sendMsg = await sendText(accessKey,id,{comment_id:commentId},automation?.direactMessage);
//           const reply = await commentReply(accessKey,commentId,"Hello");
//           const sendbtn = await sendLinks(accessKey,id,{id:recipientId},buttons,message)
//           const sendGen = await sendGeneric(accessKey,id,{id:recipientId},elements)
//           console.log(sendMsg,reply,sendbtn,sendGen)
//       // }
//   }
// }catch(err){
//   console.log(err)
// }
// return success();