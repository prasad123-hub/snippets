import React from "react";
import { BarChart, TerminalSquare, Wallet } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-64 min-h-min border-r bg-white px-5 py-8">
      <div className="mt-6 flex h-full flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-gray-900">
              Dashboard
            </label>
            <Link href="/dashboard">
              <span className="mt-4 flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700">
                <BarChart className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">
                  Create New Snippet
                </span>
              </span>
            </Link>
            <Link href="/dashboard/saved-snippet">
              <span className="mt-2 flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700">
                <Wallet className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Saved Snippets</span>
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
}
