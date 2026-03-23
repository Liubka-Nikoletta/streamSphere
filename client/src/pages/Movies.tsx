import Header from '../components/Header.tsx';
import CategoryBar from "../components/CategoryBar.tsx";
import MovieList from "../components/MovieList.tsx";
import {useState} from "react";

const Movies = () => {
    const [selectedGenre, setSelectedGenre] = useState<number | string>("All");

    return (
        <div className="min-h-screen">
            <Header />
            <main className="mt-20">
                <CategoryBar
                    activeCategory = {selectedGenre}
                    onCategoryChange = {setSelectedGenre}
                />
                <MovieList
                    genreId={selectedGenre}
                />
            </main>
        </div>
    );
}

export default Movies;
