# Hostario portfolio demo

The Hostario “Explore the workflow” button opens a local interactive browser recreation. Other project walkthroughs keep their existing behavior. No build step or additional dependencies are required.

## Files

- `assets/hostario-demo.js` and `.css`: portfolio dialog, phone frame and contextual guide.
- `assets/hostario-demo/index.html`, `app.js`, `app.css`: isolated English demo UI.
- Existing hospitality images are reused for the three property cards.

## Basis in the native app

The implementation was informed by the local Hostario SwiftUI source, specifically `CheckInView`, `ListingsView`, `ListingCardView`, `CheckInRowView`, `CheckInFormView`, `ListingSelectionStep`, `DatesAndGuestsStep`, `GuestFormView`, `StepProgressView`, `EditorNavigationDesign`, and `CheckInDetailView`.

It reproduces the property → stay → per-guest → save → reporting → document workflow, including the blue editor navigation, English labels and service states. The October 2026 visual revision follows the user's iPhone reference screenshots for card proportions, neutral backgrounds, semantic colors, floating three-item tab bar, scroll headers and rounded editor sheets. The glass is recreated with CSS backdrop filters, edge highlights and a persistent sliding selection capsule; it is not the native SwiftUI material renderer.

The reference screenshots are visual guidance only: no private guest identity, address, revenue or occupancy data is copied or included as an asset. Listing names and photos come from the public hospitality assets already used by the portfolio. Guest data and chart series are invented independently. A single persistent disclosure remains outside the phone.

The demo uses English throughout to match the portfolio, including accessible labels, dates, chart labels and euro formatting. It has no language selector. Property names and Italian service names remain unchanged.

## Deliberate demo limits

- Fictional guests; dates limited to November 2026; one to three guests.
- Guest form shortened for the portfolio. Document scan fills a local fixture after a short animation, with no camera or document uploads.
- Reporting simulates successful responses without calling Alloggiati Web or ROSS1000. The iframe CSP blocks network connections.
- Receipt is a simplified HTML facsimile, not the app's generated PDF. The €95 nightly rate is fictional and explicitly marked as sample data.
- Properties, Check-in and Settings navigation are included. Properties can be added locally (up to five), monthly or quarterly chart data can be filtered, and check-in months can be expanded. Settings contains a bounded preview with working document navigation and a session reset. Payments, subscriptions, real account configuration, legal forms and reporting remain outside the demo.
- Session state lives in memory. “Start again” resets it, and reloading clears it. No storage or analytics are added.
- Escape and the close button return to the portfolio; reduced-motion settings disable visual animations, and reduced-transparency uses opaque surfaces.

Run a static local HTTP server from the repository root and open `index.html#work` to try it.
