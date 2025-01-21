import { success } from "../webhookResponse";
import handleComment from "./handleComment";
import handleMention from "./handleMention";
import handleMessage from "./handleMessage";
import handleStoryInsights from "./handleStoryInsights";

const Instagram =(entries)=>{
    
    entries.forEach((entry) => {
        entry.changes.forEach((change) => {
            if (change.field === "comments") {
                handleComment(change.value);
            }else if (change.field === "mentions") {
                handleMention(change.value);
            }else if (change.field === "messages") {
                handleMessage(change.value)
            }else if (change.field === "story_insights") {
                handleStoryInsights(change.value);
            }
        });
    });
    return success()
}

export default Instagram;