import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import type {IMovie} from "../types/movie.ts";
import {fetchMovieDetails} from "../api/tmdb.ts";
import MovieCard from "../components/MovieCard.tsx";

const MovieDetail = () => {
    const {id} = useParams<{id: string}>();
    const [movie, setMovie] = useState<IMovie | null>(null);

    useEffect(() => {
        const getMovie = async () => {
            if (id) {
                const movieId = parseInt(id);
                const movieDetails = await fetchMovieDetails(movieId);
                setMovie(movieDetails);
            }
        }
        getMovie();
    }, [id]);

    if (!movie) return <div className="h-[85vh] w-full bg-black"></div>;

    const backgroundUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    const genres = movie.genres?.slice(0, 2).map(g => g.name).join(' / ');
    const hours = Math.floor((movie.runtime || 0) / 60);
    const minutes = (movie.runtime || 0) % 60;
    const duration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    const castNames = movie.credits?.cast?.slice(0, 7).map(actor => actor.name) || [];
    const trailer = movie.videos?.results.find(
        vid => vid.type === "Trailer" && vid.site === "YouTube"
    );

    return(
        <>
            <Header/>
            <section className="relative h-[85vh] w-full bg-black overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center"
                     style={{ backgroundImage: `url('${backgroundUrl}')` }}>

                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 via-black/60 to-transparent"></div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                </div>
                <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-12 lg:w-2/3 text-left">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bebas text-white mb-4 tracking-wider uppercase drop-shadow-md">
                        {movie.title}
                    </h1>

                    <div className="flex items-center gap-3 md:gap-4 text-gray-300 text-xs md:text-sm mb-6">
                        <span className="text-yellow-400 font-bold">{movie.vote_average}</span>
                        <span>{movie.release_date.split('-')[0]}</span>
                        <span className="hidden sm:inline">{duration}</span>
                        <span>{genres}</span>
                    </div>

                    <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl mb-8 line-clamp-3 md:line-clamp-none">
                        {movie.overview}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button name="+ Add to list" size="lg"/>
                    </div>
                </div>
            </section>
            <ul className="flex p-10 gap-9 flex-wrap">
                {castNames.map((name) => (
                    <li>
                        <Button name={name} variant="secondary"/>
                    </li>
                ))}
            </ul>
            {trailer && (
                <section className="pb-3 px-6 md:px-12 mt-12">
                    <h2 className="text-2xl font-bebas tracking-wider mb-6 text-white">Official Trailer</h2>
                    <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title={`${movie.title} Trailer`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </section>
            )}
            {movie.recommendations?.results.length ? (
                <section className="pb-10 px-6 md:px-12 mt-12">
                    <h2 className="text-2xl font-bebas tracking-wider mb-6">More like this</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {movie.recommendations.results.slice(0, 6).map(rec => (
                            <MovieCard key={rec.id} movie={rec} />
                        ))}
                    </div>
                </section>
            ) : null}
        </>
    );
}

export default MovieDetail;