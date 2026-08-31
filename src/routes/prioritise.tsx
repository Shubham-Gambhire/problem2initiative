import { createFileRoute } from "@tanstack/react-router";

import { Prioritiser } from "@/components/prioritiser/Prioritiser";

export const Route = createFileRoute("/prioritise")({
  validateSearch: (search: Record<string, unknown>) => ({
    example: search.example === true || search.example === "true" ? true : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Prioritise digital initiatives — P2I" },
      {
        name: "description",
        content:
          "Select up to three supply chain problems, rate the mapped digital initiatives on impact and effort, and see a transparent priority ranking.",
      },
      { property: "og:title", content: "Prioritise digital initiatives — P2I" },
      {
        property: "og:description",
        content:
          "A three-step, rules-based prioritisation: pick your problems, rate impact and effort, get ranked initiatives.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/prioritise" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/prioritise" }],
  }),
  component: PrioritisePage,
});

function PrioritisePage() {
  const { example } = Route.useSearch();
  return <Prioritiser example={Boolean(example)} />;
}
