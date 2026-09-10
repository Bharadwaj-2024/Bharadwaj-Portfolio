"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProjectGallery from "@/components/project-gallery";

const navItems = [
  ["My story", "story"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Resume", "resume"],
  ["Let's connect", "contact"],
];

const S = { fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const MonitorIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M8 12h48v28H8z" {...S} />
    <path d="M26 52h12M32 40v12" {...S} />
    <path d="M22 21l-6 6 6 6M42 21l6 6-6 6" {...S} />
  </svg>
);

const ServerIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M8 10h48v16H8zM8 38h48v16H8z" {...S} />
    <path d="M14 18h.01M14 46h.01M26 18h20M26 46h20" {...S} />
  </svg>
);

const ChipIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M20 20h24v24H20z" {...S} />
    <path d="M28 28h8v8h-8z" {...S} />
    <path d="M26 8v12M38 8v12M26 44v12M38 44v12M8 26h12M8 38h12M44 26h12M44 38h12" {...S} />
  </svg>
);

const SlidersIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M10 20h44M10 32h44M10 44h44" {...S} />
    <circle cx="22" cy="20" r="5" {...S} />
    <circle cx="42" cy="32" r="5" {...S} />
    <circle cx="26" cy="44" r="5" {...S} />
  </svg>
);

const StackIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M32 6L58 18 32 30 6 18z" {...S} />
    <path d="M6 32l26 12 26-12M6 46l26 12 26-12" {...S} />
  </svg>
);

const MedalIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M22 6l10 18 10-18" {...S} />
    <circle cx="32" cy="40" r="12" {...S} />
    <circle cx="32" cy="40" r="5" {...S} />
  </svg>
);

const FingerprintIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M32 12a20 20 0 0 1 20 20c0 7-1 13-4 18" {...S} strokeWidth={2.4} />
    <path d="M32 12a20 20 0 0 0-20 20c0 9 2 16 6 21" {...S} strokeWidth={2.4} />
    <path d="M32 21a11 11 0 0 1 11 11v10" {...S} strokeWidth={2.4} />
    <path d="M32 21a11 11 0 0 0-11 11v14" {...S} strokeWidth={2.4} />
    <path d="M32 30a3 3 0 0 1 3 3v14" {...S} strokeWidth={2.4} />
    <path d="M32 30a3 3 0 0 0-3 3v14" {...S} strokeWidth={2.4} />
  </svg>
);

const coreStack = ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "Modern CSS"];

const skills: { title: string; text: string; tags: string[]; featured?: boolean; Icon: typeof MonitorIcon }[] = [
  { title: "Frontend", text: "Interfaces that feel instant, accessible and pixel-precise.", tags: coreStack, featured: true, Icon: MonitorIcon },
  { title: "Backend", text: "APIs and data layers built to hold under real pressure.", tags: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"], Icon: ServerIcon },
  { title: "AI & Data", text: "Applied machine learning, from notebook to product.", tags: ["Python", "Machine Learning", "CNN / LSTM", "Data Analysis"], Icon: ChipIcon },
  { title: "Tools", text: "The workflow that keeps research, build and shipping smooth.", tags: ["Git", "Docker", "Figma", "Linux"], Icon: SlidersIcon },
];

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
    <path d="M4 12h15M14 7l5 5-5 5" fill="none" stroke="currentColor" strokeLinecap="square" />
  </svg>
);

const Seal = ({ small = false }: { small?: boolean }) => (
  <div className={`seal${small ? " seal-small" : ""}`} role="img" aria-label="By order of Bharadwaj seal">
    <Image src="/stamp.jpeg" alt="" fill sizes="(max-width: 700px) 30vw, 13rem" />
  </div>
);

