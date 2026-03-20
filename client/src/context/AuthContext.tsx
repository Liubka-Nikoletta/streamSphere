import {createContext, type ReactNode, useEffect, useState} from 'react';
import type {IUser} from "../types/user.ts";

interface IAuthContext {
    logIn: (token: string, userData: IUser) => void;
    logOut: () => void;
    isLoggedIn: boolean;
    user: IUser | null;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: {children: ReactNode}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if(token && savedUser && savedUser != "undefined") {
            try{
                setIsLoggedIn(true);
                setUser(JSON.parse(savedUser));
            } catch(e){
                console.error("Failed to parse user from localStorage", e);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }

        setLoading(false);
    }, [])

    const logIn = (token: string, user: IUser) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setIsLoggedIn(true);
    }

    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
    }

    if (loading) {
        return <div>Checking authorization...</div>;
    }

    return (
        <AuthContext.Provider value={{logIn, isLoggedIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    );
}
