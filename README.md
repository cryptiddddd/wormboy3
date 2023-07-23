# wormboy3

[![wormboy button](site/assets/images/button.png)](https://wormboy3.neocities.org/)
![signature](https://img.shields.io/badge/crane%20did%20this-926cd4?style=for-the-badge)

this site is my silly neocities for silly things :]! see it live at the link above [wormboy button]/

note: the repo and live site may not always match 1:1. updates may be offset from one another, but i'll be publishing updates as regularly as i feel appropriate. in the future, i will be using branches.

i am making this git repo public because i love to peruse the source of my favorite sites, and i hope that this may make that easier for others to see mine.

> of course don't steal my code dummy. please learn from it, but this is my site.


## notes

the site's js is compiled typescript. here are my `tsconfig.json` compiler options:
```json
    "target": "ES2021",
    "module": "es6",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "site/assets/js/",
    "strict": true,
    "strictNullChecks": false,
    "skipLibCheck": true      
```
these settings may not be for everyone, but they work for me.


## structure

```
site/
├── assets/
│   ├── css/
│   ├── data/
│   │   └── tutorials/
│   ├── images/
│   ├── js/
│   ├── ts/
│   └── worm.ico
├── index.html
└── pages.html
```
*where pages.html is a stand-in for whatever other pages.

within the `site` folder, i currently have one other folder: `assets`. this holds all non-html files [and even some html files]: `css`, `jsons`, images, `js`/`ts`.

anything outside of `assets` is expected to be accessible [not that the assets folder is remotely secure--in fact i may even give it an `index.html` for credits and browsing].

for future pages with sub-pages, they will be structured like so:

```
site/
├── assets/
├── shrines/
│   ├── index.html
│   └── sonic-the-hedhgehog.html
├── index.html
└── pages.html
```

so that the live addresses may be: `https://wormboy3.neocities.org/shrines/` and `https://wormboy3.neocities.org/shrines/sonic-the-hedgehog`


## other pages

certain pages such as `tips.html` use javascript and address queries to fill in templates.

currently, `tips.html` has four types of pages:
- default index page
- category page
- article page
- error page

where the category and article pages fill in a template, and the default and error pages are fairly static/the same.

i will be using this method [combining `get_data.ts` and `parse_query.ts`] for "fill-in-the-blank" html pages, if i have any future pages this way. a blog, for example, would use this model.


## asset sources

[bowling alley bg](http://www.thebestneoncarpet.com/Bowling-Centers.html) *modified

disk from [momg neocities](https://momg.neocities.org)

chickens from [gifcities](https://gifcities.org)

[highlightjs](https://github.com/highlightjs/highlight.js)

[theme](https://github.com/Yukaii/github-highlightjs-themes) for highlightjs 

i just need to stapm those on my site somewhere.

*i need to source my blinkies!!!! AHHH!

worm.ico, long_worm.png, button.png all original :]
