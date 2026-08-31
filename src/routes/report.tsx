import { createFileRoute } from "@tanstack/react-router";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import reportMarkdown from "@/content/project-report.md?raw";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "About the Project | P2I" },
      {
        name: "description",
        content:
          "The story behind P2I: the SIRI gap that sparked it, how the prioritisation logic took shape, what is real, what is planned and where it goes next.",
      },
      { property: "og:title", content: "About the Project | P2I" },
      {
        property: "og:description",
        content:
          "How P2I came to be: origins, design decisions, prioritisation logic, SCOR alignment and the roadmap ahead.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/report" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/report" }],
  }),
  component: ReportPage,
});


const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

// The markdown ships with its own table of contents. On screen the sticky
// sidebar covers that job, so strip it and render a print-only version instead.
const bodyMarkdown = reportMarkdown.replace(/### Table of Contents[\s\S]*?\n---\n/, "");

function useSections() {
  return reportMarkdown
    .split("\n")
    .filter((line) => line.startsWith("### "))
    .map((line) => {
      const title = line.replace(/^###\s+/, "").trim();
      return { title, id: slug(title) };
    });
}

function ReportPage() {
  const sections = useSections();

  return (
    <article className="fade-in">
      <header className="mb-8">
        <p className="mb-2 text-xs font-semibold tracking-wide text-brand-600 uppercase">
          About the project
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
          P2I: A Supply Chain Problem to Initiative Prioritiser
        </h1>
        <p className="mt-2 text-subtle">
          How this tool came to be: the gap it responds to, the thinking behind its prioritisation
          logic, what it does today and where it is headed.
        </p>
      </header>


      <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-10">
        <nav className="no-print mb-8 lg:sticky lg:top-8 lg:mb-0 lg:self-start">
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="mb-2 text-xs font-medium text-muted-foreground">Contents</div>
            <ol className="space-y-1.5 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-subtle hover:text-brand-700">
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h2 className="mb-4 text-2xl font-bold text-heading">{children}</h2>
              ),
              h2: ({ children }) => (
                <h2 className="mt-10 mb-3 text-xl font-bold text-heading">{children}</h2>
              ),
              h3: ({ children }) => (
                <h2
                  id={slug(String(children))}
                  className="mt-10 scroll-mt-8 mb-3 text-xl font-bold text-heading"
                >
                  {children}
                </h2>
              ),
              h4: ({ children }) => (
                <h3 className="mt-6 mb-2 text-base font-semibold text-heading">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 text-sm leading-relaxed text-subtle sm:text-base">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="mb-4 list-disc space-y-1.5 pl-5 text-sm text-subtle sm:text-base">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-4 list-decimal space-y-1.5 pl-5 text-sm text-subtle sm:text-base">
                  {children}
                </ol>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-heading">{children}</strong>
              ),
              hr: () => <hr className="my-8 border-border" />,
              blockquote: ({ children }) => (
                <blockquote className="mb-4 border-l-4 border-brand-200 pl-4 text-sm text-muted-foreground">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="rounded bg-surface-strong px-1.5 py-0.5 text-xs text-heading">
                  {children}
                </code>
              ),
              table: ({ children }) => (
                <div className="mb-6 overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm">{children}</table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-border bg-surface-strong px-3 py-2 font-semibold text-heading">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-border px-3 py-2 align-top text-subtle">{children}</td>
              ),
            }}
          >
            {reportMarkdown}
          </Markdown>
        </div>
      </div>
    </article>
  );
}
