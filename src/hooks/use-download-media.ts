import { useMutation } from "@tanstack/react-query";
import { httpClient } from "@/core/axios";

interface DownloadParams {
  url: string;
  filename: string;
}

/**
 * @description Hook to download a media file.
 */
export const useDownloadMedia = () => {
  const mutation = useMutation({
    mutationFn: async ({ url, filename }: DownloadParams) => {
      const response = await httpClient.get(
        `songs/download?url=${encodeURIComponent(url)}`,
        { responseType: "blob" }
      );

      // Create blob URL and trigger download
      const blob = new Blob([response.data], { type: "audio/mpeg" });
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${filename}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    },
  });

  const download = (url: string, filename: string) => {
    mutation.mutate({ url, filename });
  };

  return {
    download,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error?.message ?? null,
  };
};
