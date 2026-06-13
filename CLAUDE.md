# CLAUDE.md — Dilham Hall Retreats Website Redesign

> Project context for AI assistants and developers building the new Dilham Hall Retreats website.
> Source of truth derived from a full discovery audit of the live site (see `Dilham-Hall-Retreats-Redesign-Brief.md`). Audit date: 13 June 2026.

---

## 0. Static prototype (current state of this repo)

A working static front-end prototype is built and is the **visual design reference** for the eventual WordPress theme. Do not treat it as the production codebase; it exists to lock look, layout, and copy.

- **Pages:** `index.html` (home), `stay.html` (search-first booking + full Tonnage Bridge pod comparison), `canoe-hire.html`, `events.html` (with enquiry form), `things-to-do.html` (categorised, image slots for owner to fill), `about.html`, `contact.html`.
- **Assets:** `assets/css/styles.css` (design tokens with the exact brand colours at the top), `assets/js/main.js` (sticky header, mobile nav, scroll reveal, demo booking form), `assets/images/` (photos scraped from the live site as placeholders, to be replaced with owner selects + final SVG logo).
- **Type:** body Nunito Sans (brand continuity, easy WordPress editing), headings **Fraunces** (warm serif, added to lift the premium feel). Loaded via Google Fonts.
- **Booking UX:** the search bar on `stay.html` is a visual prototype only. Real availability + price-after-dates comes from SuperControl when wired in. No price shown until dates are picked (per owner decision).
- **Copy rule applied throughout:** reused/tightened from the live site, human voice, **no em dashes**.

---

## 1. Project Overview

Complete redesign of **dilhamhallretreats.co.uk**. The current site (WordPress + Elementor) is functional but **confusing**: visitors cannot quickly understand the accommodation options, who each is for, what's allowed (dogs/children), how many each sleeps, or how to book canoe hire and events.

**The single overriding goal is CLARITY.** A visitor must instantly understand:
1. What accommodation options exist.
2. The difference between **Broad Fen**, **Tonnage Bridge**, and **Canal Camping**.
3. Which pod is right for them.
4. How many people each accommodation sleeps.
5. Whether dogs are allowed.
6. Whether children are allowed.
7. How to book canoe hire.
8. How to book events and retreats.

Target feel: **premium, modern, simple, easy to navigate**, showcasing the nature, wildlife and waterside setting.

### Key build decisions (locked with owner, June 2026)
- **Platform:** Rebuild on **WordPress** (not headless). The owner (Luke) edits all copy, headings, and images himself in the familiar block editor, so editability for a non-technical owner is a hard requirement. Replace the current Elementor build with a clean, fast custom/block theme that keeps the existing structure and earthy design DNA but fixes clarity, cards, and booking.
- **Booking:** Keep a proven channel-syncing engine (SuperControl) behind a custom Airbnb-style front-end; unify all overnight stays into one engine; surface canoe hire in the same site. See Section 12.
- **Copy:** Reuse and tighten the existing website copy rather than rewriting from scratch; keep the warm, personal voice. **No em dashes in any guest-facing copy** (owner wants it to read human). Use commas, full stops, or brackets instead.

---

## 2. Business Overview

- **Who:** Family-run farm-and-tourism business in **Dilham, North Walsham, Norfolk**. Owned by the **Paterson family**, farming the land since **1949**; run by **Luke Paterson** (5th-generation farmer) and wife **Louise**.
- **Sustainability (a core USP):** The farm is independently assessed as **carbon-negative**; generates enough green energy annually for **~1,250 homes** via anaerobic digestion (maize crop → biogas → organic fertiliser, circular agriculture).
- **Credibility:** **Winner of Channel 4's "Four in a Bed."** Reviews on **Trustpilot**.
- **Mission:** *"We want to provide space. A chance to reconnect. A retreat that creates memories to last a lifetime."*
- **Offerings:** Three accommodation brands + canoe/SUP hire + exclusive venue/event hire, all on one estate including a **95-acre SSSI nature reserve** and a private canal stretch.

