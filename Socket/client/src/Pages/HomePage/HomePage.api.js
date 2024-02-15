export const getAllChat = async ({ page = 1, limit = 5, setChatData }) => {
    try {
        const requestOptions = {
            method: "GET",
            query: { page, limit }
        };

        const reasponse = await fetch(`${process.env.REACT_APP_REST_API}/chat/room/all`, requestOptions)
        const data = (await reasponse.json());
        data ? setChatData(data.data) : alert("Error")
    } catch (error) {
        alert(error.message)
    }
}