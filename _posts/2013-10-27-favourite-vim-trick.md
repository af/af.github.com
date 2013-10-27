---
layout: post
title: My Favourite Vim Trick
---

I’ve been a [vim][0] user for over five years. While it’s one of my favourite
pieces of software, there are two snags that I noticed myself constantly
tripping over while using it:

* Using the `<esc>` key (or `<C-[>` for that matter) to exit Insert mode
  is quite a stretch on standard qwerty keyboards. Since vim usage
  involves making this mode switch constantly, this is a big annoyance.

* It must be a weird manifestation of OCD, but no matter which program I’m
  using, I compulsively save my work after almost any edit. In vim, this means
  hitting `:w<CR>` to make sure the current buffer is saved.
  That is a lot of keystrokes to go through every few seconds!

My favourite vim mapping addresses both of these problems, and has made editing
much more pleasant.

The first step is to remap our awful CapsLock key to pull double-duty: when
pressed, it works as an `<esc>` keypress, and when held down while pressing
another key, it works as a `<Ctrl>` modifier key. I picked up this trick from
Steve Losh’s [awesomely comprehensive blog post][1] on keyboard customization,
and it has served me very well for the last year. It uses [KeyRemap4MacBook][2],
but I’m sure similar programs exist for Linux and Windows.

With that mapping in place, an `<esc>` key is very conveniently located next
to the left pinky finger, so getting out of vim's Insert mode is now a snap.

To address the compulsive `:w<CR>` problem, I’ve set up custom bindings in Vim
so that every time I hit `<esc>`, (in Insert or Normal mode) the buffer is
automatically saved. The mappings (in my .vimrc file) look like this:

{% highlight vim %}
inoremap <esc> <esc>:w<CR>
autocmd InsertLeave * nnoremap <esc> <esc>:w<CR>
{% endhighlight %}

The second mapping is a bit of a hack, and will only work after you’ve spent
some time in Insert mode. However, using just `nnoremap <esc> <esc>:w<CR>`
caused weird problems when opening a file for the first time. If anyone has a
more elegant way to handle the Normal mode mapping, I’d love to hear it!

I’ve just started revisiting my dotfiles, cleaning them up, and
[putting them on GitHub][3]. Thought this trick might come in handy for anyone
else who has the same annoyances when getting started with vim.


[0]: http://www.vim.org/
[1]: http://stevelosh.com/blog/2012/10/a-modern-space-cadet/#controlescape
[2]: https://pqrs.org/macosx/keyremap4macbook/index.html.en
[3]: https://github.com/af/dotfiles
