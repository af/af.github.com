---
title: You Don't Need Semicolons
published: true
layout: post
---

I was discussing semicolons with a coworker recently, when I (rather inelegantly) made
a case for omitting semicolons from a new JavaScript project. I'm rephrasing it here
because I don't often see this perspective in the (endless, annoying) public debate
about semicolons in JS.

The JavaScript community has a history of piling on those who advocate
semicolon-free code (although the tide does seem to be turning of late).
For a long time, I was in the pro-; camp. While semicolon-free code has always
looked easier to read and “cleaner” to my eyes, why would you seemingly invite bugs into your
software for such a small aesthetic benefit? Also, Douglas Crockford forbade them
(his views are apparently still a primary factor in the style choices of many
JavaScript developers).

I was experimenting with a semicolon-free style in a side project a few months ago
when I was blinded by a dazzling light. I achieved enlightenment and swore off
semicolons for all future endeavors. My vision looked something like this:

![Semicolon enlightenment](/img/posts/semicolon_enlightenment.png)

The screenshot above shows [JSHint](http://jshint.com/docs/) catching the [two tricky
cases](https://gist.github.com/ryanflorence/61935031ff729f072d9b) where
omitting trailing semicolons could cause a bug in your JavaScript.
The beauty in this example is that this feedback happened instantly in my editor
(via [syntastic](https://github.com/scrooloose/syntastic) in Neovim).

If you don't have a linter making these (and other) automated checks for you,
please avoid lecturing others on programming style and code quality.
If you do have these basic checks in place, you don't need to use semicolons.
It's up to you, but don't make your decisions based on out-of-date FUD.

[Further](http://inimino.org/~inimino/blog/javascript_semicolons) /
[reading](http://mislav.uniqpath.com/2010/05/semicolons/) /
[on](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding) /
[semicolons.](https://medium.com/@goatslacker/no-you-dont-need-semicolons-148d936b9cf2)
Also, for a good time, read [this entire thread](https://github.com/twbs/bootstrap/issues/3057)
