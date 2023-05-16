import { appwrite } from "@/appwrite";
import { SnippetCodeEditor } from "@/components/single-snippet";
import { notFound } from "next/navigation";

interface SingleSnippetProps {
  params: {
    snippetId: string;
  };
}

export default async function SingleSnippet({ params }: SingleSnippetProps) {
  const snippet = await appwrite.databases.getDocument(
    `${process.env.NEXT_PUBLIC_REACT_APP_DATABASE_ID}`,
    `${process.env.NEXT_PUBLIC_REACT_APP_COLLECTION_ID}`,
    `${params.snippetId}`
  );

  if (!snippet) {
    notFound();
  }

  return (
    <div>
      <SnippetCodeEditor snippet={snippet} />
    </div>
  );
}
