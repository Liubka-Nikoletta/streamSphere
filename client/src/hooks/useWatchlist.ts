import toast from "react-hot-toast";
import api from "../api/axios.ts";
import {useAuthCheck} from "./useAuthCheck.ts";

export const useWatchlist = (movieId: number | undefined) => {
    const {executeProtectedAction, user, updateUser} = useAuthCheck();
    const isAdded = !!(user?.watchList && movieId && user.watchList.includes(movieId));

    const toggleWatchlist = async () => {
        if(!movieId){
            toast.error("Movie ID is missing");
            return;
        }

        executeProtectedAction(async () => {
            try{
                if(isAdded){
                    await api.delete("/watchList/remove", {data: { movieId: movieId }});
                    toast.success("Movie removed");

                    if(user){
                        const newWatchlist = user.watchList.filter(id => id !== movieId);
                        updateUser({...user, watchList: newWatchlist});
                    }
                } else {
                    await api.post("/watchList/add", { movieId: movieId });

                    if(user){
                        const newWatchlist = [...user.watchList,movieId];
                        updateUser({...user, watchList: newWatchlist})
                    }
                    toast.success("Movie added");
                }
            } catch (error) {
                toast.error("Something went wrong");
            }
        })
    }

    return { isAdded, toggleWatchlist };
}