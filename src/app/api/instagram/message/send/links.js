
import { sendPost } from '../../utils/sendRequest';

async function sendLinks(accessToken, igId, recipient, buttons, message = '') {
    const url = `https://graph.instagram.com/v22.0/${igId}/messages`;

    const payload = {
        recipient,
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: message,
                    buttons
                }
            }
        }
    }

    return sendPost(url, payload, accessToken);
}

export default sendLinks;