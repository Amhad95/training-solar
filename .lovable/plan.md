

## Fix: Mobile hero image position

**Problem**: On mobile (390px), the artwork with `backgroundSize: 'contain'` and `-bottom-16` pushes the image too far down, cutting off the top of the scene.

**Changes** in `src/components/landing/LandingHero.tsx` (mobile layer only, line 18):

1. Change `-bottom-16` to `bottom-0` — stop pushing the image further down on mobile
2. Change `h-[120%]` to `h-full` — the `contain` sizing with 120% height creates unnecessary offset; `h-full` keeps the image within the section bounds
3. Keep the mask/diffusion and desktop layer untouched

This raises the artwork on mobile so the person and solar panels are properly visible, without affecting desktop.

