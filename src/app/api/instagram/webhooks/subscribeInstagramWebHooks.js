import axios from "axios";

const subscribeInstagramWebHooks = async (accessToken)=> {
  const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
  const appSec = process.env.NEXT_FACEBOOK_APP_SECRET;
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v17.0/${appId}/subscriptions`,
      {
        object: "instagram",
        callback_url: "https://6ac3-223-185-47-154.ngrok-free.app/api/instagram/webhooks",
        fields: "comments,mentions,story_insights,messages",
        verify_token: process.env.NEXT_WEBHOOK_TOKEN,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${appId}|${appSec}`,
        },
      }
    );
    return {
      success: true
    }
  } catch (error) {
    console.log(error.response.data)
    return {
      success: false,
      message: error.response?.data || error.message
    }
  }
}

export default subscribeInstagramWebHooks;