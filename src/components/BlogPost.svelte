<script lang="ts">
    export let dataProps: Array<any>;

    const PAGE = dataProps[0];
</script>

<div class="container-fullscreen flex min-h-full w-full max-w-screen-xl m-auto">
    <div class="w-screen p-4">
        <a
            class="inline-block text-primary uppercase font-mono text-sm mb-4"
            href="/blog">&lt Go Back</a
        >
        <h1>{PAGE.data.title}</h1>
        <div class="font-mono text-sm my-5">
            <p>
                by <strong>{PAGE.data.author}</strong> on {new Date(
                    PAGE.data.date,
                ).toLocaleDateString("en-GB")}
            </p>
        </div>
        <div>
            <slot />
        </div>
    </div>
</div>
