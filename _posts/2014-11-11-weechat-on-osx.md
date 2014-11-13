---
layout: post
title: Setting up WeeChat on OS X
---

Hanging out in IRC channels is a great way to learn the nooks and crannies of
programming languages and tools. I've tried several desktop IRC clients in the
past, but each one felt more like a nuisance, and eventually I'd stop using IRC
entirely until I came across the next app to try. Since these days I spend a lot of time
inside a [tmux](http://en.wikipedia.org/wiki/Tmux) session, I'd much rather have IRC
in my terminal, rather than granting valuable screen real-estate (and, more importantly,
attention) to a separate native app.

The main contenders for terminal IRC seem to be [irssi](http://www.irssi.org/)
and [WeeChat](http://weechat.org/).
I went with WeeChat, since it seemed to be the more modern and actively
maintained of the two. Both are popular options, and you probably can't go wrong
with irssi either. Even though WeeChat is allegedly the more “user-friendly” client, I
encountered some bumps getting it set up on OS X (Yosemite)– hence this post.
A lot of what I learned was cribbed from [the WeeChat quickstart
guide](http://weechat.org/files/doc/devel/weechat_quickstart.en.html), so I
highly recommend reading through it if, like me, you're just getting started.

Below is a screenshot of what you'll end up with at the end of this post. Note
that I'm using [custom terminal colours](https://github.com/chriskempson/base16),
so YMMV on that front. Also, the culmination of my experimentation is
[on github](https://github.com/af/dotfiles/tree/master/weechat) if you want to
skip these ramblings.

![screenshot](/img/posts/weechat.jpg)


## Installation

If you're interested in a command-line IRC program for OS X, I'm going to assume
you have [Homebrew](http://brew.sh/) installed, or at least know how to get it.
Install WeeChat with:

```brew install weechat --with-perl --with-python```

The `--with-perl --with-python` flags are important if you want to use WeeChat
[scripts](http://weechat.org/scripts/), since most of the popular ones are written
in one of those two languages. You can also add `--with-lua` and `--with-ruby`
if you think you'll need plugins from those languages.


## Running WeeChat

You start WeeChat, predictably enough, by entering `weechat` in your terminal
app of choice. After that, things can be a bit bewildering. The first time run doesn't give
you any hints for how to connect to a server, configure the program, or
do much of anything. The magic command to get you started is `/help`. This lists
the available commands used to interact with WeeChat. Each command should be
prefixed with a `/`, and you can (and should) run `/help {command}` to get more
information about the important ones.

A few essential commands and hotkeys:

* `/quit` exits WeeChat
* `/set` is used to read & write your WeeChat configuration. The contents of
  `/help set` is one of the first things you should read as a new WeeChat user.
* `/save` saves your current configuration to various config files, in
  `~/.weechat` by default. Out of the box, WeeChat also saves your up-to-date
  configuration any time you exit the program.
* `/close` closes the current "buffer". If you're familiar with vim, WeeChat's
  concept of buffers is similar. Otherwise, just assume that a buffer maps
  one-to-one to a connected IRC channel for now.
* `/join {channel}` joins an IRC channel (once you're connected to a server;
  more on that in the next section).
* Use Alt + arrow keys to switch buffers
* Use PageUp/PageDown to scroll text in the current buffer


## Connecting to Freenode

[Freenode](http://freenode.net) is where the majority of programming IRC talk
happens, so let's connect to it. WeeChat comes with basic Freenode
configuration out of the box, which is nice and convenient. I'm going to assume
you have a Freenode account (or will connect without one); registering there is
outside the scope of this post.

You can run `/set irc.server.freenode.*` to see all of the available freenode
settings. I configured the following settings (substitute your own values where
applicable):

```
/set irc.server.freenode.addresses chat.freenode.net/7000
/set irc.server.freenode.autoconnect on
/set irc.server.freenode.autojoin {comma-separated list of channels to join}
/set irc.server.freenode.nicks {nicks to use}
/set irc.server.freenode.sasl_password {your freenode password}
/set irc.server.freenode.sasl_username {your freenode username}
/set irc.server.freenode.ssl on
/set irc.server.freenode.ssl_dhkey_size 1024
```

I'm a little fuzzy on whether [SASL
authentication](http://en.wikipedia.org/wiki/Simple_Authentication_and_Security_Layer) helps much if you're already
connecting over SSL, but I turned it on anyways. [This
post](https://pthree.org/2010/01/31/freenode-ssl-and-sasl-authentication-with-irssi/) has more
information on that.

Once you've entered these settings, `/quit` and restart WeeChat, and on the next
startup WeeChat should try and auto-connect to Freenode.


## SSL Certificate Errors

One glitch I hit pretty early was that OS X apparently doesn't ship with the SSL CA
certificates needed to connect to Freenode over SSL. Of course, you could
leave SSL off, but after following the news for the last few years, that
just seems irresponsible. The error message I got looked like this:

```
gnutls: connected using 1024-bit Diffie-Hellman shared secret exchange
gnutls: receiving 2 certificates
- certificate[1] info:
  - subject `OU=Domain Control Validated,OU=Gandi Standard Wildcard SSL,CN=*.freenode.net', issuer `C=FR,O=GANDI SAS,CN=Gandi Standard SSL CA', RSA key 2048
bits, signed using RSA-SHA1, activated `2014-01-13 00:00:00 UTC', expires `2015-01-14 23:59:59 UTC', SHA-1 fingerprint `a0fde217de32fae602fe67409697e15ac06f0286'
- certificate[2] info:
  - subject `C=FR,O=GANDI SAS,CN=Gandi Standard SSL CA', issuer `C=US,ST=UT,L=Salt Lake City,O=The USERTRUST
Network,OU=http://www.usertrust.com,CN=UTN-USERFirst-Hardware', RSA key 2048 bits, signed using RSA-SHA1, activated `2008-10-23 00:00:00 UTC', expires `2020-05-30
10:48:38 UTC', SHA-1 fingerprint `a9f79883a075ce82d20d274d1368e876140d33b3'
gnutls: peer's certificate is NOT trusted
gnutls: peer's certificate issuer is unknown
irc: TLS handshake failed
irc: error: Error in the certificate.
irc: reconnecting to server in 10 seconds
```

The WeeChat FAQ [has an entry on
this](http://weechat.org/files/doc/weechat_faq.en.html#irc_ssl_connection), but
the `curl-ca-bundle` package it mentions doesn't seem to be available in homebrew.
Instead, you can follow [this gist](https://gist.github.com/1stvamp/2158128) to
install the CA bundle that you need.

Back in WeeChat, the following command will point to the CA file that you just
created:

```/set weechat.network.gnutls_ca_file "/usr/share/curl/ca-bundle.crt"```

Now restart WeeChat and it should finally connect to Freenode successfully!


## Securing your password

If you followed the connection instructions above, your IRC password is now
stored in plain text in your WeeChat config file, which is, um, _not ideal_.
Fortunately, WeeChat has the `/secure` command, which lets you store sensitive
information in an encrypted local file, and will prompt you
for a password to unlock it on startup. The user guide has [a nice
section on using this
feature](http://www.weechat.org/files/doc/stable/weechat_user.en.html#secured_data).


## WeeChat Scripts

You can customize and extend WeeChat by installing various "scripts". It comes with
a built-in script manager (try `/help script`), and [tons of
scripts](http://weechat.org/scripts/) are available for installation. As mentioned
earlier, you need to have support for a plugin's language (generally perl or
python) compiled in for them to be installable.

The [buffers.pl](http://weechat.org/scripts/source/buffers.pl.html/) and
[iset.pl](http://weechat.org/scripts/source/iset.pl.html/) plugins are essential.
Assuming you built WeeChat with perl support, you can install them
with the following commands:

```
/script install buffers.pl
/script autoload buffers.pl
/script install iset.pl
/script autoload iset.pl
```

Buffers.pl gives you an always-visible list of the buffers that you have open
(in my opinion this should be built-in to WeeChat). You can tweak it a bit if
you want, but it works great out of the box. iset is a nice UI for interactively
editing your WeeChat configuration, rather than entering verbose `/set` commands
every time you want to change something. Install it and read `/help iset` for more
details.

The other scripts I've found useful so far are:

* `urlgrab.py` - lists and opens urls from your IRC buffers
* [`notification_center.py`](https://github.com/sindresorhus/weechat-notification-center) -
  uses OS X's native notifitions to alert you to IRC highlights and private messages
* `colorize_nicks.py` - colours IRC nicknames in the messages themselves


## Grab bag

Here's a miscellaneous list of other stuff I recommend looking into:

* Customizing the WeeChat UI colours. For example, the following colour tweaks
  made things a bit more readable for me:

  ```
  /set weechat.bar.title.color_bg black
  /set weechat.bar.status.color_bg black
  ```

* Filtering out join/leaves. In many IRC channels the actual conversation can
  be drowned out by tons of join and leave messages. WeeChat has a nice way of
  intelligently filtering these out as needed; run
  `/filter add irc_smart * irc_smart_filter *` to activate it.

* WeeChat lets you easily customize your keyboard hotkeys. I'm a complete hotkey
  junkie, so this is one of my favourite features. Read `/help key` for more info.


## Conclusion

It's only been two weeks, but I'm really enjoying WeeChat so far. For the first
time, having IRC open feels natural and unobtrusive to my workflow. While the
initial learning curve can be quite steep, once you understand how things are
laid out WeeChat is really fun to explore and customize. [My weechat
config](https://github.com/af/dotfiles/tree/master/weechat) is online if you
want to crib some settings. And if you have questions or need help, `#weechat`
on freenode is a great place to ask.

