# Dilham Hall Retreats — Website Redesign Discovery Brief

**Prepared for:** Dilham Hall Retreats redesign project
**Current site audited:** https://www.dilhamhallretreats.co.uk
**Audit date:** 13 June 2026
**Platform (current):** WordPress + Elementor Pro + custom theme (`dilhamhallretreats`)

---

## 0. Executive Summary

Dilham Hall Retreats is a family-run, carbon-negative farm-and-tourism business in Dilham, Norfolk, offering three distinct accommodation experiences plus on-site canoe/SUP hire and exclusive venue hire. The business is strong; **the website is the bottleneck.**

The single biggest problem is **clarity**. Three separately-branded products (Broad Fen, Tonnage Bridge, Canal Camping) are presented under confusing, generic navigation labels ("Couples Glamping", "Luxury Waterside Glamping", "Camping & Bell Tents") that bury the brand names and the most important decision-making facts:

- **Who can stay** (adults-only vs family) — currently hidden inside body copy.
- **Whether dogs are allowed** — varies by location and is inconsistently stated.
- **How many each pod sleeps** — exists but is fragmented across "Layout 1/2/3" pages with no comparison view.
- **Which of the 10 Tonnage Bridge pods is which layout** — effectively undiscoverable.

Compounding this, the site runs **three different booking systems** that don't talk to each other (SuperControl/Bedful for glamping, Checkfront for canoe hire, and a *separate website* — canalcamping.co.uk — for camping), plus a **broken booking page** ("booking calendar will appear here" placeholder) and an **empty testimonials page**.

The redesign should keep the genuine assets (the nature/wildlife/waterside story, the carbon-negative credentials, the "Four in a Bed" win, the strong earthy palette) and rebuild the information architecture around **instant clarity**: who it's for, who can come, what it costs, and a frictionless path to book.

---

## 1. Full Site Audit

### 1.1 Site Structure & Navigation Hierarchy

**Primary navigation (current):**

| Nav item | Submenu |
|---|---|
| Home | — |
| Accommodation | Luxury Waterside Glamping (→ King+Twin / King+Single+Bunk / King+Bunk) · Couples Glamping · Camping & Bell Tents |
| Canoe Hire | — |
| Our Story | — |
| Location | Find Dilham Hall Retreats · Things To Do & See · Food & Drink Nearby |
| Testimonials | — |
| Contact Us | — |
| **Book Now** (CTA button) | — |

**Full page inventory (discovered URLs):**

| URL | Page | Status / notes |
|---|---|---|
| `/` | Home | OK |
| `/luxury-waterside-glamping/` | Tonnage Bridge overview | OK |
| `/luxury-waterside-glamping/king-twin/` | Layout 1 (Sleeps 4) | OK |
| `/luxury-waterside-glamping/king-single-bunk/` | Layout 2 (Sleeps 5) | OK |
| `/luxury-waterside-glamping/king-bunk/` | Layout 3 (Sleeps 4) | OK |
| `/couples-glamping/` | Broad Fen overview | OK |
| `/camping-bell-tents/` | Canal Camping | OK (booking handed off to external site) |
| `/canoe-hire/` | Canoe & SUP hire | OK (booking via Checkfront) |
| `/events/` | Events / exclusive hire | **Thin / placeholder** |
| `/our-story/` | About | OK |
| `/find-us/` | Location | **Thin** — address only, no directions/map |
| `/things-to-do-see/` | Local attractions | OK (content-rich) |
| `/food-and-drink/` | Food & drink nearby | OK |
| `/testimonial/` | Testimonials | **Empty** — no reviews rendered |
| `/contact-us/` | Contact | OK (map widget not rendering) |
| `/booking` | Booking | **Broken** — "booking calendar will appear here" placeholder |
| `/terms-conditions/` | Terms | OK |
| `/privacy-policy/` | Privacy | OK |

### 1.2 Existing User Journeys

