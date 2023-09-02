import { join } from "node:path";

// path from env, else default
const DB_PATH = Deno.env.get("DB_PATH") || "/var/lib/denokv/";

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
        const KVDIR = join(`${DB_PATH}.kv`);
        try {
            await Deno.mkdir(KVDIR, { recursive: true, mode: 0o770 });
        } catch (err) {
            // Already exists
            if (err.name !== "AlreadyExists") {
                console.log(err);
                return false;
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
            // evaluate
            if (POST && POST != null) {
                // check what type of action to perform
                // if upvoted twice, remove, same for down
                if (voteType === "up") {
                    if (POST.downvotes.has(hash_id)) {
                        POST.downvotes.delete(hash_id);
                        POST.upvotes.add(hash_id);
                    } else if (POST.upvotes.has(hash_id)) {
                        POST.upvotes.delete(hash_id);
                    } else POST.upvotes.add(hash_id);
                } else if (voteType === "down") {
                    if (POST.upvotes.has(hash_id)) {
                        POST.upvotes.delete(hash_id);
                        POST.downvotes.add(hash_id);
                    } else if (POST.downvotes.has(hash_id)) {
                        POST.downvotes.delete(hash_id);
                    } else POST.downvotes.add(hash_id);
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
            // evaluate resp
            // check for user up or downvote and total count
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
                // on null or error always return plain object
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
