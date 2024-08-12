import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

const UserContext = createContext({});

function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                setUser(data);
            }).catch(error => {
                console.error("Error fetching user profile:", error);
            });
        }
    }, [user]); 

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserContextProvider };
