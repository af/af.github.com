---
title: Let’s Spoon
published: true
layout: post
keywords: "hammerspoon, automation, scripting, lua, Mac, OS X"
---

Programmers talk a lot about automation. Once you get infected by the desire to
automate, everything you’ll need to do more than twice in your life must be scripted.
Because hey, you’d probably rather be wasting all that time on a social news
site or something.

There’s one area of our work that we often don’t think to automate, but which
can yield immense time savings: the way we interact with the GUI on our desktops.
Even if you spend the majority of your time in one terminal window, I’m willing to bet
you frequently switch over to your web browser and/or music app.

If you’re on a Mac, this is where [Hammerspoon](http://www.hammerspoon.org/) comes in.
This [strangely named](https://groups.google.com/forum/#!topic/mjolnir-io/4X9f8A2UdHQ)
app gives you a Lua API for a boatload of common desktop and application operations.
Here’s a quick list of what I use it for:

### Launching and switching apps

*Global hotkeys for most commonly used applications, to avoid the `Cmd-Tab`,
`Cmd-Tab`, `Cmd-Tab`, `Cmd-Tab` dance to get to a certain app. Getting
to iTerm is always `Ctrl-2`, regardless of when it was last in focus.*

### Moving and re-sizing windows 

*Basically, this is a simple substitute for a window manager. With one global
keystroke, you can resize a window however you like, send it to a different screen,
or snap it to a grid that you have predefined.*

### System audio control

*Volume/muting, in a way that is more customizable than the default OS controls.*

### Transport controls for iTunes

*Having global hotkeys for music is a godsend. No app (or mental context) switching
is necessary when you're deeply concentrating on something else.*

Hammerspoon’s [API docs](http://www.hammerspoon.org/docs/index.html) have a full list of
everything that’s available. Even after using it for several months, there’s a
lot there that I wasn’t aware of­ new features are being added constantly. My
dotfiles are a pretty simple [starting point](https://github.com/af/dotfiles/blob/master/hammerspoon/init.lua<Paste>) if you’re not sure how to jump in.

I highly recommend checking out Hammerspoon. It’s a robust and extremely powerful
automation tool for areas that you didn’t know you wanted to automate. Using it
has also been a great introduction to Lua, which seems like a nice little language.
If you come across novel applications for Hammerspoon, please let me know. I’m
always looking to expand the ways I use it.
