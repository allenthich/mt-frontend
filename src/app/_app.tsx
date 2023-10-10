"use client"
import { Suspense } from "react";
import Nav from "@/components/shared/layout/Nav";
import { AuthProvider } from "@/context/AuthContext/AuthProvider";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Suspense fallback="...">
        <Nav />
      </Suspense>
      <div className="container mx-auto">
        <main className="mx-auto flex h-screen min-h-screen max-w-xl flex-col items-center">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
