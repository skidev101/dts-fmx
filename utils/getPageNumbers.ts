export function getPageNumbers(
  current: number,
  total: number,
  maxVisible = 3
): (number | string)[] {
  const pages: (number | string)[] = [];

  if (total <= maxVisible + 2) {
    // small number of pages, show all
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }

  // always show first page
  pages.push(1);

  const left = Math.max(current - 1, 2);
  const right = Math.min(current + 1, total - 1);

  if (left > 2) pages.push("...");

  for (let i = left; i <= right; i++) pages.push(i);

  if (right < total - 1) pages.push("...");

  // always show last page
  pages.push(total);

  return pages;
}
