import { sendPost } from '../../utils/sendRequest';

async function sendText(accessToken, igId, recipient = {}, messageText) {
  console.log(messageText)
  const url = `https://graph.instagram.com/v22.0/${igId}/messages`;

  const payload = {
    recipient,
    message: {
      text: messageText,
    },
  };

  return sendPost(url,payload,accessToken);
}

export default sendText