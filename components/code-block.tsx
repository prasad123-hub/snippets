"use client";

import React, { use, useEffect } from "react";
import { langs } from "@uiw/codemirror-extensions-langs";
import * as themes from "@uiw/codemirror-themes-all";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { format } from "@/lib/format";
import exportAsImage from "@/lib/download";
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

export function CodeEditor() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState("Untitled");
  const [user, setUser] = React.useState<any>();
  const [code, setCode] = React.useState(`
  import * as React from 'react'
  import { ArrowLeft } from 'lucide-react'
  
  export function LeadingIconButtons() {
    return (
      <button
        type="button"
        className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Button Text
      </button>
    )
  }
  
  `);

  async function handleSave() {
    setIsLoading(true);
    const promise = appwrite.databases.createDocument(
      `${process.env.NEXT_PUBLIC_REACT_APP_DATABASE_ID}`,
      `${process.env.NEXT_PUBLIC_REACT_APP_COLLECTION_ID}`,
      appwrite.ID.unique(),
      {
        code: code,
        title: title,
        ownerId: user.$id,
      }
    );
    promise
      .then((res) => {
        setIsLoading(false);
        toast.success("Snippet saved successfully");
        router.push("/dashboard");
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Something went wrong");
      });
  }

  useEffect(() => {
    const promise = appwrite.account.get();

    promise.then(
      function (response) {
        console.log(response);
        setUser(response);
      },
      function (error) {
        console.log(error);
      }
    );
  }, []);

  return (
    <>
      {user ? (
        <div className="border p-10 roounded-md w-full mt-10">
          <div
            id="#snippet"
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
              indentWithTab
              onChange={(value) => {
                setCode(value);
              }}
            />
          </div>
          <div className="inline-flex items-center space-x-2 p-2 border rounded-lg w-full mt-10">
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Enter File Name"
              onChange={(e) => {
                e.preventDefault();
                setTitle(e.target.value);
              }}
            ></input>
            <button
              onClick={() => {
                exportAsImage(document.getElementById("#snippet"), title);
              }}
              type="button"
              className="rounded-md border border-black/30 px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Download
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            router.push("/sign-in");
          }}
          type="button"
          className="mt-4 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Sign In First
        </button>
      )}
    </>
  );
}
