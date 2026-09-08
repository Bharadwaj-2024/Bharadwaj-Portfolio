"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navItems = [
  ["My story", "story"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Resume", "resume"],
  ["Let's connect", "contact"],
];

const S = { fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const EyeIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M8 32c8-12 15-18 24-18s16 6 24 18c-8 12-15 18-24 18S16 44 8 32z" {...S} />
    <circle cx="32" cy="32" r="8" {...S} />
    <path d="M32 32h.01" {...S} />
    <path d="M6 12h10M6 12v8M58 12H48M58 12v8M6 52h10M6 52v-8M58 52H48M58 52v-8" {...S} />
  </svg>
);

const PrinterIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M20 12h24v10H20z" {...S} />
    <path d="M14 26h36v16H14z" {...S} />
    <path d="M20 42v10h24V42" {...S} />
    <path d="M44 34h.01" {...S} />
  </svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M30 6L14 34h13l-6 24 23-30H31l6-22z" {...S} />
  </svg>
);

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

const projects = [
  {
    name: "Deepfake Detection",
    type: "AI / Full stack",
    description: "AI video analysis using a ResNeXt CNN and LSTM pipeline, delivered through a full-stack MERN application.",
    tags: ["Python", "React", "Node.js", "Docker"],
    Icon: EyeIcon,
  },
  {
    name: "FlashPrint",
    type: "Product / Platform",
    description: "A campus printing platform with uploads, live order tracking, role-based access, and an administrative dashboard.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    Icon: PrinterIcon,
  },
  {
    name: "MockMaster AI",
    type: "Developer tooling",
    description: "An AI-powered REST API and realistic mock-data generator that earned third place at the OVERCLKOCCK Hackathon.",
    tags: ["JavaScript", "REST API", "AI"],
    Icon: BoltIcon,
  },
];

const skills = [
  { title: "Frontend", text: "React, Next.js, TypeScript, JavaScript, HTML and modern CSS.", Icon: MonitorIcon },
  { title: "Backend", text: "Node.js, Express, REST APIs, PostgreSQL and MongoDB.", Icon: ServerIcon },
  { title: "AI & Data", text: "Python, machine learning, CNN/LSTM workflows and data analysis.", Icon: ChipIcon },
  { title: "Tools", text: "Git, Docker, Figma, Linux and collaborative product development.", Icon: SlidersIcon },
];

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
    <path d="M4 12h15M14 7l5 5-5 5" fill="none" stroke="currentColor" strokeLinecap="square" />
  </svg>
);

const Seal = ({ small = false }: { small?: boolean }) => (
  <div className={`seal${small ? " seal-small" : ""}`} aria-label="By order of Bharadwaj seal">
    <svg viewBox="0 0 180 180" role="img" aria-hidden="true">
      <defs><path id={small ? "sealPathSmall" : "sealPath"} d="M 24,90 A 66,66 0 1,1 156,90 A 66,66 0 1,1 24,90" /></defs>
      <circle cx="90" cy="90" r="83" /><circle cx="90" cy="90" r="69" /><circle cx="90" cy="90" r="47" />
      <text><textPath href={`#${small ? "sealPathSmall" : "sealPath"}`} startOffset="2%">BY ORDER OF THE · BY ORDER OF THE · </textPath></text>
      <path className="seal-figure" d="M54 132c5-25 17-35 28-39l-5-8c-3-4-3-10-1-15l2-8c2-10 9-16 20-16 13 0 21 8 22 21l-2 16-7 11c12 5 23 17 27 38zM68 60c10-13 35-17 52-7l-4 9H78z" />
      <path className="seal-tie" d="M86 98h9l4 24-9 10-8-10z" />
      <text className="seal-year" x="90" y="151">EST. 2024</text>
    </svg>
  </div>
);

