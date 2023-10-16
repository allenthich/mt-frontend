import { AuthProviderHelpers } from "@/types/custom";
import { clearUserAuthCookie, getUserAuthCookie } from "@/utils/cookieHandler";
import { useRouter, usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({} as AuthProviderHelpers);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // TODO: Investigate multiple calls via component updates?
    fetchIsAuthorized();
    handleAuthRedirect()
  }, [isAuthorized]);

  const updateIsAuthorized = (isAuthorized: boolean) => {
    setIsAuthorized(isAuthorized);
  };

  const handleAuthRedirect = () => {
    if (isAuthorized) {
      // Check page and redirect if necessary
      switch (pathname) {
        case "/auth/login":
          router.push("/tasks");
          break;
        default:
          break;
      }
    } else {
      // Redirect to login if we're not authorized
      switch (pathname) {
        case "/tasks":
          router.push("/auth/login");
          break;
        default:
          break;
      }
    }
  }

  // TODO: Abstract/Move to API Provider
  const fetchIsAuthorized = async () => {
    try {
      const userAuth = getUserAuthCookie();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: userAuth.token,
        },
      });

      const json = await response.json();

      if (response.status === 200) {
        const isAuthorized = json && json.validToken;

        if (isAuthorized) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      }
    } catch (e) {
      throw e;
    }
  };

  // Client side log out
  const clearClientAuthorization = () => {
    clearUserAuthCookie();
    setIsAuthorized(false);
  };

  const authProviderHelpers: AuthProviderHelpers = {
    isAuthorized,
    updateIsAuthorized,
    clearClientAuthorization,
  };

  return (
    <AuthContext.Provider value={authProviderHelpers}>
      {children}
    </AuthContext.Provider>
  );
};
