import Link from "next/link";
import React from "react";

export function HeroBlock() {
  return (
    <div className="relative w-full bg-white pb-12 md:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-center items-center px-4 py-12 lg:px-6">
          <div className="mx-auto mt-8 flex max-w-max items-center space-x-2 rounded-full bg-gray-100 p-1">
            <div className="rounded-full bg-white p-1 px-2">
              <p className="text-sm font-medium">
                We&apos;d love to see what you share
              </p>
            </div>
          </div>
          <h1 className="text-center mt-8 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
            Code. Snip. Share.
          </h1>
          <p className="mt-8 max-w-4xl mx-auto text-lg text-center text-gray-700">
            Snippets is a project designed to help developers create and save
            code snippets for use in their projects. With Snippets, developers
            can easily generate and save small pieces of code
          </p>
          <Link href="/dashboard">
            <button
              type="button"
              className="max-w-sm mx-auto mt-8 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Create Snippets Now
            </button>
          </Link>
        </div>
        <div className="max-w-5xl mx-auto">
          <img
            className="bg-gray-50 object-cover h-full w-full rounded-lg"
            src="/code.png"
            alt="hero-code"
          />
        </div>
      </div>
    </div>
  );
}
