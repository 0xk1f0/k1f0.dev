import matter from "gray-matter";
import { normalize } from "path";
import { promises as fs } from "fs";
import { extname, join } from "path";
import markdownit from "markdown-it";
import hljs from "highlight.js";
import HighlightJS from "markdown-it-highlightjs";
import { createStorage } from "unstorage";
import fsLiteDriver from "unstorage/drivers/fs-lite";

const DB = normalize(process.env.DB || "/tmp/k1f0.dev/unstorage");
const POSTS = normalize(process.env.POSTS || "/tmp/k1f0.dev/posts");
const UNSTORAGE = createStorage({
    driver: fsLiteDriver({ base: DB }),
});
const HLJSOPTS = {
    hljs: hljs,
};

try {
    await UNSTORAGE.clear();
    const DIR = await fs.readdir(POSTS);
    const FILES = DIR.filter((file) => extname(file) === ".md");
    for (const file of FILES) {
        const PATH = join(POSTS, file);
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
