---
title: The Om Inflection Point
published: true
layout: post
---

I saw [on the twitters](https://twitter.com/swannodette/status/677528129418719232)
today that the [classic blog post](https://swannodette.github.io/2013/12/17/the-future-of-javascript-mvcs/) where David Nolen introduced [Om](https://github.com/omcljs/om) is
two years old today. Even though I’ve never written a single
line of Om or ClojureScript, this post (and Om itself) was extremely enlightening
for me. Furthermore I think it’s had a profound effect on the JavaScript ecosystem at large.


## React

It’s hard to imagine now, but the frontend community’s initial response to
[React](https://facebook.github.io/react/) was pretty lukewarm (at least from
where I was sitting). David’s post made a lot of people sit up and take notice.
I don’t think it’s coincidence that [interest in React](https://www.google.ca/trends/explore#q=reactjs) began to really take off shortly thereafter. React’s benefits are pretty
well documented by now, but its widespread adoption was never a given.


## Immutable Data

While certainly not a new idea, immutable data structures only seemed to "catch
on" in the front-end world since Om’s release. Now popular libraries like
[Immutable.js](https://facebook.github.io/immutable-js/)
give them a more familiar JavaScript API, and they’re even [being
proposed](https://github.com/sebmarkbage/ecmascript-immutable-data-structures)
for inclusion in a future version of EcmaScript.


## Single State Atom

Another technique popularized by Om is placing all application state in a single
object. Easy undo/redo and backup/restore are its most commonly cited benefits,
but I'm curious to see what else it makes possible as more people explore this idea.
[Omniscient](https://github.com/omniscientjs/omniscient) and
[Redux](https://github.com/rackt/redux) (among others) have brought it to
JavaScript, and the latter is currently seeing an explosion in popularity.


## Diversity in Frontend Architecture

In late 2013 it seemed like most people were pretty happy writing MVC*-ish* apps
in JavaScript. The Om blog post was one of the first pieces I saw that not only
gave a cogent argument against it, but also presented a reasonable alternative.
A few months later, Flux was released. The breaking of the MVC monoculture has
allowed a lot of diverse ideas to flourish, which has been both fascinating and
illuminating. Let’s hope it continues for a while yet.
