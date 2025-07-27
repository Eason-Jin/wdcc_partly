import axios from "axios";
const PARTLY_URL = process.env.PARTLY_URL
const PARTLY_API_KEY = process.env.PARTLY_API_KEY

export async function createGetRequest(url) {
    try {
        const response = await axios.get(`https://${PARTLY_URL}/api/v1/${url}`, {
            headers: {
                Authorization: `Bearer ${PARTLY_API_KEY}`,
                "Content-Type": "application/json"
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error making GET request:", error);
        throw error;
    }
}

export async function createPostRequest(url, data) {
    try {
        const response = await axios.post(`https://${PARTLY_URL}/api/v1/${url}`, data, {
            headers: {
                Authorization: `Bearer ${PARTLY_API_KEY}`,
                "Content-Type": "application/json"
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error making POST request:", error);
        throw error;
    }
}