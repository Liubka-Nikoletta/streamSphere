import {Link} from "react-router-dom";
import Input from "../components/Input";
import {useState} from "react";
import {Menu, User, X} from 'lucide-react';
import {useAuthCheck} from "../hooks/useAuthCheck.ts";

const Header = () => {
    const [searchText, setSearchText] = useState<string>("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {isLoggedIn, logOut, user} = useAuthCheck();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 w-full flex items-center justify-between px-10 py-4 bg-black/20 backdrop-blur-md z-50 transition-all duration-300 hover:bg-black/50">
                <div className="font-bebas text-lg md:text-[1.5rem] tracking-[1px] text-red-600 text-shadow: var(--text-shadow-logo)">
                    STREAMSPHERE
                </div>

                <nav aria-label="Global" className="hidden md:flex gap-4 lg:gap-8 text-white text-sm font-medium">
                    <Link to="/" className="hover:text-red-600">Home</Link>
                    <Link to="/movies" className="hover:text-red-600">Movies</Link>
                    <Link to="/watchList" className="hover:text-red-600">My watchlist</Link>
                </nav>

                <div className="flex items-center gap-2 md:gap-4">
                    <div className="hidden sm:block sm:w-40 md:w-64">
                        <Input id="search"
                               name="search"
                               noLabel={true}
                               value={searchText}
                               onChange={(e) => setSearchText(e.target.value)}
                               placeholder="Search..."
                        />
                    </div>

                    <div
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="hidden md:flex w-8 h-8 md:w-9 md:h-9 bg-red-600 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg shadow-red-900/20">
                        <User size={18} strokeWidth={2.5} />
                    </div>

                    {isProfileOpen && (
                        <div className="absolute top-12 right-1 mt-3 w-40 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-2xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                            {isLoggedIn ? (
                                <>
                                    <div className="px-4 py-2 border-b border-white/10">
                                        <p className="text-xs text-gray-400">Signed in as</p>
                                        {user && (
                                            <p className="text-sm font-bold text-white truncate">{user.userName}</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => {
                                            logOut();
                                            setIsProfileOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/users/login"
                                    className="block px-4 py-2 text-sm text-white font-bold hover:bg-red-600 transition-colors text-center"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    Login / Sign Up
                                </Link>
                            )}
                        </div>
                    )}

                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="block md:hidden text-white">
                        {isMenuOpen ? <X size={24}/> :  <Menu size={24} />}
                    </button>
                </div>
            </header>

            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8 text-white text-xl font-semibold">
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/movies" onClick={() => setIsMenuOpen(false)}>Movies</Link>
                    <Link to="/watchList" onClick={() => setIsMenuOpen(false)}>My watchlist</Link>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Account</Link>
                </div>
            )}
        </>
    );
}

export default Header;