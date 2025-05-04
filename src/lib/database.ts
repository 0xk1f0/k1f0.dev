import type { GrayMatterFile } from "gray-matter";
import { createStorage } from "unstorage";
import fsLiteDriver from "unstorage/drivers/fs-lite";
import { normalize } from "node:path";

const DB = normalize(process.env.DB || "/tmp/unstorage/k1f0.dev");
const UNSTORAGE = createStorage({
    driver: fsLiteDriver({ base: DB }),
});

export async function getPostMetaList() {
    let metadata: { [key: string]: any }[] = [];
    const POSTS = await UNSTORAGE.getKeys();
    if (POSTS.length === 0) return [];
    for (let post of POSTS) {
        const POST = await UNSTORAGE.getMeta(post);
        if (POST !== null) {
            metadata.push(POST);
        }
    }
    return metadata;
}

export async function getPost(name: string) {
    const POST = await UNSTORAGE.get(name);
    if (POST === null) return undefined;
    return POST as GrayMatterFile<string>;
}
