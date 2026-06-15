import { getTickerBlogs } from "@/app/lib/blog/store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const items = await getTickerBlogs(12);

    return Response.json(
      {
        items: items.map((item) => ({
          ...item,
          href: `/blogs/${item.slug}`,
        })),
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.log("Read ticker blogs error:", error);

    return Response.json(
      {
        items: [],
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
