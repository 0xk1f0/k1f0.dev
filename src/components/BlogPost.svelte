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

<div class="container-fullscreen flex min-h-full w-full max-w-screen-xl m-auto">
    <div class="w-screen p-4">
        <div class="flex flex-row float-right">
            <div class="flex">
                {#if votes.user_downvoted || votes.user_upvoted}
                    <p
                        class="text-orange m-auto p-2.5 font-bold text-xl lg:text-2xl border-none"
                    >
                        {votes.upvotes - votes.downvotes}
                    </p>
                {:else}
                    <p
                        class="text-orange m-auto p-2.5 font-bold text-xl lg:text-2xl border-none"
                        style="filter: saturate(0);"
                    >
                        {votes.upvotes - votes.downvotes}
                    </p>
                {/if}
            </div>
            <div class="flex flex-col">
                {#if votes.user_upvoted}
                    <button
                        class="p-2.5 border-none"
                        on:click={upvote}
                    >
                        <img
                            class="m-0 p-0 w-3"
                            src="/svg/upvote_fa.svg"
                            alt="U"
                        />
                    </button>
                    <button
                        class="p-2.5 border-none"
                        on:click={downvote}
                    >
                        <img
                            style="filter: saturate(0);"
                            src="/svg/downvote_fa.svg"
                            alt="D"
                        />
                    </button>
                {:else if votes.user_downvoted}
                    <button
                        class="p-2.5 border-none"
                        on:click={upvote}
                    >
                        <img
                            class="m-0 p-0 w-3"
                            style="filter: saturate(0);"
                            src="/svg/upvote_fa.svg"
                            alt="U"
                        />
                    </button>
                    <button
                        class="p-2.5 border-none"
                        on:click={downvote}
                    >
                        <img
                            class="m-0 p-0 w-3"
                            src="/svg/downvote_fa.svg"
                            alt="D"
                        />
                    </button>
                {:else}
                    <button
                        class="p-2.5 border-none"
                        on:click={upvote}
                    >
                        <img
                            class="m-0 p-0 w-3"
                            style="filter: saturate(0);"
                            src="/svg/upvote_fa.svg"
                            alt="U"
                        />
                    </button>
                    <button
                        class="p-2.5 border-none"
                        on:click={downvote}
                    >
                        <img
                            class="m-0 p-0 w-3"
                            style="filter: saturate(0);"
                            src="/svg/downvote_fa.svg"
                            alt="D"
                        />
                    </button>
                {/if}
            </div>
        </div>
        <a
            class="inline-block text-primary uppercase font-mono text-sm mb-4"
            href="/blog">&lt Go Back</a
        >
        <h1>{PAGE.data.title}</h1>
        <div class="font-mono text-sm my-5">
            <p>
                by <strong>{PAGE.data.author}</strong> on {new Date(
                    PAGE.data.date
                ).toLocaleDateString("en-GB")}
            </p>
        </div>
        <div>
            <slot />
        </div>
    </div>
</div>
