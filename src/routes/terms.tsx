import { createFileRoute, Link } from "@tanstack/react-router";
import { Menu, ChevronUp } from "lucide-react";

import { AppsMenu } from "@/components/apps-menu";
import { AccountMenu } from "@/components/account-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service" },
      { name: "description", content: "The terms that govern your use of our services." },
    ],
  }),
  component: TermsPage,
});

function LegalHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0 sm:max-w-80">
            <SheetHeader className="border-b border-border px-6 py-5 text-left">
              <SheetTitle className="text-xl font-normal">Terms of Service</SheetTitle>
            </SheetHeader>
            <nav className="px-3 py-4" aria-label="Legal pages">
              <Link
                to="/privacy"
                className="block rounded-xl px-3 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                Privacy Policy
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <img
          src="/monomcp-logo-transparent.png"
          alt="MonoMCP"
          className="h-8 w-auto"
        />
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

function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LegalHeader />

      <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <div className="space-y-1 text-sm">
          <p className="text-muted-foreground">Effective 12 June 2026</p>
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
          <h1 className="text-xl font-medium">What&apos;s covered in these terms</h1>
          <p className="text-2xl font-normal leading-snug text-foreground sm:text-3xl">
            We know it&apos;s tempting to skip these Terms of Service, but it&apos;s important to
            establish what you can expect from us as you use our services, and what we expect from
            you.
          </p>

          <p className="leading-7 text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>

          <h2 className="pt-4 text-lg font-medium text-foreground">Service provider</h2>
          <p className="leading-7 text-muted-foreground">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit
            voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
            inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>

          <h2 className="pt-4 text-lg font-medium text-foreground">What you can expect from us</h2>
          <p className="leading-7 text-muted-foreground">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
            consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
            quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
            quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
            voluptatem.
          </p>

          <h2 className="pt-4 text-lg font-medium text-foreground">What we expect from you</h2>
          <p className="leading-7 text-muted-foreground">
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
            nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in
            ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat
            quo voluptas nulla pariatur.
          </p>

          <h2 className="pt-4 text-lg font-medium text-foreground">
            Making changes to these terms
          </h2>
          <p className="leading-7 text-muted-foreground">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
            voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
            occaecati cupiditate non provident. If you don&apos;t agree to the new terms, you should
            stop using the services.
          </p>
        </section>
      </main>

      <LegalFooter />
    </div>
  );
}
