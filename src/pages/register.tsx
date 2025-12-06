import { Link } from "react-router";
import { Mail, Lock, Disc3, Sparkles, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRegister } from "@/hooks/use-register";

export default function Register() {
  const { form, onSubmit, isLoading } = useRegister();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-primary/80">
              <Disc3 className="size-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Trelea-Songs
            </span>
          </Link>
          <p className="text-muted-foreground text-sm">
            Create your account and start your music journey
          </p>
        </div>

        {/* Register Card */}
        <Card className="border-white/10 bg-card/60 backdrop-blur-md">
          <CardHeader className="space-y-1 pb-4">
            <h2 className="text-2xl font-semibold tracking-tight text-center">
              Create account
            </h2>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" />
                      Create account
                    </>
                  )}
                </Button>
              </form>
            </Form>

            {/* Benefits */}
            <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-white/5">
              <p className="text-xs text-muted-foreground text-center mb-2">
                With an account you get:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-primary" />
                  Personal music library
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-primary" />
                  Stream songs in-browser
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-primary" />
                  Download anytime
                </li>
              </ul>
            </div>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                Already have an account?{" "}
              </span>
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
