function adjustColumns() {
  const grid = document.querySelector('.grid');
  if (!grid) return;

  const pxPerRem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const minRem = 20; // keeps in sync with minmax(20rem,...)
  const minPx = minRem * pxPerRem;

  // get gap (browsers typically return px); parseFloat will extract the number even if "16px"
  const gapRaw = getComputedStyle(grid).gap || getComputedStyle(grid).gridGap || '0px';
  const gapPx = parseFloat(gapRaw) || 0;

  const containerW = Math.max(0, grid.getBoundingClientRect().width);

  // initial guess: maximum columns that could fit if each column is at least minPx
  let cols = Math.floor((containerW + gapPx) / (minPx + gapPx));

  // Defensive: ensure integer and not negative
  cols = Number.isFinite(cols) ? Math.floor(cols) : 0;

  // If columns calculation gives 0 or 1, bump to minimum even value
  const MIN_EVEN = 2;
  if (cols < MIN_EVEN) cols = MIN_EVEN;

  // Force even
  if (cols % 2 !== 0) cols -= 1;
  if (cols < MIN_EVEN) cols = MIN_EVEN;

  // Now *verify* the computed columns actually fit. If not, decrement until they do.
  // totalWidthNeeded = cols * minPx + (cols - 1) * gapPx
  while (cols > MIN_EVEN) {
    const needed = (cols * minPx) + ((cols - 1) * gapPx);
    // tiny tolerance to avoid floating rounding issues
    if (needed <= containerW + 0.5) break;
    cols -= 2; // keep decrementing by 2 to preserve evenness
  }

  // Final safety clamp (in case container is extremely narrow)
  if (cols < MIN_EVEN) cols = MIN_EVEN;

  grid.style.gridTemplateColumns = `repeat(${cols}, minmax(${minRem}rem, 1fr))`;
}
