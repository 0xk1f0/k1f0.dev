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

<div class="container container-fullscreen">
    <article class="post">
        <div class="voteWrapper">
            <div class="votes-counter">
                {#if votes.user_downvoted || votes.user_upvoted}
                    <p style="color: #ff0000;">{votes.upvotes - votes.downvotes}</p>
                {:else}
                    <p>{votes.upvotes - votes.downvotes}</p>
                {/if}
            </div>
            <div class="voteContainer">
                {#if votes.user_upvoted}
                    <button on:click={upvote}>
                        <img src="/svg/upvote_fa.svg" alt="Upvote" />
                    </button>
                    <button style="color: grey;" on:click={downvote}>
                        <img
                            style="filter: saturate(0);"
                            src="/svg/downvote_fa.svg"
                            alt="Downvote"
                        />
                    </button>
                {:else if votes.user_downvoted}
                    <button style="color: grey;" on:click={upvote}>
                        <img
                            style="filter: saturate(0);"
                            src="/svg/upvote_fa.svg"
                            alt="Upvote"
                        />
                    </button>
                    <button on:click={downvote}>
                        <img src="/svg/downvote_fa.svg" alt="Downvote" />
                    </button>
                {:else}
                    <button style="color: grey;" on:click={upvote}>
                        <img
                            style="filter: saturate(0);"
                            src="/svg/upvote_fa.svg"
                            alt="Upvote"
                        />
                    </button>
                    <button style="color: grey;" on:click={downvote}>
                        <img
                            style="filter: saturate(0);"
                            src="/svg/downvote_fa.svg"
                            alt="Downvote"
                        />
                    </button>
                {/if}
            </div>
        </div>
        <a class="btn btn-post" href="/blog">&lt Go Back</a>
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
    </article>
</div>
