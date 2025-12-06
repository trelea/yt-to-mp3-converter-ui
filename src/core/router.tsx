import { createBrowserRouter } from "react-router";
import { Layout } from "@/components/layout";
import ProtectedRoute from "@/components/protected-route";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Library from "@/pages/library";
import About from "@/pages/about";

/**
 * @description This is the router for the application.
 */
export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        Component: ProtectedRoute,
        children: [
          {
            path: "/library",
            Component: Library,
          },
        ],
      },
    ],
  },
]);