function Loader({ leaving }: { leaving: boolean }) {
  return (
    <div className={`loader${leaving ? " loader-leaving" : ""}`} aria-hidden="true">
      <div className="loader-grain" />
      <p>By order of the</p>
      <div className="loader-title"><span>BHARADWAJ&apos;S</span><strong>PORTFOLIO</strong></div>
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
    const elements = document.querySelectorAll(".reveal");
    elements.forEach((element) => observer.observe(element));
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
        <a className="brand" href="#home" aria-label="Bharadwaj home"><b>BR</b><span>Est. 2024</span></a>
        <nav aria-label="Primary navigation">
          {navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <a className="header-cta" href="mailto:bharadwajbhadraroy@gmail.com"><i /> Available for work</a>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <Image className="hero-image" src="/thomas-shelby-hero.jpg" alt="A sharply dressed man in a cap walking with purpose" fill priority sizes="100vw" />
        <div className="hero-shade" /><div className="grain" aria-hidden="true" />
        <p className="hero-topline"><span>Bengaluru, India</span><b>Portfolio · MMXXVI</b><span>CS Engineer</span></p>
        <div className="hero-copy" id="main-content">
          <p className="eyebrow light">Engineer · Builder · Problem solver</p>
          <h1 id="hero-title"><span>Bharadwaj</span><strong>B R</strong></h1>
          <p className="hero-statement">I turn ambitious ideas into intelligent, dependable digital products.</p>
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
            <div className="portrait-photo"><Image src="/thomas-shelby-hero.jpg" alt="Cinematic portrait" fill sizes="(max-width: 700px) 80vw, 35vw" /></div>
            <p><b><FingerprintIcon /> Verified</b><span>Computer Science Engineer<br />Bengaluru, India</span></p>
            <div className="portrait-stamp"><Seal small /></div>
          </div>
          <div className="story-copy">
            <p className="eyebrow light">A little about me</p>
            <h2 id="story-title">Curiosity built<br /><em>the engineer.</em></h2>
            <p className="lead">I am Bharadwaj, a computer science engineer who enjoys solving hard problems with a mix of code, design, and clear thinking.</p>
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
          <h2 id="skills-title">Tools of<br /><em>the trade.</em></h2>
        </div>
        <div className="skill-grid reveal">
          {skills.map(({ title, text, Icon }) => <article key={title}><div className="skill-mark"><Icon /></div><h3>{title}</h3><p>{text}</p><i /></article>)}
        </div>
      </section>

      <section className="projects dark-section" id="projects" aria-labelledby="projects-title">
        <div className="section-index">Selected projects <span>Case files</span></div>
        <div className="projects-heading reveal">
          <div><p className="eyebrow light">Confidential record</p><h2 id="projects-title">Selected<br /><em>operations.</em></h2></div>
          <p>Products built to learn, solve real problems, and create a measurable result.</p>
        </div>
        <div className="project-grid">
          {projects.map(({ name, type, description, tags, Icon }) => (
            <article className="project-card reveal" key={name}>
              <div className="card-top"><span>Case file</span><i>Declassified</i></div>
              <div className="project-visual"><span className="visual-icon"><Icon /></span></div>
              <div className="project-body"><p>{type}</p><h3>{name}</h3><div>{description}</div></div>
              <ul>{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              <a href="#contact" aria-label={`Discuss ${name}`}>View case file <Arrow /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="resume paper-section" id="resume" aria-labelledby="resume-title">
        <div className="section-index">Resume <span>Professional record</span></div>
        <div className="resume-layout reveal">
          <div><p className="eyebrow">Full account</p><h2 id="resume-title">The complete<br /><em>dossier.</em></h2></div>
          <div className="resume-card"><span>Document / 2026</span><p>Education, experience, achievements, and the complete technical toolkit in one concise document.</p><div className="button muted-button" aria-disabled="true">Resume coming soon</div><small>PDF will be linked after the final file is provided.</small></div>
          <Seal />
        </div>
      </section>

      <section className="contact dark-section" id="contact" aria-labelledby="contact-title">
        <div className="section-index">Let&apos;s connect <span>Open channel</span></div>
        <div className="contact-content reveal">
          <p className="eyebrow light">Have an idea?</p>
          <h2 id="contact-title">Let&apos;s build<br /><em>something bold.</em></h2>
          <a className="email" href="mailto:bharadwajbhadraroy@gmail.com">bharadwajbhadraroy@gmail.com <Arrow /></a>
          <div className="contact-links"><a href="https://github.com/Bharadwaj-2024/" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/bharadwaj-bhadra-roy-526927325/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
        </div>
        <footer><span>© 2026 Bharadwaj B R</span><a href="#home">Back to top ↑</a><span>Built with purpose</span></footer>
      </section>
    </main>
  );
}
