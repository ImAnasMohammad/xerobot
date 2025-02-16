import connectDB from "@/components/connections/db.connection";
import Automations from "@/models/Automation";
import getCookie from "@/utils/cookies/getCookie";
import sendResponse from "@/utils/sendResponse";

const handlePost =async (req)=>{
    
    const body = await req.json();
  
    const fields = [
        'userId','mediaId','trigger',
        'accountId','commentReply',
        'message','askToFollow',
        'initialMessage','url','title','isLive',
        'createdAt','updatedAt','accountId','name',
        "imageUrl",'imageTitle','imageSubTitile','imageDefaultAction',
        "type"
    ];

    let anyErrorsInFields = false;

    for(let key in body){
        if(!fields?.includes(key)){
            anyErrorsInFields = key;
            break;
        }
    }

    if(anyErrorsInFields){
        return sendResponse({success:false,status:400,message:`Invalid Field ${anyErrorsInFields}`});
    }

    try{

        const user = await getCookie(req);

        if(!user?.success){
            return sendResponse({success:false,status:403,message:'Please relogin.'});
        }

        const userId = user?.data?.payload?.id;

        const  {
            commentReply,
            url,
            message,
            title,
            trigger

        } = body;



        if(!trigger){
            return sendResponse({success:false,status:400,message:`Trigger must be Required`})
        }
        if(!commentReply && !url && !message){
            return sendResponse({success:false,status:400,message:`Action cannot be completed`})
        }
        
        let buttons = []
        if(url){
            buttons.push({url,title:title||url});
        }

        connectDB()

        const newAutomaion = Automations({...body,buttons,trigger:trigger?.toLowerCase(),userId});

        await newAutomaion.save();

        if(newAutomaion) return sendResponse({success:true});

        
        return sendResponse({success:false,message:'Something went worong.'})

    }catch(err){
        console.log(err)
        if( err?.code===11000 ) return sendResponse({success:false,status:409,message:'Automation already exist for this post'})
        return sendResponse({success:false,message:err?.message || 'Something went wrong'});
    }
}

export default handlePost;