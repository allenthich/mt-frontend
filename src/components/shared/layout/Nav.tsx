import { useAuthContext } from "@/app/context/AuthContext/AuthProvider";
import { AuthProviderHelpers } from "@/types/custom";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const { isAuthorized }: AuthProviderHelpers = useAuthContext();
  const pathname = usePathname()

  const NavUserAuthCta = () => {
    if (pathname !== "/auth/login" && pathname !== "/registration") {
      if (!isAuthorized) {
        return (
          <Link
            href="/auth/login"
            className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
          >
            Sign In
          </Link>
        )
      } else {
        return (
          <Link
            href="/logout"
            className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
          >
            Log out
          </Link>
        )
      }
    }
  }
    
  return (
    <>
      <div className="fixed top-0 z-10 flex w-full justify-center">
        <div className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between">
          <Link href="/">Task Management</Link>
          <div>
            <NavUserAuthCta />
          </div>
        </div>
      </div>
    </>
  );
}
