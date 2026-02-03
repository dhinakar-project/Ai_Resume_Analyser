import Container from "~/components/layout/Container";
import Button from "~/components/ui/Button";
import Card, { CardBody } from "~/components/ui/Card";
import Badge from "~/components/ui/Badge";
import Input from "~/components/ui/Input";
import { Link } from "react-router";
import { useState, useMemo } from "react";
import { templates, categories, experienceLevels, companyTypes, type Template } from "~/data/templates";

import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Templates() {
    const { auth, isLoading } = usePuterStore();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
    const [selectedCompanyTypes, setSelectedCompanyTypes] = useState<string[]>([]);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate('/auth?next=/templates');
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

    // Filter templates based on selections
    const filteredTemplates = useMemo(() => {
        return templates.filter(template => {
            const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                template.bestFor.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(template.category);
            const matchesExperience = selectedExperience.length === 0 || selectedExperience.includes(template.experience);
            const matchesCompanyType = selectedCompanyTypes.length === 0 || selectedCompanyTypes.includes(template.companyType);

            return matchesSearch && matchesCategory && matchesExperience && matchesCompanyType;
        });
    }, [searchQuery, selectedCategories, selectedExperience, selectedCompanyTypes]);

    const toggleFilter = (value: string, selected: string[], setter: (val: string[]) => void) => {
        if (selected.includes(value)) {
            setter(selected.filter(v => v !== value));
        } else {
            setter([...selected, value]);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-12">
            <Container size="full" className="max-w-[1400px]">
                {/* Header */}
                <div className="mb-12">
                    <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>

                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                Resume Templates
                            </h1>
                            <p className="text-xl text-gray-400">
                                {filteredTemplates.length} ATS-optimized templates for every role
                            </p>
                        </div>

                        <Input
                            type="search"
                            placeholder="Search templates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-80"
                        />
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-72 flex-shrink-0">
                        <Card variant="glass" className="p-6 sticky top-6">
                            <h3 className="text-lg font-semibold mb-4 text-white">Filters</h3>

                            {/* Job Role Filter */}
                            <FilterSection title="Job Role">
                                {categories.map(cat => (
                                    <Checkbox
                                        key={cat.id}
                                        label={cat.label}
                                        checked={selectedCategories.includes(cat.id)}
                                        onChange={() => toggleFilter(cat.id, selectedCategories, setSelectedCategories)}
                                    />
                                ))}
                            </FilterSection>

                            {/* Experience Filter */}
                            <FilterSection title="Experience Level">
                                {experienceLevels.map(exp => (
                                    <Checkbox
                                        key={exp.id}
                                        label={exp.label}
                                        checked={selectedExperience.includes(exp.id)}
                                        onChange={() => toggleFilter(exp.id, selectedExperience, setSelectedExperience)}
                                    />
                                ))}
                            </FilterSection>

                            {/* Company Type Filter */}
                            <FilterSection title="Company Type">
                                {companyTypes.map(type => (
                                    <Checkbox
                                        key={type.id}
                                        label={type.label}
                                        checked={selectedCompanyTypes.includes(type.id)}
                                        onChange={() => toggleFilter(type.id, selectedCompanyTypes, setSelectedCompanyTypes)}
                                    />
                                ))}
                            </FilterSection>

                            {/* Clear Filters */}
                            {(selectedCategories.length > 0 || selectedExperience.length > 0 || selectedCompanyTypes.length > 0) && (
                                <Button
                                    variant="ghost"
                                    className="w-full mt-4"
                                    onClick={() => {
                                        setSelectedCategories([]);
                                        setSelectedExperience([]);
                                        setSelectedCompanyTypes([]);
                                    }}
                                >
                                    Clear All Filters
                                </Button>
                            )}
                        </Card>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {filteredTemplates.length === 0 ? (
                            <Card variant="glass" className="p-16 text-center">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-2xl font-semibold mb-2 text-white">No templates found</h3>
                                <p className="text-gray-400 mb-6">Try adjusting your filters or search query</p>
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedCategories([]);
                                        setSelectedExperience([]);
                                        setSelectedCompanyTypes([]);
                                    }}
                                >
                                    Reset Filters
                                </Button>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredTemplates.map(template => (
                                    <TemplateCard key={template.id} template={template} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </Container>
        </main>
    );
}

// Filter Section Component
function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">{title}</h4>
            <div className="space-y-2">
                {children}
            </div>
        </div>
    );
}

// Checkbox Component
function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
    return (
        <label className="flex items-center cursor-pointer group">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-brand-500 focus:ring-2 focus:ring-brand-500 focus:ring-offset-0 cursor-pointer"
            />
            <span className="ml-3 text-sm text-gray-400 group-hover:text-white transition-colors">
                {label}
            </span>
        </label>
    );
}

// Template Card Component
function TemplateCard({ template }: { template: Template }) {
    return (
        <Card hover variant="glass" className="overflow-hidden group">
            {/* Preview Image */}
            <div className="aspect-[8.5/11] bg-white/5 relative overflow-hidden">
                <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* ATS Score Badge */}
                <div className="absolute top-4 right-4">
                    <Badge variant="success" className="font-semibold">
                        {template.atsScore}% ATS
                    </Badge>
                </div>
            </div>

            {/* Card Content */}
            <CardBody>
                <h3 className="font-semibold text-lg mb-2 text-white">{template.name}</h3>
                <p className="text-sm text-gray-400 mb-3">Best for: {template.bestFor}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.map(tag => (
                        <Badge key={tag} size="sm" variant="default">
                            {tag}
                        </Badge>
                    ))}
                </div>

                <Button variant="outline" className="w-full">
                    Use Template
                </Button>
            </CardBody>
        </Card>
    );
}
