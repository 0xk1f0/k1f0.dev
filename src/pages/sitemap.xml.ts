import type { APIRoute } from "astro";
import { getRawPostList } from "../lib/database";
import { parseConfig } from "../lib/config";

const CONFIG = await parseConfig();

export const GET: APIRoute = async () => {
    const POSTS = await getRawPostList();
    let siteMapConstruct: string[] = POSTS.map(
        (entry) =>
            `<url>
                <loc>${new URL(CONFIG.site).origin}/blog/${entry.data.shortcut}/</loc>
            </url>`,
    );
    siteMapConstruct.push(
        `<url>
            <loc>${new URL(CONFIG.site).origin}/</loc>
        </url>`,
        `<url>
            <loc>${new URL(CONFIG.site).origin}/blog/</loc>
        </url>`,
    );
    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
            ${siteMapConstruct.join("")}
        </urlset>`,
        {
            headers: {
                "Content-Type": "text/xml",
            },
        },
    );
};
