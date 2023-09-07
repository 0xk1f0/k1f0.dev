/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        mode: "jit",
        purge: [
            "./public/**/*.html",
            "./src/**/*.{js,jsx,ts,tsx,vue}",
            "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
        ],
        colors: {
            "color-primary": "#0094C6",
            "color-surface": "#09131D",
            "color-background": "#020217",
            "color-foreground": "#8EC9DF",
            "color-transparent": "#00000000",
            "color-grey": "#3f3f3f",
            "color-justblack": "#000000",
            "color-orange": "#ff3300",
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
            width: {
                almost: "98%",
            },
            height: {
                almost: "98%",
            },
        },
    },
    plugins: [],
};
