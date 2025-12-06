import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/core/axios";
import { getToken, removeToken } from "@/lib/cache-storage";

interface AuthStatus {
  id: string;
  email: string;
}

export const useAuthStatus = () => {
  const query = useQuery({
    queryKey: ["auth-status"],
    queryFn: async () => {
      console.log("Checking auth status...");
      const token = await getToken();
      console.log("Token from cache:", token ? "EXISTS" : "NULL");
      if (!token) {
        return null;
      }
      try {
        const response = await httpClient.get<AuthStatus>("/auth/status");
        console.log("Auth status response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Auth status error:", error);
        throw error;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const logout = async () => {
    try {
      await httpClient.post("/auth/logout");
    } catch {
      // Ignore errors
    } finally {
      await removeToken();
      query.refetch();
    }
  };

  // isPending is true until first fetch completes (no cached data yet)
  // isFetching is true during any fetch including refetches
  const isLoading = query.isPending || query.isFetching;

  return {
    user: query.data ?? null,
    isAuthenticated: !!query.data,
    isLoading,
    isReady: query.isFetched,
    error: query.error,
    logout,
    refetch: query.refetch,
  };
};
