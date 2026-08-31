import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import {
  EXAMPLE_PROBLEMS,
  EXAMPLE_RATINGS,
  MAPPING,
  PROBLEMS,
  type Rating,
  band,
  ratingLabel,
  relevantInitiatives,
  score,
  suggestFromText,
  suggestNextStep,
} from "@/data/p2i";

type Step = "problems" | "initiatives" | "results";
type Ratings = Record<string, { impact?: Rating; effort?: Rating }>;

const STEP_INDEX: Record<Step, number> = { problems: 1, initiatives: 2, results: 3 };

export function Prioritiser({ example = false }: { example?: boolean }) {
  const [step, setStep] = useState<Step>("problems");
  const [selected, setSelected] = useState<number[]>([]);
  const [ratings, setRatings] = useState<Ratings>({});
  const [freeText, setFreeText] = useState("");
  const [status, setStatus] = useState("");
  const [modal, setModal] = useState<"max3" | "oob" | "persona" | null>(null);
  const [ratingError, setRatingError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!example) return;
    setSelected(EXAMPLE_PROBLEMS);
    setRatings(EXAMPLE_RATINGS);
    setModal("persona");
  }, [example]);

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }, [step]);

  const relevant = relevantInitiatives(selected);

  function toggleProblem(idx: number) {
    setSelected((prev) => {
      if (prev.includes(idx)) return prev.filter((p) => p !== idx);
      if (prev.length >= 3) {
        setModal("max3");
        return prev;
      }
      return [...prev, idx];
    });
  }

  function setRating(id: string, type: "impact" | "effort", value: Rating) {
    setRatings((prev) => ({ ...prev, [id]: { ...prev[id], [type]: value } }));
    setRatingError(false);
  }

  function handleSuggest() {
    if (!freeText.trim()) {
      setStatus("Please enter a description first.");
      return;
    }
    setStatus("Analysing…");
    window.setTimeout(() => {
      const ranked = suggestFromText(freeText);
      if (ranked.length === 0) {
        setStatus("");
        setModal("oob");
        return;
      }
      setSelected(ranked);
      setStatus(`Suggested ${ranked.length} problem(s). You can adjust the selection.`);
    }, 600);
  }

  function goToResults() {
    const incomplete = relevant.some((i) => !ratings[i.id]?.impact || !ratings[i.id]?.effort);
    if (incomplete) {
      setRatingError(true);
      return;
    }
    setStep("results");
  }

  function restart() {
    setSelected([]);
    setRatings({});
    setFreeText("");
    setStatus("");
    setStep("problems");
  }

  const scored = relevant
    .map((init) => {
      const r = ratings[init.id]!;
      const s = score(r.impact as Rating, r.effort as Rating);
      return { ...init, impact: r.impact as Rating, effort: r.effort as Rating, s, band: band(s) };
    })
    .sort((a, b) => b.s - a.s);

  function copySummary() {
    const problemsText = selected.map((i) => PROBLEMS[i]).join("\n- ");
    let text = `Supply Chain Initiative Prioritisation Summary\n============================================\n\nSelected problems:\n- ${problemsText}\n\nPrioritised initiatives (Impact + Effort score):\n\n`;
    scored.forEach((item, idx) => {
      text += `${idx + 1}. ${item.name}\n   Score: ${item.s} (${item.band.label})\n   Impact: ${ratingLabel(item.impact)} | Effort: ${ratingLabel(item.effort)}\n\n`;
    });
    text += `\nNote: This is an illustrative prioritisation from a portfolio tool. It is not a maturity assessment.`;
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    });
  }

  const currentStep = STEP_INDEX[step];

  return (
    <div>
      <Progress current={currentStep} />

      {step === "problems" && (
        <section className="fade-in">
          <div className="mb-6">
            <h1 className="mb-1 text-2xl font-bold text-heading">Select the problems you face</h1>
            <p className="text-subtle">
              Choose 1–3 problems from the curated list, or describe them in free text for a
              suggestion.
            </p>
          </div>

          <div className="mb-6 rounded-xl border border-border bg-surface p-5">
            <label
              htmlFor="free-text"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Describe your situation (optional)
            </label>
            <textarea
              id="free-text"
              rows={3}
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              placeholder="e.g. We struggle to see inventory across plants and suppliers, and lead times keep changing at short notice..."
              className="w-full rounded-lg border border-input px-3 py-2.5 text-sm focus:border-transparent focus:ring-2 focus:ring-ring focus:outline-hidden"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleSuggest}
                className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-100"
              >
                Suggest problems from my description
              </button>
              <span className="self-center text-sm text-muted-foreground">{status}</span>
            </div>
          </div>

          <div className="mb-5 min-h-10">
            <Chips selected={selected} onRemove={toggleProblem} />
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            <div className="border-b border-border bg-surface-strong px-4 py-3 text-sm font-medium text-foreground">
              Curated manufacturing supply-chain problems (select up to 3)
            </div>
            <div className="divide-y divide-border">
              {PROBLEMS.map((p, i) => {
                const checked = selected.includes(i);
                return (
                  <label
                    key={p}
                    className={`flex cursor-pointer items-start gap-3 px-4 py-3 transition hover:bg-brand-50 ${
                      checked ? "bg-brand-50" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleProblem(i)}
                      className="mt-0.5 h-4 w-4 accent-brand-600"
                    />
                    <span className="text-sm leading-snug text-foreground">{p}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Link to="/" className="text-sm font-medium text-subtle hover:text-heading">
              ← Back
            </Link>
            <button
              type="button"
              disabled={selected.length < 1 || selected.length > 3}
              onClick={() => setStep("initiatives")}
              className="rounded-xl bg-brand-600 px-6 py-2.5 font-semibold text-primary-foreground transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
            >
              Continue to initiatives →
            </button>
          </div>
        </section>
      )}

      {step === "initiatives" && (
        <section className="fade-in">
          <div className="mb-4">
            <h1 className="mb-1 text-2xl font-bold text-heading">Rate relevant initiatives</h1>
            <p className="text-subtle">
              Only initiatives linked to your selected problems are shown.
            </p>
            <p className="mt-1 text-subtle">
              Please select <strong>Impact on selected problems</strong> and{" "}
              <strong>Effort to implement</strong> for each initiative so we can prioritise them.
            </p>
          </div>

          <div className="sticky top-4 z-40 mb-6 rounded-xl border border-border bg-surface px-4 py-3 shadow-xs">
            <div className="mb-1.5 text-xs font-medium text-muted-foreground">
              Selected problems
            </div>
            <Chips selected={selected} onRemove={toggleProblem} small />
          </div>

          {ratingError && (
            <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              Please select all the options (Impact and Effort) for every initiative before viewing
              results.
            </div>
          )}

          <div className="space-y-4">
            {relevant.length === 0 && (
              <p className="text-muted-foreground">
                No initiatives mapped. Please select different problems.
              </p>
            )}
            {relevant.map((init) => {
              const r = ratings[init.id] ?? {};
              const complete = Boolean(r.impact && r.effort);
              const linked = selected
                .filter((p) => (MAPPING[p] ?? []).includes(init.id))
                .map((p) => PROBLEMS[p]);
              return (
                <div
                  key={init.id}
                  className={`rounded-xl border bg-surface p-4 ${
                    complete ? "border-border" : "border-destructive/30"
                  }`}
                >
                  <h2 className="mb-2 font-semibold text-heading">
                    {init.name}
                    {!complete && (
                      <span className="ml-1 text-destructive" title="Rating incomplete">
                        *
                      </span>
                    )}
                  </h2>
                  <p className="mb-2 text-sm text-subtle">{init.short}</p>
                  <p className="mb-3 border-l-2 border-brand-200 pl-2 text-xs text-muted-foreground">
                    {init.rationale}
                  </p>
                  <details className="mb-4">
                    <summary className="cursor-pointer text-xs text-brand-600 hover:underline">
                      Linked to your selected problems
                    </summary>
                    <p className="mt-1.5 text-xs text-muted-foreground">{linked.join(" · ")}</p>
                  </details>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <RatingGroup
                      label="Impact on selected problems"
                      order={["H", "M", "L"]}
                      value={r.impact}
                      onSelect={(v) => setRating(init.id, "impact", v)}
                    />
                    <RatingGroup
                      label="Effort to implement"
                      order={["L", "M", "H"]}
                      value={r.effort}
                      onSelect={(v) => setRating(init.id, "effort", v)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep("problems")}
              className="text-sm font-medium text-subtle hover:text-heading"
            >
              ← Back to problems
            </button>
            <button
              type="button"
              onClick={goToResults}
              className="rounded-xl bg-brand-600 px-6 py-2.5 font-semibold text-primary-foreground transition hover:bg-brand-700"
            >
              See prioritised results →
            </button>
          </div>
        </section>
      )}

      {step === "results" && (
        <Results
          scored={scored}
          selected={selected}
          copied={copied}
          onCopy={copySummary}
          onRestart={restart}
          onBack={() => setStep("initiatives")}
        />
      )}

      {modal === "max3" && (
        <Modal
          title="Maximum 3 problems"
          action="Got it"
          onClose={() => setModal(null)}
          body={
            <>
              <p className="mb-3 text-sm text-subtle">You can select a maximum of 3 problems.</p>
              <p className="mb-5 text-sm text-subtle">
                Keeping the selection focused (1–3 problems) produces a clearer, more actionable
                prioritisation. Selecting too many problems dilutes the ranking and makes it harder
                to decide where to start.
              </p>
            </>
          }
        />
      )}

      {modal === "oob" && (
        <Modal
          title="Outside current scope"
          action="Return to manual selection"
          onClose={() => setModal(null)}
          body={
            <p className="mb-5 text-sm text-subtle">
              This description falls outside the current set of problems covered by the tool. More
              problem categories are coming soon.
            </p>
          }
        />
      )}

      {modal === "persona" && (
        <Modal
          title="Mid-size discrete manufacturer"
          eyebrow="Example scenario"
          action="See the prioritised initiatives →"
          onClose={() => {
            setModal(null);
            setStep("initiatives");
          }}
          body={
            <>
              <p className="mb-3 text-sm text-subtle">
                A 400-person industrial equipment manufacturer is missing OTIF targets and carrying
                excess inventory. Planners lack a clear view of stock and shipments across two
                plants and three regional warehouses. Leadership wants to prioritise the next
                digital investments without running a full maturity assessment.
              </p>
              <p className="mb-5 text-sm text-subtle">
                <strong>Selected problems:</strong> Poor end-to-end visibility · High inventory
                levels · Low OTIF performance
              </p>
            </>
          }
        />
      )}
    </div>
  );
}

function Progress({ current }: { current: number }) {
  const labels = ["1. Problems", "2. Rate Initiatives", "3. Results"];
  return (
    <div className="mb-8 no-print">
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 text-sm">
        {labels.map((label, i) => {
          const step = i + 1;
          const state =
            step === current ? "active" : step < current ? "done" : "idle";
          return (
            <span key={label} className="flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 ${
                  state === "active"
                    ? "bg-brand-500 font-semibold text-primary-foreground"
                    : state === "done"
                      ? "bg-success-muted text-success-foreground"
                      : "bg-surface-strong text-muted-foreground"
                }`}
              >
                {label}
              </span>
              {step < labels.length && <span className="text-faint">→</span>}
            </span>
          );
        })}
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-strong">
        <div
          className="h-full rounded-full bg-brand-500 transition-all duration-300"
          style={{ width: `${current * 33.33}%` }}
        />
      </div>
    </div>
  );
}

