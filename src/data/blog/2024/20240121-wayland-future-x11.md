---
title: Wayland is the Future
slug: wayland-future-x11
description: Please let X11 die...
pubDatetime: 2024-01-21T00:00:00.00Z
draft: false
tags: ["life"]
---

First of all Happy New Year, since this is the first post made in 2024, I hope you all had a smooth start and I wish you all the best.

## It's getting tiring

I wanted to talk about the rise of Wayland and the fall of X11 on Linux for a while now, but kept postponing it, mainly also due to time constraints.

But today this video was shuffled into my YouTube recommendations.

_"[Wayland Breaks Everything](https://www.youtube.com/watch?v=ebDyyx37pDI)"_

To put a disclaimer up front, I did skip through some parts of the video and I do not want to target the creator of this video directly, but I have to address some statements he made.

I do not disagree with every statement made, and I recommend you watch the video yourself if you have the time.

### Concerning new Linux users

> _"\[...\] Yeah I'm sure new Linux users will have no problem with installing some additional things to get something working that was working in the past \[...\]"_

This is quite a odd statement in a sense that most new Linux users are not very knowledgeable about the past of Linux, especially when it comes to more technical things like how window management is implemented. They mostly care about the initial experience when installing a new distribution (which at this point of time all still rely on X11 out of the box).

Venturing into territories like screen sharing is not typically the first thing a new user would do. And if he does, most common distributions do actually support it just fine, regardless if under X11 or Wayland. This was tested by me personally by quickly deploying some VM's.

### Defending Gnome

> _"\[...\] Deflecting the issue to Gnome does not address the point of the post. \[...\]"_

Yes, yes it does. Gnome is known for basically giving a sh\*\*t about what other DE's or Developers want to implement or realize. They have been going their own route with things for basically the longest time ever, which is absolutely fine for them to do, but it does not change the fact that they break standards or implementations that are basically adopted by everyone else, as Brodie correctly explains in the video the creator is referencing.

Wayland **WILL** require new implementations, because it tries to solve issues and do things better in comparison to how X11 does it. It is **NOT** a drop in replacement, which is clearly mentioned everywhere you read about Wayland, which is also exactly the reason why wee need compatibility layers like XWayland.

### "Fixing" missing protocols

> _"\[...\] How dare this person fix the problem. They should just complain on the internet about it and earning ad-revenue \[...\]"_

This was said in response on the comments made in the referenced video concerning this GitHub repository.

