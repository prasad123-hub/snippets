import Link from "next/link";

export function Table({ snippetsArray }: any) {
  return (
    <div className="mt-6 flex flex-col">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-200 md:rounded-lg">
            {snippetsArray.length > 0 ? (
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
                  {snippetsArray.map(
                    (snippet: {
                      id: string;
                      title: string;
                      createdAt: Date;
                      code: string;
                      ownerId: string;
                    }) => (
                      <tr key={snippet.id}>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                          {snippet.title}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                          {snippet.createdAt.toISOString().split("T")[0]}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium space-x-4">
                          <Link href={`/dashboard/saved-snippet/${snippet.id}`}>
                            View
                          </Link>
                        </td>
                      </tr>
                    )
                  )}
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
  );
}
