
Goal: move only the hero artwork downward so the person’s head stops disappearing behind the top diffusion, especially on mobile.

1. Update only the artwork layer in `src/components/landing/LandingHero.tsx`:
   - keep the text block exactly where it is
   - keep the diffusion/mist layers exactly where they are
   - lower the background artwork itself by adding a downward offset to the core image layer

2. Apply the offset on the image layer, not the section:
   - change the artwork positioning from a strict bottom anchor to a lower visual anchor
   - use a stronger downward offset on mobile and a smaller one on larger screens
   - if lowering the image creates empty space, slightly increase the artwork layer height/coverage so it still fills cleanly

3. Do not change in this pass:
   - headline size/alignment
   - subheadline layout
   - button placement
   - diffusion gradients or mask stops

4. Verify the result at mobile and desktop widths:
   - the image sits lower
   - the head is fully visible below the diffusion
   - the solar panels/pump remain visible without awkward cropping

Technical details:
- File to adjust: `src/components/landing/LandingHero.tsx`
- Likely change point: the core artwork div using `backgroundImage`, `backgroundPosition`, and sizing
