import { z } from "zod";
import path from "path";
import { promises as fs } from "fs";

const CONFIG_PATH = path.normalize(process.env.CONFIG || "/config/config.json");

const ConfigFile = z.object({
    title: z.string(),
    subtitle: z.string(),
    links: z.array(
        z.object({
            icon: z.string(),
            desc: z.string(),
            link: z.string().url(),
            borderColor: z.string().startsWith("#").min(7).max(7),
            backgroundColor: z.string().startsWith("#").min(7).max(7),
            foregroundColor: z.string().startsWith("#").min(7).max(7),
        }),
    ),
});

export type ConfigFileType = z.infer<typeof ConfigFile>;

export async function parseConfig(): Promise<ConfigFileType> {
    let config = await fs.readFile(CONFIG_PATH, "utf-8");
    try {
        let jsonObject = JSON.parse(config);
        return ConfigFile.parse(jsonObject);
    } catch (e: any) {
        console.error("Config File Syntax Error");
        throw e;
    }
}
