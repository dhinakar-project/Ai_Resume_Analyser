import Card, { CardBody, CardHeader } from "~/components/ui/Card";
import Badge from "~/components/ui/Badge";
import ProgressBar, { CircularProgress } from "~/components/ui/ProgressBar";
import { Link } from "react-router";
import { useState } from "react";

import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Dashboard() {
    const { auth, isLoading } = usePuterStore();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate('/auth?next=/dashboard');
        }
    }, [isLoading, auth.isAuthenticated, navigate]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
            </div>
        );
    }

    if (!auth.isAuthenticated) return null;

    // Dummy data
    const atsScore = 87;
    const keywordMatch = { matched: 23, total: 30 };
    const missingSkills = ['Docker', 'Kubernetes', 'AWS', 'GraphQL', 'TypeScript', 'Redis', 'MongoDB'];

    const scoreBreakdown = [
        { label: 'Keywords', value: 90, variant: 'success' as const },
        { label: 'Formatting', value: 85, variant: 'success' as const },
        { label: 'Structure', value: 88, variant: 'success' as const },
        { label: 'Length', value: 82, variant: 'warning' as const },
    ];

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 p-6 flex-shrink-0">
                <Link to="/" className="flex items-center gap-2 mb-8">
                    <div className="text-2xl font-bold bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
                        AI-RESUME-ANALYSER
                    </div>
                </Link>

                <nav className="space-y-2">
                    <SidebarItem
                        icon={<HomeIcon />}
                        label="Overview"
                        active={activeTab === 'overview'}
                        onClick={() => setActiveTab('overview')}
                    />
                    <SidebarItem
                        icon={<DocumentIcon />}
                        label="My Resumes"
                        active={activeTab === 'resumes'}
                        onClick={() => setActiveTab('resumes')}
                    />
                    <SidebarItem
                        icon={<TemplateIcon />}
                        label="Templates"
                        href="/templates"
                    />
                    <SidebarItem
                        icon={<UploadIcon />}
                        label="Upload New"
                        href="/upload"
                    />
                </nav>

                <div className="mt-auto pt-8 space-y-4">
                    <button
                        onClick={() => auth.signOut()}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="font-medium">Sign Out</span>
                    </button>

                    <Link to="/" className="flex items-center gap-3 px-4 text-sm text-gray-400 hover:text-white transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Resume Analysis
                        </h1>
                        <p className="text-gray-400">Last analyzed: 2 hours ago</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="ATS Score"
                            value={`${atsScore}%`}
                            change="+12%"
                            trend="up"
                            variant="success"
                        />
                        <StatCard
                            title="Keyword Match"
                            value={`${keywordMatch.matched}/${keywordMatch.total}`}
                            change="+5"
                            trend="up"
                            variant="default"
                        />
                        <StatCard
                            title="Missing Skills"
                            value={missingSkills.length.toString()}
                            change="-2"
                            trend="down"
                            variant="warning"
                        />
                        <StatCard
                            title="Formatting"
                            value="Good"
                            icon={<CheckIcon />}
                            variant="success"
                        />
                    </div>

                    {/* Main Analysis Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* ATS Score Breakdown */}
                        <Card variant="glass">
                            <CardHeader>
                                <h3 className="text-xl font-semibold text-white">ATS Score Breakdown</h3>
                            </CardHeader>
                            <CardBody>
                                <div className="flex justify-center mb-6">
                                    <CircularProgress value={atsScore} size="lg" variant="success" />
                                </div>
                                <div className="space-y-4">
                                    {scoreBreakdown.map((item) => (
                                        <div key={item.label}>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm text-gray-400">{item.label}</span>
                                                <span className="text-sm font-semibold text-white">{item.value}%</span>
                                            </div>
                                            <ProgressBar value={item.value} variant={item.variant} />
                                        </div>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>

                        {/* Missing Skills */}
                        <Card variant="glass">
                            <CardHeader>
                                <h3 className="text-xl font-semibold text-white">Missing Skills</h3>
                                <p className="text-sm text-gray-400 mt-1">
                                    Adding these could improve your score by 15%
                                </p>
                            </CardHeader>
                            <CardBody>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {missingSkills.map((skill) => (
                                        <Badge key={skill} variant="warning" size="md">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <div className="text-amber-400 mt-0.5">💡</div>
                                        <div>
                                            <p className="text-sm text-amber-200 font-medium mb-1">Pro Tip</p>
                                            <p className="text-sm text-gray-400">
                                                Focus on adding Docker and Kubernetes first - they appear in 78% of similar job postings.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Keyword Analysis */}
                    <Card variant="glass" className="mb-8">
                        <CardHeader>
                            <h3 className="text-xl font-semibold text-white">Keyword Analysis</h3>
                        </CardHeader>
                        <CardBody>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-emerald-400 mb-3">✓ Found Keywords</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['React', 'Node.js', 'Python', 'JavaScript', 'Git', 'Agile', 'REST API', 'SQL'].map(kw => (
                                            <Badge key={kw} variant="success" size="sm">{kw}</Badge>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-red-400 mb-3">✗ Missing Keywords</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {['CI/CD', 'Microservices', 'Cloud', 'DevOps', 'Testing', 'Scrum', 'Leadership'].map(kw => (
                                            <Badge key={kw} variant="error" size="sm">{kw}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {/* Grammar & Formatting */}
                    <Card variant="glass">
                        <CardHeader>
                            <h3 className="text-xl font-semibold text-white">Grammar & Formatting</h3>
                        </CardHeader>
                        <CardBody>
                            <div className="space-y-4">
                                <IssueItem
                                    type="success"
                                    title="Consistent formatting"
                                    description="All sections use consistent font sizes and spacing"
                                />
                                <IssueItem
                                    type="success"
                                    title="No spelling errors"
                                    description="All text has been checked and is error-free"
                                />
                                <IssueItem
                                    type="warning"
                                    title="Long bullet points"
                                    description="3 bullet points exceed 2 lines - consider shortening for better readability"
                                />
                                <IssueItem
                                    type="info"
                                    title="Date format"
                                    description="Using MM/YYYY format - this is ATS-friendly"
                                />
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </main>
        </div>
    );
}

// Sidebar Item Component
function SidebarItem({
    icon,
    label,
    active = false,
    onClick,
    href,
}: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
    href?: string;
}) {
    const className = `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active
        ? 'bg-brand-500 text-white'
        : 'text-gray-400 hover:bg-white/10 hover:text-white'
        }`;

    if (href) {
        return (
            <Link to={href} className={className}>
                {icon}
                <span className="font-medium">{label}</span>
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={className + ' w-full'}>
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    );
}

// Stat Card Component
function StatCard({
    title,
    value,
    change,
    trend,
    icon,
    variant = 'default',
}: {
    title: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down';
    icon?: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'error';
}) {
    const variantColors = {
        default: 'text-brand-400',
        success: 'text-emerald-400',
        warning: 'text-amber-400',
        error: 'text-red-400',
    };

    return (
        <Card variant="glass" className="p-6">
            <div className="flex justify-between items-start mb-2">
                <p className="text-sm text-gray-400">{title}</p>
                {icon && <div className="text-emerald-400">{icon}</div>}
            </div>
            <p className={`text-3xl font-bold mb-1 ${variantColors[variant]}`}>{value}</p>
            {change && (
                <p className={`text-sm flex items-center gap-1 ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {trend === 'up' ? '↑' : '↓'} {change} from last week
                </p>
            )}
        </Card>
    );
}

// Issue Item Component
function IssueItem({
    type,
    title,
    description,
}: {
    type: 'success' | 'warning' | 'error' | 'info';
    title: string;
    description: string;
}) {
    const icons = {
        success: '✓',
        warning: '⚠',
        error: '✗',
        info: 'ℹ',
    };

    const colors = {
        success: 'text-emerald-400',
        warning: 'text-amber-400',
        error: 'text-red-400',
        info: 'text-blue-400',
    };

    return (
        <div className="flex gap-3">
            <div className={`${colors[type]} mt-0.5`}>{icons[type]}</div>
            <div className="flex-1">
                <p className="text-white font-medium mb-1">{title}</p>
                <p className="text-sm text-gray-400">{description}</p>
            </div>
        </div>
    );
}

// Icons
function HomeIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
    );
}

function DocumentIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    );
}

function TemplateIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
    );
}

function UploadIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    );
}
