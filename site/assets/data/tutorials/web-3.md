
(hey i wrote this in a more professional tone but this is still a womrboy 3 original, please enjoy i hope it is helpful!)

---

This is a quick run-down of a handful of free web-hosting options. Though I do not discuss security specifically, as that is best to read directly, most (if not all) of these options provide SSL certificates.

I aim to provide a variety of hosts and features, as different sites have different needs. Site hosts are sorted into categories based on where they sit between hosting strictly static sites and hosting servers.

Please note: 
- Written limitations are incomplete. I added what I felt was most relevant to someone seeking free web-hosting for personal or hobbyist purposes.
- "Custom Domain" refers to support for hosting content on a custom domain that *you* purchase and manage, not the provision of a completely custom domain for free.
- This guide is by no means exhaustive.

# Static Only

| **Service**                                                     |    **Custom Domain?**    | **Given URL**                | **Limitations**                                                    |
| --------------------------------------------------------------- | :----------------------: | ---------------------------- | ------------------------------------------------------------------ |
| Neocities<br>([neocities.org](https://neocities.org/))          | With $5/month membership | [account name].neocities.org | 1GB storage; 1 site; certain file types (video/music restricted). |
| GitHub Pages<br>([pages.github.com](https://pages.github.com/)) |           Yes            | [username].github.io         |                                                                    |
| Static.App<br>([static.app](https://static.app/))               |           Yes            | [project].static.domains     | 1 site; 50MB storage.                                              |

### Neocities

Neocities is an open-source site that intends to recreate the magic of Geocities in the 90s-2000s. It is technically a social media, as it provides features to interact with other users' webpages (commenting on their summary page, following) -- but this is done without interfering with the uploaded content. Additionally, social features can be disabled and the site summary page can be hidden.

Neocities is very user- and beginner-friendly: you can drag and drop files to upload to your site, and it has an in-browser editor. Additionally, there is support for managing your site via terminal.

### GitHub Pages

GitHub Pages is static site hosting provided by GitHub. Every account supports one Pages site -- this site is created by making a public repository named "username.github.io" (wherein "username" is your username). The content of this repository will then be publicly accessible as a static site via that URL. 

GitHub Pages, by nature of being a Git repository, provides all the features GitHub offers for all other hosted repositories, and is very developer-friendly. There are tools, such as GitHub Actions, to manage and streamline production.

### Static.App

Static.App provides free and simple static site hosting. Site code may be uploaded by dragging and dropping a .zip file of your site content. Additionally, Static provides an in-browser code editor.

---
# Fusion Static/Server

| **Service**                                           | **Custom Domain?** | **Given URL**        | **Limitations**                                                                     |        **Back-end Language or Environment**         |
| ----------------------------------------------------- | :----------------: | -------------------- | ----------------------------------------------------------------------------------- | :-------------------------------------------------: |
| Cloudflare Pages<br>([pages.dev](https://pages.dev/)) |        Yes         | [slug].pages.dev     | "Soft limit" of 100 projects/account; 20k files/site; max single file size of 25MB. |               JavaScript<br><br><br>                |
| Vercel<br>([vercel.com](https://vercel.com/))<br>     |        Yes         | [project].vercel.app | 200 projects; 100 deployments/day; 100MB static file uploads; 23GB storage.         | Node, Go, Python, Ruby (more via community support) |

### Cloudflare Pages

Cloudflare's "Pages" service could be used wholly as static site hosting -- however, it has a feature called "functions" that allows the developer to write back-end code for specific endpoints. 

Basic usage of this feature would add an endpoint that returns raw text or JSON instead of a static HTML page. More advanced usage of this feature could be creating a back-end API to interface with a Cloudflare-provided database. The "functions" feature is additionally supported by numerous static site builders (AngularJS, MkDocs, Next.js, React, SvelteKit, Vite 3...), which makes Pages a decent option for a site with dynamic features.

### Vercel

Vercel supports a similar framework to Cloudflare Pages' "functions" feature. It is also capable of returning static content to the user, just like Cloudflare Pages. Its server-side logic is also similar, however it supports more Node features.

---
# Server-side

| **Service**                                                 | **Custom Domain?** | **Given URL**                                                                                   | **Limitations**                                                                             |     **Back-end Language**      |
| ----------------------------------------------------------- | :----------------: | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | :----------------------------: |
| Cloudflare Workers<br>([workers.dev](https://workers.dev/)) |        Yes         | [slug].[username].workers.dev                                                                   | 100 projects/account; 30MB size/project; 100k requests/day; questionable websocket support. |     JavaScript<br><br><br>     |
| Leprd<br>([leprd.space](https://leprd.space/))              |    With upgrade    | [slug].leprd.space<br>[slug].meowandsparkle.party<br>[slug].bouvardia.blue<br>[slug].haliya.net | 1GB storage; 10GB/month bandwidth.                                                          |              PHP               |
| Render<br>([render.com](https://render.com/))               |        Yes         | [project name].onrender.com                                                                     | Service sleeps after 15 minutes of inactivity; 750 hours of activity/month.                 | Python, NodeJS, Go, Rust, Ruby |

### Cloudflare Workers

A Cloudflare Worker project, technically speaking, is not a server, however for most hobby projects it will behave exactly like one. Cloudflare provides additional file upload hosting and SQLite databases (R2 and D1, respectively) that can add additional functionality to your projects.

Scripting a Worker is most comparable to writing a routing module. You only need to worry about the logic of handling a request and returning the desired HTML or other content.

Managing Workers can be done in-browser, or via commandline. Using Workers is very similar to managing a Node project in the tools you will use.

### Leprd

> Note:
> At the time of writing this, Leprd.space is not taking new registrations.

Leprd is a service oriented around hobbyist programmers and sites. It provides a PHP server and access to the `.htaccess` file configuration.

### Render

Render also hosts "Web Services" -- web-apps with any server-side code. Simply put, Render's web services hosts servers running Python, Node, Go, Rust, Ruby, and other environments.

Please note the downside to this is that after 15 minutes of inactivity, the site will "spin down", meaning it will become idle. The next time it receives a request, Render will "spin up" the service again, however this may take a minute to process.
