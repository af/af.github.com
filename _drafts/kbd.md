---
title: Keyboard shortcuts
published: false
layout: post
---


Any serious craftsman knows his tools well. As a professional programmer,
I find it pretty important to interact with the computer in the most efficient
way that I can. While I’m a long way from realizing that ideal, I’ve made some
incremental improvements in the tools that I use that I thought might be useful
to others. Most of the things that I use are targeted at two concerns: improving
ergonomics and removing modality.


Ergonomics
----------
If you’re in front of a computer for most of your waking hours, computer ergonomics are a
pretty important factor in your overall health. The first major implication for me is that mouse
usage has to be kept to a minimum– I’ve found for me that constant mouse usage can trigger RSI,
and I’m generally more productive with both hands on the keyboard anyways. Consequently, every
computer automation tool I use is keyboard-driven.

I’ve also started experimenting with DIY standing desks in the last few months, and while
I think it’s an improvement over sitting all day, the verdict is still out for me in terms
of overall health and productivity benefits.


Modality
--------
One of my biggest [takeaways][1] from reading Jef Raskin’s [*The Humane Interface*][2] a
few years ago was the scourge of modality in computer interfaces. When an interface is modal,
you need to be aware of the application’s current state at all times, since that determines
which actions and commands are available to you. On the other hand, modeless UIs relieve you
of this cognitive burden, and behave consistently no matter what state the application or
computer is in.

One of Raskin’s alternatives to modes is the [quasimode][2], where a user uses deliberate
modifiers in conjunctions with (TODO)


Applications
============

Vim
----
As a programmer, you spend a huge chunk of time moving text around, so a close relationship
with a text editor is essential. TODO

It’s pretty hypocritical to condemn modal interfaces and praise Vim in the same breath,
but for me the ergonomic and productivity benefits of Vim are well worth the tradeoff. My
only major complaint with Vim is that its default scripting language, VimScript, is *awful*.
Fortunately you can compile in support for Python, Ruby, and other languages, so this isn’t
a huge problem in practice.

Vim has a huge, mature ecosystem of plugins, so there is endless flexibility available.


Quicksilver
-----------
Quicksilver is a classic Mac app, and while lots of people prefer other modern, more actively
developed apps, I get along fine with this trusty tool. There are three main functions I use
it for:

* *app launching*– Generally considered Quicksilver’s major selling point, you can invoke
  it quickly to launch apps and files on your system. In my experience this is a *lot* faster
  than OS X’s built-in Spotlight search, mostly because the index is a lot smaller.

* *custom app triggers*– One thing I noticed over time was that when I have a lot of programs
  open at once, it can be a bit of a hassle to Cmd-Tab through every open app to find the one
  I’m looking for. To combat this small but constant inconvenience, I set up some keyboard
  triggers in Quicksilver to instantly switch to or launch my most frequently used apps. For
  example, if I want to switch to Chrome, I just hit Ctrl-1 and it instantly has focus.
  TODO: insert image here

* *iTunes triggers*– In a similar vein to the custom app shortcuts, I have some custom triggers
  set up for iTunes so that I can pause/play/skip tracks instantly, no matter which app has focus.
  These are mapped to Cmd+Alt+Ctrl plus a different arrow key for each action (up: play,
  down: pause, etc).

Vimium
-----------
Vimium is a Chrome extension that lets you use Vim-style keyboard shortcuts to control Chrome
(similar extensions are also available for Firefox). I am still getting the hang of this one, but
it is pretty nice to be able to use the same keybindings in my editor and the browser.


SizeUp
------
Window management is another classic area for workstation productivity. I’ve never really liked
virtual desktops like OS X’s Spaces; for my brain these add a little unneccessary cognitive load.
However, having a plethora of concurrently running apps splattered around your screen can get out
of control, and my OCD likes my windows kept tidy and well aligned.

There’s a little Mac app called SizeUp that I use to keep my windows organized. It’s basically a
tiny, limited tiling window manager, but it works across multiple monitors and fits my needs perfectly.
Through SizeUp, I have a set of keyboard shortcuts to make the current app fullscreen, half screen,
or moved to another monitor.


Remapping Caps Lock
===================

While using the keyboard most of the time yields sizable productivity improvements over
the mouse (at least in my experience), our default QWERTY layout is pretty far from optimal.
I haven’t put in the time to learn [Dvorak](http://en.wikipedia.org/wiki/Dvorak_Simplified_Keyboard)
(and might never do so), but have found possibly a bigger productivity gain– repurposing the
useless Caps Lock key. I have no idea how Caps Lock managed to land its prime real estate, but
remapping it to Control opens up many more convenient key commands.

You can do this remapping in OS X (System Preferences -> Keyboard -> Modifier Keys), but thanks
to [Steve Losh’s awesome post][4], I found and installed [KeyRemap4MacBook][5]. This app gives you
extra configurability with your remappings, so you can have the Caps Lock key act as Control while
you’re holding it down with another key, but as Escape if you press it by itself. This is exactly
how I use it, so I have a much more convenient Control key, but can also exit Vim’s Insert mode without
moving my hand off of home row.


Conclusion
==========
That about sums up the current state of my workspace. It’s constantly evolving, but I
am pretty happy with things as they are now. I’m always interested in experimenting with other
apps that give these small productivity boosts, so let me know if there’s anything awesome that
I’m missing out on.


[1]: http://www.mprove.de/script/02/raskin/designrules.html
[2]: http://en.wikipedia.org/wiki/The_Humane_Interface
[3]: http://en.wikipedia.org/wiki/Mode_(computer_interface)#Quasimodes
[4]: http://stevelosh.com/blog/2012/10/a-modern-space-cadet/
[5]: https://pqrs.org/macosx/keyremap4macbook/index.html.en
