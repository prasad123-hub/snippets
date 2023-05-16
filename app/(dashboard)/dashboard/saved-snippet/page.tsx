import { Table } from "@/components/table";

export default async function SavedSnippet() {
  return (
    <div className="w-full mt-6">
      <h1 className="text-2xl md:text-3xl font-semibold">Saved Snippets</h1>
      <p className="mt-2">Collection of snippets that you&apos;ve created.</p>
      {/* Snippet Table */}
      <Table />
    </div>
  );
}