function Loader({ leaving }: { leaving: boolean }) {
  return (
    <div className={`loader${leaving ? " loader-leaving" : ""}`} aria-hidden="true">
      <div className="loader-grain" />
      <p>By order of</p>
      <div className="loader-title"><span>BHARADWAJ</span></div>
      <div className="loader-rule"><i /></div>
      <small>Bengaluru · MMXXVI</small>
    </div>
  );
}

export default function Home() {
  const [loaderState, setLoaderState] = useState<"visible" | "leaving" | "hidden">("visible");

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setLoaderState("leaving"), 2200);
    const hideTimer = window.setTimeout(() => setLoaderState("hidden"), 3000);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <main>
      {loaderState !== "hidden" && <Loader leaving={loaderState === "leaving"} />}
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <a className="brand" href="#home" aria-label="BBR — Bharadwaj home"><b>BB<i>R</i></b><span>Est. 2024</span></a>
        <nav aria-label="Primary navigation">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <a className="header-cta" href="mailto:bharadwajbhadraroy@gmail.com"><i /> Available for work</a>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <Image className="hero-image" src="/thomas-shelby-hero.jpg" alt="A sharply dressed man in a cap walking with purpose" fill priority sizes="100vw" />
        <div className="hero-shade" /><div className="grain" aria-hidden="true" />
        <p className="hero-topline"><span>Bengaluru, India</span><b>Portfolio · MMXXVI</b><span>Developer &amp; Entrepreneur</span></p>
        <div className="hero-copy" id="main-content">
          <p className="eyebrow light">Developer · Entrepreneur · Problem solver</p>
          <h1 id="hero-title"><span>Bharadwaj</span><strong>B R</strong></h1>
          <p className="hero-statement">I speak two languages fluently — the language of business, and the language that runs underneath it. Most men only know one.</p>
          <div className="hero-actions">
            <a className="button paper-button" href="#projects">Inspect my work <Arrow /></a>
            <a className="text-link light-link" href="#story">Read my story <span>↓</span></a>
          </div>
        </div>
        <div className="hero-seal"><Seal small /></div>
        <p className="hero-note">Precision in thought. Purpose in every build.</p>
      </section>

      <section className="story dark-section" id="story" aria-labelledby="story-title">
        <div className="section-index">My story <span>Personal dossier</span></div>
        <div className="story-grid reveal">
          <div className="portrait-frame">
            <div className="portrait-photo">
              <Image className="portrait-img" src="/baradwaj_image.jpeg" alt="Portrait of Bharadwaj B R" fill sizes="(max-width: 700px) 80vw, 35vw" />
            </div>
            <p><b><FingerprintIcon /> Verified</b><span>Developer &amp; Entrepreneur<br />Bengaluru, India</span></p>
            <div className="portrait-stamp"><Seal small /></div>
          </div>
          <div className="story-copy">
            <p className="eyebrow light">A little about me</p>
            <h2 id="story-title">Curiosity built<br /><em>the engineer.</em></h2>
            <p className="lead">I started out just curious — pulling things apart to see how they worked. That curiosity turned into a craft, and the craft turned into a career built one hard problem at a time.</p>
            <div className="story-columns">
              <p>My work moves between full-stack products and applied AI. I care about the details users notice and the engineering decisions they never have to see.</p>
              <p>Outside the editor, I explore emerging technology, sharpen my product instincts, and look for teams building work that matters.</p>
            </div>
            <dl className="facts">
              <div><dt><StackIcon /></dt><dd>Featured builds</dd></div>
              <div><dt><ChipIcon /></dt><dd>Technologies</dd></div>
              <div><dt><MedalIcon /></dt><dd>Hackathon podium</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="skills paper-section" id="skills" aria-labelledby="skills-title">
        <div className="section-index">Skills &amp; craft <span>Working arsenal</span></div>
        <div className="section-heading reveal">
          <p className="eyebrow">Capabilities</p>
          <h2 id="skills-title">Technologies<br /><em>of the trade.</em></h2>
        </div>
        <div className="core-strip reveal" aria-label="Core technologies">
          <div className="core-strip-label">Core stack</div>
          <div className="core-strip-track">
            <div className="core-strip-row ghost" aria-hidden="true">
              {[...coreStack, ...coreStack].map((tech, i) => <span key={`ghost-${i}`}>{tech}<i /></span>)}
            </div>
            <div className="core-strip-row">
              {[...coreStack, ...coreStack].map((tech, i) => <span key={`${tech}-${i}`}>{tech}<i /></span>)}
            </div>
          </div>
        </div>
        <div className="skill-grid reveal">
          {skills.map(({ title, text, tags, featured, Icon }) => (
            <article key={title} className={featured ? "skill-featured" : undefined}>
              <div className="skill-mark"><Icon /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              {featured && <div className="skill-glow" aria-hidden="true" />}
              <ul className="skill-tags">
                {tags.map((tag) => <li key={tag} className={featured ? "tag-hot" : undefined}>{tag}</li>)}
              </ul>
              <i />
            </article>
          ))}
        </div>
      </section>

      <section className="projects dark-section" id="projects" aria-labelledby="projects-title">
        <div className="section-index">Selected projects <span>Case files</span></div>
        <div className="projects-heading reveal">
          <div><p className="eyebrow light">Confidential record</p><h2 id="projects-title">Selected<br /><em>operations.</em></h2></div>
          <p>Products built to learn, solve real problems, and create a measurable result.</p>
        </div>
        <ProjectGallery />
        <div className="projects-footer">
          <p>Three selected builds. More in the archive.</p>
          <Link className="button paper-button more-projects-link" href="/projects">More projects <Arrow /></Link>
        </div>
      </section>

      <section className="resume paper-section" id="resume" aria-labelledby="resume-title">
        <div className="section-index">Resume <span>Professional record</span></div>
        <div className="resume-layout reveal">
          <div><p className="eyebrow">Full account</p><h2 id="resume-title">The complete<br /><em>dossier.</em></h2></div>
          <div className="resume-card">
            <span>Document / Resume</span>
            <p>Education, experience, achievements, and the complete technical toolkit in one concise document.</p>
            <a className="button resume-button" href="/resume%20%281%29.pdf" target="_blank" rel="noopener noreferrer" aria-label="View Bharadwaj's resume PDF (opens in a new tab)">View resume <Arrow /></a>
            <small>PDF · Opens in a new tab</small>
          </div>
          <Seal />
        </div>
      </section>

      <section className="contact dark-section" id="contact" aria-labelledby="contact-title">
        <div className="section-index">Let&apos;s connect <span>Open channel</span></div>
        <div className="contact-layout">
          <div className="contact-content reveal">
            <p className="eyebrow light">Have an idea?</p>
            <h2 id="contact-title">Let&apos;s build<br /><em>something bold.</em></h2>
            <a className="email" href="mailto:bharadwajbhadraroy@gmail.com">bharadwajbhadraroy@gmail.com <Arrow /></a>
            <div className="contact-links">
              <a href="https://github.com/Bharadwaj-2024/" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">GitHub <span aria-hidden="true">↗</span></a>
              <a href="https://www.linkedin.com/in/bharadwaj-bhadra-roy-526927325/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">LinkedIn <span aria-hidden="true">↗</span></a>
              <a href="https://x.com/BhadraBsr" target="_blank" rel="noopener noreferrer" aria-label="X (opens in a new tab)">X <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <figure className="contact-art reveal">
            <div className="contact-photo">
              <Image className="contact-image" src="/peaky%20blinders_grop.png" alt="Three figures in Peaky Blinders style walking together along a lamplit street" fill sizes="(max-width: 980px) 90vw, 43vw" />
            </div>
          </figure>
        </div>
        <footer><span>© 2026 Bharadwaj B R</span><a href="#home">Back to top ↑</a><span>Built with purpose</span></footer>
      </section>
    </main>
  );
}
