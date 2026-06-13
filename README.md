# Dilham Hall Retreats — Website Redesign

A design prototype for the new Dilham Hall Retreats website (luxury glamping, camping and canoe hire in the Norfolk Broads).

> **This is a static prototype**, built to lock the look, structure and copy before the site is rebuilt in **WordPress** so it can be edited by the owner. It is not the production codebase.

## View it

- **Live preview (GitHub Pages):** see the repository's Pages URL.
- **Local preview:** from this folder run `python3 -m http.server 8080` then open `http://localhost:8080/`.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `stay.html` | Stay — three-category chooser drilling into pods |
| `pod-damselfly.html`, `pod-dragonfly.html`, `pod-swallowtail.html` | Broad Fen couples pods |
| `tonnage-king-twin.html`, `tonnage-king-single-bunk.html`, `tonnage-king-bunk.html` | Tonnage Bridge pod styles |
| `canoe-hire.html` | Canoe, kayak & paddleboard hire |
| `events.html` | Weddings, corporate & exclusive hire |
| `things-to-do.html` | Things to do & see |
| `about.html` | Our story & sustainability |
| `contact.html` | Contact & find us |

## Structure

```
assets/
  css/styles.css   design tokens (exact brand colours) + all styles
  js/main.js       sticky header, mobile nav, scroll reveal, photo lightbox, booking demo
  images/          photography (placeholders scraped from the current site)
CLAUDE.md          full project brief for the build (brand, colours, booking, requirements)
Dilham-Hall-Retreats-Redesign-Brief.md   discovery audit of the current site
```

## Notes

- Brand colours are taken verbatim from the current site and documented at the top of `styles.css` and in `CLAUDE.md`.
- Photography is placeholder only and will be replaced with the owner's selections.
- The booking and "check dates" panels are visual prototypes; live availability and pricing will come from the existing booking system (SuperControl), kept in sync with Airbnb and Booking.com.