**Locations / postcodes:**
- Glamping (Broad Fen & Tonnage Bridge) + Canoe Hire: **Dilham, North Walsham, NR28 9PW**
- Canal Camping & Bell Tents: **Dilham, North Walsham, NR28 9PL** *(note the different postcode)*

**Contacts (currently fragmented by department — consider unifying):**
| Purpose | Phone | Email |
|---|---|---|
| Main / glamping | 01692 513889 | hello@dilhamhall.co.uk |
| Canal Camping | 01692 660274 | bookings@canalcamping.co.uk |
| Canoe hire | 07810 616920 | paddle@dilhamhall.co.uk |

**Social:** Facebook `Dilham.Hall.Retreats` · Instagram `dilhamhallretreats` · Trustpilot.

---

## 3. Accommodation Breakdown

### 3.1 Broad Fen Retreats — Couples Glamping
- **Pods (3):** Damselfly, Dragonfly, Swallowtail.
- **Sleeps 2** (king bed). **Adults-only (no under-18s). NO dogs.**
- **Wood-fired, chemical-free private hot tub.** Full kitchen, en-suite shower/WC, central heating, Smart TV, Wi-Fi, fire pit with grill, 1 free wood bag (extra £6).
- Set in a 95-acre SSSI (woodland & fen). **Min 2 nights.** Extras: fire-lighting tuition £12, canoe hire, extra wood.
- Positioning: romance, seclusion, nature immersion.

### 3.2 Tonnage Bridge Retreats — Luxury Waterside Glamping  ⚠️ CLARITY PRIORITY
**10 pods on a private canal, in 3 layouts. Family-friendly + dog-friendly (1 dog, £20/stay). Every pod has a private wood-fired hot tub. Min 2 nights (3 in peak).**

| Pod | Layout | Sleeps | Beds | Format |
|---|---|---|---|---|
| Heron | 1 | 4 | King + twin (2 singles) | 2 separate rooms |
| Coot | 1 | 4 | King + twin | 2 rooms |
| Harvest Mouse | 1 | 4 | King + twin | 2 rooms |
| Hedgehog | 2 | 5 | King + single + bunk | 1 bedroom + 3 sleep spaces |
| Bittern | 2 | 5 | King + single + bunk | 1 bedroom |
| Water Vole | 3 | 4 | King + bunk | Open-plan |
| Moor Hen | 3 | 4 | King + bunk | Open-plan |
| Shrew | 3 | 4 | King + bunk | Open-plan |
| Kingfisher | 3 | 4 | King + bunk | Open-plan |
| Otter | 3 | 4 | King + bunk | Open-plan |

- **Layout 1 (King + Twin, sleeps 4):** two separate rooms — best for families wanting a separate kids' room.
- **Layout 2 (King + Single + Bunk, sleeps 5):** for larger families of 5.
- **Layout 3 (King + Bunk, sleeps 4):** open-plan; couple + dog, or family of 4.
- Amenities: full kitchen, shower room/WC, central heating, Smart TV, Wi-Fi, picnic bench, fire pit with grill. On-canal with private canoe/SUP launch + 3.5 km circular walk. Pod ≈ 4.2 × 7.8 × 3.3 m.

### 3.3 Canal Camping & Bell Tents — Family & dog friendly
- Bring your own tent/trailer tent (spacious, non-demarcated pitches), **or hire a family bell tent** (6 m diameter, 28.3 m², 3 m centre height; includes fire pit, cooking utensils, table, chairs, full bedding).
- **Dogs welcome (£5 one-off per dog).** Family-friendly. **No hot tubs.**
- Shared facilities: toilets, hot showers, washing-up sinks, drinking water, recycling/waste, campfire brazier (wood for sale).
- Water: self-launch **£5 donation/vessel**; canoe **hire £50/day**.
- **Min 3 nights (2 off-peak).** Booked via separate site **canalcamping.co.uk**.

