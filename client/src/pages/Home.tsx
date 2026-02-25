import Header from "../components/Header.tsx";
import Hero from "../components/Hero";
import CategoryBar from "../components/CategoryBar.tsx";
import MovieRow from "../components/MovieRow.tsx";

const Home = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <Hero/>
                <CategoryBar/>
                <MovieRow title="Popular now"/>
            </main>
        </div>
    );
}

export default Home;