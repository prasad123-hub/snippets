import { Table } from "@/components/table";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SavedSnippet() {
  const { userId } = auth();

  // if (!sessionId) {
  //   redirect("/");
  // }

  const snippets = await db.snippet.findMany({
    where: {
      ownerId: userId!,
    },
    select: {
      id: true,
      title: true,
      code: true,
      createdAt: true,
      ownerId: true,
    },
  });

  return (
    <div className="w-full mt-6">
      <h1 className="text-2xl md:text-3xl font-semibold">Saved Snippets</h1>
      <p className="mt-2">Collection of snippets that you&apos;ve created.</p>
      {/* Snippet Table */}
      <Table snippetsArray={snippets} />
    </div>
  );
}
