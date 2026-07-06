import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/github")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/github" || location.pathname === "/github/") {
      throw redirect({ to: "/github/$view", params: { view: "connect" }, replace: true });
    }
  },
});
