import { createClient } from "@redis/client";
import type { GrayMatterFile } from "gray-matter";

const DB_HOST = process.env.DB_HOST || "localhost";

const CLIENT = createClient({
    url: `redis://${DB_HOST}:6379`,
});

export async function getRawPostList() {
    if (!CLIENT.isOpen) await CLIENT.connect();
    const POSTS = (await CLIENT.scan(0)).keys;
    if (POSTS.length === 0) return [];
    let postDataList: GrayMatterFile<string>[] = [];
    for (let post of POSTS) {
        const POST = await CLIENT.get(post);
        if (POST !== null)
            postDataList.push(JSON.parse(POST) as GrayMatterFile<string>);
    }
    if (CLIENT.isOpen) await CLIENT.disconnect();
    return postDataList;
}

export async function getRawPostData(name: string) {
    if (!CLIENT.isOpen) await CLIENT.connect();
    const POST = await CLIENT.get(name);
    if (CLIENT.isOpen) await CLIENT.disconnect();
    if (POST === null) return undefined;
    return JSON.parse(POST) as GrayMatterFile<string>;
}
