import Header from "../components/Header.tsx";
import Hero from "../components/Hero";

const Home = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <Hero/>
            </main>
        </div>
    );
}

export default Home;