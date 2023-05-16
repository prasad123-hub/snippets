"use client";

import { appwrite } from "@/appwrite";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export function Table({ snippetsArray }: any) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [snippets, setSnippets] = useState<any>([]);

  useEffect(() => {
    const userData = appwrite.account.get();

    userData.then(
      function (response) {
        setUser(response);
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );

    const userSavedSnippets = appwrite.databases.listDocuments(
      `${process.env.NEXT_PUBLIC_REACT_APP_DATABASE_ID}`,
      `${process.env.NEXT_PUBLIC_REACT_APP_COLLECTION_ID}`
    );

    userSavedSnippets.then(
      function (response) {
        setSnippets(response.documents);
        console.log(response);
      },
      function (error) {
        toast.error("Something went wrong");
        console.log(error);
      }
    );
  }, []);

  return (
    <>
      {user ? (
        <div className="flex flex-col py-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                {snippets.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          <span>Title</span>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                        >
                          Created At
                        </th>
                        <th scope="col" className="relative px-4 py-3.5">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {snippets.map((snippet: any) => (
                        <tr key={snippet.id}>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            {snippet.title}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                            {
                              new Date(snippet.$createdAt)
                                .toISOString()
                                .split("T")[0]
                            }
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium space-x-4">
                            <Link
                              href={`/dashboard/saved-snippet/${snippet.$id}`}
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold">No Snippets Found</h1>
                  </div>
                )}
              </div>
            </div>
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
