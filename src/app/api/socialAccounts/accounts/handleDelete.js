import connectDB from "@/components/connections/db.connection";
import Automations from "@/models/Automation";
import SocialMediaAccounts from "@/models/SocialMediaAccounts";
import sendResponse from "@/utils/sendResponse";

const handleDelete = async(req)=>{
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return sendResponse({ message: "invalid id", status: 404 });
    }
    try {
        await connectDB();
        // Delete all automations linked to this account
        await Automations.deleteMany({ accountId: id });

        // Delete the account
        const deletedAccount = await SocialMediaAccounts.findByIdAndDelete(id);

        if (!deletedAccount) {
            return sendResponse({message:"Account not found"});
        }

        return sendResponse({data:'Account deleted successfully'});
    } catch (error) {
        return sendResponse({message:error?.message || "Internal Server Error"})
    }
}

export default handleDelete;