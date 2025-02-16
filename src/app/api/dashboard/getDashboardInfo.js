import connectDB from "@/components/connections/db.connection";
import SocialMediaAccounts from "@/models/SocialMediaAccounts";
import mongoose from "mongoose";

const getDashboardInfo = async (userId) => {
    if (!userId) {
        return {
            success: false,
            message: "Invalid userId",
            status: 404
        };
    }

    const objectId = new mongoose.Types.ObjectId(userId);

    try {
        await connectDB();
        const accountsWithAutomations = await SocialMediaAccounts.aggregate([
            { $match: { userId: objectId } },
            {
                $lookup: {
                    from: 'automations', // Ensure correct lowercase collection name
                    let: { accountId: '$_id' }, // Reference the _id of SocialMediaAccounts
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [{ $toObjectId: '$accountId' }, '$$accountId'] // Convert accountId to ObjectId
                                }
                            }
                        },
                        { $project: { receivedCount: 1, respondedCount:1 , _id: 0 } } // Select only trigger field
                    ],
                    as: 'automations'
                }
            },
            {
                $project: {
                    _id: 1,
                    accountUserName: 1,
                    accountProfile: 1,
                    "automations.receivedCount": 1,
                    "automations.respondedCount": 1
                }
            }
        ]);

        return {
            success: true,
            accountsWithAutomations
        };

    } catch (err) {
        return {
            success: false,
            message: err?.message || 'Something went wrong',
            status: 500
        };
    }
};

export default getDashboardInfo;
