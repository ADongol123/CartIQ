// hoc/withAuth.tsx
import { useEffect, ComponentType, ReactNode } from "react";
import { isAuthenticated } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "@/components/ui/sidebar"; // import your sidebar
import { AppSidebar } from "@/components/app-sidebar";

function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  redirectIfAuthenticated = "/dashboard"
) {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const pathname = usePathname(); // get current path

    // useEffect(() => {
    //   if (!isAuthenticated()) {
    //     // Not logged in → redirect to login
    //     router.replace("/login");
    //   } else if (pathname === "/login") {
    //     // Already logged in and trying to access login page → redirect to dashboard
    //     router.replace(redirectIfAuthenticated);
    //   }
    // }, [router, pathname]);

    // // Show nothing while redirecting
    // if (!isAuthenticated() || pathname === "/login") return null;

    // Wrap the protected component with the sidebar
    return (
      <div className="flex min-h-screen">
        <AppSidebar/>
        <main className="flex-1 p-4">
          <WrappedComponent {...props} />
        </main>
      </div>
    );
  };

  return AuthenticatedComponent;
}

export default withAuth;
