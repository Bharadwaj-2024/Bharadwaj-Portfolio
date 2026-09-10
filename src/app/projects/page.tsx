import type { Metadata } from "next";
import Link from "next/link";
import ProjectGallery from "@/components/project-gallery";

export const metadata: Metadata = {
  title: "More projects | Bharadwaj B R",
  description: "Explore more of Bharadwaj's builds, their technology stacks, and the work behind each project.",
};

export default function ProjectsPage() {
  return (
    <main className="project-archive">
      <a className="skip-link" href="#project-archive-content">Skip to projects</a>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="BBR — Bharadwaj home"><b>BB<i>R</i></b><span>Est. 2024</span></Link>
        <nav aria-label="Project navigation">
          <Link href="/#projects">Featured projects</Link>
          <Link href="/projects" aria-current="page">More projects</Link>
          <Link href="/#contact">Let&apos;s connect</Link>
        </nav>
        <Link className="header-cta" href="/">Back to portfolio ↗</Link>
      </header>
      <section className="archive-content dark-section" id="project-archive-content" aria-labelledby="archive-title">
        <div className="section-index">The project archive <span>Bharadwaj B R</span></div>
        <div className="archive-heading">
          <div><p className="eyebrow light">Beyond the featured work</p><h1 id="archive-title">More <em>projects.</em></h1></div>
          <p>A closer look at the other things I&apos;ve built. Explore each project, its stack, and the code behind it.</p>
        </div>
        <ProjectGallery collection="other" />
        <div className="projects-footer"><Link className="archive-back" href="/#projects"><span aria-hidden="true">←</span> Back to featured projects</Link></div>
        <footer><span>© 2026 Bharadwaj B R</span><Link href="/#contact">Let&apos;s build something</Link></footer>
      </section>
    </main>
  );
}
