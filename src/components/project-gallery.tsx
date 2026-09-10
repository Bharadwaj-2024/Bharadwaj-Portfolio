"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { featuredProjects, otherProjects, type Project } from "@/data/projects";
import styles from "./project-gallery.module.css";

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.02 2.79-.02 3.17 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function RepoLink({ project }: { project: Project }) {
  return project.repo ? (
    <a className={styles.repoLink} href={project.repo} target="_blank" rel="noreferrer" aria-label={`View ${project.name} on GitHub (opens in a new tab)`}>
      <GithubIcon /> GitHub <span aria-hidden="true">↗</span>
    </a>
  ) : <span className={styles.repoUnavailable}><GithubIcon /> Repository not public</span>;
}

function TechStack({ tags, onMore }: { tags: string[]; onMore?: () => void }) {
  const visibleTags = onMore ? tags.slice(0, 5) : tags;
  return <ul className={styles.tags} aria-label="Tech stack">{visibleTags.map((tag) => <li key={tag}>{tag}</li>)}{onMore && tags.length > 5 && <li className={styles.moreTags}><button type="button" onClick={onMore} aria-haspopup="dialog" aria-label="View the full technology stack">+{tags.length - 5} more</button></li>}</ul>;
}

function ProjectDetails({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { Icon } = project;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    const trigger = document.activeElement;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={`detail-title-${project.id}`}
      aria-describedby={`detail-summary-${project.id}`}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className={styles.detailContent}>
        <div className={styles.detailTop}>
          <span className={styles.label}>Project dossier / {project.focus}</span>
          <button className={styles.closeButton} onClick={onClose} type="button" aria-label="Close project details">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" /></svg>
          </button>
        </div>
        <div className={styles.detailHeading}>
          <span className={styles.detailIcon} aria-hidden="true"><Icon /></span>
          <div><p className={styles.category}>{project.type}</p><h2 id={`detail-title-${project.id}`}>{project.name}</h2></div>
        </div>
        <p className={styles.detailSummary} id={`detail-summary-${project.id}`}>{project.description}</p>
        <div className={styles.detailStack}><h3 className={styles.label}>Tech stack</h3><TechStack tags={project.tags} /></div>
        <details className={styles.moreDetails}>
          <summary>More about this build <span aria-hidden="true">+</span></summary>
          <div className={styles.expandedDetails}>
            <p>{project.overview}</p>
            <h3 className={styles.label}>Inside the project</h3>
            <ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
          </div>
        </details>
        <div className={styles.detailFooter}>
          <RepoLink project={project} />
          <Link className={styles.discussLink} href="/#contact" onClick={onClose}>Discuss this project <ArrowIcon /></Link>
        </div>
      </div>
    </dialog>
  );
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (project: Project) => void }) {
  const cardRef = useRef<HTMLElement>(null);
  const { Icon } = project;

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        card.classList.add(styles.entered);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <article ref={cardRef} className={styles.card} data-tone={project.tone} style={{ "--card-delay": `${index * 100}ms` } as CSSProperties} aria-labelledby={`card-title-${project.id}`}>
      <button type="button" className={styles.cover} onClick={() => onOpen(project)} aria-label={`Explore ${project.name}`} aria-haspopup="dialog">
        <span className={styles.coverTop}><span>Case file / {String(index + 1).padStart(2, "0")}</span><span className={styles.coverStatus}>Declassified</span></span>
        <span className={styles.orbit} aria-hidden="true" />
        <span className={styles.coverIcon} aria-hidden="true"><Icon /></span>
        <span className={styles.coverBottom}><span>{project.focus}</span><span className={styles.coverArrow}><ArrowIcon /></span></span>
      </button>
      <div className={styles.cardBody}>
        <p className={styles.category}>{project.type}</p>
        <h3 id={`card-title-${project.id}`}>{project.name}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.cardStack}><span className={styles.label}>Built with</span><TechStack tags={project.tags} onMore={() => onOpen(project)} /></div>
        <div className={styles.cardActions}>
          <RepoLink project={project} />
          <button className={styles.detailsButton} type="button" onClick={() => onOpen(project)} aria-label={`View details about ${project.name}`} aria-haspopup="dialog">View details <ArrowIcon /></button>
        </div>
      </div>
    </article>
  );
}

export default function ProjectGallery({ collection = "featured" }: { collection?: "featured" | "other" }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projects = collection === "featured" ? featuredProjects : otherProjects;

  return (
    <>
      <div className={styles.grid}>{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpen={setSelectedProject} />)}</div>
      {selectedProject && <ProjectDetails project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </>
  );
}
