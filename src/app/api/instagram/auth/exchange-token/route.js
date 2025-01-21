import axios from "axios";

export async function POST(req) {
    const { shortLivedToken } = await req.json();

    try {
        const response = await axios.get(`${process.env.GRAPH_API_URL}/oauth/access_token`, {
            params: {
                grant_type: "fb_exchange_token",
                client_id: process.env.FACEBOOK_APP_ID,
                client_secret: process.env.FACEBOOK_APP_SECRET,
                fb_exchange_token: shortLivedToken,
            },
        });

        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
