# Locally served dependencies

These files replace remote stylesheet/font requests; they are served from the website's own origin.

- Geist, Inter and Poppins: downloaded from Google Fonts CSS API and its font URLs on 18 October 2026. The CSS files preserve the supplied font faces, with local URLs. SIL Open Font License texts are included alongside the fonts.
- Font Awesome Free 6.5.0: CSS and webfonts from cdnjs, with the upstream `LICENSE.txt` included. Original paths within `fontawesome/` are preserved.

When updating a dependency, keep its license and check that CSS does not reintroduce remote URLs. No AOS dependency is needed by the current homepage.
