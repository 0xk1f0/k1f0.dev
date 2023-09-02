import KVHandler from "./kv_db";
import { Buffer } from 'node:buffer';

class APIHandler {
    #encoder: TextEncoder;
    #kh: KVHandler;

    constructor() {
        this.#encoder = new TextEncoder();
        this.#kh = new KVHandler();
    }

    async init() {
        await this.#kh.prepareKV();
    }

    async handleRequest(type: string, slug: string, address: string) {
        let resp: boolean | undefined;
        switch (type) {
            case "upvote":
                resp = await this.#kh.registerVote(
                    btoa(slug || ""),
                    address,
                    "up"
                );
                if (resp) {
                    return "OK";
                }
                break;

            case "downvote":
                resp = await this.#kh.registerVote(
                    btoa(slug || ""),
                    address,
                    "down"
                );
                if (resp) {
                    return "OK";
                }
                break;

            case "votes":
                const RESP = await this.#kh.votesCheck(
                    btoa(slug || ""),
                    address
                );
                if (RESP) {
                    return RESP;
                }
                break;

            default:
                break;
        }
    }

    async checkVotesCount(slug: string, address: string) {
        return await this.#kh.votesCheck(slug, address);
    }

    // hash ip so we can remember the vote per IP without actually storing it
    async hashClientAddress(address: string) {
        const BYTES = Buffer.from(
            await crypto.subtle.digest("SHA-512", this.#encoder.encode(address))
        );
        return BYTES.toString("base64");
    }
}

export default APIHandler;
