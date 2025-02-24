import { z } from "zod";
import path from "path";
import { promises as fs } from "fs";

const CONFIG_PATH = path.normalize(process.env.CONFIG || "/config/config.json");

const ConfigFile = z.object({
    name: z.string(),
    site: z.string().url(),
    description: z.string(),
    links: z.array(
        z.object({
            label: z.string(),
            link: z.string(),
            external: z.boolean(),
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
