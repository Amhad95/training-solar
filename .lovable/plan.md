
No — it still does not match the desktop composition.

What’s still wrong in the current mobile result:
- The hero is visually split into two blocks: white text area on top, image block below. Desktop reads as one blended composition.
- The mobile image still starts too low, so the artwork feels “attached under” the content instead of sitting behind it.
- The top fade is too weak / too high, so the image’s upper boundary is still readable as a rectangle.
- The stacked buttons are consuming vertical space and pushing the image lower than it should be.

Implementation plan for `src/components/landing/LandingHero.tsx` only:

1. Push the mobile content higher
- Reduce mobile-only top padding a bit more.
- Tighten the mobile spacing between headline, paragraph, and CTA group.
- Keep all `md:` spacing exactly as-is.

2. Pull the mobile artwork upward
- Raise the mobile artwork layer further by increasing its vertical lift.
- Increase the mobile artwork height slightly so the scene continues upward behind the paragraph/buttons instead of reading like a bottom banner.
- Keep `backgroundSize: contain` so the artwork does not get cropped again.

3. Make the top diffusion actually hide the image edge
- Replace the current small mobile fade with a larger, softer mobile-only gradient that starts higher and extends deeper into the artwork.
- The goal is to erase the visible top border of the image, not just tint it.

4. Rebalance the CTA area on mobile
- Reduce the CTA top padding on mobile so the buttons sit closer to the copy.
- This frees space for the artwork to move up without making the hero too tall.

5. Leave desktop untouched
- No changes to the desktop artwork layer.
- No changes to desktop section spacing or mask behavior.

Expected result:
- Mobile hero reads like the same design as desktop.
- Text begins higher.
- Artwork sits up behind the lower text/CTAs rather than as a strip at the bottom.
- The image top edge disappears into a soft diffusion instead of showing a hard rectangle.
