import type {IMovie} from "../types/movie.ts";

const MovieCard = ({movie}: {movie: IMovie} ) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return (
        <section className={`relative aspect-[2/3] rounded-lg overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg`}>
            <img src={imageUrl} alt={movie.title} className="w-full h-full object-cover"/>

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-sm leading-tight">{movie.title}</h3>
                <span className="text-yellow-400 text-xs font-bold mt-1">★ {movie.vote_average.toFixed(1)}</span>
            </div>
        </section>
    );
}

export default MovieCard;