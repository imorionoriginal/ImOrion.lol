// Page addresses come from titles, so new entries never need a hand-written URL.
export function slugify(text: string) {
  return text
    .replace(/[ıİ]/g, "i")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
