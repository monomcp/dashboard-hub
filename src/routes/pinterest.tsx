import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/pinterest")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/pinterest" || location.pathname === "/pinterest/") {
      throw redirect({ to: "/pinterest/$view", params: { view: "settings" }, replace: true });
    }
  },
});
