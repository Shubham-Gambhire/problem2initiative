import { Link, createFileRoute } from "@tanstack/react-router";

import { Prioritiser } from "@/components/prioritiser/Prioritiser";

type SearchParams = { example: boolean };

const OG_IMAGE = "https://problem2initiative.lovable.app/favicon.png";

export const Route = createFileRoute("/prioritise")({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      example: search["example"] === true || search["example"] === "true",
    };
  },
  head: () => ({
    meta: [
      { title: "Prioritise digital initiatives | P2I" },
      {
        name: "description",
        content:
          "Select up to three supply chain problems, rate the mapped digital initiatives on impact and effort, and see a transparent priority ranking.",
      },
      { property: "og:title", content: "Prioritise digital initiatives | P2I" },
      {
        property: "og:description",
        content:
          "A three-step, rules-based prioritisation: pick your problems, rate impact and effort, get ranked initiatives.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/prioritise" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "/prioritise" }],
  }),
  component: PrioritisePage,
  errorComponent: PrioritiseError,
});

function PrioritisePage() {
  const { example } = Route.useSearch();

  return <Prioritiser example={example} />;
}

function PrioritiseError() {
  return (
    <section className="rounded-xl border border-border bg-surface p-6 text-center">
      <h1 className="text-xl font-semibold text-heading">The prioritiser could not load</h1>
      <p className="mt-2 text-sm text-subtle">
        The link may be incomplete or out of date. Start a fresh prioritisation instead.
      </p>
      <Link
        to="/prioritise"
        search={{ example: false }}
        className="mt-4 inline-block rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-brand-700"
      >
        Start over
      </Link>
    </section>
  );
}
