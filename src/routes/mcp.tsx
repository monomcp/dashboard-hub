import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/mcp")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/mcp" || location.pathname === "/mcp/") {
      throw redirect({ to: "/mcp/$view", params: { view: "registry" }, replace: true });
    }
  },
});
