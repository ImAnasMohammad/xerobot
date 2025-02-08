
import { sendPost } from '../../utils/sendRequest';

async function sendLinks(accessToken, igId, recipient, buttons, text = 'Here is your link') {
    const url = `https://graph.instagram.com/v22.0/${igId}/messages`;
    console.log(buttons)

    const payload = {
        recipient,
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text,
                    buttons
                }
            }
        }
    }

    return sendPost(url, payload, accessToken);
}

export default sendLinks;