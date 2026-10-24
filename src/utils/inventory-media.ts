/** Convert a public Google Drive file link into an image URL usable by a browser. */
export function imageSource(link: string): string {
  try {
    const url = new URL(link);
    if (url.hostname !== 'drive.google.com') return link;
    const id = url.pathname.match(/^\/file\/d\/([\w-]+)/)?.[1] || url.searchParams.get('id');
    return id ? `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1600` : link;
  } catch {
    return link;
  }
}

export function reelEmbed(link: string): { src: string; kind: 'instagram' | 'drive' } | null {
  try {
    const url = new URL(link);
    if (url.protocol !== 'https:') return null;
    if (['instagram.com', 'www.instagram.com'].includes(url.hostname)) {
      const match = url.pathname.match(/^\/(?:reel|p)\/([\w-]+)\/?$/);
      return match ? { src: `https://www.instagram.com/reel/${match[1]}/embed/`, kind: 'instagram' } : null;
    }
    if (url.hostname === 'drive.google.com') {
      const id = url.pathname.match(/^\/file\/d\/([\w-]+)/)?.[1];
      return id ? { src: `https://drive.google.com/file/d/${id}/preview`, kind: 'drive' } : null;
    }
  } catch { /* Ignore invalid links from the sheet. */ }
  return null;
}
