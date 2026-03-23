import MovieCard from "./MovieCard.tsx";
import type {IMovie} from "../types/movie.ts";
import {useEffect, useState} from "react";
import {fetchPopularMovies, fetchMoviesByGenre} from "../api/tmdb.ts";

interface MovieListProps {
    genreId: string | number;
}

const MovieList = ({genreId}: MovieListProps) => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const getMovies = async (pageNum: number, isNewGenre: boolean) => {
        setLoading(true);

        let data;
        if(genreId === "All") {
            data = await fetchPopularMovies(pageNum);
        } else {
            data = await fetchMoviesByGenre(genreId, pageNum);
        }

        setMovies(prev => (isNewGenre ? data : [...prev, ...data]));
        setLoading(false);
    }

    useEffect(() => {
        setPage(1);
        getMovies(1, true);
    }, [genreId]);

    const handleLoadMore = () => {
        const newPage = page + 1;
        setPage(newPage);
        getMovies(newPage, false);
    }

    return (
        <section className="px-6 md:px-12 py-8 text-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 pb-4 no-scrollbar">
                {movies
                    .filter(movie => movie.poster_path && movie.backdrop_path)
                    .map((movie) => (
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