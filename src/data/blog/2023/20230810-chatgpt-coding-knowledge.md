---
title: Coding Knowledge Meltdown - ChatGPT
slug: chatgpt-coding-knowledge
description: Does it really teach you how to code?
pubDatetime: 2023-08-10T00:00:00.00Z
draft: false
tags: ["life"]
---

## The Promise

I remember how excited everyone was when they first got some kind of coding response out of ChatGPT. Nobody could believe that an AI was suddenly able to produce decent code output when provided with minimal input on what to do in a specific language.

It wasn't soon until things like GitHub Copilot peaked around the corner, promising Integration into common IDE's, less Boilerplate Code and less work for developers.

Things all evolved over time, some say AI Code got even better, some say it got worse. Regardless of what is true in this context, there must be something that we overlooked along the way right?

## Learning a new Language

All the AI stuff hit me at a time where I was already in the process of learning a new Programming Language, namely [Rust](https://www.rust-lang.org/).

One of the things I usually do when I want to learn new stuff is reading a book or any physical media about the topic. It gives me some time off from digital stuff and lets me focus on the actual content. While we're at it I can recommend [No Starch Press's "The Rust Programming Language"](https://nostarch.com/rust-programming-language-2nd-edition), which is an analog alternative to the [Online Version](https://doc.rust-lang.org/book/title-page.html) of the Book. It's where I took the majority of my Rust Knowledge from.

That was until I tried out ChatGPT for the first time. I was mainly giving it code samples and snippets from other Rust Projects and asking it to explain the code to me, which it was quite good at.

With the _"Power of ChatGPT"_ in my hands, I decided to start my own little project that had been in my head for a while. I did a whole bunch of Copy-Pasting, which was a fatal thing to do as I would soon find out.
Because as I spent more time with the actual language and code itself, I noticed how hard I had relied on what was provided to me by an AI language model that obviously had no idea what it was doing as things got more complex

## Back to the roots

After spending some good amount of time actually understanding and improving the Codebase that I built upon the fragments of ChatGPT, I frequently visited an old friend, that has had quite a [decline in traffic](https://news.ycombinator.com/item?id=36855516) since the popularity spike of AI: [StackOverflow](https://stackoverflow.com/).

The sheer amount of time I could have saved, and the more actual knowledge I could have gained by just using Books, Rust Documentation, StackOverflow and GitHub Issue Threads instead of ChatGPT was insane.

It's the sole reason I turned to AI less and less often when it came to solving things with Code. I simply could not justify relying on a tool that gets it's knowledge from a bunch of aggregated Code Snippets.

## So what is the point?

Move away from AI for coding. As much as possible, especially when learning a new language. Turn back to StackOverflow, participate in GitHub Issue threads or talk with other people on Community Servers via Matrix, Discord or similar.

You won't gain anything by just prompting ChatGPT or other AI Language models and Copy-Pasting their code into hoping it works. It will accumulate over time and leave you with a messy Codebase that you don't even understand because you didn't actually write it.

The industry is heading into a completely different direction at the moment. In my opinion it over-promotes AI way to much. Obviously because everybody wants to get onto the Hype-Train and have a slice of the AI cake. Especially if people that are new to coding follow trends like this too closely, it will lead to a more general Skill Degradation in the Coding Space.

Coding has always been more than Copy-Pasting. It's this unique combination of having the ability to build anything you want by yourself, making it your own and exactly to your taste. With no limits or dependencies, as long as you know how to achieve it in a certain language, the ability to create stuff will stay with you forever.

## Final Words

If you want to take a look at the mentioned Rust Project, I will link it here. As said, it started as my first ever Rust Program.
I named it [rwpspread](https://github.com/0xk1f0/rwpspread), which is sort of an abbreviation for _"Rust Wallpaper Spread"_. It can split an input wallpaper into separate wallpapers. They can then be applied as separate wallpapers in Multi-Monitor setups to have one big wallpaper spread over multiple screens.
It can also do this automatically on-startup and on screen hot-plug events as a background daemon, provided it runs within a `wlroots` Wayland Session. Feel free to check it out, I am still actively working and improving it when I find the time.

That's all for today.

~ k1f0
