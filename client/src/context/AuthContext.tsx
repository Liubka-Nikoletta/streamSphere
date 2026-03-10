import {createContext, type ReactNode, useEffect, useState} from 'react';

interface IAuthContext {
    logIn: (token: string) => void;
    logOut: () => void;
    isLoggedIn: boolean;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: {children: ReactNode}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) setIsLoggedIn(true);

        setLoading(false);
    }, [])

    const logIn = (token: string) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    }

    const logOut = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }

    if (loading) {
        return <div>Checking authorization...</div>;
    }

    return (
        <AuthContext.Provider value={{logIn, isLoggedIn, logOut}}>
            {children}
        </AuthContext.Provider>
    );
}
