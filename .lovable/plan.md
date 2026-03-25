

## Fix: Mobile-specific hero adjustments

**Problems on mobile (from screenshot):**
1. Image doesn't scale to mobile width — `backgroundSize: 'max(100%, 1024px) auto'` forces minimum 1024px, way too wide for mobile
2. Top diffusion gradient is `h-[35%]` — too tall on small screens, covers the artwork
3. Text is too large for mobile (`text-3xl` headline, `text-lg` subheadline)

**Changes — all mobile-only, won't affect md+ screens:**

File: `src/components/landing/LandingHero.tsx`

1. **Image sizing**: Change `backgroundSize` to be responsive — use a CSS approach where mobile gets `cover` or a smaller min-width (e.g., `max(140%, 600px) auto`) while desktop keeps the current `max(100%, 1024px) auto`. Since inline styles can't use media queries, switch to using Tailwind classes with a wrapper approach or use two divs (one mobile, one desktop). Simplest: just lower the min to `max(100%, 700px)` which helps mobile without hurting desktop — but better to use responsive classes.

   Actually, the cleanest fix: use `backgroundSize: 'cover'` on mobile via two class-toggled layers, or just change to `cover` universally since `cover` will fill the container on all sizes. The `max(100%, 1024px)` was meant to prevent the image from being too small on wide screens, but `cover` achieves the same thing naturally.

2. **Diffusion**: Change top gradient from `h-[35%]` to `h-[25%] md:h-[30%]` — shorter on mobile

3. **Text sizing**: Reduce headline to `text-2xl md:text-4xl lg:text-5xl` and subheadline to `text-base md:text-xl`

4. **Side gradients**: Reduce mobile side gradients from `w-1/4` to `w-1/6` on mobile too (use `w-[10%] md:w-1/6`)

