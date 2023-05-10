"use client";

import React from "react";
import { langs } from "@uiw/codemirror-extensions-langs";
import * as themes from "@uiw/codemirror-themes-all";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { format } from "@/lib/format";
import exportAsImage from "@/lib/download";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const DEFAULT_BASE_SETUP = {
  foldGutter: false,
  highlightActiveLine: false,
  highlightActiveLineGutter: false,
  indentOnInput: true,
  lineNumbers: false,
  syntaxHighlighting: true,
  tabSize: 4,
};

export const clsx = (...classNames: string[]) =>
  classNames.filter(Boolean).join(" ");

export function SnippetCodeEditor({
  snippet,
}: {
  snippet: {
    code: string;
    title: string;
    ownerId: string;
  };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [fileName, setFileName] = React.useState("Untitled");
  const [code, setCode] = React.useState(snippet.code);

  return (
    <div className="border p-10 roounded-md w-full mt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{snippet.title}</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              exportAsImage(
                document.getElementById("#single-snippet"),
                snippet.title
              );
            }}
            className="rounded-md border border-green-600 px-3 py-2 text-sm font-semibold text-green-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Download
          </button>
          <button
            type="button"
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Delete
          </button>
        </div>
      </div>
      <div
        id="#single-snippet"
        className="relative mt-4 min-h-min w-full rounded-md bg-purple-600 p-8"
      >
        <div className="bg-black flex items-center space-x-2 p-3 rounded-t-md">
          <span className="block w-3 h-3 bg-red-600 rounded-full"></span>
          <span className="block w-3 h-3 bg-yellow-600 rounded-full"></span>
          <span className="block w-3 h-3 bg-green-600 rounded-full"></span>
        </div>
        <CodeMirror
          className={clsx("CodeMirror__Main__Editor")}
          theme={themes["githubDark"]}
          value={format(code)}
          extensions={[langs.javascript(), EditorView.lineWrapping]}
          style={{
            fontSize: "14px",

            boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          }}
          basicSetup={{
            ...DEFAULT_BASE_SETUP,
          }}
          readOnly
          indentWithTab
        />
      </div>
    </div>
  );
}
