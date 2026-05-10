/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.jsx",
        "./resources/**/*.js",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#FF2A00',
                'primary-dark': '#CC2200',
                'primary-light': '#FF5533',
                secondary: '#1E293B'
            }
        },
    },
    plugins: [],
}