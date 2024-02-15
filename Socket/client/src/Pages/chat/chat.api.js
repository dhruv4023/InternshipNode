export const getChatData = async ({ limit = 10, setChatData, CID }) => {
    try {
        const requestOptions = {
            method: "GET",
        };
        const response = await fetch(`${process.env.REACT_APP_REST_API}/chat/room/${CID}?limit=${limit}`, requestOptions);
        const data = await response.json();
        if (response.ok) {
            setChatData(data.data);
        } else {
            throw new Error(`Failed to fetch chat data: ${data.message}`);
        }
    } catch (error) {
        alert(error.message);
    }
}

export const getChatMessages = async ({ limit = 5, page = 1, setMessages, chatRoomId }) => {
    try {
        const requestOptions = {
            method: "GET",
        };
        const response = await fetch(`${process.env.REACT_APP_REST_API}/chat/message/chatrooms/${chatRoomId}?limit=${limit}&page=${page}`, requestOptions);
        const data = await response.json();
        if (response.ok) {
            return data.data.page_data
        } else {
            throw new Error(`Failed to fetch chat messages: ${data.message}`);
        }
    } catch (error) {
        alert(error.message);
    }
}
