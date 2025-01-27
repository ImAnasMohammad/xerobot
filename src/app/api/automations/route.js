import connectDB from "@/components/connections/db.connection";
import Automations from "@/models/Automation";
import sendResponse from "@/utils/sendResponse";

export async function POST(req){

    const body = await req.json();
  
    const fields = [
        'userId','mediaId','trigger',
        'accountId','commentReply',
        'direactMessage','askToFollow',
        'initialMessage','url','label',
        'commentCount','replyCount','isLive',
        'createdAt','updatedAt'
    ];

    let anyErrorsInFields = false;
    console.log(body)

    for(let key in body){
        if(!fields?.includes(key)){
            anyErrorsInFields = key;
        }
    }

    if(anyErrorsInFields){
        return sendResponse({status:404,message:`Invalid Field ${anyErrorsInFields}`});
    }

    try{

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
            buttons.push({url,label:label??url});
        }

        connectDB()

        const newAutomaion = Automations({...body,buttons,trigger:trigger?.toLowerCase()});

        await newAutomaion.save();

        if(newAutomaion) return sendResponse({data:"Automation set successfully."});

        
        return sendResponse({message:'Something went worong.'})

    }catch(err){
        if( err?.code===11000 ) return sendResponse({status:409,message:'Automation already exist for this post'})
        return sendResponse({message:err?.message ?? 'Something went wrong'});
    }

}