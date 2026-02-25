interface MovieCardProps {
    genre: string;
    color: string;
}

const MovieCard = ({genre, color}: MovieCardProps) => {
    return (
        <section className={`relative aspect-[2/3] ${color} rounded-lg p-3 group cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg`}>
            <span className="absolute top-3 left-3 bg-red-600 text-[10px] font-bold px-2 py-0.5 rounded text-white uppercase tracking-wider">
                {genre}
            </span>
        </section>
    );
}

export default MovieCard;