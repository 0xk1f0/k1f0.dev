import MongoHandler from './db';

class APIHandler {
    #encoder: TextEncoder;
    #mh: MongoHandler;

    constructor() {
        this.#encoder = new TextEncoder();
        this.#mh = new MongoHandler();
    }

    async handleRequest(type: string, slug: string, address: string) {
        let resp: boolean;
        switch (type) {
            case "upvote":
                resp = await this.#mh.registerVote(btoa(slug || ""), address, "up");
                if (resp) {
                    return "OK"
                }
                break;

            case "downvote":
                resp = await this.#mh.registerVote(btoa(slug || ""), address, "down");
                if (resp) {
                    return "OK"
                }
                break;

            case "votes":
                const RESP = await this.#mh.votesCheck(btoa(slug || ""), address);
                if (RESP) {
                    return RESP;
                }
                break;

            default:
                break;
        }
    }

    async checkVotesCount(slug: string, address: string) {
        return await this.#mh.votesCheck(slug, address);
    }

    // hash ip so we can remember the vote per IP without actually storing it
    async hashClientAddress(address: string) {
        const BYTES = Buffer.from(
            await crypto.subtle.digest('SHA-512', this.#encoder.encode(address))
        );
        return BYTES.toString('base64');
    }
}

export default APIHandler;