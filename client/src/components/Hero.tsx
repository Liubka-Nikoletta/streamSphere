import {useEffect, useState} from "react";
import Button from "../components/Button";
import type {IMovie} from "../types/movie.ts";
import {fetchTrendingMovie, fetchMovieDetails} from "../api/tmdb.ts";
import {Link} from "react-router-dom";

const Hero = () => {
    const [trendingMovie, setTrendingMovie] = useState<IMovie | null>(null);

    useEffect(() => {
        const getMovie = async () => {
            const results = await fetchTrendingMovie();
            if (results && results.length > 0) {
                const movieDetails = await fetchMovieDetails(results[0].id);
                setTrendingMovie(movieDetails);
            }
        }
        getMovie();
    }, []);

    if (!trendingMovie) return <div className="h-[85vh] w-full bg-black"></div>;

    const backgroundUrl = `https://image.tmdb.org/t/p/original${trendingMovie.backdrop_path}`;
    const genres = trendingMovie.genres?.slice(0, 2).map(g => g.name).join(' / ');
    const hours = Math.floor((trendingMovie.runtime || 0) / 60);
    const minutes = (trendingMovie.runtime || 0) % 60;
    const duration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

    return(
        <section className="relative h-[85vh] w-full bg-black overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center"
                 style={{ backgroundImage: `url('${backgroundUrl}')` }}>

                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 via-black/60 to-transparent"></div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-12 lg:w-2/3 text-left">
                <div className="flex items-center gap-2 bg-red-600/20 text-red-600 text-[10px] font-bold px-2 py-1 rounded w-fit mb-4">
                    <span>TOP OF THE DAY</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bebas text-white mb-4 tracking-wider uppercase drop-shadow-md">
                    {trendingMovie.title}
                </h1>

                <div className="flex items-center gap-3 md:gap-4 text-gray-300 text-xs md:text-sm mb-6">
                    <span className="text-yellow-400 font-bold">{trendingMovie.vote_average}</span>
                    <span>{trendingMovie.release_date.split('-')[0]}</span>
                    <span className="hidden sm:inline">{duration}</span>
                    <span>{genres}</span>
                </div>

                <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl mb-8 line-clamp-3 md:line-clamp-none">
                    {trendingMovie.overview}
                </p>

                <div className="flex flex-wrap gap-4">
                    <Link to={`/movie/${trendingMovie.id}`}><Button name="Detail" size="lg"/></Link>
                    <Button name="+ Add to list" size="lg" variant="secondary"/>
                </div>
            </div>
        </section>
    );
}

export default Hero;