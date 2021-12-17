/**
 * Returns a valid data URL for an emoji
 * @param emoji Desired emoji to obtained data URL for
 * @returns Data URL of emoji
 */
function getFaviconHref(emoji: string): string {
  return `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2280%22>${emoji}</text></svg>`;
}

/**
 * Changes the favicon of the window
 * @param emoji Desired emoji to set as favicon
 */
export function changeFavicon(emoji: string) {
  if (typeof window === "undefined") return;

  // get the link element or create it
  const link =
    window.document.querySelector<HTMLLinkElement>("link[rel*='icon']") ||
    window.document.createElement("link");
  link.type = "image/svg+xml";
  link.rel = "shortcut icon";
  link.href = getFaviconHref(emoji); // set the href of the link tag to the data URL

  window.document.getElementsByTagName("head")[0].appendChild(link);
}

const faviconUtils = {
  changeFavicon,
};

export default faviconUtils;
