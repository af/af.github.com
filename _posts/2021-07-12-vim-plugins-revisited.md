---
layout: post
published: true
title: Vim Plugins Revisited – Neovim 0.5 Edition
---

Over 6 years ago (!) I wrote a [little post](./vim-plugin-essentials) here about the vim plugins I
found most useful. In honor of [the Neovim 0.5 release last week](https://neovim.io/news/2021/07), I thought it would be worth revisiting
my plugins of choice, and reflect on how they've changed over the years.

Neovim 0.5 is really a game changer in a lot of ways, and its impact on my setup has been significant.
Native [LSP](https://microsoft.github.io/language-server-protocol/)
support and treesitter integration are two of the exciting headline features, but in my mind, the
biggest game-changer is the first-class support for scripting _everything_ in Lua. Many of the plugins
I've migrated below are fully implemented in Lua, and it's amazing to think that the community is just getting
started in harnessing a "proper", and much faster, built-in scripting language.

## Version control integration
**Then:** gitgutter  
**Now:** [gitsigns](https://github.com/lewis6991/gitsigns.nvim)

Gitgutter served me well for a very long time! However, with gitsigns the VCS feedback appears much,
much faster, and that was reason enough for me to switch. I also prefer its more understated use of
the sign column.

## Diagnostics
**Then:** Syntastic  
**Now:** [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig)

I have to give a shout out to [ALE](https://github.com/dense-analysis/ale) and [coc-nvim](https://github.com/neoclide/coc.nvim), two great
projects that I used for long stretches over the last five years. But as far as I'm concerned,
Neovim's built-in LSP integration is absolutely the future in this space.
I'd been cautiously kicking its tires before it was stable in 0.5, and ended up switching earlier
than I'd anticipated thanks to the phenomenal performance increase over coc.nvim.

## Syntax Highlighting
**Then:** vim-polyglot  
**Now:** [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter)

Another performance-related switch here, based on a new feature in Neovim 0.5. I have only
scratched the surface of what the treesitter integration has to offer, but am also excited about
features like [language-aware text
objects](https://github.com/nvim-treesitter/nvim-treesitter-textobjects). Again, the future in
Neovim is really bright now that these tools are in the hands of an active development community.

## Autocomplete
**Then:** ???  
**Now:** [nvim-compe](https://github.com/hrsh7th/nvim-compe)

Hard to believe I used vim for years without decent autocomplete. Sorry, vim curmudgeons, but modern
editors have raised the stakes here, and the built-in [Omnicomplete](https://vim.fandom.com/wiki/Omni_completion)
just doesn't measure up anymore. nvim-compe is snappy (thanks in part to Lua) and has a configurable
list of sources (including, most notably, neovim's LSP client). I don't quite
have the snippet support set up to my liking yet, but in every other respect it's been a great
experience so far.

## File finder
**Then:** Ctrlp.vim  
**Now:** [fzf.vim](https://github.com/junegunn/fzf.vim)

Looking at the list of file finders in the original post was quite a trip down memory lane. Again,
I switched to fzf eons ago, and I think the killer feature for me, besides the speed, was having the
same file searching available in the shell. There are fancier new options available like
[telescope.nvim](https://github.com/nvim-telescope/telescope.nvim), but after a cursory exploration
I've decided I'm quite happy with my trusty FZF setup.

## Grep frontend
**Then:** Ags.vim  
**Now:** [CtrlSF](https://github.com/dyng/ctrlsf.vim)

I've been using CtrlSF for ages as well, as a UI for grepping across a project (via the spectacularly
fast [ripgrep](https://github.com/BurntSushi/ripgrep)). It's modeled on Sublime Text's
project search, supports editing multiple files via search results, and is fairly customizable.

## Wrap up

My full [init.vim](https://github.com/af/dotfiles/blob/master/vim/init.vim) is up on GitHub,
with a few other miscellaneous plugins and supporting config. Notably, I've started moving some of
my more involved keybindings and supporting functions to lua modules. I'm still far from a Lua
ninja, but compared to vimscript, making these kinds of customizations is significantly easier.

To some readers, spending years customizing a text editor probably seems frivolous, an extravagant
waste of time. Why not just use VS Code? I can understand that perspective, but also derive a deep
satisfaction every time I'm able to sculpt the digital environment where I spend hours each day in
a way that fits my brain better. I'm very much looking forward to further exploring the new sculpting
tools in Neovim 0.5.
