import type { APIRoute } from "astro";
import { getConfig } from "@lib/config";

const CONFIG = await getConfig();

export const GET: APIRoute = async (context) => {
    if (CONFIG) {
        const URL_ORIGIN = new URL(CONFIG.site).origin;
        return new Response(
            `<?xml version="1.0" encoding="UTF-8"?>
            <sitemapindex xmlns="http://www.google.com/schemas/sitemap-news/0.9">
            <sitemap>
                <loc>${new URL("/sitemap.xml", URL_ORIGIN).href}</loc>
            </sitemap>
            </sitemapindex>`,
            {
                headers: {
                    "Content-Type": "text/xml",
                },
            },
        );
    } else {
        return context.redirect("/404?r=config");
    }
};
