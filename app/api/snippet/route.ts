import { useSession, useUser } from "@clerk/nextjs";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function GET() {
  const { userId, sessionId } = auth();
  try {
    // const session = useSession();

    // if (!sessionId) {
    //   return { status: 401, body: { message: "Unauthorized" } };
    // }

    const snippets = await db.snippet.findMany({
      where: {
        ownerId: userId!,
      },
    });

    return new Response(JSON.stringify(snippets));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

// export async function GET(request: Request, response: Response) {
//   return new Response("Hello world");
// }

export async function POST(request: Request) {
  const { userId, sessionId } = auth();
  try {
    console.log("userId", userId);
    console.log("sessionId", sessionId);

    if (!sessionId) {
      return { status: 401, body: { message: "Unauthorized" } };
    }

    const json = await request.json();

    console.log(json);

    const newSnippet = await db.snippet.create({
      data: {
        title: json.fileName,
        code: json.code,
        ownerId: json.userId,
      },
    });
    console.log("newSnippet", newSnippet);

    return new Response(JSON.stringify({ message: "Snippet created" }));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
