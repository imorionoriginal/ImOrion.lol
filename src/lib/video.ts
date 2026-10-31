export type VideoEmbed = {
  src: string;
  portrait: boolean;
  thumbnail?: string;
};

// Turns a pasted YouTube or TikTok link into something the page can embed.
export function parseVideoLink(link?: string): VideoEmbed | undefined {
  if (!link) return undefined;

  let url: URL;
  try {
    url = new URL(link.trim());
  } catch {
    return undefined;
  }

  const host = url.hostname.replace(/^(www|m)\./, "");
  const parts = url.pathname.split("/").filter(Boolean);

  if (host === "youtu.be" || host === "youtube.com") {
    const shorts = parts[0] === "shorts";
    const id =
      host === "youtu.be"
        ? parts[0]
        : shorts || parts[0] === "embed" || parts[0] === "live"
          ? parts[1]
          : url.searchParams.get("v");
    if (!id) return undefined;
    return {
      src: `https://www.youtube-nocookie.com/embed/${id}?rel=0`,
      portrait: shorts,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  }

  if (host === "tiktok.com") {
    const position = parts.indexOf("video");
    const id = position >= 0 ? parts[position + 1] : undefined;
    if (!id) return undefined;
    return { src: `https://www.tiktok.com/player/v1/${id}`, portrait: true };
  }

  return undefined;
}
