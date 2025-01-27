

import Instagram from "./Instagram";
import { failed } from "./webhookResponse";
const verifyToken = process.env.NEXT_WEBHOOK_TOKEN;

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing to use raw body for verification
  },
};


export  async function GET(req,res) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");
    if (token === verifyToken) {
        return new Response(challenge, { status:200 });
    } else {
        return new Response("Verification failed", { status:403 });
    }
}


export  async function POST(req) {
  const body = await req.json();

  if (body.object === "instagram") {
    return Instagram(body.entry);
  }
  return failed();
}