function Chips({
  selected,
  onRemove,
  small,
}: {
  selected: number[];
  onRemove?: (idx: number) => void;
  small?: boolean;
}) {
  if (selected.length === 0) {
    return <span className="text-sm text-faint">No problems selected yet</span>;
  }
  return (
    <div className={`flex flex-wrap ${small ? "gap-1.5" : "gap-2"}`}>
      {selected.map((i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-800"
        >
          {PROBLEMS[i]}
          {onRemove && (
            <button
              type="button"
              onClick={() => onRemove(i)}
              aria-label={`Remove ${PROBLEMS[i]}`}
              className="ml-0.5 text-brand-600 hover:text-brand-800"
            >
              ×
            </button>
          )}
        </span>
      ))}
    </div>
  );
}

function RatingGroup({
  label,
  order,
  value,
  onSelect,
}: {
  label: string;
  order: Rating[];
  value: Rating | undefined;
  onSelect: (v: Rating) => void;
}) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-medium text-muted-foreground">
        {label} {!value && <span className="text-destructive">*</span>}
      </div>
      <div className="flex gap-2">
        {order.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => onSelect(v)}
            className={`flex-1 rounded-lg border py-2.5 text-sm font-medium transition-all duration-100 ${
              value === v
                ? "border-brand-500 bg-brand-500 text-primary-foreground"
                : "border-input text-subtle hover:border-brand-400"
            }`}
          >
            {ratingLabel(v)}
          </button>
        ))}
      </div>
    </div>
  );
}

