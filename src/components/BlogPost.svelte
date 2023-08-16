<script lang="ts">
    import { onMount } from "svelte";

    export let dataProps: Array<any>;

    const PAGE = dataProps[0];
    let votes: any = {
        upvotes: 0,
        downvotes: 0,
        user_upvoted: false,
        user_downvoted: false,
    };

    onMount(async () => {
        await reFetchVotes();
    });

    async function reFetchVotes() {
        const VOTESRESP = await fetch(window.location.href, {
            method: "POST",
            body: "votes",
        });
        votes = await VOTESRESP.json();
        votes = votes.votes;
    }

    function upvote() {
        fetch(window.location.href, { method: "POST", body: "upvote" }).then(
            () => reFetchVotes()
        );
    }

    function downvote() {
        fetch(window.location.href, { method: "POST", body: "downvote" }).then(
            () => reFetchVotes()
        );
    }
</script>

<div class="contentWrapper">
    <div class="container container-fullscreen">
        <article class="post">
            <a class="btn btn-post-preview" href="/blog">&lt Go Back</a>
            <h1>{PAGE.data.title}</h1>
            <div class="author-mention">
                <p>
                    by <strong>{PAGE.data.author}</strong> on {new Date(
                        PAGE.data.date
                    ).toLocaleDateString("en-GB")}
                </p>
            </div>
            <div>
                <slot />
            </div>
            <div class="voteWrapper">
                <div class="voteContainer">
                    {#if votes.user_upvoted}
                        <button on:click={upvote}>
                            <img src="/svg/upvote_fa.svg" alt="Upvote" />
                            <p>{votes.upvotes}</p>
                        </button>
                        <button style="color: grey;" on:click={downvote}>
                            <img
                                style="filter: saturate(0);"
                                src="/svg/downvote_fa.svg"
                                alt="Downvote"
                            />
                            <p>{votes.downvotes}</p>
                        </button>
                    {:else if votes.user_downvoted}
                        <button style="color: grey;" on:click={upvote}>
                            <img
                                style="filter: saturate(0);"
                                src="/svg/upvote_fa.svg"
                                alt="Upvote"
                            />
                            <p>{votes.upvotes}</p>
                        </button>
                        <button on:click={downvote}>
                            <img src="/svg/downvote_fa.svg" alt="Downvote" />
                            <p>{votes.downvotes}</p>
                        </button>
                    {:else}
                        <button style="color: grey;" on:click={upvote}>
                            <img
                                style="filter: saturate(0);"
                                src="/svg/upvote_fa.svg"
                                alt="Upvote"
                            />
                            <p>{votes.upvotes}</p>
                        </button>
                        <button style="color: grey;" on:click={downvote}>
                            <img
                                style="filter: saturate(0);"
                                src="/svg/downvote_fa.svg"
                                alt="Downvote"
                            />
                            <p>{votes.downvotes}</p>
                        </button>
                    {/if}
                </div>
            </div>
        </article>
    </div>
</div>