[wayland-x11-compat-protocols](https://github.com/probonopd/wayland-x11-compat-protocols)

As one can quickly observe, the creator of this repository a bit upset with Wayland and especially with the development of `wayland-protocols`. There is also a very interesting quote at the bottom of the `README.md`

> _"The windowing system is not the place to restrict what applications are and are not allowed to do."_

I don't know how to address this but this sentence almost entirely defeats itself. The windowing system **IS** a place to restrict what applications are allowed to do. An application should **NOT** be able to interact with any other window however it wants to. You always address these security related things at their core, which in this case is in fact the windowing system itself. There should be standards in place of what a window is and isn't allowed to do.

Concerning the development of `wayland-protocols`, yes the adoption of new things is quite slow. I get that it can be frustrating, especially for the talented people submitting new standards, which simply get ignored for months or thrown out completely after some time. But developing a new standard like Wayland with new protocol implementations takes time and especially **CAUTION**.

You want to look at new things that are in consideration for implementation very very closely and thoughtfully, or you'll end up in the exact same situation like we are now, where an old standard is in place, that is a complete security nightmare:

- [XWayland & X.Org Server See New Releases Due To Three More Security Vulnerabilities](https://www.phoronix.com/news/X.Org-Halloween-Bugs-2023)
- [X.Org Server & XWayland Updated Due To Two Decade-Old Security Vulnerabilities](https://www.phoronix.com/news/XOrg-Security-Two-CVEs-End-2023)
- [X.Org Hit By New Security Vulnerabilities - Two Date Back To 1988 With X11R2](https://www.phoronix.com/news/XOrg-Vulnerabilities-Since-1988)
- [X.Org Server & XWayland Updated Due To Another Six Security Vulnerabilities](https://www.phoronix.com/news/X.Org-2024-Six-More-Security)

I know, it is hard, complicated and frustrating to do security right. But it is a vital part of all software that is currently out there. Just because the **39 year old X Windowing System** standard does not care about security, Wayland does not have to be the same again.

### The NVIDIA situation

> _"\[...\] I don't know why people recommend using the 545 driver, it is clearly marked as beta on the official site. \[...\]"_

I can't comment too much on the NVIDIA situation, since I don't own a suitable card. But to my knowledge, and also from the things I've heard from my friends who use NVIDIA on Linux, you generally **want** the latest driver, regardless if marked as beta or stable.

It is not secret that NVIDIA does not give a single sh\*\*t about Linux and lately also about their consumers in general. They are a company notorious for only caring about making money. A small user-base like Linux is worth nothing to them. That is why their driver has always been closed-source until recently and also why Wayland usage sucked when using it with one of their cards. This is not a Wayland problem. It is also not a Linux problem. It is an NVIDIA problem, a problem which is out of reach for most of the people developing the new standard.

What NVIDIA recommends on using and not using is basically as much worth as their love for Open Source. Use the latest of whats available in the hope that they finally get their sh\*\*t together and develop a driver that actually works. If that is too much effort for you, buy and AMD card. Simple as that.

### "Unfair" comparisons

> _"\[...\] I take issue with this comparison to photoshop. \[...\] Apps had certain functionality that you could rely on X11, and now that suddenly doesn't work anymore. \[...\]"_

This was said in response to a blog post made by Nate Graham, a KDE developer who is very active in making sure Wayland gets going on said desktop environment.

[Does Wayland really break everything?](https://pointieststick.com/2023/12/26/does-wayland-really-break-everything/)

This is a very good blog post, and i highly recommend reading it. But now let's come back to the statement made by the video creator.

As he correctly admits that Wayland isn't a drop-in replacement for X11 and defines it as a new platform, which is also correct. He then also says the following.

> _"\[...\] I think users can generally expect their apps to work. When it works on their system before an update and after an update it stops working, it is a basic expectation that is not being met. \[...\]"_

This is exactly why we have minor and major releases, although it might differ between what project we are talking about. Since we venture mostly in Open Source territory here, independent developers can pretty much do whatever they like, which is the beauty about it. They have no SLA's or other contracts to adhere to, this whole thing is not Microsoft Windows. If they break something unpredictably, they fix it _because_ the have their SLA's to adhere to, otherwise they loose a sh\*\*t ton of money.

Not saying that this doesn't also apply to Linux. Take stuff like Enterprise Distributions for example. RedHat Enterprise Linux, Rocky Linux, and others. They do have SLA's to fulfill, depending on what solution their customers buy from them. And they do that by sometimes using older standard like X11. But as normal users, we aren't in enterprise environment. We are in the midst of active development, which is a good thing and also precisely the thing why Linux is moving forward a lot more than Microsoft Windows is.

Later comparing this with "breaking the user-space" in reference to a DebConf talk from Linus Torvalds himself does not really make this point any better. Yes, Wayland does break user-space, specifically because it is a new standard. It is to be expected that if a new standard is built and in development, things will break. Because we can't simply recycle old stuff from X11, which is inherently broken. Desktop Environments have waited a long time for Wayland to become ready and now they are starting to push it into their official releases, because it is at a point at which it simply works for 95% of use-cases.

And yes, it is up to the applications to adapt to a new standard. Until they do we have XWayland, which is also under active development. Hell, some apps I use don't even need a native Wayland implementation, because they work perfectly fine under XWayland.

## My personal thoughts

First up, I have been using Wayland for over year now, specifically the window manager [Hyprland](https://github.com/hyprwm/Hyprland). It has seen **a lot** of work in the past and the situation hasn't changed in recent times. It is quick with implementing new protocols that get adopted and merged by the official `wayland-protocols`, like Screen-Tearing support and what not. The lead developer is also very based and funny, some might consider him a bit "direct" though.

Being in this active development phase as a rather technical user is extremely exciting, although it is certainly guaranteed that you will face a bug once or twice. The important thing being that to make the situation better, Open Source software and Linux relies on **YOU** to help. File bug reports, participate in discussions, look at code if you have the knowledge to do so. Every bit of input makes the Linux world a better place, especially in situations where a new standard is being created and enforced.

### Enforcing the Usage

I totally am for the enforced usage of Wayland at this point of time. Because I personally think it's ready and many talented people in the community have contributed a lot of their time and code into making it finally happen.

Most likely, bug reports and issues will spike, but that is not inherently a bad thing. If you ever built a bigger software project, which faces a lot of end users, you know that the most valuable feedback is the one you get from the people actually using your software on a daily basis. They catch so many things which are overlooked by keeping something closed off or behind a beta or development branch. I know, Linux is harder for new people coming into our community, but hear me out.

Basic troubleshooting and understanding how your system works was never a thing to be abandoned. Microsoft Windows and macOS enforce this, because their main goal is satisfying the user. They don't care if you know what your system is doing under the hood, that is also precisely why they are able to collect massive amounts of data. This is not what Linux is supposed to be and also not what it should grow into being in the near future. But concerning that, maybe another blog post will pop up here in the near future.

With that being said, have a nice day. You'll hear from me again.

~ k1f0
