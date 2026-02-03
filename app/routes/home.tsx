import type { Route } from "./+types/home";
import { Link } from "react-router";
import Navbar from "~/components/Navbar";
import Container from "~/components/layout/Container";
import Button from "~/components/ui/Button";
import Card, { CardBody } from "~/components/ui/Card";
import Badge from "~/components/ui/Badge";
import { useEffect, useState } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "AI-RESUME-ANALYSER - AI-Powered Resume Analysis" },
    { name: "description", content: "Land your dream job with ATS-optimized resumes. Get instant AI feedback and increase your interview chances by 3x." },
  ];
}

export default function Home() {
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

        <Container className="relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <Badge variant="purple" className="mb-6 animate-fade-in">
              ✨ AI-Powered Resume Analysis
            </Badge>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight animate-fade-in-up">
              Land Your Dream Job with
              <br />
              ATS-Optimized Resumes
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
              Get instant AI feedback on your resume. Optimize for ATS systems.
              Increase your interview chances by <span className="text-emerald-400 font-semibold">3x</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
              <Link to="/upload">
                <Button size="lg" variant="primary" className="text-lg px-8 py-4">
                  Analyze Your Resume
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Link to="/templates">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                  Browse Templates
                </Button>
              </Link>
            </div>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/10 bg-white/5 backdrop-blur-sm">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="50K+" label="Resumes Analyzed" visible={statsVisible} delay={0} />
            <StatCard number="85%" label="ATS Score Improved" visible={statsVisible} delay={100} />
            <StatCard number="3x" label="More Interviews" visible={statsVisible} delay={200} />
            <StatCard number="24/7" label="AI Available" visible={statsVisible} delay={300} />
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-32">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Everything You Need to Stand Out
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful AI tools designed to help you land your dream job
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="✨"
              title="AI-Powered Analysis"
              description="Advanced algorithms analyze your resume against ATS requirements and industry standards"
            />
            <FeatureCard
              icon="📊"
              title="Real-Time Scoring"
              description="Get instant feedback on keyword match, formatting, structure, and overall ATS compatibility"
            />
            <FeatureCard
              icon="📄"
              title="ATS-Friendly Templates"
              description="Choose from 20+ professionally designed, ATS-optimized templates for every role"
            />
            <FeatureCard
              icon="🎯"
              title="Keyword Optimization"
              description="Identify missing keywords and skills that recruiters are looking for in your field"
            />
            <FeatureCard
              icon="🔍"
              title="Grammar & Formatting"
              description="Catch typos, formatting issues, and structural problems before you apply"
            />
            <FeatureCard
              icon="💼"
              title="Role-Specific Tips"
              description="Get tailored advice for Software Engineers, Data Scientists, PMs, and more"
            />
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="py-32 bg-white/5">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Get Hired in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-400">
              Our AI-powered platform makes resume optimization effortless
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            <StepCard
              number="01"
              title="Upload Your Resume"
              description="Simply drag and drop your resume PDF. Our AI instantly converts and analyzes it."
            />
            <StepCard
              number="02"
              title="Get AI Feedback"
              description="Receive detailed insights on ATS score, keyword match, missing skills, and formatting issues."
            />
            <StepCard
              number="03"
              title="Download & Apply"
              description="Apply the suggestions, download your optimized resume, and land more interviews."
            />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <Container>
          <Card variant="glass" className="p-12 md:p-16 text-center relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 via-purple-500/10 to-pink-500/10" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Ready to Land Your Dream Job?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Join 50,000+ job seekers who improved their resumes with AI
              </p>
              <Link to="/upload">
                <Button size="lg" variant="primary" className="text-lg px-10 py-4">
                  Start Free Analysis
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
            </div>
          </Card>
        </Container>
      </section>
    </main>
  );
}

// Component: StatCard
function StatCard({ number, label, visible, delay }: { number: string; label: string; visible: boolean; delay: number }) {
  return (
    <div
      className={`text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent mb-2">
        {number}
      </div>
      <div className="text-gray-400 text-sm md:text-base">{label}</div>
    </div>
  );
}

// Component: FeatureCard
function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <Card hover variant="glass" className="p-8 transition-all duration-300 hover:scale-105">
      <CardBody className="p-0">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </CardBody>
    </Card>
  );
}

// Component: StepCard
function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex gap-6 items-start group">
      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform">
        {number}
      </div>
      <div className="flex-1 pt-2">
        <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400 text-lg leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
