import connectDB from "@/components/connections/db.connection";
import Automations from "@/models/Automation";
import sendResponse from "@/utils/sendResponse";


const handleDelete = async (req)=>{
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return sendResponse({ message: "invalid id", status: 404 });
    }
    try {
        await connectDB();

        const deletedAccount = await Automations.findByIdAndDelete(id);

        if (!deletedAccount) {
            return sendResponse({message:"Automation not found"});
        }

        return sendResponse({data:'Automation deleted successfully'});
    } catch (error) {
        return sendResponse({message:error?.message || "Internal Server Error"})
    }
}

export default handleDelete;