import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => ([
    { title: 'Resumind | Review ' },
    { name: 'description', content: 'Detailed overview of your resume' },
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
    }, [isLoading])

    useEffect(() => {
        const loadResume = async () => {
            try {
                const resume = await kv.get(`resume:${id}`);

                if (!resume) {
                    console.error("Resume data not found for ID:", id);
                    return;
                }

                const data = JSON.parse(resume);

                // Set feedback immediately so the UI shows something even if files fail to load
                if (data.feedback) {
                    setFeedback(data.feedback);
                }

                // Handle both IndexedDB UUIDs (new) and data URLs (legacy)
                if (data.imagePath) {
                    if (data.imagePath.startsWith('data:')) {
                        // Legacy: It's a data URL, use directly
                        setImageUrl(data.imagePath);
                        setResumeUrl(data.imagePath);
                    } else {
                        // New: It's a UUID, fetch from IndexedDB
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

                console.log({ feedback: data.feedback });
            } catch (error) {
                console.error("Error loading resume data:", error);
            }
        }

        loadResume();
    }, [id]);

    return (
        <main className="!pt-0">
            <nav className="resume-nav">
                <Link to="/" className="back-button">
                    <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
                    <span className="text-gray-800 text-sm font-semibold">Back to Homepage</span>
                </Link>
            </nav>
            <div className="flex flex-row w-full max-lg:flex-col-reverse">
                <section className="feedback-section bg-[url('/images/bg-small.svg') bg-cover h-[100vh] sticky top-0 items-center justify-center">
                    {imageUrl && resumeUrl && (
                        <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={imageUrl}
                                    className="w-full h-full object-contain rounded-2xl"
                                    title="resume"
                                />
                            </a>
                        </div>
                    )}
                </section>
                <section className="feedback-section">
                    <h2 className="text-4xl !text-black font-bold">Resume Review</h2>
                    {feedback ? (
                        <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                            <Summary feedback={feedback} />
                            <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                            <Details feedback={feedback} />
                        </div>
                    ) : (
                        <img src="/images/resume-scan-2.gif" className="w-full" />
                    )}
                </section>
            </div>
        </main>
    )
}
export default Resume
