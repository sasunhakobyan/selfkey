/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                blueGlow: "480px 380px 300px 40px #0ff",
                pinkGlow: "1180px 380px 300px 40px #FF10F0",
            },
            animation: {
                endlessPopIn: "endlessPopIn 2s ease-in-out infinite",
            },
            colors: {
                neonBlue: "#0ff",
                neonPink: "#FF10F0",
            },
        },
    },
    plugins: [],
};
