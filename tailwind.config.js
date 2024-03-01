/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    // theme - we override ; extend -  we add new things
    theme: {
        extend: {
            colors: {
                pizza: '#123456',
            },
            fontSize: {
                huge: ['8rem', { lineHeight: '1' }],
            },
            height: {
                screen: '100dvh',
            },
        },
    },
    plugins: [],
}
