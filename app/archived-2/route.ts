export function GET() {
  return new Response("Conteúdo removido permanentemente.", {
    status: 410,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
