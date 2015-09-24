---
layout: post
title: Does "Vote Splitting" Have a Large Impact on Canadian Elections?
keywords: "politics, Canadian election, vote splitting, data visualization, d3js"
---


*TL;DR: I made [this visualization](http://aaronfranks.com/votesplit2011) about
vote splitting in the 2011 Canadian election.*


If you're a Canadian and haven't been hiding under a rock, you're probably aware
there's an election coming up. When we're not hearing about
candidates [peeing in mugs](http://www.cbc.ca/news/trending/canada-election-2015-peegate-jerry-bance-1.3218157) or [how Bill C-51 reflects the teachings of Jesus](http://www.cbc.ca/news/canada/british-columbia/holy-tweets-b-c-mp-compares-conservative-party-to-jesus-1.3152178),
we're knee-deep in speculation over who's going to be in power later this fall.

Unless you support the Conservative party *(full disclosure: I do not)*, there's
a good chance you've lamented the "vote splitting" of the left, and the
[tactical/strategic](https://en.wikipedia.org/wiki/First-past-the-post_voting#Criticisms)
voting that seems necessary to prevent Conservative (CPC) rule.

The spectre of vote splitting is invoked countless times in the run-up to each
election, but we rarely get a chance to see how it actually impacts the results.
Meanwhile, the poll numbers we see in the press are almost always the
nation-wide popular vote, which [give no
insight](http://thetyee.ca/Mediacheck/2015/09/16/Stop-Sharing-Nationwide-Election-Polls/)
into what's happening at the riding level.
Since our [first-past-the-post](https://en.wikipedia.org/wiki/First-past-the-post_voting)
voting system means our elections are really
hundreds of separate contests, it's complicated and counterintuitive to see how
changes in popular vote translate to movement in seats.

I took an interest in this topic and built a [data
visualization](http://aaronfranks.com/votesplit2011) that allows you to modify the
popular vote in the 2011 election and see how it would have affected the results.
You can also zoom in and click on ridings to see how each of them would have
played out with your changes, or look at the [absolute best
case of strategic voting](http://aaronfranks.com/votesplit2011/#split=NDP,LPC,GPC-100-Strategic)
in 2011.

Some pointers on using the visualization:

* The purple dropdowns let you move a chunk of the national popular vote from
  one party to another. Each riding, and the national seat totals, will be
  recalculated for each change you make.
* For every redistribution of votes, it's assumed that the same percentage of votes
  will be transferred in every riding. This is clearly pretty simplistic, but it
  would be very complicated to configure and read the results otherwise.
* There's an extra option in the last dropdown called "Strategic". What this does
  is distribute votes to whichever party that had the best chance to defeat the Conservatives
  *in each indidual riding*. It assumes each strategic voter would know which non-CPC
  candidate had the best shot heading into the election.
* You can zoom in, pan around, and select specific ridings to see their vote totals
* Each riding is colour-coded with the winner, and the strength of the colouring
  indicates which percentage of the vote the winner had. Translation: the lighter
  ridings are more hotly contested.
* "Battleground" ridings show up with a hatched pattern. These are ridings where the
  difference between the Conservatives and the top progressive party was less than
  5% of the riding's total votes.
* Things will kinda/sorta work on mobile/tablet, but a desktop browser is recommended
  if you have one.


## Warnings and Caveats

Before drawing any conclusions, it's important to stress
that its data is limited to the 2011 election. This year's election has 30 new
ridings to consider, many existing boundary lines redrawn, and
[polls](http://www.cbc.ca/news2/interactives/poll-tracker/2015/index.html) that
look very different than they did four years ago. In summary, you
really can't extrapolate too confidently from the 2011 results to today. However,
many of the trends and party strongholds remain the same in 2015, and gaining
a better understanding of past results is still useful in revealing the dynamics
of our democracy.


## The Greens

The Green party is the party most frequently
[accused](https://en.wikipedia.org/wiki/First-past-the-post_voting) of siphoning
off votes that could be used to defeat the Conservatives. With the visualization
we can see that even if all 2011 Green voters voted [for the second-place
NDP](http://aaronfranks.com/votesplit2011/#split=GPC-100-NDP), or [voted perfectly
strategically](http://aaronfranks.com/votesplit2011/#split=GPC-100-Strategic), we
would have still ended up with a Conservative government, and still a majority in
the first case. This lends some credence to Elizabeth May's [rebuttal](http://thetyee.ca/Opinion/2015/06/27/May-Green-Party-Does-Not-Split-Vote/) that the Greens did not split the vote
appreciably. But could it be different this year with the top three parties closer
in the polls?


## The Liberals and NDP

If you played around with some of the Green vote scenarios above, you may have noticed
that transfering their votes [to the
Liberals instead](http://aaronfranks.com/votesplit2011/#split=GPC-100-LPC) would
have cost the CPC an extra five seats. This highlights a pattern: even though
the NDP finished second in seats in 2011, the Liberals were actually in more
close contests with the Conservatives and may stand to steal more seats from them.
This may partially explain why most of the CPC's attack ads to date have focused
on Trudeau and not Mulcair, despite the NDP's strength in the polls for much of
the campaign.

There were actually only a handful of ridings where the Conservatives and NDP
were in close competition with each other in 2011. That's why if you are looking to vote
strategically, choosing the top non-CPC party in the popular vote numbers may
be counterproductive; you're much better off looking at
[riding-by-riding polls](http://www.threehundredeight.com/p/canada.html) and
supporting whoever has the best chance of knocking off the Conservatives in your district.


## The Conservatives

One thing that's clear from running through different scenarios is that if the
Conservatives [lost support to the
Liberals](http://aaronfranks.com/votesplit2011/#split=CPC-10-LPC) as current polls
indicate may be happening, they'd be in trouble in many swing ridings across the country.

At the same time, their strongholds in the prairies appear to be very safe­ in some
ridings they collected upwards of 80% of the vote in 2011. There has been speculation that
the NDP's victory in the Alberta provincial election may presage a shift in the federal
election, but it seems unlikely and the [current polls](http://www.threehundredeight.com/p/canada.html) don't support that theory either.


## Takeaways for Progressive Voters

From trying out various scenarios, it seems there are three major classes of ridings
for the would-be strategic voter to consider:

* A: The Conservative stronghold (see all of the dark-blue in Alberta). Polls indicate
  there's a good chance many of these ridings will go CPC once again.
* B: The safe progressive riding. 2+ progressive parties are projected to have a
  higher vote count than the Conservatives, so vote-splitting is less of a factor.
* C: The battlegrounds. The Conservatives and one or more progressive parties have
  a tight race. This is where strategic voting could really make a difference.

If you were to go back in time to re-cast your ballot in 2011, it seems clear that
the majority of ridings are of type A or B. If you lived in one of them, you wouldn't
need to worry about vote splitting at all,
and should vote for the party that best aligns with your values. However, in the
ridings that are [shaping up to be battlegrounds](http://www.votetogether.ca/riding/list/), you may want to vote
strategically, with the help of [VoteTogether](http://www.votetogether.ca/) and
the [current polls in your riding](http://www.threehundredeight.com/p/canada.html).


A few more things that deserve attention for October 2015:

* All major parties beside the CPC have
[pledged](https://www.thestar.com/news/canada/2015/06/16/trudeau-would-end-first-past-the-post-electoral-system.html) to end first-past-the-post if
  elected. So hopefully this is the last election where we even have to think
  about splitting and strategic voting!
* Improving 2011's poor voter turnout numbers (61%) could also have a dramatic effect
  on the results, particularly if [more young people
  voted](https://en.wikipedia.org/wiki/Young_voter_turnout_in_Canada)
* Once again, if you want to vote strategically against the Conservatives, *know your riding*
  and don't let the popular vote influence your decision.

On a final note, the [source code](https://github.com/af/votesplit2011) for the
visualization is available. Please file an issue on Github if you have any suggestions
for improvement.
