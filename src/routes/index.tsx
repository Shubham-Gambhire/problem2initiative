import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "P2I: Supply Chain Problem to Initiative Prioritiser" },
      {
        name: "description",
        content:
          "Start from the supply chain problems you face today and get a transparent, rules-based ranking of which digital initiatives to prioritise first.",
      },
      { property: "og:title", content: "P2I: Supply Chain Problem to Initiative Prioritiser" },
      {
        property: "og:description",
        content:
          "A problem-first decision support tool for manufacturing supply chains. Transparent Impact + Effort prioritisation, no maturity scores.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "https://problem2initiative.lovable.app/favicon.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://problem2initiative.lovable.app/favicon.png" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

function Landing() {
  const [open, setOpen] = useState(false);

  return (
    <section className="fade-in">
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-heading sm:text-5xl">P2I</h1>
        <p className="mb-3 text-base font-medium text-muted-foreground sm:text-lg">
          A supply chain problem to initiative prioritiser
        </p>
        <p className="mx-auto max-w-xl text-sm text-subtle sm:text-base">
          Start from the real operational problems you face today and get a clear, rules-based
          ranking of which digital initiatives deserve priority first.
        </p>
      </div>

      <div className="mx-auto mb-8 max-w-2xl">
        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          <span className="font-medium text-subtle">Disclaimer:</span> This is a decision-support aid
          only. It does not assess digital maturity, does not replace formal frameworks such as SIRI,
          and produces no maturity scores. Results are illustrative prioritisation suggestions based
          on user inputs.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-border bg-surface p-6 shadow-xs sm:p-8">
        <h2 className="mb-3 text-lg font-semibold text-heading">What this tool does</h2>
        <ul className="mb-6 space-y-2 text-subtle">
          {[
            "You select 1–3 manufacturing supply-chain problems (or describe them in free text)",
            "The tool shows only the digital initiatives relevant to those problems",
            "You rate each initiative’s Impact and Effort",
            "A transparent Impact + Effort score ranks the initiatives into priority bands",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="font-bold text-brand-500">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="mb-3 text-lg font-semibold text-heading">
          What this tool does <em>not</em> do
        </h2>
        <ul className="mb-6 space-y-2 text-subtle">
          {[
            "It does not measure digital maturity or produce SIRI-style scores",
            "It is not a formal diagnostic or benchmarking tool",
            "Rankings are driven solely by your ratings and fixed rules - no AI ranking",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-faint">×</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-xl border border-border bg-surface-strong p-4 text-sm text-subtle">
          <strong className="text-heading">Core question answered:</strong>
          <br />
          “Given the specific supply chain problems we are facing today, which digital initiatives
          should we prioritise first?”
        </div>
      </div>

      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          to="/prioritise"
          search={{ example: false }}
          className="rounded-xl bg-brand-600 px-8 py-3.5 text-center font-semibold text-primary-foreground shadow-xs transition hover:bg-brand-700"
        >
          Start prioritisation
        </Link>
        <Link
          to="/prioritise"
          search={{ example: true }}
          className="rounded-xl border border-input bg-surface px-8 py-3.5 text-center font-medium text-subtle transition hover:bg-surface-strong"
        >
          Try a realistic example
        </Link>
      </div>

      <div className="mt-10 text-center">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          How this works {open ? "▴" : "▾"}
        </button>
        {open && (
          <div className="mx-auto mt-4 max-w-2xl rounded-xl border border-border bg-surface p-5 text-left text-sm text-subtle">
            <p className="mb-3">
              This tool deliberately starts from <strong>problems</strong>, not from maturity scores.
              This differentiates it from formal assessments such as SIRI.
            </p>
            <p className="mb-3">
              <strong>Scoring logic (fully transparent):</strong>
            </p>
            <ul className="mb-3 list-disc space-y-1 pl-5">
              <li>Impact: High = 3, Medium = 2, Low = 1</li>
              <li>Effort: Low = 3, Medium = 2, High = 1</li>
              <li>Priority Score = Impact + Effort (range 2–6)</li>
            </ul>
            <p className="mb-2">
              <strong>Priority bands:</strong>
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>5–6 → High Impact / Lower Effort - Start here</li>
              <li>4 → Medium priority</li>
              <li>≤ 3 → Lower priority</li>
            </ul>
          </div>
        )}
        <p className="mt-6 text-sm text-muted-foreground">
          Curious how this was built?{" "}
          <Link to="/report" className="font-medium text-brand-600 hover:text-brand-700">
            About the project
          </Link>
        </p>

      </div>
    </section>
  );
}
