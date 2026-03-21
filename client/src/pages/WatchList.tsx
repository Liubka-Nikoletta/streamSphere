import Header from '../components/Header.tsx';
import {fetchMovieDetails} from "../api/tmdb.ts";
import {useAuthCheck} from "../hooks/useAuthCheck.ts";
import {useEffect, useState} from "react";
import MovieCard from "../components/MovieCard.tsx";
import type {IMovie} from "../types/movie.ts";
import api from "../api/axios.ts";

const Movies = () => {
    const {user} =  useAuthCheck();
    const [movies, setMovies] = useState<IMovie[]>([]);

    useEffect(() => {
        const loadWatchlist = async () => {
            if(user){
                try{
                    const response = await api.get('/watchList');
                    const watchListIds: number [] = response.data;

                    if(watchListIds.length > 0){
                        const moviePromises = await watchListIds.map(id => fetchMovieDetails(id));
                        const results = await Promise.all(moviePromises);

                        setMovies(results.filter(movie => movie.id !== null));
                    } else {
                        setMovies([]);
                    }
                } catch(error){
                    console.error("Error loading watchlist:", error);
                }
            }
        };

        loadWatchlist();
    }, [user]);

    return (
        <div className="px-6 md:px-12 py-8 text-center">
            <Header />
            <main className="mt-20">
                {movies.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 pb-4 no-scrollbar">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Your watchlist is empty.</p>
                )}
            </main>
        </div>
    );
}

export default Movies;
