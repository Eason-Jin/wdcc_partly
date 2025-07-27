import { useState, useEffect } from "react";
import axios from "axios";
import CarViewer from '../components/CarViewer';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export default function HomePage() {
    const [data, setData] = useState(String);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/auth`); // Adjust the endpoint as needed
                setData(JSON.stringify(response.data, null, 2));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Home Page</h1>
                <div style={{ height: '100vh', width: '100vw' }}>
                <CarViewer />
                </div>
            {data ? (
                <pre>{data}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}