- **Discovery → confusion.** A visitor landing on Home meets generic category labels. To work out "can I bring my dog and my kids?" they must open multiple pages and read body copy, because the differentiators aren't surfaced.
- **The brand names are hidden.** "Broad Fen Retreats" and "Tonnage Bridge Retreats" appear in copy and on the Our Story page but **not in the navigation**, so the visitor never builds a mental model of three distinct places.
- **Tonnage Bridge layouts are opaque.** The three layouts are buried as sub-pages titled by bed configuration ("King Bed + Twin"), with no single comparison and no clear mapping from the 10 named pods to their layouts.

### 1.3 Booking Journeys (current — fragmented across 3 systems)

| Product | Booking system | Entry points |
|---|---|---|
| Tonnage Bridge & Broad Fen glamping | **SuperControl** (`secure.supercontrol.co.uk` embed) — also references **Bedful** (`bedful.com`) | `/booking` (currently broken), "Book Now" buttons |
| Canoe / kayak / SUP hire | **Checkfront** | `/canoe-hire/`, phone 07810 616920 |
| Canal Camping & Bell Tents | **Separate website** `canalcamping.co.uk` | "Book Now" on camping page, `bookings@canalcamping.co.uk`, 01692 660274 |

This is a **critical UX and brand problem**: three engines, three brands, no unified availability or basket, and one of the entry points (`/booking`) is non-functional.

### 1.4 Contact Methods (fragmented by department)

| Purpose | Phone | Email |
|---|---|---|
| Main / glamping | 01692 513889 | hello@dilhamhall.co.uk |
| Canal Camping | 01692 660274 | bookings@canalcamping.co.uk |
| Canoe hire | 07810 616920 | paddle@dilhamhall.co.uk |

- **Address:** Dilham, North Walsham, Norfolk — **NR28 9PW** (glamping & canoe); **NR28 9PL** (Canal Camping — note the different postcode).
- **Social:** Facebook (`Dilham.Hall.Retreats`), Instagram (`dilhamhallretreats`), Trustpilot.
- Contact page map widget is **not rendering** ("Your widget will appear here").

### 1.5 Calls-to-Action

- Primary: **"Book Now"** (header, repeated). **"Enquire"**. Numerous **"Find Out More"** buttons.
- **Weaknesses:** "Book Now" routes to a broken page / inconsistent destinations; no urgency, scarcity, price-from, or trust signals attached to CTAs; "Find Out More" is vague and over-used.

### 1.6 SEO Structure

- **Home `<title>`:** *Luxury Glamping Norfolk | Dog Friendly Glamping | Dilham Hall Retreats*
- **Meta description:** *"Experience luxury glamping in Norfolk at Dilham Hall Retreats. Enjoy a serene, dog-friendly escape with top-notch amenities, perfect for pets and nature lovers alike."*
- **OG image:** `Canoeing.jpg`; locale `en_GB`; type `website`.
- **SEO plugin:** Rank Math (`rankmath.com` referenced).
- **Schema present:** WebSite, WebPage, Place, PostalAddress, Person, SearchAction, ImageObject, Article.
- **H1 (home):** "Escape to Nature with Luxury Glamping in Norfolk."
- **Gaps:** No `LodgingBusiness`/`Campground`/`Product` + `Offer` schema for accommodation; the meta description claims "dog-friendly" but Broad Fen is explicitly **not** dog-friendly — risk of mismatched search intent; thin pages (events, find-us, testimonials) dilute topical authority.

### 1.7 Internal Linking

- Footer acts as a secondary sitemap (links to all main pages + terms/privacy).
- The homepage FAQ section is effectively **a list of page links rather than answered questions** — a missed opportunity for both UX and SEO (FAQ schema).
- Cross-sell linking is weak: canoe hire, events and "things to do" are not pulled into the accommodation journeys.

---

## 2. Accommodation Analysis

There are **three distinct accommodation brands** at one estate. Making this trio instantly legible is the #1 goal of the redesign.

### 2.1 Broad Fen Retreats — *Couples Glamping* (Adults-only)

