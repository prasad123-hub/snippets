"use client";

import React from "react";
import { langs } from "@uiw/codemirror-extensions-langs";
import * as themes from "@uiw/codemirror-themes-all";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { format } from "@/lib/format";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { appwrite } from "@/appwrite";

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

export function SnippetCodeEditor({ snippet }: any) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [fileName, setFileName] = React.useState(snippet.title);
  const [code, setCode] = React.useState(snippet.code);
  const [update, setUpdate] = React.useState(false);

  async function handleUpdate() {
    setIsLoading(true);

    const promise = appwrite.databases.updateDocument(
      `${process.env.NEXT_PUBLIC_REACT_APP_DATABASE_ID}`,
      `${process.env.NEXT_PUBLIC_REACT_APP_COLLECTION_ID}`,
      snippet.$id,
      {
        code: code,
        title: fileName,
        ownerId: snippet.ownerId,
      }
    );

    promise
      .then((res) => {
        setIsLoading(false);
        toast.success("Snippet updated successfully");
        setUpdate(false);
        router.refresh();
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Something went wrong");
      });
  }

  async function handleDelete() {
    setIsLoading(true);

    const promise = appwrite.databases.deleteDocument(
      `${process.env.NEXT_PUBLIC_REACT_APP_DATABASE_ID}`,
      `${process.env.NEXT_PUBLIC_REACT_APP_COLLECTION_ID}`,
      snippet.$id
    );

    promise
      .then((res) => {
        setIsLoading(false);
        toast.success("Snippet deleted successfully");
        router.push("/dashboard/saved-snippet");
        router.refresh();
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Something went wrong");
      });
  }

  return (
    <div className="border p-10 roounded-md w-full mt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">{snippet.title}</h1>
        {update ? (
          <div className="flex flex-1 items-center space-x-4 px-4">
            <div className="w-full">
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                defaultValue={fileName}
                onChange={(e) => {
                  e.preventDefault();
                  setFileName(e.target.value);
                }}
              ></input>
            </div>
            <button
              onClick={handleUpdate}
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
            <button
              onClick={() => setUpdate(false)}
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={() => setUpdate(true)}
              className="rounded-md border border-green-600 px-3 py-2 text-sm font-semibold text-green-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
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
          onChange={(value) => {
            setCode(value);
          }}
          indentWithTab
        />
      </div>
    </div>
  );
}
