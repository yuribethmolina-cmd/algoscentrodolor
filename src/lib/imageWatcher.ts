/**
 * Global image loading enhancement:
 * Marks every <img> with data-img-loaded="true" once its pixels are decoded.
 * Paired with CSS shimmer/blur placeholder in index.css.
 */
export function installImageLoadWatcher() {
  if (typeof window === "undefined") return;
  if ((window as unknown as { __imgWatch?: boolean }).__imgWatch) return;
  (window as unknown as { __imgWatch?: boolean }).__imgWatch = true;

  const mark = (img: HTMLImageElement) => {
    if (img.dataset.imgLoaded === "true") return;
    img.dataset.imgLoaded = "true";
  };

  const attach = (img: HTMLImageElement) => {
    if (img.dataset.imgWatch === "true") return;
    img.dataset.imgWatch = "true";
    if (img.complete && img.naturalWidth > 0) {
      mark(img);
      return;
    }
    img.addEventListener("load", () => mark(img), { once: true });
    img.addEventListener("error", () => mark(img), { once: true });
  };

  // Attach to existing images.
  document.querySelectorAll("img").forEach(attach);

  // Observe future additions.
  const mo = new MutationObserver((entries) => {
    for (const e of entries) {
      e.addedNodes.forEach((n) => {
        if (n instanceof HTMLImageElement) attach(n);
        else if (n instanceof Element) {
          n.querySelectorAll?.("img").forEach(attach);
        }
      });
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });
}