| Attribute | Detail |
|---|---|
| **Pods** | **Damselfly, Dragonfly, Swallowtail** (3 pods) |
| **Sleeps** | 2 (couples only) — king-size bed |
| **Adults only?** | **Yes — no under-18s permitted** |
| **Dogs?** | **No** (dogs go to Tonnage Bridge instead) |
| **Hot tub?** | **Yes** — wood-fired, chemical-free, private |
| **Setting** | 95-acre Site of Special Scientific Interest (SSSI); woodland & fen meadowland; exclusive guest access |
| **Amenities** | Well-equipped kitchen (appliances, cookware, complimentary provisions); en-suite shower & toilet; central heating; Smart TV; Wi-Fi; fire pit with grill; 1 complimentary wood bag (extra bags £6); robotic mowers for privacy |
| **Extras** | Fire-lighting instruction £12; canoe hire; additional wood |
| **Min stay** | 2 nights |
| **Postcode** | NR28 9PW |
| **Positioning** | Romance, seclusion, nature immersion — "the ultimate in comfort" |

### 2.2 Tonnage Bridge Retreats — *Luxury Waterside Glamping* (Family & dog friendly) — **PRIORITY FOR CLARITY**

10 pods on a private stretch of canal, in **three layouts**. The current site never shows these side-by-side — the redesign must.

#### Pod Comparison Table — Tonnage Bridge (all 10 pods)

| Pod name | Layout | Sleeps | Bed configuration | Bedrooms / format | Dogs | Hot tub |
|---|---|---|---|---|---|---|
| **Heron** | Layout 1 | 4 | King + 2 single (twin) | 2 rooms (king bedroom + twin room) | 1 dog | ✅ wood-fired |
| **Coot** | Layout 1 | 4 | King + 2 single (twin) | 2 rooms | 1 dog | ✅ |
| **Harvest Mouse** | Layout 1 | 4 | King + 2 single (twin) | 2 rooms | 1 dog | ✅ |
| **Hedgehog** | Layout 2 | 5 | King + single + bunk | 1 bedroom (3 extra sleep spaces) | 1 dog | ✅ |
| **Bittern** | Layout 2 | 5 | King + single + bunk | 1 bedroom | 1 dog | ✅ |
| **Water Vole** | Layout 3 | 4 | King + bunk (2 single) | Open-plan sleeping area | 1 dog | ✅ |
| **Moor Hen** | Layout 3 | 4 | King + bunk | Open-plan | 1 dog | ✅ |
| **Shrew** | Layout 3 | 4 | King + bunk | Open-plan | 1 dog | ✅ |
| **Kingfisher** | Layout 3 | 4 | King + bunk | Open-plan | 1 dog | ✅ |
| **Otter** | Layout 3 | 4 | King + bunk | Open-plan | 1 dog | ✅ |

**Layout summary (the key distinction visitors keep missing):**

| Layout | Marketed as | Sleeps | Beds | Format | Pods | Best for |
|---|---|---|---|---|---|---|
| **Layout 1** | King Bed + Twin | **4** | King + 2 singles | **Two separate rooms** (most privacy) | Heron, Coot, Harvest Mouse | Families wanting a separate kids' room |
| **Layout 2** | King + Single + Bunk | **5** | King + single + bunk | One bedroom, 3 extra sleep spaces | Hedgehog, Bittern | **Larger families of 5** |
| **Layout 3** | King + Bunk | **4** | King + bunk (2 singles) | Open-plan | Water Vole, Moor Hen, Shrew, Kingfisher, Otter | Couples + dog, or family of 4 |

