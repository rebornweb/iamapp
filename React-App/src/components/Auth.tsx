import React, { useState, useEffect } from 'react';
import { SERVER_URL_MIIS, SERVER_URL_VIS } from '../config';

const UserInfoComponent = () => {
    const server = SERVER_URL_MIIS;
    const [userData, setUserData] = useState<{ username: string } | null>(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${server}/Auth/UserInfo`, {
                    credentials: 'include'
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setUserData(data);
            } catch (error:any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <p>Welcome {userData?.username}</p>
            {/* Add more user information fields as needed */}
        </div>
    );
};

export default UserInfoComponent;
