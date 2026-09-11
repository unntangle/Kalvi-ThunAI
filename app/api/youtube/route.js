// Finds an embeddable YouTube video for a concept, server side, so the API key
// never reaches the browser.
//
// Needs YOUTUBE_API_KEY in .env.local. Optionally set YOUTUBE_CHANNEL_ID to
// restrict results to one channel, for example KalviTV Official.
//
// Without a key the route returns { configured: false } and the player falls back
// to its search link and paste field.

const ENDPOINT = "https://www.googleapis.com/youtube/v3/search";

// Small in-memory cache. The same concept is opened repeatedly during a demo and
// the Data API quota is 100 units per search.
const cache = new Map();
const TTL = 1000 * 60 * 60 * 6;

export async function GET(request) {
  const key = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!key) {
    return Response.json({ configured: false });
  }
  if (!query) {
    return Response.json({ configured: true, error: "Missing q" }, { status: 400 });
  }

  const cacheKey = `${channelId ?? "any"}::${query}`;
  const hit = cache.get(cacheKey);
  if (hit && Date.now() - hit.at < TTL) {
    return Response.json(hit.body);
  }

  const params = new URLSearchParams({
    key,
    q: query,
    part: "snippet",
    type: "video",
    maxResults: "1",
    // Both filters matter: the first keeps videos that refuse embedding out of the
    // results, the second keeps out videos blocked outside youtube.com.
    videoEmbeddable: "true",
    videoSyndicated: "true",
    safeSearch: "strict",
    relevanceLanguage: "ta",
    regionCode: "IN",
  });
  if (channelId) params.set("channelId", channelId);

  try {
    const res = await fetch(`${ENDPOINT}?${params}`, { cache: "no-store" });
    if (!res.ok) {
      return Response.json(
        { configured: true, error: `YouTube returned ${res.status}` },
        { status: 502 }
      );
    }

    const data = await res.json();
    const item = data.items?.[0];
    const body = item
      ? {
          configured: true,
          videoId: item.id.videoId,
          title: item.snippet.title,
          channel: item.snippet.channelTitle,
        }
      : { configured: true, videoId: null };

    cache.set(cacheKey, { at: Date.now(), body });
    return Response.json(body);
  } catch {
    return Response.json({ configured: true, error: "Lookup failed" }, { status: 502 });
  }
}
