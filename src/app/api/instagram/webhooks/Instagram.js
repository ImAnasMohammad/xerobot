import { success } from "./webhookResponse";
import handleComment from "./handleComment";
import handleMention from "./handleMention";
import handleMessage from "./handleMessage";
import handleStoryInsights from "./handleStoryInsights";

const Instagram =(entries)=>{
    
    entries.forEach((entry) => {
        const {changes=[],id,messaging=[]} = entry;
        changes?.forEach(({field,value}) => {
            if (field === "comments") {
                handleComment(value,id);
            }else if (field === "mentions") {
                handleMention(value,id);
            }else if (field === "messages") {
                handleMessage(value,id)
            }else if (field === "story_insights") {
                handleStoryInsights(value,id);
            }
        });
    });
    return success()
}

export default Instagram;