# Launch checklist

The site is safe to put on the domain today. Nothing false will be published: prices
and unconfirmed past work are gated off in code, not just flagged in a comment.

What follows is what to unblock, in priority order.

---

## 1. Blockers — need the owner's answer

These are wrong or unknown right now. The site works without them; it is just less
useful until they land.

### An enquiry email address — optional, but a real gap

There is **no email address on the site**. The invented `info@` placeholder has been
removed everywhere: the footer line, the Email card on /contact, the "Email" option in
the quote form, and the `email` field in the structured data.

That is the safe state — an address nobody reads loses enquiries in silence. But it
does mean the business is reachable only by phone, WhatsApp and the quote form, and
some corporate and government buyers will only send a purchase order by email.

If he sets up a real inbox, `src/lib/site.ts` documents exactly what to restore.

### The rate card

Every figure in `src/data/units.ts` was written by the developer as a plausible
placeholder. They are **not the business's rates**.

Right now `PRICING_CONFIRMED = false` in `src/lib/site.ts`, so every price on the site
renders **"On request"** and the sizing calculator hides its cost estimate. Nothing can
leak.

To turn pricing on:
1. Replace every `pricing` block in `src/data/units.ts` with the owner's real figures
   (`perDay`, `perWeek`, `purchase` — use `null` for anything he would rather quote
   case by case).
2. Set `PRICING_CONFIRMED = true`.

Displayed pricing is a real competitive advantage here — but only once it is his.

### Past work

`src/data/deployments.ts` now holds **two** entries, both `verified: false`, so the
gallery shows an Instagram panel instead of a portfolio. Four previously invented
engagements — including a claimed Government of Ghana contract at Independence
Square — have been deleted outright.

For each job, confirm with the owner that (a) it happened as described and (b) the
client may be named, then set `verified: true`. Do not set it on his behalf.

### Smaller facts

| Field in `site.ts` | Current | Needs |
| --- | --- | --- |
| `address.street` | empty | Yard/office address, or confirm city-level is fine |
| `geo` | Accra city centre | Real yard coordinates — feeds Google's map listing |
| `hours` | Mon–Fri 7–6, Sat 8–5 | Confirm |
| `founded` | 2019 | Confirm or delete |
| `social.facebook` / `tiktok` | empty | Add if they exist |

### Logo

`src/components/logo.tsx` is a text lockup approximating the real mark, and
`src/app/icon.tsx` is an "AP" monogram. Both are deliberate stand-ins. Swap for the
real artwork when supplied.

---

## 2. Before you point the DNS

**Match `site.url` to the domain exactly.** It is `https://www.accraportabletoilet.com`.
Every canonical URL, the sitemap, the OG tags and the structured data are built from it.
If the site ends up served at the **non-www** apex instead, change `site.url` to match
and redirect the other form to it. Getting this wrong splits your SEO across two
addresses — the single most common launch mistake.

**Force HTTPS** and redirect http → https.

**Set one canonical host.** Pick www or apex, 301 the other.

---

## 3. After it is live

- [ ] Submit `https://<domain>/sitemap.xml` to Google Search Console
- [ ] Claim/refresh the **Google Business Profile** — for a local services business in
      Accra this drives more enquiries than the website itself, and it should point at
      the new domain
- [ ] Paste the link into WhatsApp and confirm the preview card renders
- [ ] On a real phone: tap the WhatsApp button, tap Call, and run the quote form all
      the way to submit
- [ ] Check the bottom action bar does not cover anything on a small screen
- [ ] Update the Instagram bio link if the URL changed

---

## 4. Known limitation to tell the owner about

**Quote requests are not stored anywhere.** The form composes a summary and opens the
visitor's own WhatsApp — *the visitor still has to press send*. If they close the tab,
the enquiry is gone and there is no record it ever existed. With no email address on
the site either, WhatsApp is now the only route a written enquiry can take.

That was the agreed scope (no backend). If he wants every enquiry captured whether or
not the visitor completes the hand-off, that needs a form service or a small backend
adding — worth quoting separately.
