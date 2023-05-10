import { CodeEditor } from "@/components/code-block";

export default async function DashboardPage() {
  return (
    <div className="w-full py-6">
      <h1 className="font-bold text-2xl md:text-3xl text-black">
        Create New Snippet
      </h1>
      <p className="text-bas max-w-2xl mt-6">
        Create a new snippet by copy pasting your code into the editor below.
        You can also download and save your snippet for later use.
      </p>

      {/* Editor */}
      <div>
        <CodeEditor />
      </div>
    </div>
  );
}
