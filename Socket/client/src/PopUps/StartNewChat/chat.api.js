
export const createChatRoom = async ({ data, token }) => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(`${process.env.REACT_APP_REST_API}/chat/room/`, requestOptions);
        const result = await response.json();
        console.log(result)
        if (result.success) return result;
        else alert(result.message)
    } catch (error) {
        console.error(error);
        throw error;
    }
}