### 3.4 Differentiator matrix (build this as a homepage / Stay-page component)
| | Broad Fen | Tonnage Bridge | Canal Camping |
|---|---|---|---|
| Sleeps | 2 | 4–5 | Flexible/family |
| Children | ❌ | ✅ | ✅ |
| Dogs | ❌ | ✅ £20/stay | ✅ £5/stay |
| Hot tub | ✅ | ✅ | ❌ |
| Kitchen/en-suite | ✅ | ✅ | Shared |
| On the canal | Near | ✅ | ✅ |
| Min stay | 2n | 2n (3 peak) | 3n (2 off-peak) |

> **Resolved with owner (June 2026).** Source of truth is the main domain dilhamhallretreats.co.uk. Dog fees are per product and both correct: **Tonnage Bridge £20/stay, Canal Camping £5/stay, Broad Fen no dogs.** Canoe pricing is taken from the **Canoe Hire page only** (see Section 13); the camping page's £50/day and £5 self-launch figures are not used.

> **Pricing is dynamic, not fixed.** Per-pod rates vary by season, length of stay, and day of week, and are managed by the owner in SuperControl (synced with Airbnb / Booking.com). The website does **not** hardcode prices and does **not** show a "from" price on cards. **No price is shown until the guest selects their dates**, at which point the exact total for those nights appears (DECIDED with owner, June 2026). The owner does not need to supply a price list.

---

## 4. Brand Guidelines

**Personality:** natural, calm, premium-but-unpretentious, eco-conscious, family, adventurous-when-on-the-water. Norfolk Broads sense of place.

**Core themes:** Nature · Wildlife · Waterside / Norfolk Broads · Luxury · Relaxation/reconnection · **Sustainability (carbon-negative)** · Adventure · Family heritage.

**USPs to lead with:**
- "**Stay carbon-negative**" — genuine, ownable.
- "**Paddle from your pod**" — waterside + on-site canoe/SUP hire.
- **Four in a Bed winner** + Trustpilot reviews (persistent trust signals).
- 95-acre SSSI nature reserve; wood-fired hot tubs; three experiences for three audiences.

**Voice:** warm, welcoming, plain-spoken; lead every accommodation with *who it's for* and the key yes/no facts (dogs, kids, sleeps).

---

## 5. Colour Palette

> **CANONICAL — use these exact values.** Pulled directly from the live site's Elementor global colour kit (`--e-global-color-*`) plus the custom theme CSS. These are the verified brand colours. **Use the HEX values verbatim.** Do not substitute or "tidy" them.

| Role | HEX | RGB | HSL | Notes |
|---|---|---|---|---|
| **Primary — sage green** | `#677B73` | rgb(103, 123, 115) | hsl(156, 9%, 44%) | `--e-global-color-primary`. Buttons, primary fills. |
| **Deep sage (dark green)** | `#4D5C56` | rgb(77, 92, 86) | hsl(156, 9%, 33%) | Custom global. Hovers, dark text on light, headings. |
| **Deep forest (darkest)** | `#062E28` | rgb(6, 46, 40) | hsl(171, 77%, 10%) | Theme CSS. Dark sections / footer / deep heading text. |
| **Slate (cool grey-blue)** | `#8A9B9F` | rgb(138, 155, 159) | hsl(191, 10%, 58%) | Custom global. Muted secondary / captions. |
| **Warm sand (warm accent)** | `#D6C2B7` | rgb(214, 194, 183) | hsl(21, 27%, 78%) | Custom global. The warmth in the palette — use for accents / warm section backgrounds. |
| **Pale grey-green (light bg)** | `#D8DCDB` | rgb(216, 220, 219) | hsl(165, 5%, 85%) | Custom global. Light section backgrounds. |
| **Text near-black** | `#202020` | rgb(32, 32, 32) | hsl(0, 0%, 13%) | `--e-global-color-text`. Body copy. |
| **Border grey** | `#CECECE` | rgb(206, 206, 206) | hsl(0, 0%, 81%) | Dividers / borders. |
| **White** | `#FFFFFF` | rgb(255, 255, 255) | hsl(0, 0%, 100%) | Page background. |

