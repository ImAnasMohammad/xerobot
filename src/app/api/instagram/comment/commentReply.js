
import { sendPost } from "../utils/sendRequest";

const commentReply = async (accessToken, commentId, message) =>{

  const url = `https://graph.instagram.com/v22.0/${commentId}/replies`;

  const payload = { message: message };

  return sendPost(url,payload,accessToken)
}

export default commentReply;
