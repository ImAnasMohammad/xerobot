const sendComment = async(commentId, message, access_token) => {


    if (!commentId || !message || !access_token) {
        return {
            success: false,
            status: 400,
            message: 'Some fields are missing'
        }
    }

    try {
        const url = `${process.env.NEXT_PUBLIC_GRAPH_API_URL}/${commentId}/replies`;

        await axios.post(url, { message, access_token });

        return {
            success: true,
        }

    } catch (error) {
        console.error('Error replying to comment:', error.response?.data || error.message);
        return {
            success: false,
            status:500,
            message: 'Failed to reply to comment',
            error: error.response?.data || error.message,
        };
    }
}

export default sendComment;