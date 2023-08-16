import * as mongoDB from "mongodb";

// env vars
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

// exit if no set
if (!DB_HOST || !DB_USER || !DB_PASS) {
    throw Error('Missing Environment Variables!');
}

class MongoHandler {
    #client: mongoDB.MongoClient;
    #db: mongoDB.Db;
    #posts: mongoDB.Collection;

    constructor() {
        this.#client = new mongoDB.MongoClient(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}`);
        this.#db = this.#client.db();
        this.#posts = this.#db.collection('votes');
    }

    async registerVote(post_id: string, hash_id: string, voteType: 'up' | 'down'): Promise<boolean> {
        try {
            await this.#client.connect();
            const POST = await this.#posts.findOne({ id: post_id });

            if (POST) {
                if (voteType === 'up') {
                    await this.#posts.updateOne(
                        { id: post_id }, { $pull: { downvotes: hash_id } }
                    );
                    await this.#posts.updateOne(
                        { id: post_id, upvotes: { $ne: hash_id } }, { $push: { upvotes: hash_id } }
                    );
                } else if (voteType === 'down') {
                    await this.#posts.updateOne(
                        { id: post_id }, { $pull: { upvotes: hash_id } }
                    );
                    await this.#posts.updateOne(
                        { id: post_id, downvotes: { $ne: hash_id } }, { $push: { downvotes: hash_id } }
                    );
                }
            } else {
                const newPost: object = { id: post_id };
                if (voteType === 'up') {
                    newPost['upvotes'] = [hash_id];
                } else if (voteType === 'down') {
                    newPost['downvotes'] = [hash_id];
                }
                await this.#posts.insertOne(newPost);
            }

            await this.#client.close();
            return true;
        } catch {
            await this.#client.close();
            return false;
        }
    }

    async votesCheck(post_id: string, hash_id: string): Promise<false | object> {
        try {
            await this.#client.connect();
            const POST = await this.#posts.findOne({ id: post_id });
            await this.#client.close();

            if (POST) {
                const upvotesCount = POST.upvotes ? POST.upvotes.length : 0;
                const downvotesCount = POST.downvotes ? POST.downvotes.length : 0;
                const userUpvoted = POST.upvotes ? POST.upvotes.includes(hash_id) : false;
                const userDownvoted = POST.downvotes ? POST.downvotes.includes(hash_id) : false;
                return {
                    upvotes: upvotesCount,
                    downvotes: downvotesCount,
                    user_upvoted: userUpvoted,
                    user_downvoted: userDownvoted,
                };
            } else {
                return { upvotes: 0, downvotes: 0, user_upvoted: false, user_downvoted: false };
            }
        } catch {
            await this.#client.close();
            return false;
        }
    }
}

export default MongoHandler;