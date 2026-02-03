import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Navbar from "~/components/Navbar";
import Container from "~/components/layout/Container";
import Badge from "~/components/ui/Badge";
import Button from "~/components/ui/Button";

export const meta = () => ([
    { title: 'Resumind | Analysis Results' },
    { name: 'description', content: 'Detailed analysis of your resume performance' },
])

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading, auth.isAuthenticated, navigate, id]);

    useEffect(() => {
        const loadResume = async () => {
            try {
                const resume = await kv.get(`resume:${id}`);

                if (!resume) {
                    console.error("Resume data not found for ID:", id);
                    return;
                }

                const data = JSON.parse(resume);

                if (data.feedback) {
                    setFeedback(data.feedback);
                }

                if (data.imagePath) {
                    if (data.imagePath.startsWith('data:')) {
                        setImageUrl(data.imagePath);
                        setResumeUrl(data.imagePath);
                    } else {
                        try {
                            const { getImageFromIndexedDB } = await import('~/lib/indexeddb');
                            const imageDataUrl = await getImageFromIndexedDB(data.imagePath);
                            if (imageDataUrl) {
                                setImageUrl(imageDataUrl);
                                setResumeUrl(imageDataUrl);
                            }
                        } catch (e) {
                            console.error("Failed to read image from IndexedDB:", e);
                        }
                    }
                }
            } catch (error) {
                console.error("Error loading resume data:", error);
            }
        }

        loadResume();
    }, [id, kv]);

    if (!feedback) {
        return (
            <main className="min-h-screen bg-black flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400 animate-pulse">Loading analysis results...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black selection:bg-brand-500/30 pb-20">
            <Navbar />

            <div className="pt-24 pb-8 border-b border-white/10 bg-white/5">
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <Link to="/dashboard">
                                    <Button variant="ghost" size="sm" className="pl-0 text-gray-400 hover:text-white">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Back to Dashboard
                                    </Button>
                                </Link>
                                <Badge variant="purple">Analysis Complete</Badge>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white">Resume Analysis Results</h1>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="secondary" onClick={() => window.print()}>
                                Export Report
                            </Button>
                            <Link to="/upload">
                                <Button variant="primary">
                                    Upload New Resume
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>

            <Container className="pt-12">
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Column: Resume Preview */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="sticky top-24">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold text-white">Original Resume</h3>
                                {resumeUrl && (
                                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-300 text-sm font-medium flex items-center gap-1">
                                        Open PDF
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                )}
                            </div>

                            {imageUrl ? (
                                <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 aspect-[1/1.4] relative group">
                                    <img
                                        src={imageUrl}
                                        alt="Resume Preview"
                                        className="w-full h-full object-contain"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                            <Button variant="primary">View Full Resume</Button>
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-xl border border-white/10 bg-white/5 aspect-[1/1.4] flex items-center justify-center text-gray-500">
                                    No preview available
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Analysis Results */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Summary feedback={feedback} />
                        </div>

                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                            <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                        </div>

                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                            <Details feedback={feedback} />
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
};

export default Resume;
