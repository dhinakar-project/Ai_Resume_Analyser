import { type FormEvent, useState } from 'react'
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    // Helper function to add timeout to promises
    const withTimeout = <T,>(promise: Promise<T>, timeoutMs: number, errorMessage: string): Promise<T> => {
        return Promise.race([
            promise,
            new Promise<T>((_, reject) =>
                setTimeout(() => reject(new Error(errorMessage)), timeoutMs)
            )
        ]);
    };

    // Helper function to retry operations with exponential backoff
    const withRetry = async <T,>(
        operation: () => Promise<T>,
        maxAttempts: number = 2,
        delayMs: number = 1000
    ): Promise<T> => {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await operation();
            } catch (error) {
                if (attempt === maxAttempts) throw error;
                console.log(`Attempt ${attempt} failed, retrying in ${delayMs}ms...`);
                await new Promise(resolve => setTimeout(resolve, delayMs));
                delayMs *= 2; // Exponential backoff
            }
        }
        throw new Error('Max retry attempts reached');
    };

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {
        try {
            setIsProcessing(true);
            console.log('Starting analysis for file:', file.name);

            // Step 1: Convert PDF to image FIRST (no network call, faster)
            setStatusText('Converting PDF to image...');
            console.log('Step 1: Converting PDF to image...');
            const imageFile = await convertPdfToImage(file);
            console.log('Conversion result:', imageFile);

            if (!imageFile.file) {
                console.error('PDF conversion failed:', imageFile.error);
                setStatusText(`Error: Failed to convert PDF - ${imageFile.error || 'Unknown error'}`);
                setIsProcessing(false);
                return;
            }

            // Step 2: Store image locally in IndexedDB (no size limit)
            setStatusText('Preparing image for analysis...');
            console.log('Step 2: Storing image locally...');

            const uuid = generateUUID();

            // Convert to data URL for storage
            const reader = new FileReader();
            const imageDataUrl = await new Promise<string>((resolve) => {
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(imageFile.file!);
            });

            // Import IndexedDB helper
            const { saveImageToIndexedDB } = await import('~/lib/indexeddb');

            // Save image to IndexedDB (no size limit)
            await saveImageToIndexedDB(uuid, imageDataUrl);
            console.log('Image saved to IndexedDB with ID:', uuid);

            // Step 3: Save metadata with UUID reference (not the full image)
            setStatusText('Saving data...');
            console.log('Step 3: Saving metadata to KV store...');
            const data = {
                id: uuid,
                resumePath: uuid, // Store UUID reference, not data URL
                imagePath: uuid,
                companyName, jobTitle, jobDescription,
                feedback: '',
            }
            await kv.set(`resume:${uuid}`, JSON.stringify(data));
            console.log('Metadata saved with UUID:', uuid);

            // Step 4: AI Analysis using the image blob directly
            setStatusText('Analyzing with AI...');
            console.log('Step 4: Requesting AI feedback...');

            let feedback;
            try {
                // Use the imageDataUrl we already have
                const response = await fetch(imageDataUrl);
                const blob = await response.blob();
                const aiImageFile = new File([blob], `resume-${uuid}.png`, { type: 'image/png' });
                console.log('Created AI image file:', aiImageFile.name, aiImageFile.size, 'bytes');

                feedback = await withTimeout(
                    ai.img2txt(aiImageFile, false),
                    60000,
                    'AI analysis timed out. Please try again.'
                );
                console.log('AI OCR result:', feedback);
            } catch (err) {
                console.error('Step 4 failed - AI OCR error:');
                console.error('Error details:', JSON.stringify(err, Object.getOwnPropertyNames(err)));
                throw new Error(`AI OCR failed: ${err instanceof Error ? err.message : String(err)}`);
            }

            if (!feedback) {
                console.error('AI feedback failed - no result returned');
                setStatusText('Error: Failed to analyze resume');
                setIsProcessing(false);
                return;
            }

            // Step 5: Get structured feedback from AI
            console.log('Step 5: Getting structured feedback...');
            let structuredFeedback;
            try {
                structuredFeedback = await withTimeout(
                    ai.chat(
                        prepareInstructions({ jobTitle, jobDescription }) + '\n\nResume Text:\n' + feedback,
                        { model: 'claude-sonnet-4-5' }
                    ),
                    60000,
                    'AI analysis timed out. Please try again.'
                );
                console.log('Structured feedback result:', structuredFeedback);
            } catch (err) {
                console.error('Step 5 failed - AI chat error:');
                console.error('Error details:', JSON.stringify(err, Object.getOwnPropertyNames(err)));
                throw new Error(`AI chat failed: ${err instanceof Error ? err.message : String(err)}`);
            }

            if (!structuredFeedback) {
                console.error('Structured feedback failed');
                setStatusText('Error: Failed to generate feedback');
                setIsProcessing(false);
                return;
            }

            console.log('Step 6: Parsing and saving feedback...');
            let feedbackText = typeof structuredFeedback.message.content === 'string'
                ? structuredFeedback.message.content
                : structuredFeedback.message.content[0].text;

            // Strip markdown code fences if present (```json ... ```)
            feedbackText = feedbackText.trim();
            if (feedbackText.startsWith('```json')) {
                feedbackText = feedbackText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
            } else if (feedbackText.startsWith('```')) {
                feedbackText = feedbackText.replace(/^```\s*/, '').replace(/\s*```$/, '');
            }
            console.log('Cleaned feedback text:', feedbackText.substring(0, 200) + '...');

            data.feedback = JSON.parse(feedbackText);
            await kv.set(`resume:${uuid}`, JSON.stringify(data));

            setStatusText('Analysis complete, redirecting...');
            console.log('Complete! Navigating to:', `/resume/${uuid}`);
            navigate(`/resume/${uuid}`);
        } catch (error) {
            console.error('Fatal error during analysis:');
            console.error('Error object:', error);
            console.error('Error message:', error instanceof Error ? error.message : String(error));
            console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
            setStatusText(`Error: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
            setIsProcessing(false);
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if (!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        <a href="/" className="text-2xl font-bold bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
                            RESUMIND
                        </a>

                        <div className="flex items-center gap-6">
                            <a href="/templates" className="text-gray-300 hover:text-white transition-colors">
                                Templates
                            </a>
                            <a href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                                Dashboard
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="pt-32 pb-20 px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold mb-4 text-white">
                            {isProcessing ? 'Analyzing Your Resume' : 'Get AI-Powered Resume Feedback'}
                        </h1>
                        {isProcessing ? (
                            <p className="text-xl text-gray-400">{statusText}</p>
                        ) : (
                            <p className="text-xl text-gray-400">
                                Upload your resume and get instant ATS score and improvement tips
                            </p>
                        )}
                    </div>

                    {/* Processing State */}
                    {isProcessing && (
                        <div className="flex flex-col items-center justify-center">
                            <img src="/images/resume-scan.gif" className="w-64 h-64 object-contain" alt="Analyzing" />
                        </div>
                    )}

                    {/* Upload Form */}
                    {!isProcessing && (
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-glass">
                            <form id="upload-form" onSubmit={handleSubmit} className="space-y-6">
                                {/* Company Name */}
                                <div className="space-y-2">
                                    <label htmlFor="company-name" className="block text-sm font-medium text-gray-300">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        name="company-name"
                                        id="company-name"
                                        placeholder="e.g., Google, Microsoft, Amazon"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                {/* Job Title */}
                                <div className="space-y-2">
                                    <label htmlFor="job-title" className="block text-sm font-medium text-gray-300">
                                        Job Title
                                    </label>
                                    <input
                                        type="text"
                                        name="job-title"
                                        id="job-title"
                                        placeholder="e.g., Software Engineer, Data Scientist"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                {/* Job Description */}
                                <div className="space-y-2">
                                    <label htmlFor="job-description" className="block text-sm font-medium text-gray-300">
                                        Job Description
                                    </label>
                                    <textarea
                                        rows={5}
                                        name="job-description"
                                        id="job-description"
                                        placeholder="Paste the job description here..."
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none"
                                    />
                                </div>

                                {/* File Upload */}
                                <div className="space-y-2">
                                    <label htmlFor="uploader" className="block text-sm font-medium text-gray-300">
                                        Upload Resume (PDF)
                                    </label>
                                    <FileUploader onFileSelect={handleFileSelect} />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={!file}
                                    className="w-full px-6 py-4 bg-brand-500 text-white font-semibold rounded-lg hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                                >
                                    Analyze Resume
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload
