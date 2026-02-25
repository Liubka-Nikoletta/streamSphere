import MovieCard from "./MovieCard.tsx";
import type {IMovie} from "../types/movie.ts";
import {useEffect, useState} from "react";
import {fetchPopularMovies} from "../api/tmdb.ts";

interface MovieRowProps {
    title: string;
}

const MovieRow = ({title}: MovieRowProps) => {
    const [popularMovies, setPopularMovies] = useState<IMovie[]>([]);

    useEffect(() => {
        const getMovies = async () => {
            const data = await fetchPopularMovies();
            setPopularMovies(data);
        }
        getMovies();
    }, [])

    return (
        <section className="px-6 md:px-12 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                     {title}
                </h2>
                <button className="text-red-600 text-xs md:text-sm font-bold hover:underline tracking-widest">
                    ВСІ →
                </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 pb-4 no-scrollbar">
                {popularMovies.map((movie) => (
                    <div key={movie.id} className="flex-shrink-0">
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default MovieRow;