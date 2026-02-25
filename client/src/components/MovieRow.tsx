import MovieCard from "./MovieCard.tsx";

interface MovieRowProps {
    title: string;
}

const MovieRow = ({title}: MovieRowProps) => {
    const popularMovies = [
        { id: 1, genre: "Comedy", color: "bg-[#2d0a0a]"},
        { id: 2, genre: "Drama", color: "bg-[#0a1a3a]"},
        { id: 3, genre: "Horrors", color: "bg-[#1a2d0a]"},
        { id: 4, genre: "Fantasy", color: "bg-[#3d2d0a]"},
        { id: 5, genre: "Melodrama", color: "bg-[#2d0a2d]"},
        { id: 6, genre: "Documentary", color: "bg-[#0a0a2d]"},
    ];

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
                        <MovieCard genre={movie.genre} color={movie.color} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default MovieRow;