import sendResponse from "@/utils/sendResponse";
import connectDB from "@/components/connections/db.connection";
import SocialMediaAccounts from "@/models/SocialMediaAccounts";

export async function GET(req) {

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    let query = {};

    if (search) {
        query = {
            $or: [
                { accountName: { $regex: search, $options: "i" } },
                { accountUserName: { $regex: search, $options: "i" } },
                { platform: { $regex: search, $options: "i" } },
            ],
        };
    }

    try {
        await connectDB()
        const accounts = await SocialMediaAccounts.aggregate([
            { $match: query }, // Apply search filter if provided
            {
                $lookup: {
                    from: "automations",
                    localField: "_id",
                    foreignField: "accountId",
                    as: "automations",
                },
            },
            {
                $project: {
                    accountName: 1,
                    accountUserName: 1,
                    platform: 1,
                    accountProfile: 1,
                    automationCount: { $size: "$automations" },
                },
            },
        ]);
        return sendResponse({accounts,data:'ok'})
    } catch (err) {
        sendResponse({message:'Internal server error'})
    }
}