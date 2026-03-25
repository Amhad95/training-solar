
Fix only `src/components/landing/LandingHero.tsx`.

What’s wrong now:
- Mobile copy still sits too low because the hero keeps too much top spacing on small screens.
- The mobile artwork is positioned too low, so it reads like a strip at the bottom instead of the same composition as desktop.
- The current mist/fade is global to the section, not specifically softening the top edge of the mobile image.

Implementation:
1. Push the mobile text higher
- Reduce mobile-only top padding on the hero section.
- Tighten the mobile spacing in the text wrapper so the headline/subheadline start higher.
- Keep all `md:` spacing unchanged.

2. Raise the mobile artwork
- Update only the mobile artwork layer (`md:hidden`) to sit higher with a stronger bottom offset.
- Slightly retune the mobile artwork size so lifting it does not make it feel cropped or overly zoomed.

3. Add a mobile-only top diffusion on the image border
- Add a dedicated gradient overlay above the mobile artwork’s top edge.
- This fade will blend the lifted image into the background without washing out the whole hero.

4. Leave desktop untouched
- Do not change the desktop artwork layer or desktop spacing.
- Keep the fix isolated to screens below `md`.

Expected result:
- Mobile text starts higher.
- The image sits further up behind the content, closer to the desktop composition.
- The image’s top border fades smoothly into the background on mobile.
