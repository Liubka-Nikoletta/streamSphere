import Header from "../components/Header.tsx";
import Hero from "../components/Hero";
import CategoryBar from "../components/CategoryBar.tsx";

const Home = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <Hero/>
                <CategoryBar/>
            </main>
        </div>
    );
}

export default Home;