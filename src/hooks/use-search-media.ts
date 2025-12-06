import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@/core/axios";

const youtubeUrlSchema = z.object({
  url: z
    .string()
    .min(1, "Please enter a YouTube URL")
    .refine(
      (url) =>
        /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)[\w-]+/.test(
          url
        ),
      "Please enter a valid YouTube URL"
    ),
});

type FormValues = z.infer<typeof youtubeUrlSchema>;

export interface SearchResult {
  id: string;
  title: string;
  thumbnail: string;
  duration: number; // Duration in seconds
  downloadUrl: string;
}

/**
 * @description Hook to search and convert a YouTube URL to MP3
 */
export const useSearchLink = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(youtubeUrlSchema),
    defaultValues: {
      url: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (url: string): Promise<SearchResult> => {
      const response = await httpClient.get<SearchResult>("songs/search", {
        params: { url },
      });
      return response.data;
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data.url);
  };

  const reset = () => {
    form.reset();
    mutation.reset();
  };

  return {
    form,
    onSubmit,
    reset,
    result: mutation.data ?? null,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error?.message ?? null,
  };
};
