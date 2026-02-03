// Dummy template data for the Templates Hub
export interface Template {
    id: string;
    name: string;
    preview: string;
    atsScore: number;
    bestFor: string;
    tags: string[];
    category: 'software-engineer' | 'data-scientist' | 'product-manager' | 'frontend' | 'backend' | 'fresher';
    experience: 'fresher' | 'mid-level' | 'senior';
    companyType: 'product' | 'startup' | 'service';
}

export const templates: Template[] = [
    {
        id: '1',
        name: 'Modern Software Engineer',
        preview: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=500&fit=crop',
        atsScore: 95,
        bestFor: 'Software Engineers',
        tags: ['ATS-Friendly', 'FAANG', 'Clean'],
        category: 'software-engineer',
        experience: 'mid-level',
        companyType: 'product',
    },
    {
        id: '2',
        name: 'Data Science Pro',
        preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=500&fit=crop',
        atsScore: 92,
        bestFor: 'Data Scientists',
        tags: ['ATS-Friendly', 'Analytics', 'Research'],
        category: 'data-scientist',
        experience: 'senior',
        companyType: 'product',
    },
    {
        id: '3',
        name: 'Product Manager Elite',
        preview: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=500&fit=crop',
        atsScore: 90,
        bestFor: 'Product Managers',
        tags: ['Leadership', 'Strategy', 'FAANG'],
        category: 'product-manager',
        experience: 'senior',
        companyType: 'product',
    },
    {
        id: '4',
        name: 'Frontend Developer',
        preview: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=500&fit=crop',
        atsScore: 94,
        bestFor: 'Frontend Developers',
        tags: ['ATS-Friendly', 'React', 'Modern'],
        category: 'frontend',
        experience: 'mid-level',
        companyType: 'startup',
    },
    {
        id: '5',
        name: 'Backend Engineer',
        preview: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=500&fit=crop',
        atsScore: 93,
        bestFor: 'Backend Engineers',
        tags: ['ATS-Friendly', 'Scalable', 'Systems'],
        category: 'backend',
        experience: 'mid-level',
        companyType: 'product',
    },
    {
        id: '6',
        name: 'Fresher Graduate',
        preview: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=500&fit=crop',
        atsScore: 88,
        bestFor: 'Fresh Graduates',
        tags: ['Entry-Level', 'Clean', 'Simple'],
        category: 'fresher',
        experience: 'fresher',
        companyType: 'service',
    },
    {
        id: '7',
        name: 'Full Stack Developer',
        preview: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=500&fit=crop',
        atsScore: 96,
        bestFor: 'Full Stack Developers',
        tags: ['ATS-Friendly', 'FAANG', 'Versatile'],
        category: 'software-engineer',
        experience: 'senior',
        companyType: 'product',
    },
    {
        id: '8',
        name: 'ML Engineer',
        preview: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=500&fit=crop',
        atsScore: 91,
        bestFor: 'Machine Learning Engineers',
        tags: ['AI/ML', 'Research', 'Technical'],
        category: 'data-scientist',
        experience: 'mid-level',
        companyType: 'product',
    },
    {
        id: '9',
        name: 'Startup Generalist',
        preview: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=500&fit=crop',
        atsScore: 89,
        bestFor: 'Startup Roles',
        tags: ['Startup', 'Versatile', 'Impact'],
        category: 'software-engineer',
        experience: 'mid-level',
        companyType: 'startup',
    },
    {
        id: '10',
        name: 'Service Company Ready',
        preview: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=500&fit=crop',
        atsScore: 87,
        bestFor: 'TCS, Infosys, Wipro',
        tags: ['Service-Based', 'Traditional', 'ATS'],
        category: 'software-engineer',
        experience: 'fresher',
        companyType: 'service',
    },
    {
        id: '11',
        name: 'Senior Architect',
        preview: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=500&fit=crop',
        atsScore: 94,
        bestFor: 'Senior Engineers',
        tags: ['Leadership', 'Architecture', 'FAANG'],
        category: 'backend',
        experience: 'senior',
        companyType: 'product',
    },
    {
        id: '12',
        name: 'UI/UX Engineer',
        preview: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=500&fit=crop',
        atsScore: 90,
        bestFor: 'UI/UX Engineers',
        tags: ['Design', 'Frontend', 'Creative'],
        category: 'frontend',
        experience: 'mid-level',
        companyType: 'startup',
    },
];

export const categories = [
    { id: 'software-engineer', label: 'Software Engineer' },
    { id: 'data-scientist', label: 'Data Scientist' },
    { id: 'product-manager', label: 'Product Manager' },
    { id: 'frontend', label: 'Frontend Developer' },
    { id: 'backend', label: 'Backend Developer' },
    { id: 'fresher', label: 'Fresher / Graduate' },
];

export const experienceLevels = [
    { id: 'fresher', label: 'Fresher (0-1 years)' },
    { id: 'mid-level', label: 'Mid-level (2-5 years)' },
    { id: 'senior', label: 'Senior (5+ years)' },
];

export const companyTypes = [
    { id: 'product', label: 'Product-based (FAANG)' },
    { id: 'startup', label: 'Startup' },
    { id: 'service', label: 'Service-based (TCS, Infosys)' },
];
