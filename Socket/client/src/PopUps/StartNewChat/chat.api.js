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