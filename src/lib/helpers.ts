import matter from 'gray-matter';
import type { GrayMatterFile } from 'gray-matter';
import { promises as fs } from 'fs';
import { extname, join } from 'path';

export async function getRawPostData(path: string) {
    const DIR = await fs.readdir(path);
    const FILES = DIR.filter(file => extname(file) === '.md');
    let rawPostsData: GrayMatterFile<string>[] = [];
    for (const file of FILES) {
        const filePath = join(path, file);
        const content = await fs.readFile(filePath, 'utf8');
        rawPostsData.push(matter(content));
    }
    return rawPostsData;
}
