import Header from '../components/Header.tsx';
import CategoryBar from "../components/CategoryBar.tsx";
import MovieList from "../components/MovieList.tsx";

const Movies = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="mt-20">
                <CategoryBar/>
                <MovieList/>
            </main>
        </div>
    );
}

export default Movies;
