import axios from "axios";

export async function POST(req) {
    const { recipientId, message, accessToken } = await req.json();

    try {
        const response = await axios.post(
            `${process.env.GRAPH_API_URL}/${recipientId}/messages`,
            {
                message,
                access_token: accessToken,
            }
        );

        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
