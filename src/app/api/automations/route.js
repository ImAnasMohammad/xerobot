import connectDB from "@/components/connections/db.connection";
import Automations from "@/models/Automation";
import getCookie from "@/utils/cookies/getCookie";
import sendResponse from "@/utils/sendResponse";

export async function POST(req){

    const body = await req.json();
  
    const fields = [
        'userId','mediaId','trigger',
        'accountId','commentReply',
        'direactMessage','askToFollow',
        'initialMessage','url','label',
        'commentCount','replyCount','isLive',
        'createdAt','updatedAt','accountId'
    ];

    let anyErrorsInFields = false;

    for(let key in body){
        if(!fields?.includes(key)){
            anyErrorsInFields = key;
            break;
        }
    }

    if(anyErrorsInFields){
        return sendResponse({status:404,message:`Invalid Field ${anyErrorsInFields}`});
    }

    try{

        const user = await getCookie(req);

        if(!user?.success){
            return sendResponse({status:403,message:'Please relogin.'});
        }

        const userId = user?.data?.payload?.id;

        const  {
            commentReply,
            url,
            direactMessage,
            label,
            trigger

        } = body;



        if(!trigger){
            return sendResponse({status:404,message:`Trigger must be need`})
        }
        if(!commentReply && !url && !direactMessage){
            return sendResponse({status:404,message:`Action cannot be completed`})
        }
        
        let buttons = []
        if(url){
            buttons.push({url,label:label||url});
        }

        connectDB()

        const newAutomaion = Automations({...body,buttons,trigger:trigger?.toLowerCase(),userId});

        await newAutomaion.save();

        if(newAutomaion) return sendResponse({data:"Automation set successfully."});

        
        return sendResponse({message:'Something went worong.'})

    }catch(err){
        console.log(err)
        if( err?.code===11000 ) return sendResponse({status:409,message:'Automation already exist for this post'})
        return sendResponse({message:err?.message || 'Something went wrong'});
    }

}