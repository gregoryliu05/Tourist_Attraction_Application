import { createContext, useState, useEffect } from "react";


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const savedAuth = localStorage.getItem('auth');
        return savedAuth ? JSON.parse(savedAuth) : {};
    }
    );

    useEffect(() => {
        console.log("auth changed ", auth);
        localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth]);

    return (
        <AuthContext.Provider value = {{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;