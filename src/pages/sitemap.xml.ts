import type { APIRoute } from "astro";
import { getRawPostData } from "../lib/helpers";

const POSTS_PATH = process.env.POSTS_PATH || "/posts";

export const GET: APIRoute = async () => {
    const POSTS = await getRawPostData(POSTS_PATH);
    const ORIGIN = "https://blog.k1f0.dev";
    let siteMapConstruct: string[] = POSTS.map(
        (entry) => `<url><loc>${ORIGIN}/bp/${entry.data.shortcut}/</loc></url>`
    );
    siteMapConstruct.push(`<url><loc>${ORIGIN}/</loc></url>`);
    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">${siteMapConstruct.join(
            ""
        )}</urlset>`,
        {
            headers: {
                "Content-Type": "text/xml",
            },
        }
    );
};
