import { getDataFromResponse } from "../../state/globalFunctions";

export const createChatRoom = async ({ data, token }) => {
    try {
        const requestOptions = {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${process.env.REACT_APP_REST_API}/chat/room/`, requestOptions);
        return await getDataFromResponse(response);

    } catch (error) {
        throw Error("Error creating chatroom")
    }
}

export const deleteChatRoom = async ({ chatRoomId, token }) => {
    try {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token,
            },
        };

        const response = await fetch(`${process.env.REACT_APP_REST_API}/chat/room/${chatRoomId}`, requestOptions);
        return await getDataFromResponse(response);

    } catch (error) {
        throw new Error("Error deleting chatroom");
    }
}

export const updateChatRoomName = async ({ chatRoomId, data, token }) => {
    try {
        const requestOptions = {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${process.env.REACT_APP_REST_API}/chat/room/${chatRoomId}/name`, requestOptions);
        return await getDataFromResponse(response);

    } catch (error) {
        throw new Error("Error updating chatroom name");
    }
}
