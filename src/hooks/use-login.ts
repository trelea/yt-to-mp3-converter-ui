import { httpClient } from "@/core/axios";
import { setToken } from "@/lib/cache-storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const response = await httpClient.post<boolean>("/auth/login", data);
      // Try both lowercase and capitalized (axios normalizes to lowercase)
      const authHeader =
        response.headers["authorization"] || response.headers["Authorization"];
      const token = authHeader?.replace("Bearer ", "");
      console.log("Login response headers:", response.headers);
      console.log("Token extracted:", token);
      return { success: response.data, token };
    },
    onSuccess: async ({ token }) => {
      if (token) {
        await setToken(token);
        console.log("Token stored, verifying...");
        const { getToken } = await import("@/lib/cache-storage");
        const storedToken = await getToken();
        console.log("Token retrieved from cache:", storedToken ? "YES" : "NO");
      }
      // Invalidate auth status to refetch with new token
      await queryClient.invalidateQueries({ queryKey: ["auth-status"] });
      toast.success("Login successful", {
        description: "Welcome back!",
      });
      navigate("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message =
        error.response?.data?.message || error.message || "Invalid credentials";
      toast.error("Login failed", {
        description: message,
      });
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    mutation.mutate(data);
  };

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
  };
};
