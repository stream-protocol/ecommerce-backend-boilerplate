/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./layouts/**/*.{js,ts,jsx,tsx}",
        "./contexts/**/*.{js,ts,jsx,tsx}",
        "./node_modules/flowbite-react/**/*.js",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            colors: {
                "custom-dark": "rgb(24 24 24 / var(--tw-bg-opacity))",
                "solana-dark": "#10141f",
                "custom-white": "#e6eeff",
                "custom-blue": "#00072c",
                "discord-dark": "#36393f",
                "discord-purple": "#5865f2",
                "discord-blue": "#00aff4",
                "discord-dark-2": "#202225",
                "custom-gray": "#b9bbbe",
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};