# Before this site goes live

> **Status:** the two dangerous items are now gated in code, not just documented.
> Prices render "On request" until `PRICING_CONFIRMED` is flipped, and unconfirmed
> past work is filtered out of every page. See `LAUNCH.md` for the ordered checklist.
> This file remains the detailed record of what was inferred rather than reported.

Everything here is content the developer could not verify. None of it blocks
launch any more — but each item should still be confirmed with the business owner.

## 1. Business details — `src/lib/site.ts`

| Field | Current value | Status |
| --- | --- | --- |
| `phone` | 0558 045 600 / +233 55 804 5600 | From the public Instagram bio — confirm it is still the booking line |
| `url` | https://www.accraportabletoilet.com | From the Instagram bio |
| `email` | info@accraportabletoilet.com | **Guessed.** Replace with the real inbox |
| `address.street` | *(empty)* | **Missing.** Add the yard/office address, or delete the field and keep the site city-level |
| `geo` | Accra city centre | **Placeholder.** Replace with the real yard coordinates so Google Maps and the LocalBusiness schema are accurate |
| `hours` | Mon–Fri 7–6, Sat 8–5, Sun standby | **Assumed.** Confirm |
| `social.facebook` / `social.tiktok` | empty | Add if they exist — empty entries are filtered out of the schema automatically |
| `founded` | 2019 | **Guessed.** Correct it or remove the field |

## 2. Prices — `src/data/units.ts`

**Every price in the file is a placeholder.** They are plausible for the Ghanaian
market but they are not this company's rate card. Each unit has a `pricing` block:

```ts
pricing: {
  perDay: 4500,      // GH₵ per day
  perWeek: 24000,    // GH₵ for a 7-day hire
  purchase: null,    // GH₵ outright, or null if not sold
  note: "…",         // the fine print shown under the rate card
}
```

Set any figure to `null` to show "On request" instead of a number — that is the safest
setting for anything the owner would rather quote case by case.

The "prices are indicative" disclaimer appears on the fleet page, every unit page and
in the footer. Keep it unless the published rates become firm.

## 3. Past work — `src/data/deployments.ts`

Kwahu Business Forum and the KIMO Marathon appear on the company's public Instagram
grid. The other four entries are **representative placeholders written by the
developer** — plausible, but not records of real jobs.

Before launch: confirm each engagement, correct the years and unit counts, and remove
anything the client has not agreed to be named in. The "Government of Ghana" entry in
particular should not be published without permission.

## 4. Photography

No real images are used anywhere. Every image slot renders a dashed placeholder box
with a description of the shot that belongs there — see `ASSETS.md` for how to swap
them in. Shots needed, in rough priority order:

1. Executive 3-door trailer, exterior, evening, lit — the hero image
2. Trailer cubicle interior — WC, basin, mirror
3. Luxury 2-door trailer, exterior, daylight
4. Row of standard cubicles at an event
5. VIP cabin, exterior and interior
6. Accessible unit showing the ramp
7. Urinal station, hand-washing station, shower unit
8. Workshop / fabrication in progress (used on the About page)
9. Crew delivering and setting up
10. One photo per past-work entry

## 5. Logo

`src/components/logo.tsx` is a text lockup approximating the real mark. Drop the
supplied logo into `public/logo.svg` and swap the component's innards for an
`<Image>` — keep the same props and nothing else needs touching.

Also replace `src/app/favicon.ico`, which is still the Next.js default.

## 6. Legal

There is no privacy policy or terms page. The quote form stores nothing and sends
nothing to a server — it hands the summary to WhatsApp or the visitor's email app —
so the exposure is low, but a short privacy page is still worth adding if the business
later collects enquiries server-side.
