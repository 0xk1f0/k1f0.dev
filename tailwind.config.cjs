/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    mode: "jit",
    theme: {
        purge: [
            "./public/**/*.html",
            "./src/**/*.{js,jsx,ts,tsx,vue}",
            "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
        ],
        colors: {
            "primary": "#888888",
            "surface": "#242424",
            "background": "#101010",
            "foreground": "#ffffff",
            "transparent": "#00000000",
            "black": "#000000",
            "white": "#ffffff",
            "orange": "#ff4400",
        },
        extend: {
            fontFamily: {
                "system-ui": "system-ui",
            },
            margin: {
                "1/20": "5%",
                "1/10": "10%",
                "1/4": "25%",
                "2/4": "50%",
                "3/4": "75%",
            },
            maxWidth: {
                "1/4": "25%",
                "2/4": "50%",
                "3/4": "75%",
            },
        },
    },
    plugins: [],
};
