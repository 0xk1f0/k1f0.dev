import type { APIRoute } from "astro";
import { getConfig } from "../lib/config";

const CONFIG = await getConfig();

export const GET: APIRoute = async (context) => {
    if (CONFIG) {
        return new Response(
            `User-agent: *\nDisallow: /404\nDisallow: /500\nAllow: /\nSitemap: ${new URL("/sitemap-index.xml", CONFIG.site).href}\n`,
            {
                headers: {
                    "Content-Type": "text/plain",
                },
            },
        );
    } else {
        return context.redirect("/404?r=config");
    }
};
