import {AuthContext} from "../context/AuthContext.tsx";
import {useContext} from "react";
import toast from "react-hot-toast";

export const useAuthCheck = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthCheck must be used within an AuthProvider");
    }

    const executeProtectedAction = (action: () => void) => {
        if(context.isLoggedIn){
            action();
        } else{
            toast.error("You must be logged in to add movies to your list", {
                style: {
                    borderRadius: '8px',
                    background: '#333',
                    color: '#fff',
                }
            });
        }
    }

    return {... context, executeProtectedAction};
}