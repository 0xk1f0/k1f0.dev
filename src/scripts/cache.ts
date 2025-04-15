import matter from "gray-matter";
import { normalize } from "node:path";
import { promises as fs } from "node:fs";
import { extname, join } from "node:path";
import markdownit from "markdown-it";
import hljs from "highlight.js";
import HighlightJS from "markdown-it-highlightjs";
import { createStorage } from "unstorage";
import fsLiteDriver from "unstorage/drivers/fs-lite";

const DB_PATH = normalize(process.env.DB_PATH || "/tmp/k1f0.dev/unstorage");
const POSTS_PATH = normalize(process.env.POSTS_PATH || "/tmp/k1f0.dev/posts");
const UNSTORAGE = createStorage({
    driver: fsLiteDriver({ base: DB_PATH }),
});
const HLJSOPTS = {
    hljs: hljs,
};

try {
    await UNSTORAGE.clear();
    const DIR = await fs.readdir(POSTS_PATH);
    const FILES = DIR.filter((file) => extname(file) === ".md");
    for (const file of FILES) {
        const PATH = join(POSTS_PATH, file);
        const FILE = await fs.readFile(PATH, "utf8");
        let raw = matter(FILE);
        raw.content = markdownit()
            .use(HighlightJS, HLJSOPTS)
            .render(raw.content);
        await UNSTORAGE.setMeta(`${raw.data.shortcut}`, raw.data);
        await UNSTORAGE.set(`${raw.data.shortcut}`, raw);
    }
} catch (e) {
    console.error(e);
    process.exit(1);
} finally {
    process.exit(0);
}
