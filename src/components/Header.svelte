<script lang="ts">
    import { onMount } from "svelte";

    let timeString: string = new Date().toLocaleTimeString("eu");

    onMount(() => {
        setInterval(() => {
            timeString = new Date().toLocaleTimeString("eu");
        }, 1000)
        console.log(timeString);
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
            <p>{timeString}</p>
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
