import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
  const { sessionId } = auth();

  try {
    if (!sessionId) {
      return { status: 401, body: { message: "Unauthorized" } };
    }

    const json = await request.json();

    const newSnippet = await db.snippet.create({
      data: {
        title: json.title,
        code: json.code,
        ownerId: json.ownerId,
      },
    });

    return new Response(JSON.stringify({ message: "Snippet created" }));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