type ScoredInitiative = {
  id: string;
  name: string;
  rationale: string;
  impact: Rating;
  effort: Rating;
  s: number;
  band: ReturnType<typeof band>;
};

function Results({
  scored,
  selected,
  copied,
  onCopy,
  onRestart,
  onBack,
}: {
  scored: ScoredInitiative[];
  selected: number[];
  copied: boolean;
  onCopy: () => void;
  onRestart: () => void;
  onBack: () => void;
}) {
  const groups: { label: ScoredInitiative["band"]["label"]; items: ScoredInitiative[] }[] = (
    ["Start here", "Medium priority", "Lower priority"] as const
  ).map((label) => ({ label, items: scored.filter((i) => i.band.label === label) }));

  const topSteps = scored.filter((i) => i.band.label === "Start here").slice(0, 2);

  const bandStyles: Record<
    ScoredInitiative["band"]["label"],
    { chip: string; score: string; edge: string }
  > = {
    "Start here": {
      chip: "bg-success-muted text-success-foreground",
      score: "text-success",
      edge: "border-l-4 border-l-success",
    },
    "Medium priority": {
      chip: "bg-warning-muted text-warning-foreground",
      score: "text-warning-foreground",
      edge: "",
    },
    "Lower priority": {
      chip: "bg-surface-strong text-subtle",
      score: "text-subtle",
      edge: "",
    },
  };

  const cellFor = (impact: Rating, effort: Rating) =>
    scored.filter((i) => i.impact === impact && i.effort === effort);

  const cellTone: Record<string, string> = {
    "H-L": "bg-success-muted border-success-border",
    "H-M": "bg-warning-muted border-warning-border",
    "H-H": "bg-attention-muted border-attention-border",
    "M-L": "bg-info-muted border-info-border",
  };

  return (
    <section className="fade-in">
      <div className="mb-6">
        <h1 className="mb-1 text-2xl font-bold text-heading">Prioritised initiatives</h1>
        <p className="text-subtle">
          Ranked by Impact + Effort score. Higher scores = higher priority.
        </p>
        <p className="mt-3 rounded-lg border border-border bg-surface-strong px-3 py-2 text-xs leading-relaxed text-muted-foreground">
          <span className="font-medium text-subtle">Disclaimer:</span> This is an illustration only,
          generated from your inputs and fixed rules. It is not a professional recommendation or a
          substitute for formal analysis or expert advice.
        </p>
      </div>

      <div className="mb-6 rounded-xl border border-border bg-surface px-4 py-3">
        <div className="mb-1.5 text-xs font-medium text-muted-foreground">
          Based on these problems
        </div>
        <Chips selected={selected} small />
      </div>

      {topSteps.length > 0 && (
        <div className="mb-6 rounded-xl border border-success-border bg-success-muted p-4">
          <div className="mb-3 text-sm font-semibold text-success-foreground">
            Suggested next steps
          </div>
          <div className="space-y-3">
            {topSteps.map((item, idx) => (
              <div key={item.id} className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/20 text-xs font-bold text-success-foreground">
                  {idx + 1}
                </div>
                <div>
                  <div className="text-sm font-medium text-heading">{item.name}</div>
                  <div className="text-sm text-subtle">{suggestNextStep(item.id)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-8 space-y-6">
        {groups.map(({ label, items }) =>
          items.length === 0 ? null : (
            <div key={label}>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${bandStyles[label].chip}`}
                >
                  {label}
                </span>
                <span className="text-xs text-muted-foreground">{items[0]!.band.desc}</span>
              </div>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center ${bandStyles[label].edge}`}
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-heading">{item.name}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        Impact: {ratingLabel(item.impact)} · Effort: {ratingLabel(item.effort)} ·
                        Score: {item.s}
                      </div>
                      <p className="mt-1.5 text-sm text-subtle">{item.rationale}</p>
                    </div>
                    <div className={`text-2xl font-bold ${bandStyles[label].score}`}>{item.s}</div>
                  </div>
                ))}
              </div>
            </div>
          ),
        )}
      </div>

      <div className="mb-8 rounded-xl border border-border bg-surface p-5">
        <h2 className="mb-4 text-base font-semibold text-heading">Impact–Effort Matrix</h2>
        <div className="mb-1 grid grid-cols-4 gap-1 text-center text-xs text-muted-foreground">
          <div />
          <div className="font-medium">Low Effort</div>
          <div className="font-medium">Med Effort</div>
          <div className="font-medium">High Effort</div>
        </div>
        <div className="grid grid-cols-4 gap-1">
          {(["H", "M", "L"] as Rating[]).map((impact) => (
            <div key={impact} className="contents">
              <div className="flex items-center justify-end pr-2 text-xs font-medium text-muted-foreground">
                {impact === "H" ? "High" : impact === "M" ? "Med" : "Low"} Impact
              </div>
              {(["L", "M", "H"] as Rating[]).map((effort) => {
                const names = cellFor(impact, effort);
                return (
                  <div
                    key={`${impact}-${effort}`}
                    className={`min-h-[90px] rounded-lg border p-2 text-xs ${
                      cellTone[`${impact}-${effort}`] ?? "bg-surface-strong border-border"
                    }`}
                  >
                    {names.length === 0 ? (
                      <span className="text-faint">—</span>
                    ) : (
                      names.map((n) => (
                        <div key={n.id} className="mb-0.5 font-medium text-foreground">
                          {n.name}
                        </div>
                      ))
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-faint">
          Top-left (High Impact + Low Effort) is the ideal starting zone.
        </p>
      </div>

      <div className="mb-8 rounded-xl border border-border bg-surface-strong p-5">
        <h2 className="mb-2 text-base font-semibold text-heading">Why this ranking?</h2>
        <p className="text-sm text-subtle">
          Initiatives are scored as Impact (High=3, Med=2, Low=1) + Effort (Low=3, Med=2, High=1).
          Scores of 5–6 are prioritised first because they combine meaningful impact with relatively
          lower implementation effort. The ranking is fully deterministic from your ratings — no
          black-box AI.
        </p>
        <Link
          to="/report"
          className="mt-3 inline-block text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          How this tool was designed — read the project development report →
        </Link>
      </div>

      <div className="flex flex-col gap-3 no-print sm:flex-row">
        <button
          type="button"
          onClick={onCopy}
          className="rounded-xl bg-brand-600 px-6 py-2.5 font-semibold text-primary-foreground transition hover:bg-brand-700"
        >
          Copy summary
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-xl border border-input bg-surface px-6 py-2.5 font-medium text-subtle transition hover:bg-surface-strong"
        >
          Print / Save as PDF
        </button>
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-input bg-surface px-6 py-2.5 font-medium text-subtle transition hover:bg-surface-strong"
        >
          ← Adjust ratings
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="rounded-xl border border-input bg-surface px-6 py-2.5 font-medium text-subtle transition hover:bg-surface-strong"
        >
          Start over
        </button>
      </div>
      {copied && (
        <p className="mt-2 text-sm text-success no-print">Summary copied to clipboard!</p>
      )}
      <div className="print-only mt-6 text-xs text-muted-foreground">
        Generated by P2I — A supply chain problem to initiative prioritiser. This is an illustration
        only.
      </div>
    </section>
  );
}

function Modal({
  title,
  body,
  action,
  onClose,
  eyebrow,
}: {
  title: string;
  body: React.ReactNode;
  action: string;
  onClose: () => void;
  eyebrow?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-surface p-6 shadow-xl">
        {eyebrow && (
          <div className="mb-2 text-xs font-semibold tracking-wide text-brand-600 uppercase">
            {eyebrow}
          </div>
        )}
        <h2 className="mb-3 text-lg font-semibold text-heading">{title}</h2>
        {body}
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl bg-brand-600 py-2.5 font-medium text-primary-foreground transition hover:bg-brand-700"
        >
          {action}
        </button>
      </div>
    </div>
  );
}
