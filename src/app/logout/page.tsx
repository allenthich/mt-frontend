"use client"
import { AuthProviderHelpers } from "@/types/custom";
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext/AuthProvider";

export default function Logout() {
  const { clearClientAuthorization }: AuthProviderHelpers = useAuthContext();

  // TODO: Retain programmatic log out without redirect
  // Perform log out on arrival
  useEffect(() => {
    clearClientAuthorization()
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden w-9/12">
      <div className="m-auto w-full rounded-md bg-white p-6 shadow-xl max-w-sm">
        <h1 className="text-center text-2xl text-gray-700">
          Logged out!
        </h1>
      </div>
    </div>
  );
}