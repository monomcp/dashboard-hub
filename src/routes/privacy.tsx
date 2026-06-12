import { createFileRoute, Link } from "@tanstack/react-router";
import { Menu, ChevronUp, ShieldCheck } from "lucide-react";

import { AppsMenu } from "@/components/apps-menu";
import { AccountMenu } from "@/components/account-menu";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy" },
      {
        name: "description",
        content: "What information we collect, why we collect it and how you stay in control.",
      },
    ],
  }),
  component: PrivacyPage,
});

function LegalHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="rounded-full" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </Button>
        <span className="text-xl font-normal text-foreground">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <AppsMenu />
        <AccountMenu />
      </div>
    </header>
  );
}

function LegalFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Console
        </Link>
        <a href="#" className="hover:text-foreground">
          About
        </a>
        <Link to="/privacy" className="hover:text-foreground">
          Privacy
        </Link>
        <Link to="/terms" className="hover:text-foreground">
          Terms
        </Link>
        <a href="#" className="hover:text-foreground">
          Transparency Centre
        </a>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-border text-foreground hover:bg-muted"
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      </div>
    </footer>
  );
}

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LegalHeader title="Privacy Policy" />

      <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <h1 className="text-2xl font-normal leading-snug text-foreground sm:text-3xl">
          When you use our services, you&apos;re trusting us with your information. We understand
          that this is a big responsibility and we work hard to protect your information and put you
          in control.
        </h1>

        <p className="mt-8 leading-7 text-muted-foreground">
          This Privacy Policy is meant to help you understand what information we collect, why we
          collect it and how you can update, manage, export and delete your information.
        </p>

        <div className="mt-8 flex items-start gap-4 rounded-2xl border border-border p-4">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">Privacy Check-Up</p>
            <p className="text-sm text-muted-foreground">Looking to change your privacy settings?</p>
            <a href="#" className="text-sm text-primary hover:underline">
              Take the Privacy Check-Up
            </a>
          </div>
        </div>

        <div className="mt-8 space-y-1 border-t border-border pt-6 text-sm">
          <p className="text-muted-foreground">Effective 26 May 2026</p>
          <div className="flex flex-col gap-1 pt-3">
            <a href="#" className="text-primary hover:underline">
              Archived versions
            </a>
            <a href="#" className="text-primary hover:underline">
              Download PDF
            </a>
          </div>
        </div>

        <section className="mt-12 space-y-6">
          <h2 className="text-lg font-medium text-foreground">Information we collect</h2>
          <p className="leading-7 text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          <h2 className="pt-4 text-lg font-medium text-foreground">Why we collect data</h2>
          <p className="leading-7 text-muted-foreground">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </p>

          <h2 className="pt-4 text-lg font-medium text-foreground">
            Your privacy controls
          </h2>
          <p className="leading-7 text-muted-foreground">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo.
          </p>

          <h2 className="pt-4 text-lg font-medium text-foreground">Sharing your information</h2>
          <p className="leading-7 text-muted-foreground">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
            consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
            quisquam est, qui dolorem ipsum quia dolor sit amet.
          </p>

          <h2 className="pt-4 text-lg font-medium text-foreground">Other useful resources</h2>
          <p className="leading-7 text-muted-foreground">
            The following links highlight useful resources for you to learn more about our practices
            and privacy settings. At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
            excepturi sint occaecati cupiditate non provident.
          </p>
        </section>
      </main>

      <LegalFooter />
    </div>
  );
}
