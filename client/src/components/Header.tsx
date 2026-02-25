import {Link} from "react-router-dom";
import Input from "../components/Input";
import {useState} from "react";
import {User} from 'lucide-react';

const Header = () => {
    const [searchText, setSearchText] = useState<string>("");

    return (
        <header className="fixed top-0 left-0 w-full flex items-center justify-between px-10 py-4 bg-black/20 backdrop-blur-md z-50 transition-all duration-300 hover:bg-black/50">
            <div className="font-bebas text-[1.5rem] tracking-[1px] text-red-600 text-shadow: var(--text-shadow-logo)">STREAMSPHERE</div>
            <nav aria-label="Global" className="flex gap-6 text-white text-sm">
                <Link to="/" className="hover:text-red-600">Home</Link>
                <Link to="/movies" className="hover:text-red-600">Movies</Link>
                <Link to="/watchList" className="hover:text-red-600">My watchlist</Link>
            </nav>
            <div className="flex items-center gap-4">
                <Input id="search"
                       name="search"
                       noLabel={true}
                       value={searchText}
                       onChange={(e) => setSearchText(e.target.value)}
                       placeholder="Search..."
                       />
                <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-all cursor-pointer shadow-lg shadow-red-900/20">
                    <User size={20} strokeWidth={2.5} />
                </div>
            </div>
        </header>
    );
}

export default Header;