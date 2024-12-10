import type { APIRoute } from "astro";
import { parseConfig } from "../lib/config";

const CONFIG = await parseConfig();

export const GET: APIRoute = async () => {
    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
            <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <sitemap>
                <loc>${new URL("/sitemap.xml", CONFIG.site).href}</loc>
            </sitemap>
        </sitemapindex>`,
        {
            headers: {
                "Content-Type": "text/xml",
            },
        },
    );
};
