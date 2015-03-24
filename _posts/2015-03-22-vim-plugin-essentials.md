---
title: Vim Plugin Essentials
published: true
layout: post
---

In my 7+ years of using Vim, I've tried a lot of different plugins in attempts
to improve my workflow. This post is a look into what I've found to be
the *crème de la crème* in the Vim plugin world. If you're lazy, or just
allergic to bad writing, you can [skip to my
vimrc](https://github.com/af/dotfiles/tree/master/vim/vimrc) to see how it all
comes together.

It would be irresponsible to discuss Vim plugins without first imploring
the reader to spend a lot of time with plain Vim first. You will get far more
out of plugins once you have a firm grasp on Vim's fundamental actions, motions,
and overall editing philosophy. *By far* the best resource I've found so far is
[Practical Vim](https://pragprog.com/book/dnvim/practical-vim), by Drew Neil. It
is well worth your money and time if you're serious about Vim. His
[Vimcasts](http://vimcasts.org) video series is also excellent.


## Installing Plugins

Before you start messing around with plugins, it is imperative that you choose
and install a Vim plugin manager. Dealing with installing, upgrading, and deleting
Vim plugins by hand will leave you in a world of pain. It's one of the things
about Vim that is really terrible out of the box. Fortunately, there are quite
a few good plugin managers out there, and I use and strongly recommend
**[NeoBundle](https://github.com/Shougo/neobundle.vim)**. Its
killer feature is the ability to pin each of your plugin dependencies to a
specific Git commit– as far as I know, none of the alternatives do this. Pinning
to a commit keeps your plugin installs repeatable, and also gives you more
flexibility since you aren't limited to in pinning only to tagged versions.

See also: [pathogen](https://github.com/tpope/vim-pathogen),
[vundle](https://github.com/gmarik/Vundle.vim),
[vim-plug](https://github.com/junegunn/vim-plug)


## Navigating between files

After using vanilla Vim for a while, navigating between and launching files can
still be a pain point. Probably the most popular plugin for addressing this is
the mighty **[ctrlp.vim](https://github.com/kien/ctrlp.vim)**. It does the
project-wide fuzzy file matching you may have come to expect from Textmate or
Sublime, as well as fast MRU and buffer switching. I use all 3 modes dozens of
times daily, and ctrlp is probably my most indispensible plugin. If there's a
downside, it's that ctrlp hasn't seen an update in almost two years, but there
is an [actively developed fork](https://github.com/ctrlpvim/ctrlp.vim) that might
be worth checking out.

Another common use case is searching file contents within your project. I've just
started using **[Ags.vim](https://github.com/gabesoft/vim-ags)** for this, which
uses the excellent [silver
searcher](https://github.com/ggreer/the_silver_searcher) tool under the covers.
It's really fast and makes navigating the results easy. I've used a few other
plugins for this, but Ags seems to hit the sweet spot for me.

See also: [Ack.vim](https://github.com/mileszs/ack.vim), [Command-T](https://github.com/wincent/Command-T), [FuzzyFinder](http://www.vim.org/scripts/script.php?script_id=1984), [Unite.vim](https://github.com/Shougo/unite.vim)


## Syntax/Error Highlighting

Comprehensive, up-to-date syntax highlighting is a must
for any programmer. **[vim-polyglot](https://github.com/sheerun/vim-polyglot)**
gives you great syntax highlighting for a ton of different languages, while
minimizing the increased startup time from having them all installed.

Also, getting quick feedback on errors as you type saves a ton of debugging time,
especially if you're writing in a dynamic programming language.
**[Syntastic](https://github.com/scrooloose/syntastic)** runs linters and other
checkers as you save your code for quick feedback. It does cause some lag with
slower linters (looking at you, JSHint), but that's a limitation of Vim's purely
synchronous APIs, and despite this it's still more than worth your time.


## Version Control Integration

**[Fugitive](https://github.com/tpope/vim-fugitive)** is the ultimate plugin for
git integration. I've had it installed for years and have still barely scratched
the surface of all the things it does. For a taste, install it and enter `:Gblame`
or `:Gdiff` while editing a file with changes. `:Gmove` and `:Gremove` are very
handy as well, but I haven't yet absorbed any of the other commands into my
workflow yet.

Another nice tool is **[gitgutter](https://github.com/airblade/vim-gitgutter)**,
which shows which lines of the current file have been added/removed/modified in
the "gutter" to the left of Vim's line numbers. It seems like a small utility,
but I could honestly not go back to editing without this information available
at a glance. It also enables the following key mappings in my vimrc, which allow
me to jump to the closest modified "hunk" in the current file, without needing
to know anything about where that is. Super handy!
```
map <C-j> :GitGutterNextHunk<CR>
map <C-k> :GitGutterPrevHunk<CR>
```


## Miscellaneous

Some other plugins I use and recommend (but am too lazy to write about further)
include:

* **[Ultisnips](https://github.com/SirVer/ultisnips)**, a powerful snippets system
* **[Sparkup](https://github.com/tristen/vim-sparkup)**, a concise way to author html
* **[YankRing](https://github.com/vim-scripts/YankRing.vim)**, for recalling copy/paste history
* **[airline](https://github.com/bling/vim-airline)**, a stylish, clean, and efficient statusbar
* **[filebeagle](https://github.com/jeetsukumaran/vim-filebeagle)**, another efficient way to
navigate among project files
* **[colorizer](http://www.vim.org/scripts/script.php?script_id=3567)**, highlights
css colours in the editor.

You can see the full list near the top of [my
vimrc](https://github.com/af/dotfiles/tree/master/vim/vimrc).

I confess to being somewhat of a plugin junkie, so this post is really just
a snapshot of where my setup is now. I'm sure things will be a little different
in a year's time. If you share the same tweaker's mentality, I recommend following
[usevim](http://usevim.com/) and the [vim subreddit](https://www.reddit.com/r/vim/),
which are generally how I keep tabs on the Vim community. Also, the
[Neovim](https://github.com/neovim/neovim) project is making great progress, and
I'm excited to see how its Lua support and async capabilities will impact the
plugin landscape going forward.
