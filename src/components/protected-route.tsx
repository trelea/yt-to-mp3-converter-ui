import { Navigate, Outlet } from "react-router";
import { Loader2 } from "lucide-react";
import { useAuthStatus } from "@/hooks/use-auth-status";

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading, isReady } = useAuthStatus();

  // Wait until auth check is complete before making any decision
  if (isLoading || !isReady) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
