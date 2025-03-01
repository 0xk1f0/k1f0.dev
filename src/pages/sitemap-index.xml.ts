import type { APIRoute } from "astro";
import { getConfig } from "../lib/config";

const CONFIG = await getConfig();

export const GET: APIRoute = async (context) => {
    if (CONFIG) {
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
    } else {
        return context.redirect("/404?r=config");
    }
};
