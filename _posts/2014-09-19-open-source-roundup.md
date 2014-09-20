---
title: Open Source Roundup
published: true
layout: post
---

I realized recently that I've never written anything about any of the [open
source code](https://github.com/af?tab=repositories) I've written. Though
I'm by no means a prolific contributer, there are a few repos kicking around
my github profile that may be of general interest. This post is an attempt to
catalogue a few of them, and reflect on how they turned out.


## djangbone

My first, and most “successful” project, [djangbone](github.com/af/djangbone)
is a REST API library for Django. I was learning Backbone.js at the time (this
was in 2011), and wanted to write some backend APIs that worked with Backbone's
conventions. Djangbone is intentionally minimalistic, but also pretty extensible
and you can create a pretty useful API very quickly.

I've been pleasantly surprised by how much attention Djangbone received. I put it
on [Django packages](https://www.djangopackages.com/grids/g/api/) early on, and
that seemed to get it some traction. As of this writing, it's still the 4th most
popular API library there, ranked by GitHub stars.


## backprop

Another project that received a bit of traction, [backprop](https://github.com/af/backprop)
is a Backbone plugin that helps you use JavaScript's
[properties](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
on your models.

Even though properties are pretty commonly used in Python, they
don't seem to have found much uptake in JavaScript-land since being [introduced in
ES5](http://ejohn.org/blog/ecmascript-5-objects-and-properties/).
I always thought that was a shame, and replacing Backbone's somewhat ugly `model.get('name')`
for property access seemed like a perfect fit for them. On top of that, backprop lets
you define lightweight schemas (eg. type coercions and default values) along with
your property definitions.


## littledom

[littledom](https://github.com/af/littledom) was a fun pedagogical exercise–
it apes a subset of jQuery's DOM manipulation API. I learned a lot while
writing this and peeking into the internals of jQuery and Zepto. It's also come
in handy for a couple of small side-projects where jQuery felt like overkill.


## shamus

[shamus] is a project automation/watcher desktop application. It's a
node-webkit app that runs pre-defined tasks when files in a (recursively) watched
directory change. I've found it really useful for running unit tests, linters, and
build tools and receiving near-instant feedback without jumping between apps.
However, since I'm now using [tmux](http://en.wikipedia.org/wiki/Tmux) pretty
heavily, I haven't fired shamus up lately. I'd like to try making a curses-based
version to run in a tmux pane at some point, that could be pretty useful too!


## openra_chart

[d3](http://d3js.org) is a library that had been on my radar for a long time,
but I'd never sat down and built something with it. Earlier this year I finally
took the plunge and built a little unit visualization for one of my favourite 
video games, [OpenRA](http://www.openra.net/).
I still have reservations about the resulting design, but it was
a fun learning exercise. If you're familiar with OpenRA, you should [check it
out](http://aaronfranks.com/openra_chart).


## canvasulative

A [fun little game](http://aaronfranks.com/demos/canvasulative/) I made a few
years back. One of my first experiments with `<canvas>`, this is a clone of
a Flash game that I found incredibly addictive. My nephew seemed to really like
my version and told me he played it a lot, which I thought was
pretty great. If I remember correctly, my high score is around 6300...


## Wrapping Up

There are a few other odds and ends on [my GitHub profile](https://github.com/af),
(including my [dotfiles](https://github.com/af/dotfiles) and [this web
site](https://github.com/af/af.github.com)). I have a stack of open source ideas
I'd like to get to, but finding the time has really been a challenge of late
(for very good reasons).
