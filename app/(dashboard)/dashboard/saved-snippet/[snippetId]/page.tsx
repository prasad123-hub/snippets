import { SnippetCodeEditor } from "@/components/single-snippet";
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface SingleSnippetProps {
  params: {
    snippetId: string;
  };
}

export default async function SingleSnippet({ params }: SingleSnippetProps) {
  const snippet = await db.snippet.findUnique({
    where: {
      id: params.snippetId,
    },
    select: {
      id: true,
      title: true,
      code: true,
      ownerId: true,
    },
  });

  if (!snippet) {
    notFound();
  }

  return (
    <div>
      <SnippetCodeEditor snippet={snippet} />
    </div>
  );
}
