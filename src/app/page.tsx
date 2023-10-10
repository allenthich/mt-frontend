"use client";
import { AuthProviderHelpers } from "@/types/custom";
import { useAuthContext } from "@/context/AuthContext/AuthProvider";
import Link from "next/link";

export default function Home() {
  const { isAuthorized }: AuthProviderHelpers = useAuthContext();
  return (
    <div className="relative flex min-h-screen w-9/12 flex-col justify-center overflow-hidden">
      <div className="m-auto w-full max-w-sm rounded-md bg-white p-6 text-center shadow-xl">
        <h1 className="text-center text-2xl text-gray-700 py-6">Welcome</h1>
        {isAuthorized ? (
          <Link
            href="/tasks"
            className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
          >
            View tasks
          </Link>
        ) : (
          <p className="mt-8 text-center text-xs font-light text-gray-700">
            {" "}
            Task managing awaits.{" "}
          </p>
        )}
      </div>
    </div>
  );
}
