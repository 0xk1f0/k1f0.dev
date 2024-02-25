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
            "surface": "#1b1b1b",
            "background": "#101010",
            "foreground": "#ffffff",
            "transparent": "#00000000",
            "black": "#000000",
            "white": "#ffffff"
        },
        extend: {
            fontSize: {
                "sm": "clamp(1.02rem, -0.18vw + 1.07rem, 0.92rem)",
                "base": "clamp(1.13rem, -0.11vw + 1.15rem, 1.06rem)",
                "lg": "clamp(1.24rem, -0.03vw + 1.24rem, 1.22rem)",
                "xl": "clamp(1.36rem, 0.08vw + 1.34rem, 1.41rem)",
                "2xl": "clamp(1.5rem, 0.22vw + 1.44rem, 1.62rem)",
                "3xl": "clamp(1.65rem, 0.38vw + 1.55rem, 1.86rem)",
                "4xl": "clamp(1.81rem, 0.59vw + 1.66rem, 2.14rem)"
            },
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
            minHeight: {
                "respect-header": "calc(100%-3.5rem)"
            },
            maxHeight: {
                "respect-header": "calc(100%-3.5rem)"
            }
        },
    },
    plugins: [],
};
