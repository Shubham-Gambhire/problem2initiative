import { INITIATIVES, PROBLEMS, type Rating, band, ratingLabel, score } from "@/data/p2i";

export type Ratings = Record<string, { impact?: Rating; effort?: Rating }>;
export type Step = "problems" | "initiatives" | "results";

export const STORAGE_KEY = "p2i.session.v1";

const VALID_RATINGS: Rating[] = ["H", "M", "L"];
const VALID_IDS = new Set(INITIATIVES.map((i) => i.id));

const isRating = (v: unknown): v is Rating =>
  typeof v === "string" && VALID_RATINGS.includes(v as Rating);

export type Session = {
  step: Step;
  selected: number[];
  ratings: Ratings;
  freeText: string;
};

export function sanitiseSelected(input: unknown): number[] {
  if (!Array.isArray(input)) return [];
  return [...new Set(input)]
    .filter((n): n is number => typeof n === "number" && Number.isInteger(n))
    .filter((n) => n >= 0 && n < PROBLEMS.length)
    .slice(0, 3);
}

export function sanitiseRatings(input: unknown): Ratings {
  if (!input || typeof input !== "object") return {};
  const out: Ratings = {};
  for (const [id, value] of Object.entries(input as Record<string, unknown>)) {
    if (!VALID_IDS.has(id) || !value || typeof value !== "object") continue;
    const v = value as { impact?: unknown; effort?: unknown };
    const entry: { impact?: Rating; effort?: Rating } = {};
    if (isRating(v.impact)) entry.impact = v.impact;
    if (isRating(v.effort)) entry.effort = v.effort;
    if (entry.impact || entry.effort) out[id] = entry;
  }
  return out;
}

/* ---------- localStorage persistence ---------- */

export function loadSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Session>;
    const selected = sanitiseSelected(parsed.selected);
    if (selected.length === 0) return null;
    const step: Step =
      parsed.step === "initiatives" || parsed.step === "results" ? parsed.step : "problems";
    return {
      step,
      selected,
      ratings: sanitiseRatings(parsed.ratings),
      freeText: typeof parsed.freeText === "string" ? parsed.freeText.slice(0, 2000) : "",
    };
  } catch {
    return null;
  }
}

export function saveSession(session: Session) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    /* storage unavailable (private mode / quota) - progress simply is not saved */
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/* ---------- shareable URL encoding ---------- */

export function encodeProblems(selected: number[]): string {
  return selected.join("-");
}

export function decodeProblems(value: unknown): number[] {
  if (typeof value !== "string" || !value) return [];
  return sanitiseSelected(value.split("-").map((n) => Number(n)));
}

export function encodeRatings(ratings: Ratings): string {
  return Object.entries(ratings)
    .filter(([, v]) => v.impact && v.effort)
    .map(([id, v]) => `${id}:${v.impact}${v.effort}`)
    .join(",");
}

export function decodeRatings(value: unknown): Ratings {
  if (typeof value !== "string" || !value) return {};
  const draft: Record<string, { impact: string; effort: string }> = {};
  for (const part of value.split(",")) {
    const [id, pair] = part.split(":");
    if (!id || !pair || pair.length !== 2) continue;
    draft[id] = { impact: pair[0]!, effort: pair[1]! };
  }
  return sanitiseRatings(draft);
}

export function buildShareUrl(selected: number[], ratings: Ratings): string {
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  const params = new URLSearchParams({
    p: encodeProblems(selected),
    r: encodeRatings(ratings),
  });
  return `${origin}/prioritise?${params.toString()}`;
}

/* ---------- CSV export ---------- */

const csvCell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;

export function buildCsv(selected: number[], ratings: Ratings): string {
  const rows: string[] = [];
  rows.push(["Rank", "Initiative", "Impact", "Effort", "Score", "Priority band"].map(csvCell).join(","));
  const scored = INITIATIVES.filter((i) => ratings[i.id]?.impact && ratings[i.id]?.effort)
    .map((i) => {
      const r = ratings[i.id]!;
      const s = score(r.impact!, r.effort!);
      return { name: i.name, impact: r.impact!, effort: r.effort!, s, label: band(s).label };
    })
    .sort((a, b) => b.s - a.s);

  scored.forEach((item, idx) => {
    rows.push(
      [idx + 1, item.name, ratingLabel(item.impact), ratingLabel(item.effort), item.s, item.label]
        .map(csvCell)
        .join(","),
    );
  });
  rows.push("");
  rows.push([csvCell("Selected problems"), csvCell(selected.map((i) => PROBLEMS[i]).join(" | "))].join(","));
  return rows.join("\r\n");
}

export function downloadCsv(selected: number[], ratings: Ratings) {
  if (typeof window === "undefined") return;
  const blob = new Blob([`\uFEFF${buildCsv(selected, ratings)}`], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "p2i-prioritised-initiatives.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