**⚠️ DO NOT use these — they are stock framework defaults that have polluted the current CSS, not brand colours:**
- `#61CE70` (Elementor default "accent" bright green) — **this is the classic mistake; the real accent is the warm sand `#D6C2B7`, not a bright green.**
- `#54595F` (Elementor default "secondary" grey).
- Gutenberg block-palette defaults: `#FF6900`, `#FCB900`, `#9B51E0`, `#7BDCB5`, `#0693E3`, `#8ED1FC`, `#CF2E2E`, `#F78DA7`, `#ABB8C3`.
- Foundation defaults: `#1779BA`, `#14679E` (blue), `#FBC2C4`, `#F6E7EB` (pink).

**CTA colour:** there is no dedicated CTA colour in the current site. Recommended: deepen the primary to **`#4D5C56`** (or the deeper forest `#062E28`) for solid CTAs so text passes WCAG AA on the button, and reserve the warm sand `#D6C2B7` for secondary/warm accents. Confirm final CTA colour with owner before launch.

---

## 6. Typography

- **Current (canonical, from Elementor global typography):** everything is **Nunito Sans** (Google). Global weights in use: primary 600, accent 500, secondary 400, text/body 400; headings go up to 900. Decorative accent font: **Indie Flower** (handwritten).
- **Recommended for redesign:** keep a clean, warm sans for body (e.g. Nunito Sans / Inter / Mukta) and introduce a more premium display/serif for headings to lift the "luxury" feel (e.g. a refined serif such as Fraunces, Canela-style, or similar). Replace Indie Flower with a single tasteful accent use, if any.
- Maintain a clear hierarchy: large hero H1, distinct H2 section headers, readable 16–18px body, generous line-height.

---

## 7. Website Structure (target sitemap)

```
Home
Stay  (overview + differentiator comparison table)
 ├─ Broad Fen Retreats (Couples · adults-only · no dogs)
 │   ├─ Damselfly · Dragonfly · Swallowtail
 ├─ Tonnage Bridge Retreats (Waterside · family & dog friendly)
 │   ├─ Layout 1 King+Twin (Sleeps 4) → Heron, Coot, Harvest Mouse
 │   ├─ Layout 2 King+Single+Bunk (Sleeps 5) → Hedgehog, Bittern
 │   └─ Layout 3 King+Bunk (Sleeps 4) → Water Vole, Moor Hen, Shrew, Kingfisher, Otter
 └─ Canal Camping & Bell Tents (family & dog friendly)
Canoe Hire (Canoes · Kayaks · SUPs · Self-Launch · Prices & Book)
Events (Corporate Retreats & Team-Building · Weddings · Exclusive Hire · Private Events)
Things To Do (filterable: Water · Wildlife · Walks · Family · Heritage · Food & Drink)
About (Our Story · Sustainability · Four in a Bed · Reviews)
Find Us (map · directions · what3words · postcodes per site)
Contact
Book Now (unified availability + canoe add-on)
```

**IA rules:** brand names in nav; decision-first cards (sleeps / dogs / kids / hot tub / from £); one comparison table; promote Canoe Hire & Events to primary nav.

---

## 8. User Journeys (design for these)

1. **Couple seeking a romantic break** → Home → Stay → Broad Fen → pick pod → book. Must immediately see "adults-only, hot tub, sleeps 2".
2. **Family with kids + dog** → Stay → Tonnage Bridge → comparison table → choose layout by group size → book + add canoe session.
3. **Group of campers** → Stay → Canal Camping → bell tent vs own tent → book.
4. **Day-visitor / guest wanting to paddle** → Canoe Hire → choose canoe/kayak/SUP + session time → book online (no phone call needed).
5. **Corporate / wedding enquirer** → Events → relevant sub-page → enquiry form with date + group size.
6. **Researcher** → Things To Do → filter by interest → see what's near, then book a stay.

