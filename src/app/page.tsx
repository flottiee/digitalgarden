import { ME, SKILLS, PROJECTS, LINKS } from "@/data";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-3xl px-4 sm:px-6 py-14">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl">
        <span className="mr-2 text-accent">#</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero */}
      <section className="mx-auto flex w-full max-w-3xl flex-col items-start px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted sm:text-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Открыт к обучению и новым проектам
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Привет, я <span className="text-accent">{ME.name}</span> 👋
        </h1>
        <p className="mt-3 text-lg text-muted sm:text-xl">{ME.role}</p>
        <p className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
          {ME.tagline}
        </p>
        <p className="mt-2 text-sm text-muted sm:text-base">📍 {ME.location}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#contacts"
            className="rounded-lg bg-accent px-5 py-2.5 font-medium text-black transition-opacity hover:opacity-80"
          >
            Связаться
          </a>
          <a
            href="#projects"
            className="rounded-lg border border-border bg-card px-5 py-2.5 font-medium transition-colors hover:border-accent"
          >
            Pet-проекты
          </a>
        </div>
      </section>

      {/* Skills */}
      <Section id="skills" title="Навыки">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SKILLS.map((s) => (
            <li
              key={s.name}
              className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-accent/50"
            >
              <span className="font-medium">{s.name}</span>
              <span className="text-sm text-muted">{s.level}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Pet-проекты">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PROJECTS.map((p) => (
            <a
              key={p.title}
              href={p.link}
              target={p.link.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lg"
            >
              <h3 className="font-semibold group-hover:text-accent">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{p.description}</p>
            </a>
          ))}
        </div>
      </Section>

      {/* Contacts */}
      <Section id="contacts" title="Контакты">
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-xl border border-border bg-card px-4 py-3 text-center font-medium transition-colors hover:border-accent"
            >
              {l.label}
            </a>
          ))}
        </div>
      </Section>

      <footer className="w-full border-t border-border py-8 text-center text-sm text-muted">
        © {ME.foundedYear} {ME.name} · flottiee.bond
      </footer>
    </main>
  );
}
