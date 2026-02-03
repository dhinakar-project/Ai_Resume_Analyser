import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useState, useRef, useEffect } from "react";
import Button from "~/components/ui/Button";

const Navbar = () => {
    const { auth } = usePuterStore();
    const { user, signOut } = auth;
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await signOut();
        setShowDropdown(false);
        window.location.href = '/';
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-4">
                    <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
                        RESUMIND
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link to="/templates" className="text-gray-300 hover:text-white transition-colors font-medium">
                            Templates
                        </Link>
                        <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors font-medium">
                            Dashboard
                        </Link>

                        <div className="h-6 w-px bg-white/10 mx-2 hidden sm:block"></div>

                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                                    aria-label="User menu"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                                        {user.username?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                    <svg
                                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="p-4 border-b border-white/10 bg-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                                                    {user.username?.[0]?.toUpperCase() || 'U'}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-white truncate">
                                                        {user.username || 'User'}
                                                    </p>
                                                    <p className="text-xs text-gray-400 truncate">
                                                        Logged in via Puter.js
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-2">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                <span className="font-medium">Sign Out</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/upload">
                                <Button variant="primary" size="sm">
                                    Upload Resume
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

