import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/instagram")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/instagram" || location.pathname === "/instagram/") {
      throw redirect({ to: "/instagram/$view", params: { view: "settings" }, replace: true });
    }
  },
});
