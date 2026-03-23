import Header from "../components/Header.tsx";
import Hero from "../components/Hero";
import CategoryBar from "../components/CategoryBar.tsx";
import {useState} from "react";
import MovieList from "../components/MovieList.tsx";

const Home = () => {
    const [selectedGenre, setSelectedGenre] = useState<number | string>("All");

    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <Hero/>
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

export default Home;