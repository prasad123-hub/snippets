import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function DELETE(request: Request) {
  const { userId, sessionId } = auth();
  try {
    const snippetId = request.url.split("/")[5];

    console.log("snippetId", snippetId);

    if (!sessionId) {
      return { status: 401, body: { message: "Unauthorized" } };
    }

    const snippetToDelete = await db.snippet.findUnique({
      where: {
        id: snippetId,
      },
    });

    if (!snippetToDelete) {
      return new Response(null, { status: 404 });
    }

    const snippet = await db.snippet.delete({
      where: {
        id: snippetId,
      },
    });

    return new Response(JSON.stringify({ message: "Snippet deleted" }));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const { userId, sessionId } = auth();
  try {
    const json = await request.json();

    if (!sessionId) {
      return { status: 401, body: { message: "Unauthorized" } };
    }

    const snippetToUpdate = await db.snippet.findUnique({
      where: {
        id: json.snippetId,
      },
    });

    if (!snippetToUpdate) {
      return new Response(null, { status: 404 });
    }

    const snippet = await db.snippet.update({
      where: {
        id: json.snippetId,
      },
      data: {
        title: json.fileName,
        code: json.code,
      },
    });

    return new Response(JSON.stringify({ message: "Snippet updated" }));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
