<script lang="ts">
    import { onMount } from 'svelte';
    let date = new Date();

    $: hours = date.getHours();
    $: minutes = date.getMinutes();

    onMount(() => {
		const interval = setInterval(() => {
			date = new Date();
		}, 10000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<header class="header">
    <div class="header-container">
        <div id="top-icon">
            <a href="/">
                <p>k1f0.dev</p>
            </a>
        </div>
        <div id="top-clock">
            <p>{hours}:{minutes}</p>
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
</header>