---

## 9. SEO Notes

- Current home title: *Luxury Glamping Norfolk | Dog Friendly Glamping | Dilham Hall Retreats*; Rank Math in use.
- **Fix:** meta-description claims "dog-friendly" site-wide, but Broad Fen is **not** — set page-level intent correctly.
- **Add schema:** `LodgingBusiness`/`Campground`, `Product`+`Offer` per pod/tent, `Review`/`AggregateRating` (Trustpilot), `FAQPage`, `LocalBusiness` with the two postcodes.
- Convert the homepage "FAQ" link list into **real answered FAQs**.
- Target clusters: "luxury glamping Norfolk", "Norfolk Broads canoe hire", "dog friendly glamping Norfolk", "adults only glamping Norfolk", "things to do Norfolk Broads", "Norfolk wedding venue exclusive hire".
- Preserve existing URL equity where sensible; 301-map old pod/layout URLs to the new structure.

---

## 10. Design Requirements

- Premium, modern, airy; large nature/wildlife/waterside photography; generous whitespace.
- **Decision-first accommodation cards** showing: name · who it's for · sleeps · dogs (Y/N) · kids (Y/N) · hot tub · CTA. **No price on cards**; price is revealed only after the guest picks dates.
- A prominent **comparison table/component** on the Stay landing page.
- One consistent, accessible **CTA/accent colour**; standardised button system; replace vague "Find Out More" labels.
- Fully responsive / mobile-first (current build is image-heavy); fast LCP on hero imagery.
- WCAG 2.2 AA: colour contrast, focus states, alt text, keyboard nav.
- Consistent iconography for amenities (hot tub, dog, kids, kitchen, Wi-Fi, fire pit, canoe).

---

## 11. Functional Requirements

- CMS-managed content for pods, pricing, policies, attractions, events.
- Working **map + directions** (fix current broken widget); what3words; per-site postcodes.
- Real **enquiry forms** (general + events) with spam protection — not raw `mailto:` links.
- Populate **reviews** (Trustpilot feed) and an **FAQ** with structured data.
- Newsletter signup (currently Mailchimp) retained.
- Analytics (GTM present) + conversion tracking on bookings/enquiries.
- Cookie/consent compliance; keep Terms & Privacy.

---

## 12. Booking System Requirements

> **DECIDED (with owner, June 2026).** The pods are listed on Airbnb and Booking.com, so availability must stay synced. Strategy: **keep a proven channel-syncing engine as the backend, drive a custom Airbnb-style front-end from its availability data.** Unify all overnight stays into one engine. Surface canoe hire in the same site as an activity and a stay add-on.

**Current state (fix this):** three disconnected systems —
- **SuperControl** (`secure.supercontrol.co.uk` embed) + **Bedful** referenced — glamping.
- **Checkfront** — canoe hire.
- **canalcamping.co.uk** (separate site) — camping.
- `/booking` is **broken** (placeholder calendar).

**Target booking UX (the "Airbnb feel"):**
1. Search-first: pick **dates + number of guests + bringing a dog?** No month grid up front, just a compact date picker and guest counter.
2. Availability is the filter: show **only the pods that are free** for those dates, as decision-first cards (photo, sleeps, dog/child badges, hot tub, price for those exact nights).
3. Tap a pod, add extras (canoe session, firewood, dog), pay. Done.

