/*
 * Page frame, after Attio's construction: the page is a drawn grid, not stacked bands.
 *   - Every section spans the full width with a hairline on its bottom edge.
 *   - Inside, a fixed-width column is framed by two vertical hairline rails (lg+),
 *     so the rails run unbroken from the header to the footer.
 *   - Content sits in hairline-bordered cells (see <Cells>).
 * Two tones: "light" (cream, navy lines) and "dark" (navy, white lines).
 */

export type Tone = "light" | "dark";
