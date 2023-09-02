import { join } from "node:path";

// post data interface
interface PostResource {
    id: string;
    upvotes: Set<string>;
    downvotes: Set<string>;
}

class KVHandler {
    #db: Deno.Kv | undefined;

    async prepareKV() {
        // check for exist, else create
        const KVDIR = join(Deno.cwd(), ".kv");
        try {
            await Deno.mkdir(KVDIR, { recursive: true, mode: 0o777 });
        } catch (err) {
            // Already exists
            if (err.name !== "AlreadyExists") {
                throw err;
            }
        }

        // database init
        const KVPATH = join(KVDIR, "kv.db");
        this.#db = await Deno.openKv(KVPATH);
    }

    async registerVote(
        post_id: string,
        hash_id: string,
        voteType: "up" | "down"
    ) {
        try {
            // get the post with id
            const RESP = await this.#db?.get([post_id])
            let POST = RESP?.value as PostResource;
            if (POST && POST != null) {
                if (voteType === "up") {
                    if (POST.downvotes.has(hash_id)) {
                        POST.downvotes.delete(hash_id);
                    }
                    POST.upvotes.add(hash_id);
                } else if (voteType === "down") {
                    if (POST.upvotes.has(hash_id)) {
                        POST.upvotes.delete(hash_id);
                    }
                    POST.downvotes.add(hash_id);
                }
            } else {
                // new entry
                console.log("First Entry for: " + atob(post_id));
                POST = {
                    id: post_id,
                    upvotes: new Set(),
                    downvotes: new Set(),
                };
                if (voteType === "up") {
                    POST.upvotes.add(hash_id);
                } else if (voteType === "down") {
                    POST.downvotes.add(hash_id);
                }
            }
            // set new post
            await this.#db?.set([post_id], POST);
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async votesCheck(post_id: string, hash_id: string) {
        try {
            // get the post with id
            const RESP = await this.#db?.get([post_id])
            const POST = RESP?.value as PostResource;
            if (POST && POST != null) {
                return {
                    upvotes: POST.upvotes ? POST.upvotes.size : 0,
                    downvotes: POST.downvotes ? POST.downvotes.size : 0,
                    user_upvoted: POST.upvotes
                        ? POST.upvotes.has(hash_id)
                        : false,
                    user_downvoted: POST.downvotes
                        ? POST.downvotes.has(hash_id)
                        : false,
                };
            } else {
                return {
                    upvotes: 0,
                    downvotes: 0,
                    user_upvoted: false,
                    user_downvoted: false,
                };
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}

export default KVHandler;
