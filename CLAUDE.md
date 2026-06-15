# Claude Instructions

## Loading States

- When creating a new page or route that loads async data, add a page-specific skeleton loader as part of the initial implementation.
- The skeleton should match the final page layout closely enough that users do not see a generic or unrelated page skeleton first.
- Use skeleton rows, cards, headers, and controls instead of spinner-only loading states for primary page content.
- If a page has nested data loads, keep each loading state visually consistent with the section that is loading.
- Reuse the existing `Skeleton` component and local page skeleton patterns before introducing new loading UI.