**Shared Tonnage Bridge facts:**
- **Family-friendly** (children welcome) and **dog-friendly** — *one* well-behaved dog, **£20 per stay** (the layout pages quote £20; the camping page's £5 dog fee is a *different* product — do not confuse).
- **All pods have a private wood-fired hot tub.**
- Pod dimensions ~4.2 m W × 7.8 m D × 3.3 m H (Layout 1).
- Full kitchen (kettle, fridge/freezer, toaster, microwave, oven & grill, two-ring hob, cookware, crockery, cutlery, glasses); Layout 3 adds complimentary tea/coffee/UHT milk/sugar/seasonings + mugs & keychains.
- Shower room & toilet; central heating; Smart TV; Wi-Fi; picnic bench; fire pit with grill.
- **On the canal** with private canoe/SUP launch access and a 3.5 km circular walking route.
- **Min stay:** 2 nights (3 nights in peak season). Postcode NR28 9PW.

### 2.3 Canal Camping & Bell Tents (Family & dog friendly)

| Attribute | Detail |
|---|---|
| **Pitch types** | Bring your own tent or trailer tent on spacious, non-demarcated pitches |
| **Bell tents** | Family-size hire tents — 6 m diameter, 28.3 m² floor, 3 m centre height; include fire pit, cooking utensils, table, chairs, full bedding |
| **Sleeps** | Family-size (bell tent); own-tent capacity flexible |
| **Dogs?** | **Yes** — well-behaved, on-lead; **£5 one-off fee per dog** for the stay |
| **Family-friendly?** | **Yes** |
| **Facilities** | Maintained toilets; hot-water showers; outdoor washing-up sinks; recycling & general waste bins; on-tap drinking water; campfire brazier (wood for sale) |
| **Water** | Canoe/SUP **self-launch £5 donation per vessel**; canoe **hire £50/day** |
| **Min stay** | 3 nights standard; 2 nights off-peak |
| **Booking** | **Separate site** — canalcamping.co.uk · bookings@canalcamping.co.uk · 01692 660274 |
| **Postcode** | **NR28 9PL** (differs from glamping) |
| **Positioning** | "A perfect blend of nature and comfort"; sustainability / carbon-negative |

### 2.4 At-a-glance differentiator matrix (the table the new homepage needs)

| | **Broad Fen** (Couples) | **Tonnage Bridge** (Waterside) | **Canal Camping** |
|---|---|---|---|
| Style | Luxury pods | Luxury waterside pods | Camping & bell tents |
| Sleeps | 2 | 4–5 | Flexible / family |
| Children | ❌ Adults-only | ✅ | ✅ |
| Dogs | ❌ | ✅ (£20/stay) | ✅ (£5/stay) |
| Hot tub | ✅ | ✅ | ❌ |
| Kitchen/en-suite | ✅ | ✅ | Shared facilities |
| On the canal | Near | ✅ on canal | ✅ on canal |
| Min stay | 2 nights | 2 (3 peak) | 3 (2 off-peak) |
| Booking | SuperControl | SuperControl | canalcamping.co.uk |

---

## 3. Canoe Hire Audit

### 3.1 Products & Full Pricing

Booked via **Checkfront**. Two time sessions per day.

| Product | Early Bird (09:30–11:30) | Afternoon (12:00–18:00) |
|---|---|---|
| 3-Man Canoe | £26.00 | £42.50 |
| Double Kayak | £26.00 | £42.50 |
| Single Kayak | £21.50 | £32.00 |
| SUP (paddleboard) | £21.50 | £32.00 |
| Self-launch (own vessel) | £10.00 / vessel / day | £10.00 / vessel / day |

*(Resolved with owner: the figures above, from the Canoe Hire page, are the source of truth. The camping page's £50/day hire and £5 self-launch donation are not used.)*

- **Included:** buoyancy aids, paddles (height-adjustable), safety demonstration. **Dry bags** extra.
- **Self-launch:** collect a lanyard per boat.
- **Location:** Oak Road, Dilham, NR28 9PW — free parking, toilets, drinking water on site.
- **Safety:** buoyancy aids provided; children & pets supervised; keep clear of robotic mowers.
- **Corporate:** team-building sessions for groups **up to 100**.

### 3.2 Booking Experience — issues
- Canoe hire is on a **third, separate system** (Checkfront), isolated from accommodation booking — guests can't add a canoe session to a stay in one flow.
- Same-day availability requires a **phone call** (07810 616920) — friction.
- Two pricing models (canoe-hire page vs camping page) create confusion.

### 3.3 Recommendations
- Make canoe hire a **headline feature** with its own strong landing page and gallery (it's already the OG share image — the brand leans on it).
- **Integrate booking**: ideally one engine where an accommodation guest can add canoe/SUP sessions as an extra at checkout; at minimum, a unified availability calendar and consistent pricing.
- Add clear visuals: product comparison (canoe vs kayak vs SUP), session times, route map, "what to bring", age/safety guidance, and a self-launch explainer.
- Surface canoe hire as a cross-sell on every accommodation page ("Add paddling to your stay").

---

## 4. Corporate Events & Venue Hire

### 4.1 Current state
- `/events/` is a near-empty placeholder: a single line — *"Whether you are looking for a wedding venue, a corporate retreat or private hire, we are more than happy to discuss your requirements in more detail"* — and an email (hello@dilhamhall.co.uk).
- Offerings named: **weddings, corporate retreats, private hire** (exclusive use of the estate). Canoe page adds **team-building for up to 100 people**.

### 4.2 Missing information
Pricing/packages, capacity numbers, what's included, venue/space details, accommodation-for-guests options, catering, layouts, photos, past-event case studies, testimonials, booking/deposit process, available dates, event-specific terms.

### 4.3 Recommendations — dedicated Events section
- Sub-pages: **Corporate Retreats & Team-Building · Weddings · Exclusive Hire · Private Events.**
- Each with: capacity, what's included, sample packages/price-from, a gallery, and a dedicated **enquiry form** (not just an email link) with date, group size, event type.
- Lead with the unique sell: **exclusive use of a 95-acre carbon-negative estate**, waterside team-building (paddling for up to 100), on-site luxury accommodation for delegates/wedding parties, and the "Four in a Bed" / sustainability story.
- Add an events lead-capture CRM/enquiry workflow; show a downloadable brochure.

---

## 5. Things To Do & See

Content-rich page exists — reorganise into clear categories. Distances are "as stated on current site".

**Norfolk Broads & water**
- Alderfen Broad (<15 mi, NWT, birdwatching) · Barton Broad (<15 mi, swallowtail butterfly habitat) · Hickling Broad (<15 mi, walks, observation tower) · Simpson's Boatyard day boats (5 mi, seats 10) · Ebridge Mill Lock (<3 mi, wild swimming / boat trips on the North Walsham & Dilham Canal).

**Wildlife & nature reserves**
- Dilham Hall Farm 95-acre reserve/SSSI (on-site) · RSPB Titchwell Marsh (60 min) · Cley Marshes (40 min) · Strumpshaw Fen (30 min) · Holkham NNR (50 min) · Thrigby Hall Wildlife Gardens (<20 mi).

**Walking routes**
- On-site 3.5 km circular canal walk · Mannington Gardens footpaths (<20 mi) · Bacton Wood (<3 mi).

**Historic houses & gardens**
- Felbrigg Estate (NT, <20 mi) · Blickling Estate (NT, <15 mi) · East Ruston Gardens (<5 mi) · Hoveton Hall Gardens (5 mi) · Houghton Hall (45 mi) · Oxburgh Hall (50 mi) · Holkham Hall (40 mi) · Fairhaven Woodland & Water Garden (<15 mi) · Norwich Castle Museum (<15 mi).

**Family activities**
- BeWILDerwood (<5 mi) · Dinosaur Adventure (<20 mi) · Great Yarmouth Sea Life Centre (<20 mi) · Amazona Zoo (<15 mi) · Bure Valley Railway (<5 mi) · Poppy Line Steam Railway (<20 mi).

**Activities & landmarks**
- Lakeside Riding Centre (<5 mi) · Dilham Fishery (<2 mi, disabled-friendly coarse fishing) · Happisburgh Lighthouse (<10 mi) · sandy beaches (5 mi).

**Food & drink nearby** (from accommodation pages): The Swan Inn, Gunton Arms, Suffield Arms.

### Recommendations
- Present as a **filterable, map-based directory** with categories (Water · Wildlife · Walks · Family · Heritage · Food & Drink) and distance/drive-time chips.
- Tie into stays: "Plan your days" module on accommodation pages; seasonal highlights (e.g., swallowtail butterflies in summer).
- This content is strong for SEO ("things to do near the Norfolk Broads") — give each major category richer copy and FAQ schema.

---

## 6. Design System Extraction (current site)

### 6.1 Typography
- **Body font:** **Nunito Sans** (Google Fonts), full weight range 100–900 loaded.
- **Headings:** Nunito Sans **900 (extra-bold/black)**; hero H1 ≈ 6em, secondary headings ≈ 3–4em, sub-headings 2–2.4em, 1.5em.
- **Accent / decorative:** **Indie Flower** (handwritten Google font) — used for a rustic/personal touch.
- *Assessment:* functional but generic; a single sans for everything plus a casual script reads slightly dated. The redesign should introduce a more premium pairing (see CLAUDE.md) while keeping a warm, natural feel.

### 6.2 Colour Palette (extracted from theme CSS)

| Role | HEX | RGB | HSL | Notes |
|---|---|---|---|---|
| **Primary — sage green** | `#677B73` | rgb(103, 123, 115) | hsl(150, 9%, 44%) | Most-used brand colour |
| **Deep forest (near-black green)** | `#062E28` | rgb(6, 46, 40) | hsl(171, 77%, 10%) | Dark text / dark sections |
| **Slate teal-grey** | `#54676C` | rgb(84, 103, 108) | hsl(192, 12%, 38%) | Secondary |
| **Pale grey-green** | `#D8DCDB` | rgb(216, 220, 219) | hsl(165, 5%, 85%) | Light backgrounds |
| **Neutral grey** | `#CECECE` | rgb(206, 206, 206) | hsl(0, 0%, 81%) | Borders / dividers |
| **Off-white** | `#FEFEFE` | rgb(254, 254, 254) | hsl(0, 0%, 100%) | Page background |

*Excluded as framework defaults (not brand):* Foundation link blues `#1779BA` / `#14679E` and pinks `#FBC2C4` / `#F6E7EB`. **The new design should drop these and define an intentional CTA/accent colour** — currently there is no dedicated, on-brand CTA colour, which weakens conversion.

### 6.3 Components (current)
- **Buttons:** "Book Now" / "Enquire" / "Find Out More" — inconsistent styling, no single accent colour, vague labels.
- **Cards:** category cards link to accommodation; lack key facts (sleeps / dogs / from-price) on the card face.
- **Navigation:** multi-level dropdowns under Accommodation & Location; brand names absent.
- **Forms:** Mailchimp email subscribe; contact via email links; **no proper enquiry form**; events relies on a raw email address.
- **Booking widgets:** SuperControl/Bedful embed (broken on `/booking`), Checkfront (canoe), external canalcamping.co.uk.
- **Footer:** acts as secondary sitemap + social + Trustpilot.
- **Hero sections:** full-width image + bold H1 + CTA (the strongest existing component).
- **Maps:** intended Google Maps widget not rendering on Contact.

---

## 7. Brand Positioning Analysis

### 7.1 Core brand themes
Nature · Wildlife · Waterside / Norfolk Broads · Luxury (glamping with hot tubs) · Relaxation & reconnection · **Sustainability (genuinely carbon-negative)** · Adventure (canoeing/SUP) · Family heritage.

### 7.2 Unique selling points
- **Genuinely carbon-negative**, working family farm (Patersons, farming since **1949**; Luke = 5th generation + Louise) — farm generates green energy for ~**1,250 homes** via anaerobic digestion / circular agriculture.
- **Channel 4 "Four in a Bed" winner** — strong trust/credibility hook (currently underused).
- **Private waterside setting** on its own canal stretch with **on-site canoe/SUP hire** — adventure + accommodation in one place.
- **95-acre SSSI nature reserve** with rare species (incl. swallowtail butterfly habitat nearby).
- **Three experiences for three audiences** under one roof — couples, families+dogs, campers.
- **Wood-fired, chemical-free hot tubs** (premium + eco).

### 7.3 Competitive advantages & messaging opportunities
- "**Stay carbon-negative**" — own the sustainability angle hard; few competitors can credibly claim it.
- "**Paddle from your pod**" — lean into the waterside + canoe story (already the OG image).
- Use the "Four in a Bed win" + Trustpilot reviews as persistent trust signals.
- Clear audience routing: *Couples → Broad Fen · Families & dogs → Tonnage Bridge · Camp under canvas → Canal Camping.*

---

## 8. Website Architecture Proposal (recommended sitemap)

```
Home
Stay  (overview + comparison table: who's it for / sleeps / dogs / kids / hot tub)
 ├─ Broad Fen Retreats  (Couples · Adults-only · No dogs)
 │   ├─ Damselfly
 │   ├─ Dragonfly
 │   └─ Swallowtail
 ├─ Tonnage Bridge Retreats  (Waterside · Family & dog friendly)
 │   ├─ Layout 1 — King + Twin (Sleeps 4)      → Heron, Coot, Harvest Mouse
 │   ├─ Layout 2 — King + Single + Bunk (Sleeps 5) → Hedgehog, Bittern
 │   └─ Layout 3 — King + Bunk (Sleeps 4)      → Water Vole, Moor Hen, Shrew, Kingfisher, Otter
 └─ Canal Camping & Bell Tents  (Family & dog friendly)
Canoe Hire
 ├─ Canoes
 ├─ Kayaks
 ├─ Paddleboards (SUPs)
 ├─ Self-Launch
 └─ Prices & Book
Events
 ├─ Corporate Retreats & Team-Building
 ├─ Weddings
 ├─ Exclusive Hire
 └─ Private Events
Things To Do  (filterable: Water · Wildlife · Walks · Family · Heritage · Food & Drink)
About  (Our Story · Sustainability / Carbon-Negative · Four in a Bed · Reviews)
Find Us  (map · directions · what3words · postcodes per site)
Contact
Book Now  (unified availability — accommodation + add-on canoe hire)
```

**Key IA principles:**
1. **Lead with brand names**, with the audience qualifier inline (e.g., "Broad Fen Retreats — Couples, adults-only").
2. **Decision-first cards**: every accommodation card shows *sleeps · dogs Y/N · kids Y/N · hot tub · from £*.
3. **One comparison table** on the Stay landing page resolves 80% of confusion.
4. **Promote Canoe Hire and Events to primary nav** (they're current strengths but buried/thin).

---

## 9. User Experience Recommendations (prioritised by impact)

### P0 — Critical (fix first)
1. **Fix booking.** `/booking` shows a placeholder — the core conversion path is broken. Implement a working, unified booking flow.
2. **Consolidate booking systems.** Three engines (SuperControl/Bedful, Checkfront, canalcamping.co.uk) confuse users and split the brand. Unify, or at minimum present one consistent booking UI with shared branding.
3. **Surface the three brands + key facts in navigation and on cards** (sleeps / dogs / kids / hot tub / from-price).
4. **Build the Tonnage Bridge comparison table** mapping all 10 pods → layout → sleeps → beds (Section 2.2).

### P1 — High
5. **Populate the testimonials page** (it's empty) — pull Trustpilot reviews; add review schema.
6. **Build out the Events section** with capacity, packages, gallery, and a real enquiry form.
7. **Fix the contact map** and add proper directions + what3words + per-site postcodes (note NR28 9PW vs 9PL).
8. **Define a dedicated CTA/accent colour** and standardise buttons; replace vague "Find Out More" with action labels.
9. **Use the locked figures** (resolved with owner): dog fees are per product (Tonnage Bridge £20/stay, Canal Camping £5/stay, Broad Fen no dogs); canoe pricing comes from the Canoe Hire page only, not the camping page.

### P2 — Medium
10. **Convert FAQ links into real answered FAQs** (with FAQ schema) covering dogs, children, capacity, hot tubs, check-in, min stays, accessibility.
11. **Cross-sell canoe hire & "things to do"** within accommodation journeys.
12. **Add Product/Offer + LodgingBusiness schema**; fix the meta-description "dog-friendly" claim so it doesn't mis-set expectations for adults-only Broad Fen.
13. **Mobile**: ensure card facts, comparison table, and booking widget are fully responsive (current Elementor build is image-heavy).

---

## 10. Deliverable
A complete **CLAUDE.md** has been generated alongside this brief (`CLAUDE.md`) so another AI or developer can begin planning and building immediately.

---

*Note on figures: all capacities, prices, policies and distances are transcribed from the live site on the audit date. The main domain dilhamhallretreats.co.uk is the source of truth. Dog fees and canoe pricing are now locked (see Sections 2 and 3). Per-pod accommodation prices are dynamic (they vary by season, length of stay, and day of week) and are pulled live from the booking engine, so no fixed price list is needed.*
