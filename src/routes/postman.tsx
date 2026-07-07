import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/postman")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/postman" || location.pathname === "/postman/") {
      throw redirect({
        to: "/postman/$view",
        params: { view: "collections" },
        replace: true,
      });
    }
  },
});
