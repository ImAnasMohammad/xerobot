


import { sendPost } from '../../utils/sendRequest';

async function sendGeneric(accessToken, igId, recipient, elements) {
    const url = `https://graph.instagram.com/v22.0/${igId}/messages`;

    const payload = {
        recipient,
        message: {
            attachment: {
                type: "template",
                payload: {
                  template_type: "generic",
                  elements
                },
            },
        }
    }

    return sendPost(url, payload, accessToken);
}

export default sendGeneric;