---
title: You Don't Need Trailing Semicolons
published: true
layout: post
---

I was discussing semicolons with a coworker recently, when I (rather inelegantly) made
a case for omitting semicolons from a new JavaScript project. I'm rephrasing it here
because I don't often see this perspective in the endless public debate
about semicolons in JS.

The JavaScript community has a history of piling on those who advocate
semicolon-free code (although the tide does seem to be turning of late).
For a long time, I was in the pro-; camp. While semicolon-free code has always
looked easier to read and “cleaner” to my eyes, why would you seemingly invite bugs into your
software for such a small aesthetic benefit? Also, Douglas Crockford forbade them
(his views are apparently still a primary factor in the style choices of many
JavaScript developers).

Before getting into the crux of my argument, I must concede that if you write your
JavaScript without trailing semicolons, you need to make a habit of adding them to
the start of the line in
[two specific cases](https://gist.github.com/ryanflorence/61935031ff729f072d9b)
– when you begin your line with a `[` or a `(`. Otherwise in some cases JavaScript
will interpret those characters as the start of array indexing or function invocation,
respectively.

Anyways, I was experimenting with semicolon-free JS on a side project a few
months ago when I tripped up and forgot the two edge cases above. What I saw
caused me to swear off trailing semicolons for all future projects. It looked
something like this:

![Semicolon enlightenment](/img/posts/semicolon_enlightenment.png)

The screenshot above shows [JSHint](http://jshint.com/docs/) catching the two
aforementioned cases where omitting trailing semicolons could cause a bug in
JavaScript. The beauty in this example is that this feedback happened
instantly in my editor (via [syntastic](https://github.com/scrooloose/syntastic)
in Neovim).

If you don't have a linter making these (and other) automated checks for you
before you check in, a) you're missing out, and b)
please refrain from lecturing others on programming style and code quality.
If you do have linting checks in place, you can skip trailing semicolons.
It's up to you, but with today's tooling support for JavaScript, code "quality"
and robustness should not factor into your decision.

[Further](http://inimino.org/~inimino/blog/javascript_semicolons) /
[reading](http://mislav.uniqpath.com/2010/05/semicolons/) /
[on](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding) /
[semicolons.](https://medium.com/@goatslacker/no-you-dont-need-semicolons-148d936b9cf2)
Also, for a good time, read [this entire thread](https://github.com/twbs/bootstrap/issues/3057)

*Postscript:* There are a few more contrived cases where ASI can bite you, but in my
experience they're not worth worrying about:

```js
function thisIsTerrible() {
    return              // ASI would strike here; returns `undefined`
    {
        foo: 'bar'
    }
}
```

Seriously, who writes code like this? Oh yeah, and JSHint will catch this too.
