// Design tokens for SaaS-grade UI
// Inspired by Linear, Notion, and Stripe design systems

export const colors = {
    // Brand colors
    brand: {
        50: '#f0f4ff',
        100: '#e0e9ff',
        200: '#c7d7fe',
        300: '#a4bcfd',
        400: '#8098f9',
        500: '#6366f1', // Primary
        600: '#4f46e5',
        700: '#4338ca',
        800: '#3730a3',
        900: '#312e81',
    },

    // Accent colors
    accent: {
        purple: '#8b5cf6',
        pink: '#ec4899',
        cyan: '#06b6d4',
        emerald: '#10b981',
    },

    // Semantic colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',

    // Dark theme
    dark: {
        bg: {
            primary: '#0a0a0a',
            secondary: '#111111',
            tertiary: '#1a1a1a',
            elevated: '#1f1f1f',
        },
        text: {
            primary: '#ffffff',
            secondary: '#a3a3a3',
            tertiary: '#737373',
            muted: '#525252',
        },
        border: {
            primary: '#262626',
            secondary: '#1f1f1f',
        },
    },

    // Light theme
    light: {
        bg: {
            primary: '#ffffff',
            secondary: '#f9fafb',
            tertiary: '#f3f4f6',
            elevated: '#ffffff',
        },
        text: {
            primary: '#0a0a0a',
            secondary: '#525252',
            tertiary: '#737373',
            muted: '#a3a3a3',
        },
        border: {
            primary: '#e5e5e5',
            secondary: '#f3f4f6',
        },
    },
};

export const typography = {
    fontFamily: {
        sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        mono: '"Fira Code", "JetBrains Mono", Consolas, monospace',
    },

    fontSize: {
        xs: '0.75rem',     // 12px
        sm: '0.875rem',    // 14px
        base: '1rem',      // 16px
        lg: '1.125rem',    // 18px
        xl: '1.25rem',     // 20px
        '2xl': '1.5rem',   // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem',  // 36px
        '5xl': '3rem',     // 48px
        '6xl': '3.75rem',  // 60px
        '7xl': '4.5rem',   // 72px
    },

    fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
    },

    lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75',
    },
};

export const spacing = {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
};

export const shadows = {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

    // Glassmorphism shadows
    glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    glow: '0 0 20px rgba(99, 102, 241, 0.3)',
};

export const borderRadius = {
    none: '0',
    sm: '0.25rem',   // 4px
    base: '0.5rem',  // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    '2xl': '2rem',   // 32px
    full: '9999px',
};

export const animations = {
    duration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
        slower: '500ms',
    },

    easing: {
        linear: 'linear',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
};

export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};

export const zIndex = {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
};
