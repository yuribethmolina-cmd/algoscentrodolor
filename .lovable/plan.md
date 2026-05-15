

## Plan: Remove statistics from ProblemSection

Remove the entire "Impact stats" block (lines 50-90) from the left column of the ProblemSection. This includes the large 347,000+ stat card and the 4 smaller stat cards (82%, 80,784, 68.1%, 32.3%).

The left column will keep only the header text ("Te entendemos" + headline). The layout will remain a 2-column grid with the headline on the left and the pain point cards on the right.

### Changes

**`src/components/ProblemSection.tsx`**
- Delete lines 50-90 (the `{/* Impact stats */}` div and all its children)
- No other changes needed

