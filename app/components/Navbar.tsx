import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useState, useRef, useEffect } from "react";

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
        <nav className="navbar">
            <Link to="/">
                <p className="text-2xl font-bold text-gradient">RESUMIND</p>
            </Link>

            <div className="flex items-center gap-4">
                <Link to="/upload" className="primary-button w-fit">
                    Upload Resume
                </Link>

                {user && (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                            aria-label="User menu"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                                {user.username?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <svg
                                className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
                                <div className="p-4 border-b border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                                            {user.username?.[0]?.toUpperCase() || 'U'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-white truncate">
                                                {user.username || 'User'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-left text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span className="font-medium">Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

