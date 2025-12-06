import {
  Music,
  Youtube,
  Headphones,
  Loader2,
  Download,
  LibraryBig,
} from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useSearchLink } from "@/hooks/use-search-media";
import { formatDuration } from "@/lib/utils";
import { useDownloadMedia } from "@/hooks/use-download-media";
import { useAuthStatus } from "@/hooks/use-auth-status";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStatus();
  const { form, onSubmit, reset, result, isLoading, isError, error } =
    useSearchLink();
  const { download, isLoading: isDownloading } = useDownloadMedia();

  const handleAddToLibrary = () => {
    if (!isAuthenticated) {
      toast.info("Authentication required", {
        description: "Please log in to save songs to your library",
      });
      navigate("/login");
      return;
    }
    // TODO: Implement add to library API call
    toast.success("Added to library", {
      description: "Song has been saved to your library",
    });
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-12 md:mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-primary/10">
            <Headphones className="size-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          YouTube to MP3
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-md">
          Convert any YouTube video to high-quality MP3 in seconds
        </p>
      </div>

      {/* Conversion Card */}
      <Card className="max-w-4xl mx-auto border-white/10 bg-card/60 backdrop-blur-md">
        <CardContent className="pt-6">
          {!result ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                          <Input
                            placeholder="Paste YouTube URL here..."
                            className="h-12 pl-11 pr-4 text-base"
                            disabled={isLoading}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isError && error && (
                  <p className="text-destructive text-sm text-center">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 text-base"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <Music className="size-5" />
                      Convert to MP3
                    </>
                  )}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="space-y-6">
              {/* Result Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Video Embed */}
                <div className="md:col-span-2 rounded-lg overflow-hidden">
                  <AspectRatio ratio={16 / 9}>
                    <iframe
                      src={`https://www.youtube.com/embed/${result.id}`}
                      title={result.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </AspectRatio>
                </div>

                {/* Info & Actions */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg md:text-xl mb-2">
                      {result.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Duration: {formatDuration(result.duration)}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 mt-6">
                    <Button
                      size="lg"
                      className="h-11"
                      onClick={() => download(form.getValues("url"), result.title)}
                      disabled={isDownloading}
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 className="size-5 animate-spin" />
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download className="size-5" />
                          Download MP3
                        </>
                      )}
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="h-11"
                      onClick={handleAddToLibrary}
                    >
                      <LibraryBig className="size-5" />
                      Add to Library
                    </Button>
                  </div>

                </div>
              </div>

              {/* Convert Another */}
              <Button
                variant="outline"
                size="lg"
                onClick={reset}
                className="w-full h-11"
              >
                Convert Another
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Features */}
      <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {[
          {
            title: "Fast Conversion",
            description: "Convert videos in seconds with our optimized servers",
          },
          {
            title: "High Quality",
            description: "Get crystal-clear 320kbps MP3 audio files",
          },
          {
            title: "No Registration",
            description: "Start downloading immediately, no account needed",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="text-center p-6 rounded-xl bg-card/60 backdrop-blur-md border border-white/10"
          >
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
