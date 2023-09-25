<script lang="ts">
    import { onMount } from 'svelte';
    let date = new Date();

    $: hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
    $: minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;

    onMount(() => {
		const interval = setInterval(() => {
			date = new Date();
		}, 10000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<nav class="bg-surface w-full p-0 m-0 h-14 flex flex-row justify-between">
    <div class="flex flex-row justify-between my-2 mx-auto w-almost">
        <div id="top-icon">
            <a href="/">
                <p class="text-xl m-0">k1f0.dev</p>
            </a>
        </div>
        <div id="top-clock">
            <p class="text-xl m-0">{hours}:{minutes}</p>
        </div>
        <ul id="top-nav">
            <li>
                <a href="/blog">
                    <img src="/svg/blog.svg" alt="blog_ic" />
                </a>
            </li>
            <li>
                <a href="/about">
                    <img src="/svg/about.svg" alt="blog_ic" />
                </a>
            </li>
        </ul>
    </div>
</nav>
