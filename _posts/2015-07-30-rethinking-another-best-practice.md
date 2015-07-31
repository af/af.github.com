---
layout: post
title: Rethinking Another Best Practice
keywords: "GraphQL, React, Rethinking best practices"
---

Just over two years ago, Facebook released React. At the time, I joined an
apparent majority of commenters in declaring that it looked weird and clunky.
Inline XML, onclick handlers, markup and logic together... yuck! To say React
has taken off and captured developer mindshare since then is a huge understatement.
Today it feels like every second company is migrating their existing MVC codebase
to React and/or [Flux](https://facebook.github.io/flux/).

Web developers are a fickle bunch, and the massive churn in the world of web
frameworks is well documented. So what's far more interesting than React's popularity
is the way it's changed how we think about front-end web applications. React's key
features are great encapsulation through components, and declarative UI, rather than
directly manipulating global state (ie. the DOM). React's virtual DOM is generally
considered to be its key feature, but in reality it's an implementation detail
that powers these two breakthroughs.

A few weeks ago, Facebook released the initial [spec](https://github.com/facebook/graphql)
and [reference implementation](https://github.com/graphql/graphql-js)
for GraphQL, a new way to do data transfer between servers and app/web clients. Just as
React and Flux challenged our assumptions that MVC was the preferred (only?) way
to write clean frontend applications, GraphQL now puts REST in the crosshairs.

REST has turned into a bit of a sacred cow among web developers.
It's generally considered "the right way" to do data exchange between servers and
web UIs, and what we've lost with this uncritical attitude is a more nuanced understanding
of REST's tradeoffs for the systems we're building. Furthermore, most of us are
pretty low on the [Richardson Maturity
Model](http://martinfowler.com/articles/richardsonMaturityModel.html),
so you can argue that often we're not even doing REST correctly. How many REST
APIs have you written that actually use hypermedia to link and expose affordances
between your resources?

I highly recommend reading [Facebook's GraphQL
introduction](https://facebook.github.io/react/blog/2015/05/01/graphql-introduction.html),
as it does a fantastic job of enumerating the problems with REST for the increasingly
complex and performance-sensitive systems we're building today. It also lists
issues with the "Ad Hoc Endpoints" that many of us build and erroneously call
"REST APIs".

One of the promising things about GraphQL is that it's not tied to HTTP at all–
this is great for two reasons. First, it means you should also be able to use it
with other transports like Websockets or TCP. Secondly, HTTP has always been
pretty awkward for representing application semantics. If you've ever agonized
over the *correct* response code for an error condition in a REST API,
you've experienced this first-hand. It shouldn't be surprising that a protocol
designed for document delivery is not an ideal fit for the wide variety of things
we do with APIs and web applications today.

GraphQL is still extremely young as a public project, so it's hard to tell if
it will live up to its promise. Like any technology, it will have its pain
points, but at the moment only people inside of Facebook are intimately aware
of them. It's also clearly still at the "technical preview" stage, and some critical
things like mutations (ie. writes to your data) are still not fully fleshed out
in the documentation. Things should really ramp up when Facebook releases
[Relay](https://gist.github.com/wincent/598fa75e22bdfa44cf47), a client-side JavaScript
framework they've been teasing that's designed to integrate tightly with GraphQL.
It's projected to drop some time in the next month and I'm really looking forward
to digging in, so we can get a wider look into GraphQL's potential.

### More links

* [GraphQL Tuturial with the reference
implementation](https://medium.com/@clayallsopp/your-first-graphql-server-3c766ab4f0a2)
* [Relay Introduction](https://facebook.github.io/react/blog/2015/02/20/introducing-relay-and-graphql.html),
* [Building the Facebook News Feed with Relay](https://facebook.github.io/react/blog/2015/03/19/building-the-facebook-news-feed-with-relay.html)
* [Mutations in Relay](https://speakerdeck.com/laneyk/mutations-in-relay)
