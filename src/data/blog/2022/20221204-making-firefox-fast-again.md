---
title: Making Firefox fast again
slug: making-firefox-fast-again
description: The once fastest browser...
pubDatetime: 2022-12-04T00:00:00.00Z
draft: false
tags: ["browser", "coding", "opinion"]
---

Depending on if and how long you have been using Firefox, you may have noticed visual and performance changes as updates came in. How you
interpret them is entirely on you, but if like me, they do annoy you, here is what you can do.

## Wasted Space

One of the most significant was the [Redesign in 2021](https://blog.mozilla.org/en/products/firefox/fresh-new-look-for-firefox/) that
introduced floating tabs and other design changes, which in my opinion, only contributed to wasted screen space. A whole unnecessary amount
of rounding and padding. Just straight up horrible. The neat thing is, if you don't like someting you can always change it. And that's exactly
what I did by making my own custom `user.css` for Firefox which [you can find here](https://github.com/K1llf0rce/cleanfox-css).
With that out of the way, I can now happily utilize my whole screenspace. I paid for the whole screen, so I am going to use it.

## Browser slowdown

I don't know when exactly I started noticing this, but when I did it really stuck with me. The fast and responsive Firefox I once knew and
loved was not there anymore. Back when I noticed I didn't know the exact cause of this and always hoped on a future release that would finally
free me from the slowdowns. But that ultimately didn't happen.

Recently though, I stumbled upon a [Reddit Post](https://www.reddit.com/r/linux/comments/zabm2a/firefox_on_linux_large_huge_performance_boost_by/),
which was one of the reasons I decided to write this post. The user stated, that he noticed some very big performance improvements, by making some
modifications in Firefox's `about:config`, notably, **disabling Pocket**

Now, some of you might have never heard about it, but most of us Firefox users might recall [Pocket](https://www.mozilla.org/en-US/firefox/pocket/)
as the annoying little icon that is there by default on the latest versions of the browser. It's used for syncing articles and news stories across
devices or someting, feel free to actually read about what it is exactly. Apparently though,
[Pocket is built in](https://support.mozilla.org/en-US/kb/what-pocket) nowadays. So you always get it, no matter what you do. What you can do however,
is disabling it after the fact.

Per Reddit User [Frellwit](https://www.reddit.com/r/linux/comments/zabm2a/comment/iyllyeg/?utm_source=share&utm_medium=web2x&context=3)'s instruction
you can add this to your profiles `prefs.js` :

```js
user_pref("extensions.pocket.enabled", false);
user_pref("extensions.pocket.api", "0.0.0.0");
user_pref("extensions.pocket.loggedOutVariant", "");
user_pref("extensions.pocket.oAuthConsumerKey", "");
user_pref("extensions.pocket.onSaveRecs", false);
user_pref("extensions.pocket.onSaveRecs.locales", "");
user_pref("extensions.pocket.showHome", false);
user_pref("extensions.pocket.site", "0.0.0.0");
user_pref("browser.newtabpage.activity-stream.pocketCta", "");
user_pref(
    "browser.newtabpage.activity-stream.section.highlights.includePocket",
    false,
);
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);
user_pref(
    "services.sync.prefs.sync.browser.newtabpage.activity-stream.section.highlights.includePocket",
    false,
);
user_pref(
    "services.sync.prefs.sync-seen.services.sync.prefs.sync.browser.newtabpage.activity-stream.section.highlights.includePocket",
    false,
);
user_pref(
    "services.sync.prefs.sync.browser.newtabpage.activity-stream.feeds.section.topstories",
    false,
);
```

Don't get me wrong, at first I didn't think this would make any noticeable difference. But actually **_it did_**.

At least that is what I observed so
far since adding it. Most significant difference for me is actually when launching Firefox and opening URL's in new tabs. I did not go as far as exactly
measure the difference, but it feels faster and reminded me of the usual fast Firefox I know and love. And that is what counts.
Feel free to try this yourself and see if you notice any difference. Takes 30 seconds or less to open your `prefs.js` in and editor and paste these few
lines of code.

I also encourage you to take a look at the [Firefox CSS](https://www.reddit.com/r/FirefoxCSS/) subreddit, if my custom `user.css` woke your interest in customizing Firefox's looks.

Until next time...

~ k1f0
