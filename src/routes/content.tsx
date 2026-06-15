import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/content")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/content" || location.pathname === "/content/") {
      throw redirect({ to: "/content/$view", params: { view: "ideas" }, replace: true });
    }
  },
});
