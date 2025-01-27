import axios from "axios";
import { failed, success } from "../webhookResponse";

export async function  GET(){
  const appId = process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID;
  const appSec = process.env.NEXT_INSTAGRAM_APP_SECRET;
  const url = process.env.NEXT_PUBLIC_APP_DOMAIN+"/api/instagram/webhooks";

  try {
    const response = await axios.post(
      `https://graph.instagram.com/${appId}/subscriptions`,
      {
        object: "instagram",
        callback_url:url,
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
    return success()
  } catch (error) {
    console.log(error.response.data)
    return failed(error?.response?.data ?? error?.message ?? 'Something went wrong.')
  }
}