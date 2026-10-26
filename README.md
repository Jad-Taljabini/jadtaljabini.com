# jadtaljabini.com

This repository contains the source of my personal website.
The site is built with a single HTML file (`index.html`) and a profile image (`profile.png`).
It showcases my background as a computer engineering graduate and independent developer and includes animated sections written in vanilla CSS and JavaScript.

## Running locally

No build steps are required. Clone the repository and open `index.html` in your browser:

```bash
$ git clone <repository-url>
$ cd jadtaljabini.com
$ open index.html  # or use your browser's file-open dialog
```

## Features

- Responsive layout using CSS media queries
- Animated hero section with typing effect
- Interactive cards and timeline
- Contact information and call-to-action buttons

Feel free to fork the project and adapt it for your own website.

## Website privacy

`privacy.html` and `terms.html` cover the website itself. App policies remain under `apps/`.
Fonts and icon assets are served locally from `assets/vendor/`, with their licenses included.
Keep these notices aligned with the hosting configuration and actual data-retention practices. These pages alone do not certify GDPR compliance.

## Production URLs and indexing

Cloudflare Pages serves HTML pages at extensionless URLs and redirects their `.html`
variants automatically. Canonical tags use the final HTTPS URLs on jadtaljabini.com.
The `_redirects` file preserves legacy Hostario and Water Alert policy links with
permanent redirects to their current pages under `apps/`.

Keep the root `404.html`: without it, Cloudflare Pages treats this static site as a
single-page application and returns the homepage for nonexistent paths, producing
duplicate pages for search engines. The embedded Hostario demo remains `noindex`.
