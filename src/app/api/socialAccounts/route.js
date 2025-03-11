import connectDB from "@/components/connections/db.connection";
import SocialMediaAccounts from "@/models/SocialMediaAccounts";
import sendResponse from "@/utils/sendResponse";


export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        let fields = searchParams.get("fields") ?? '';
        fields +=',accountProfile,accountUserName';
        fields = fields.split(',').filter(item=>item!=='');

        const allFields = [
            'accountId','accountName',
            'accountUserName','accountProfile',
            'platform','accountType','streamId',
            'isCompleted','isActive',
            'createdAt','updatedAt'
        ];

        let isAnyError = false;

        let obj = {}

        for(let i=0;i<fields?.length;i++){
            if(!allFields.includes(fields[i])){
                isAnyError=fields[i];
                break;
            }else{
                obj[fields[i]]=1;
            }
        }

        if(isAnyError){
            return sendResponse({status:404,message:`Invalid filed ${isAnyError}`});
        }



        if(!id){
            return sendResponse({status:404,message:"Invalid id"});
        }
        await connectDB();
        const account = await SocialMediaAccounts.findById(id,obj);
        return sendResponse({data:account});
    } catch (error) {
        console.log("Error occured at get username and profile",error)

        return sendResponse({
            message:error?.response?.data ?? error?.message ?? 'Something went wrong'
        })
    }
}
