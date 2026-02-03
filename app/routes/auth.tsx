import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Button from "~/components/ui/Button";

export const meta = () => ([
    { title: 'AI-RESUME-ANALYSER | Auth' },
    { name: 'description', content: 'Log into your account' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const next = searchParams.get('next') || '/dashboard';
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])

    return (
        <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

            <section className="flex flex-col gap-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center max-w-md w-full shadow-2xl relative overflow-hidden group mx-4 z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="flex flex-col items-center gap-4 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white mb-4 shadow-xl transform group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">Welcome</h1>
                    <p className="text-gray-500 text-lg">Log In to Continue Your Job Journey</p>
                </div>

                <div className="relative z-10 pt-4">
                    {isLoading ? (
                        <Button variant="primary" size="lg" className="w-full justify-center shadow-lg shadow-brand-500/25" disabled>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                            Signing you in...
                        </Button>
                    ) : (
                        <>
                            {auth.isAuthenticated ? (
                                <Button onClick={auth.signOut} variant="secondary" size="lg" className="w-full justify-center">
                                    Log Out
                                </Button>
                            ) : (
                                <Button onClick={auth.signIn} variant="primary" size="lg" className="w-full justify-center shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all duration-300">
                                    Log In with Puter.js
                                </Button>
                            )}
                        </>
                    )}
                </div>
            </section>
        </main>
    )
}

export default Auth
