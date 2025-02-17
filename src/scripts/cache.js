import { createClient } from "@redis/client";
import matter from "gray-matter";
import path from "path";
import { promises as fs } from "fs";
import { extname, join } from "path";

const POSTS = path.normalize(process.env.POSTS || "/posts");
const DB_HOST = process.env.DB_HOST || "localhost";
const CLIENT = createClient({
    url: `redis://${DB_HOST}:6379`,
});
await CLIENT.connect();

try {
    // iterate all posts and save to db
    await CLIENT.flushDb();
    const DIR = await fs.readdir(POSTS);
    const FILES = DIR.filter((file) => extname(file) === ".md");
    for (const file of FILES) {
        const filePath = join(POSTS, file);
        const content = await fs.readFile(filePath, "utf8");
        const CONTENT = matter(content);
        await CLIENT.set(`${CONTENT.data.shortcut}`, JSON.stringify(CONTENT));
    }
} catch (e) {
    console.error(e);
    process.exit(1);
}

await CLIENT.disconnect();
process.exit(0);
