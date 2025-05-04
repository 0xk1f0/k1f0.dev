import { type } from "arktype";
import path from "path";
import { promises as fs } from "fs";

const CONFIG = path.normalize(process.env.CONFIG || "/config/config.json");

const Link = type({
    icon: "string",
    label: "string",
    link: "string",
    external: "boolean",
});

const ConfigFile = type("string.json.parse").to({
    name: "string",
    site: "string.url",
    description: "string",
    links: Link.array(),
});

type Config = typeof ConfigFile.infer;

export async function getConfig(): Promise<Config | undefined> {
    let content = await fs.readFile(CONFIG, "utf-8");
    let config = ConfigFile(content);
    if (config instanceof type.errors) {
        console.error(config.summary);
        return undefined;
    }
    return config;
}
