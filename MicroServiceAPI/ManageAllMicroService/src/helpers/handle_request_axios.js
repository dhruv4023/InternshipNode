import axios from "axios";

export
    const sendRequest = async (method, url, headers, data) => {
        try {
            const response = await axios.request({
                method,
                url,
                headers,
                data
            });
            return response;
        } catch (error) {
            throw error;
        }
    };