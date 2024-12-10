import type { APIRoute } from "astro";
import { parseConfig } from "../lib/config";

const CONFIG = await parseConfig();

export const GET: APIRoute = async () => {
    return new Response(
        `User-agent: *\nDisallow: /404\nDisallow: /500\nAllow: /\nSitemap: ${new URL("/sitemap-index.xml", CONFIG.site).href}\n`,
        {
            headers: {
                "Content-Type": "text/plain",
            },
        },
    );
};
