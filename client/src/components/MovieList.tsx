import MovieCard from "./MovieCard.tsx";
import type {IMovie} from "../types/movie.ts";
import {useEffect, useState} from "react";
import {fetchPopularMovies} from "../api/tmdb.ts";

const MovieList = () => {
    const [popularMovies, setPopularMovies] = useState<IMovie[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const getMovies = async (pageNum: number) => {
        setLoading(true);
        const data = await fetchPopularMovies(pageNum);

        setPopularMovies(prev => [...prev, ...data]);
        setLoading(false);
    }

    useEffect(() => {
        getMovies(1);
    }, []);

    const handleLoadMore = () => {
        const newPage = page + 1;
        setPage(newPage);
        getMovies(newPage);
    }

    return (
        <section className="px-6 md:px-12 py-8 text-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 pb-4 no-scrollbar">
                {popularMovies.map((movie) => (
                    <div key={movie.id} className="flex-shrink-0">
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
            <button onClick={handleLoadMore}
                    disabled={loading}
                    className="bg-accent hover:bg-red-900 text-white px-8 py-2 rounded-full transition disabled:bg-gray-500">
                {loading ? 'Loading...' : 'Load More'}
            </button>
        </section>
    );
}

export default MovieList;