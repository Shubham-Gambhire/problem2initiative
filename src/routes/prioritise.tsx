import { Link, createFileRoute } from "@tanstack/react-router";

import { Prioritiser } from "@/components/prioritiser/Prioritiser";
import { decodeProblems, decodeRatings } from "@/lib/p2i-state";

type SearchParams = { example: boolean; p?: string; r?: string };

const OG_IMAGE = "https://problem2initiative.lovable.app/favicon.png";

export const Route = createFileRoute("/prioritise")({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    const out: SearchParams = {
      example: search["example"] === true || search["example"] === "true",
    };
    if (typeof search["p"] === "string" && search["p"]) out.p = search["p"];
    if (typeof search["r"] === "string" && search["r"]) out.r = search["r"];
    return out;
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
  const { example, p, r } = Route.useSearch();
  const sharedProblems = decodeProblems(p);
  const sharedRatings = decodeRatings(r);

  return (
    <Prioritiser
      example={example}
      sharedProblems={sharedProblems}
      sharedRatings={sharedRatings}
    />
  );
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