**Architecture:**
- **Keep SuperControl** (or equivalent) as the source of truth for availability, channel sync (Airbnb / Booking.com), and payments. **Do not** rely on its default embedded calendar widget for the public UI.
- **Build a custom front-end** fed by the engine's availability data/API so the visitor never sees a raw calendar. NB: this is a real build item, not a CSS reskin.
- **Consolidate all overnight stays into one engine**: pods (Tonnage Bridge), Broad Fen, bell tents, and camping pitches all in the same accommodation engine. **Retire the separate canalcamping.co.uk site** rather than just rebranding it.
- Filters honour the key facts: sleeps / dogs / children / dates / hot tub.
- **Add-ons at checkout** (canoe/SUP session, extra wood, dog fee) where the engine supports extras.
- Clear per-pod pricing, min-stay rules (incl. peak-season variants), and policies shown before payment.
- Mobile-optimised checkout; confirmation emails; deposit handling.

**Known limit (accepted):** a single combined basket spanning two *different* engines (a stay in the accommodation engine + a standalone canoe slot in the activity engine, in one transaction) is custom glue and is **not** day-one scope. The seamless-enough version: one site, one look, canoe offered as a stay add-on plus a standalone canoe booking one tap away.

---

## 13. Canoe Hire Requirements

Make canoe hire a **headline feature** (it's already the brand's OG share image).

- **Products & pricing (LOCKED, from the Canoe Hire page):**
  | Product | Early Bird 09:30–11:30 | Afternoon 12:00–18:00 |
  |---|---|---|
  | 3-Man Canoe | £26.00 | £42.50 |
  | Double Kayak | £26.00 | £42.50 |
  | Single Kayak | £21.50 | £32.00 |
  | SUP | £21.50 | £32.00 |
  | Self-launch (own vessel) | £10/vessel/day | £10/vessel/day |
  *(These Canoe Hire page figures are the source of truth. The camping page's £50/day hire and £5 self-launch donation are NOT used.)*
- Included: buoyancy aids, paddles, safety demo. Dry bags extra. Self-launch lanyard per boat.
- **Online booking with real-time availability** (remove "call for same-day"); product comparison (canoe vs kayak vs SUP); route map; what-to-bring; age/safety guidance.
- Cross-sell on every accommodation page ("Add paddling to your stay").
- Corporate/team-building paddling for **up to 100 people** — link to Events.

---

## 14. Event Marketing Requirements

Replace the near-empty `/events/` page with a full **Events** section:
- Sub-pages: **Corporate Retreats & Team-Building · Weddings · Exclusive Hire · Private Events.**
- Each: capacity, what's included, sample packages / price-from, gallery, **dedicated enquiry form** (date, group size, event type), downloadable brochure.
- Lead with: exclusive use of a **95-acre carbon-negative estate**, on-site accommodation for delegates/wedding parties, waterside team-building (paddling up to 100), and the sustainability + "Four in a Bed" story.
- Add case studies / past-event testimonials once available.

---

## 15. Future Development Considerations

- **Unify booking onto one platform** long-term (single basket across stay + canoe + extras).
- Gift vouchers / e-gift cards.
- Seasonal availability & dynamic pricing surfaced on cards ("from £X / 2 nights").
- Guest account / manage-booking area; pre-arrival upsells (firewood, breakfast hampers, canoe slots).
- Blog / journal for SEO (wildlife seasons, Broads guides, sustainability story).
- Multi-language not required (UK-focused), but ensure `en-GB`.
- Integrate Canal Camping fully under the main brand/domain to retire the separate site.
- Performance budget for image-heavy pages; consider headless/Next.js or a modern CMS (e.g. Astro/Next + a headless CMS) over the current Elementor stack.
- Accessibility & Core Web Vitals monitoring post-launch.

---

## Quick Reference — "Who can stay where?"

| Question | Broad Fen | Tonnage Bridge | Canal Camping |
|---|---|---|---|
| Couples only? | **Yes (adults-only)** | No | No |
| Children allowed? | **No** | **Yes** | **Yes** |
| Dogs allowed? | **No** | **Yes (£20/stay)** | **Yes (£5/stay)** |
| Sleeps | 2 | 4–5 | Flexible |
| Hot tub? | **Yes** | **Yes** | No |
