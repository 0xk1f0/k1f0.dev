---
title: Throwing more Power at the Problem
slug: throwing-power-problem
description: About Gaming Hardware, Upscaling and Efficiency
pubDatetime: 2023-11-04T00:00:00.00Z
draft: false
tags: ["gaming", "opinion"]
---

## The Problem at hand

Hardware manufacturers and Game Developers have been facing the same problems in recent times:

**Performance Problems**

Now, of course this is easily solvable with better Hardware. They provide you with deals to get free games when you buy their new hardware, so throw out your maybe one year old GPU or CPU and buy the new hot stuff they have to offer!

_Sounds good right?_

So the majority of excited gamers ventured out to buy overpriced GPU's and corresponding Power Supplies to meet their absolutely insane power demands. Rising up their power bills and leaving a big hole in their wallets and bank accounts.

But in the end they are left with brand new games that run very poorly, even on top-tier hardware, so the expenses weren't worth it after all. But hey, at least the hardware manufacturers made some money again to boost development of even better hardware, right?

## Solving the wrong problems

Let's take NVIDIA as an example here. Their GPU "Innovation" in recent years has been to take the previous generation of their cards, bump the maximum TDP (amount of power a card can draw) up by a few tenths of watts, add a few more CUDA cores plus better memory and call it a day.

They even developed a new [connector standard](https://videocardz.com/newz/pcie-gen5-12vhpwr-power-connector-to-feature-150w-300w-450w-and-600w-settings) that has been seeing adoption in newer power supplies to meet the extreme power demands of their modern cards.

_Let's not forget that this Connector can literally [catch fire](https://videocardz.com/newz/first-users-report-nvidia-rtx-4090-gpus-with-melted-16-pin-power-connectors)!_

## Where we should be headed

Switching sides to Team Red _aka_ AMD. They have been pursuing a different strategy, building their latest lineup of GPU's (RDNA3) with [chiplet technology](https://en.wikipedia.org/wiki/RDNA_3).
This is a first for consumer GPU's and has been working really well for their Ryzen and Epyc processors.

This new architecture unfortunately didn't allow them to compete with their NVIDIA counterparts, but that was to be expected.

_Why you ask?_

Well let's face it, AMD could have easily done the same thing as NVIDIA by just throwing more power at their cards and switching to the new connector standard, which in turn would force buyers into potentially upgrading their PSU.

But they didn't, and we should thank them for it. Trying something different in exchange for a bit of perfomance loss should always be prioritized. Most importantly, this new chiplet technology could mean very promising steps forward for more power efficiency.

## Keeping functioning Hardware alive

People like talking about new hardware advancements, but often forget the most important part about it. If you want to get them, you'll need to invest in new hardware.

This makes your wallet unhappy at some point, so why not look at the problem in the aspect of software. Software can also be advanced, and in most cases you'll not need new hardware for it (we'll come to this a bit later again).

Fortunately, game developers and also hardware manufacturers have noticed this too and have been steadily implementing a new prominent feature into their drivers and game engines:

**Upscaling Technologies**

Going by the names of FSR, DLSS, XeSS or TSR. They all have the same goal and purpose. Rendering a game at a lower resolution and upscaling it to the actual monitor resolution, gaining more frames per second in the process.

The way this is done varies by implementation, which is a very important point to consider. How this stuff is implemented will greatly influence on what types of cards and especially older cards it can be used. And this is ultimately what upscaling also should address:

**Resurrecting old, but perfectly functioning hardware**

Why buy new hardware when you can just optimize your games and drivers?

## What some people seem to miss

As said, every upscaling technology should target as many GPU's as possible, but does it really? Let's look at the most popular options really quick.

**DLSS:** Developed by NVIDIA, only runs on NVIDIA and has feature limitations depending on what generation of card you have. Stuff like Frame Generation for example only runs on newer RTX cards. Is also closed-source software, so no one can really see how it works.

**FSR:** Developed by AMD, runs on NVIDIA, AMD and Intel graphics cards. Is developed under an Open-Source MIT-License, so people can integrate it into their own engines an tweak it as they like.

Without being too biased about either of the two companies mentioned above, what do you honestly think is the better approach? FSR has gotten a lot of bad comments for their latest 3.0 Release, which now does Frame Generation (like DLSS), but implemented in a different way. It is not very mature yet and has some graphical artifacts showing in some cases.

Newer versions of rely on Neural Networks and AI (requires hardware accelerators) to work properly and as said, do not work on every GPU. Vendor locking these technologies is not really the path we should be taking.

Admittedly, AMD has been playing a catch-up game with FSR, forcing them to compete with DLSS. But the fact that they even developed a solution that works on almost any card is a huge achievement. Sure, there are issues to be ironed out, but the fact that FSR is Open-Source, these will hopefully be ironed out with the help of the developer community.

## About Game Engines

Finally, let's not forget about the engines that power our modern games.

No game released in recent months was properly optimized, some even straight unplayable at release. Additionally they require huge amounts of storage space, sometimes filling half an HDD up by themselves.

When looking back at times when storage and memory capacities where much much lower than today, we had highly optimized games that looked amazing for those times (and some of them still do to this day). They knew they had to optimize their games, because the little bit of memory and storage capacity was all they could work with.

Increasing the amount of performance, memory and storage in modern PC's should never have been a reason to neglect optimizing games. It can be done, but in cooperation with hardware manufacturers, the profit of buying new hardware for new resource wasting games is unfortunately better.

In the end, they don't care about your experience, your wallet or your current hardware. They only care about your money.

~ k1f0
