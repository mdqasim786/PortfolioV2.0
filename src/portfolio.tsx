import { useState, useEffect } from "react";
import type { FC, MouseEvent } from "react";

/* ─── TypeScript Interfaces ─── */

interface Skill {
  name: string;
  icon: string;
  level: number;
  category: SkillCategory;
}

type SkillCategory = "Frontend" | "Backend" | "Database" | "AI & Tools";

interface Project {
  title: string;
  desc: string;
  tags: string[];
  color: string;
  image: string;
}

interface Certification {
  title: string;
  issuer: string;
  date: string;
  placeholder?: boolean;
}

interface FooterLink {
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  visible: boolean;
}

interface ProjectCardProps extends Project {
  index: number;
  visible: boolean;
}

/* ─── Data Constants ─── */

const SKILLS: Skill[] = [
  { name: "HTML", icon: "◈", level: 98, category: "Frontend" },
  { name: "CSS", icon: "◈", level: 95, category: "Frontend" },
  { name: "JavaScript", icon: "◈", level: 85, category: "Frontend" },
  { name: "React", icon: "◈", level: 92, category: "Frontend" },
  { name: "Tailwind CSS", icon: "◈", level: 90, category: "Frontend" },
  { name: "TypeScript", icon: "◈", level: 80, category: "Frontend" },
  { name: "Node.js", icon: "◈", level: 75, category: "Backend" },
  { name: "Express", icon: "◈", level: 70, category: "Backend" },
  { name: "PHP", icon: "◈", level: 60, category: "Backend" },
  { name: "MongoDB", icon: "◈", level: 70, category: "Database" },
  { name: "Firebase", icon: "◈", level: 80, category: "Database" },
  { name: "MySQL", icon: "◈", level: 75, category: "Database" },
  { name: "Google AI Studio", icon: "◈", level: 80, category: "AI & Tools" },
  { name: "SEO Optimization", icon: "◈", level: 85, category: "AI & Tools" },
  { name: "OpenCode", icon: "◈", level: 90, category: "AI & Tools" },
  { name: "Pomelli Google Lab", icon: "◈", level: 70, category: "AI & Tools" },
  { name: "Flow Google Lab", icon:"◈", level: 70, category: "AI & Tools" }
];

const NAV_ITEMS: string[] = ["Home", "Experience", "Projects", "Skills", "Testimonials", "Contact"];

const PROJECTS: Project[] = [
  {
    title: "Apex Kick",
    desc: "Designed and developed a high-end sneakers brand landing page in React & TailwindCSS.",
    tags: ["React", "TailwindCSS", "Typescript"],
    color: "#c30010",
    image: "/proj-2.jpeg",
  },
  {
    title: "Exeton Official Website",
    desc: "Frontend Developer and UI Designer for Exeton & build a 40+ page company website.",
    tags: ["React", "TailwindCSS", "Typescript"],
    color: "#8b5cf6",
    image: "/proj-1.jpeg",
  },
  {
    title: "Quick-Bill SaaS App",
    desc: "A comprehensive billing solution for small businesses, payment tracking, and client management.",
    tags: ["Firebase", "Tailwind", "React"],
    color: "#10b981",
    image: "/img1.png",
  },
];

const CERTIFICATIONS: Certification[] = [
  { title: "Software Development Certification", issuer: "Microsoft", date: "Dec 2025", placeholder: true },
  { title: "Responsive Web Design Certification", issuer: "FreecodeCamp", date: "Oct 2025", placeholder: true },
  { title: "Front End Development Certification", issuer: "SimpliLearn", date: "Oct 2025", placeholder: true },
];

const FOOTER_LINKS: FooterLink[] = [
  {
    label: "GitHub",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    href: "https://github.com/mdqasim786",
  },
  {
    label: "LinkedIn",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    href: "https://linkedin.com/in/md-qasim",
  },
  {
    label: "Email",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    href: "mailto:mdqasim5911@gmail.com",
  },
  {
    label: "Medium",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.21 0A4.201 4.201 0 0 0 0 4.21v15.58A4.201 4.201 0 0 0 4.21 24h15.58A4.201 4.201 0 0 0 24 19.79v-1.093c-.137.013-.278.02-.422.02-2.577 0-4.027-2.146-4.09-4.832a7.592 7.592 0 0 1 .022-.708c.093-1.186.475-2.241 1.105-3.022a3.885 3.885 0 0 1 1.395-1.1c.468-.237 1.127-.367 1.664-.367h.023c.101 0 .202.004.303.01V4.211A4.201 4.201 0 0 0 19.79 0Zm.198 5.583h4.165l3.588 8.435 3.59-8.435h3.864v.146l-.019.004c-.705.16-1.063.397-1.063 1.254h-.003l.003 10.274c.06.676.424.885 1.063 1.03l.02.004v.145h-4.923v-.145l.019-.005c.639-.144.994-.353 1.054-1.03V7.267l-4.745 11.15h-.261L6.15 7.569v9.445c0 .857.358 1.094 1.063 1.253l.02.004v.147H4.405v-.147l.019-.004c.705-.16 1.065-.397 1.065-1.253V6.987c0-.857-.358-1.094-1.064-1.254l-.018-.004zm19.25 3.668c-1.086.023-1.733 1.323-1.813 3.124H24V9.298a1.378 1.378 0 0 0-.342-.047zm-1.862 3.632c-.1 1.756.86 3.239 2.204 3.634v-3.634z" />
      </svg>
    ),
    href: "https://medium.com/@muhammadqasimdev",
  },
  {
    label: "Fiverr",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.425.4c-.351.848-1.22 1.364-2.255 1.364-1.748 0-2.549-1.355-2.549-2.515 0-1.14.703-2.505 2.45-2.505 1.856 0 2.471 1.384 2.471 2.408 0 .224-.01.37-.02.477zm-1.562-.945c-.04-.42-.342-.81-.889-.81-.508 0-.81.225-.908.81h1.797zM7.508 15.44h1.416l1.767-4.874h-1.62l-.86 2.837-.878-2.837H5.72l1.787 4.874zm-6.6 0H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z" />
      </svg>
    ),
    href: "https://www.fiverr.com/s/WE4PGZ5",
  },
  {
    label: "Upwork",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
      </svg>
    ),
    href: "https://www.upwork.com/freelancers/~01285a0e9bb227f77f?mp_source=share",
  },
];

const SKILL_CATEGORIES: SkillCategory[] = ["Frontend", "Backend", "Database", "AI & Tools"];

const CATEGORY_COLORS: Record<SkillCategory, { primary: string; secondary: string }> = {
  Frontend: { primary: "#6366f1", secondary: "#8b5cf6" },
  Backend: { primary: "#10b981", secondary: "#34d399" },
  Database: { primary: "#06b6d4", secondary: "#22d3ee" },
  "AI & Tools": { primary: "#f59e0b", secondary: "#f97316" },
};

/* ─── Main Portfolio Component ─── */

const Portfolio: FC = () => {
  const [activeNav, setActiveNav] = useState<string>("Home");
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll<HTMLElement>("[data-section]");
      let current = "Home";
      let closest = Infinity;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const dist = Math.abs(rect.top - 100);
        if (rect.top < window.innerHeight && rect.bottom > 0 && dist < closest) {
          closest = dist;
          const name = section.getAttribute("data-section") || "";
          current = name.charAt(0).toUpperCase() + name.slice(1);
        }
      });
      setActiveNav(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev: Set<string>) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll<HTMLElement>("[data-section]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string): void => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveNav(id);
      setMenuOpen(false);
    }
  };

  const handleResumeDownload = (): void => {
    const link = document.createElement("a");
    link.href = "https://docs.google.com/uc?export=download&id=1ocDI7LoT8NcUQIxjumHKLBcFrTGbS5t-";
    link.setAttribute("download", "Muhammad Qasim-CV.pdf");
    link.click();
  };

  return (
    <div
      style={{
        background: "#0a0a0f",
        color: "#e2e2e8",
        fontFamily: "'Sora', sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Orbitron:wght@400;700;900&display=swap"
        rel="stylesheet"
      />

      {/* ─── Ambient Background Effects ─── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "-10%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "floatOrb 12s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "-5%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "floatOrb 15s ease-in-out infinite reverse",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "800px",
            height: "800px",
            transform: "translate(-50%,-50%)",
            background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 60%)",
            filter: "blur(100px)",
            animation: "pulse 8s ease-in-out infinite",
          }}
        />
        <svg width="100%" height="100%" style={{ opacity: 0.03, position: "absolute", inset: 0 }}>
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#6366f1" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* ─── NAV ─── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? "12px 24px" : "20px 24px",
          background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(99,102,241,0.15)" : "1px solid transparent",
          transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "18px",
            fontWeight: 700,
            background: "linear-gradient(135deg, #6366f1, #10b981)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "2px",
            cursor: "pointer",
          }}
          onClick={() => scrollTo("Home")}
        >
          {"<Muhammad Qasim />"}
        </div>

        {/* Desktop Nav Links */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {NAV_ITEMS.map((item: string) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              style={{
                background: activeNav === item ? "rgba(99,102,241,0.15)" : "transparent",
                border: activeNav === item ? "1px solid rgba(99,102,241,0.4)" : "1px solid transparent",
                color: activeNav === item ? "#6366f1" : "#a0a0b0",
                padding: "8px 18px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.5px",
                transition: "all 0.3s ease",
                fontFamily: "'Sora', sans-serif",
              }}
              onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
                if (activeNav !== item) {
                  e.currentTarget.style.color = "#e2e2e8";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }
              }}
              onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
                if (activeNav !== item) {
                  e.currentTarget.style.color = "#a0a0b0";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            flexDirection: "column",
            gap: "5px",
          }}
          className="hamburger"
        >
          {[0, 1, 2].map((i: number) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: menuOpen && i === 1 ? "transparent" : "#6366f1",
                borderRadius: "2px",
                transition: "all 0.3s ease",
                transform:
                  menuOpen && i === 0
                    ? "rotate(45deg) translate(5px,5px)"
                    : menuOpen && i === 2
                    ? "rotate(-45deg) translate(5px,-5px)"
                    : "none",
              }}
            />
          ))}
        </button>
      </nav>

      {/* ─── Mobile Menu Overlay ─── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99,
          background: "rgba(10,10,15,0.97)",
          backdropFilter: "blur(20px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
        className="mobile-menu"
      >
        {NAV_ITEMS.map((item: string, i: number) => (
          <button
            key={item}
            onClick={() => scrollTo(item)}
            style={{
              background: activeNav === item ? "rgba(99,102,241,0.15)" : "none",
              border: activeNav === item ? "1px solid rgba(99,102,241,0.4)" : "none",
              color: activeNav === item ? "#6366f1" : "#e2e2e8",
              fontSize: "22px",
              fontWeight: 600,
              cursor: "pointer",
              padding: "12px 32px",
              fontFamily: "'Sora', sans-serif",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.4s ease ${i * 0.08}s`,
              letterSpacing: "1px",
            }}
            onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.color = "#6366f1")}
            onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.color = activeNav === item ? "#6366f1" : "#e2e2e8")}
          >
            {item}
          </button>
        ))}
      </div>

      {/* ─── HERO ─── */}
      <section
        id="home"
        data-section="home"
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
          textAlign: "center",
        }}
      >
        {/* Decorative spinning ring */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "500px",
            height: "500px",
            border: "1px solid rgba(99,102,241,0.08)",
            borderRadius: "50%",
            animation: "spinSlow 40s linear infinite",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-4px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "8px",
              height: "8px",
              background: "#6366f1",
              borderRadius: "50%",
              boxShadow: "0 0 12px #6366f1",
            }}
          />
        </div>

        {/* Status badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.25)",
            borderRadius: "30px",
            padding: "8px 20px",
            marginBottom: "32px",
            animation: "fadeInDown 0.8s ease",
          }}
        >
          <span style={{ width: "8px", height: "8px", background: "#10b981", borderRadius: "50%", animation: "blink 2s infinite" }} />
          <span style={{ fontSize: "13px", color: "#10b981", fontWeight: 500, letterSpacing: "1px" }}>
            Available for opportunities
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(42px, 8vw, 82px)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "8px",
            animation: "fadeInUp 0.9s ease 0.1s both",
            letterSpacing: "-2px",
          }}
        >
          <span style={{ display: "block", color: "#ffffff" }}>Hi, I'm</span>
          <span
            style={{
              display: "block",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 40%, #10b981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginTop: "4px",
            }}
          >
            Muhammad Qasim
          </span>
        </h1>

        {/* Role */}
        <p
          style={{
            fontSize: "clamp(18px, 3vw, 24px)",
            color: "#7c7c8e",
            fontWeight: 300,
            marginBottom: "16px",
            animation: "fadeInUp 0.9s ease 0.25s both",
            letterSpacing: "0.5px",
          }}
        >
          MERN-Stack Web Developer & UI Craftsman
        </p>

        {/* Bio */}
        <p
          style={{
            maxWidth: "620px",
            fontSize: "15px",
            color: "#5a5a6e",
            lineHeight: 1.8,
            animation: "fadeInUp 0.9s ease 0.4s both",
            fontWeight: 300,
          }}
        >
          Frontend Developer specializing in React, Next.js and AI-powered web applications.
          Currently building products, contributing to open source, and sharing what I learn.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "40px",
            flexWrap: "wrap",
            justifyContent: "center",
            animation: "fadeInUp 0.9s ease 0.55s both",
          }}
        >
          <button
            onClick={() => scrollTo("Projects")}
            style={{
              padding: "14px 36px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Sora', sans-serif",
              boxShadow: "0 8px 32px rgba(99,102,241,0.3)",
              transition: "all 0.3s ease",
              letterSpacing: "0.5px",
            }}
            onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(99,102,241,0.45)";
            }}
            onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(99,102,241,0.3)";
            }}
          >
            View My Work
          </button>
          <button
            onClick={handleResumeDownload}
            style={{
              padding: "14px 36px",
              background: "transparent",
              border: "1px solid rgba(99,102,241,0.4)",
              borderRadius: "12px",
              color: "#6366f1",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Sora', sans-serif",
              transition: "all 0.3s ease",
              letterSpacing: "0.5px",
            }}
            onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.background = "rgba(99,102,241,0.1)";
              e.currentTarget.style.borderColor = "#6366f1";
            }}
            onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
            }}
          >
            Download Resume
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            animation: "fadeInUp 1s ease 1s both",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, #6366f1, transparent)",
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section
        id="experience"
        data-section="experience"
        style={{ position: "relative", zIndex: 1, padding: "120px 24px", maxWidth: "900px", margin: "0 auto" }}
      >
        <SectionHeader title="Experience" subtitle="Professional Journey" visible={visibleSections.has("experience")} />

        <div style={{ marginTop: "60px", position: "relative" }}>
          {/* Timeline vertical line */}
          <div
            style={{
              position: "absolute",
              left: "24px",
              top: 0,
              bottom: 0,
              width: "2px",
              background: "linear-gradient(to bottom, #ec4899, rgba(236,72,153,0.1))",
              borderRadius: "2px",
            }}
          />

          <div
            style={{
              position: "relative",
              paddingLeft: "64px",
              opacity: visibleSections.has("experience") ? 1 : 0,
              transform: visibleSections.has("experience") ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s cubic-bezier(0.4,0,0.2,1) 0.2s",
            }}
          >
            {/* Timeline dot */}
            <div
              style={{
                position: "absolute",
                left: "17px",
                top: "8px",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "#ec4899",
                boxShadow: "0 0 16px rgba(236,72,153,0.5)",
                border: "3px solid #0a0a0f",
              }}
            />

            {/* Experience Card */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "16px",
                padding: "32px",
                backdropFilter: "blur(10px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top gradient accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg, #f472b6, #ec4899, transparent)",
                }}
              />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <h3 style={{ fontSize: "21px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
                    Developer (Web &amp; Mobile Apps)
                  </h3>
                  <p style={{ fontSize: "15px", color: "#ec4899", fontWeight: 500 }}>DMU (Digital Marketing Universe)</p>
                </div>
                <span
                  style={{
                    background: "rgba(236,72,153,0.12)",
                    border: "1px solid rgba(236,72,153,0.3)",
                    color: "#ec4899",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  May 2026 - Ongoing
                </span>
              </div>

              <p className="exp-desc" style={{ marginTop: "18px", color: "#6b6b7e", lineHeight: 1.8, fontSize: "14.5px", fontWeight: 300 }}>
                Worked on developing both mobile and web applications, gaining hands-on experience with Google AI Studio and various AI tools. Learned SEO optimization for websites and utilized command-line interfaces along with Pomeili by Google Labs. Successfully delivered nearly 10 projects within a single month, demonstrating rapid development and adaptability.
              </p>

              <div style={{ display: "flex", gap: "8px", marginTop: "20px", flexWrap: "wrap" }}>
                {["React", "PHP", "Typescript", "TailwindCSS", "HTML", "CSS"].map((tag: string) => (
                  <span
                    key={tag}
                    style={{
                      background: "rgba(236,72,153,0.1)",
                      border: "1px solid rgba(236,72,153,0.2)",
                      color: "#ec4899",
                      padding: "5px 12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
          </div>
        </div>

        <div style={{ marginTop: "60px", position: "relative" }}>
          {/* Timeline vertical line */}
          <div
            style={{
              position: "absolute",
              left: "24px",
              top: 0,
              bottom: 0,
              width: "2px",
              background: "linear-gradient(to bottom, #6366f1, rgba(99,102,241,0.1))",
              borderRadius: "2px",
            }}
          />

          <div
            style={{
              position: "relative",
              paddingLeft: "64px",
              opacity: visibleSections.has("experience") ? 1 : 0,
              transform: visibleSections.has("experience") ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s cubic-bezier(0.4,0,0.2,1) 0.2s",
            }}
          >
            {/* Timeline dot */}
            <div
              style={{
                position: "absolute",
                left: "17px",
                top: "8px",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "#6366f1",
                boxShadow: "0 0 16px rgba(99,102,241,0.5)",
                border: "3px solid #0a0a0f",
              }}
            />

            {/* Experience Card */}
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "16px",
                padding: "32px",
                backdropFilter: "blur(10px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top gradient accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg, #6366f1, #10b981, transparent)",
                }}
              />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <h3 style={{ fontSize: "21px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
                    Frontend Developer 
                  </h3>
                  <p style={{ fontSize: "15px", color: "#6366f1", fontWeight: 500 }}>Exeton (Official Partner of NVIDIA)</p>
                </div>
                <span
                  style={{
                    background: "rgba(99,102,241,0.12)",
                    border: "1px solid rgba(99,102,241,0.3)",
                    color: "#6366f1",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  Mar 2026
                </span>
              </div>

              <p className="exp-desc" style={{ marginTop: "18px", color: "#6b6b7e", lineHeight: 1.8, fontSize: "14.5px", fontWeight: 300 }}>
                Worked as a Frontend Developer and UI Designer in a team of 3–4 developers to build a 40+ page company website. Developed responsive UI layouts and translated design concepts into clean, maintainable frontend code while collaborating with the development team to deliver a professional web platform.
              </p>

              <div style={{ display: "flex", gap: "8px", marginTop: "20px", flexWrap: "wrap" }}>
                {["React", "Next.js", "TailwindCSS", "Typescript"].map((tag: string) => (
                  <span
                    key={tag}
                    style={{
                      background: "rgba(99,102,241,0.1)",
                      border: "1px solid rgba(99,102,241,0.2)",
                      color: "#8b8ba0",
                      padding: "5px 12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
          </div>
        </div>

        <div style={{ marginTop: "60px", position: "relative" }}>
  {/* Timeline vertical line */}
  <div
    style={{
      position: "absolute",
      left: "24px",
      top: 0,
      bottom: 0,
      width: "2px",
      background: "linear-gradient(to bottom, #f6d365, rgba(253,160,133,0.3))",
      borderRadius: "2px",
    }}
  />

  <div
    style={{
      position: "relative",
      paddingLeft: "64px",
      opacity: visibleSections.has("experience") ? 1 : 0,
      transform: visibleSections.has("experience") ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.7s cubic-bezier(0.4,0,0.2,1) 0.2s",
    }}
  >
    {/* Timeline dot */}
    <div
      style={{
        position: "absolute",
        left: "17px",
        top: "8px",
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        background: "#fda085",
        boxShadow: "0 0 16px rgba(253,160,133,0.5)",
        border: "3px solid #0a0a0f",
      }}
    />

    {/* Experience Card */}
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "16px",
        padding: "32px",
        backdropFilter: "blur(10px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top gradient accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, #f6d365, #fda085, transparent)",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h3 style={{ fontSize: "21px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
            Frontend Developer Intern
          </h3>
          <p style={{ fontSize: "15px", color: "#f6a185", fontWeight: 500 }}>Elevvo Pathways</p>
        </div>
        <span
          style={{
            background: "rgba(253,160,133,0.12)",
            border: "1px solid rgba(253,160,133,0.3)",
            color: "#fda085",
            padding: "6px 14px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          Feb 2026
        </span>
      </div>

      <p className="exp-desc" style={{ marginTop: "18px", color: "#6b6b7e", lineHeight: 1.8, fontSize: "14.5px", fontWeight: 300 }}>
        Completed a one-month remote internship focused on frontend development, where I
        worked through structured levels and tasks involving HTML5, CSS3, JavaScript, and
        responsive UI development. Built and improved interactive web interfaces while
        strengthening practical skills in modern frontend workflows and user-focused design.
      </p>

      <div style={{ display: "flex", gap: "8px", marginTop: "20px", flexWrap: "wrap" }}>
        {["HTML5", "CSS3", "Javascript"].map((tag: string) => (
          <span
            key={tag}
            style={{
              background: "rgba(253,160,133,0.1)",
              border: "1px solid rgba(253,160,133,0.2)",
              color: "#c56b4f",
              padding: "5px 12px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
        </div>

        <div style={{ marginTop: "60px", position: "relative" }}>
  {/* Timeline vertical line */}
  <div
    style={{
      position: "absolute",
      left: "24px",
      top: 0,
      bottom: 0,
      width: "2px",
      background: "linear-gradient(to bottom, #84fab0, rgba(143,211,244,0.3))",
      borderRadius: "2px",
    }}
  />

  <div
    style={{
      position: "relative",
      paddingLeft: "64px",
      opacity: visibleSections.has("experience") ? 1 : 0,
      transform: visibleSections.has("experience") ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.7s cubic-bezier(0.4,0,0.2,1) 0.2s",
    }}
  >
    {/* Timeline dot */}
    <div
      style={{
        position: "absolute",
        left: "17px",
        top: "8px",
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        background: "#5bc0e5",
        boxShadow: "0 0 16px rgba(91,192,229,0.5)",
        border: "3px solid #0a0a0f",
      }}
    />

    {/* Experience Card */}
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "16px",
        padding: "32px",
        backdropFilter: "blur(10px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top gradient accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, #84fab0, #8fd3f4, transparent)",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h3 style={{ fontSize: "21px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
            Web Developer Intern
          </h3>
          <p style={{ fontSize: "15px", color: "#5bc0e5", fontWeight: 500 }}>AppVerse Technologies</p>
        </div>
        <span
          style={{
            background: "rgba(143,211,244,0.12)",
            border: "1px solid rgba(143,211,244,0.3)",
            color: "#5bc0e5",
            padding: "6px 14px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          Jan - Feb 2026
        </span>
      </div>

      <p className="exp-desc" style={{ marginTop: "18px", color: "#6b6b7e", lineHeight: 1.8, fontSize: "14.5px", fontWeight: 300 }}>
        Completed a two-month remote internship focused on modern frontend development
        using React.js, JavaScript, HTML5, CSS3, and Tailwind CSS. Developed responsive user
        interfaces, built reusable React components, and integrated APIs while following clean code practices and component-based architecture.
      </p>

      <div style={{ display: "flex", gap: "8px", marginTop: "20px", flexWrap: "wrap" }}>
        {["React", "Javascript", "TailwindCSS"].map((tag: string) => (
          <span
            key={tag}
            style={{
              background: "rgba(143,211,244,0.1)",
              border: "1px solid rgba(143,211,244,0.2)",
              color: "#5bc0e5",
              padding: "5px 12px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
</div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section
        id="projects"
        data-section="projects"
        style={{ position: "relative", zIndex: 1, padding: "120px 24px", maxWidth: "1100px", margin: "0 auto" }}
      >
        <SectionHeader title="Projects" subtitle="What I've Built" visible={visibleSections.has("projects")} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
            marginTop: "60px",
          }}
        >
          {PROJECTS.map((project: Project, i: number) => (
            <ProjectCard key={i} {...project} index={i} visible={visibleSections.has("projects")} />
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "48px",
            color: "#4a4a5e",
            fontSize: "14px",
            fontStyle: "italic",
            opacity: visibleSections.has("projects") ? 1 : 0,
            transition: "opacity 0.6s ease 0.8s",
          }}
        >
        </p>
      </section>

      {/* ─── ARTICLES ─── */}
      <section
        id="articles"
        data-section="articles"
        style={{ position: "relative", zIndex: 1, padding: "120px 24px", maxWidth: "900px", margin: "0 auto" }}
      >
        <SectionHeader title="Latest Articles" subtitle="Thoughts & Insights" visible={visibleSections.has("articles")} />

        <div style={{ marginTop: "60px", display: "grid", gap: "20px" }}>
          {/* Article 1 */}
          <a
            href="https://medium.com/@muhammadqasimdev/my-first-large-scale-next-js-project-taught-me-more-than-any-tutorial-ever-could-3dcca85d8ecd"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "14px",
                padding: "18px 22px",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                gap: "24px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e: MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.background = "rgba(99,102,241,0.06)";
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
              }}
              onMouseLeave={(e: MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              <img
                src="/1-article.png"
                alt="Article thumbnail"
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "10px",
                  objectFit: "contain",
                  flexShrink: 0,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              />
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#fff", marginBottom: "6px", lineHeight: 1.5 }}>
                  My First Large-Scale Next.js Project Taught Me More Than Any Tutorial Ever Could
                </h4>
                <span style={{ color: "#6366f1", fontSize: "13px", fontWeight: 500 }}>
                  Read Article →
                </span>
              </div>
            </div>
          </a>

          {/* Article 2 */}
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "14px",
              padding: "18px 22px",
              backdropFilter: "blur(10px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              opacity: 0.6,
              cursor: "default",
            }}
          >
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#fff", marginBottom: "6px", lineHeight: 1.5 }}>
                Building My First npm Package
              </h4>
              <span style={{ color: "#5a5a6e", fontSize: "13px", fontWeight: 500 }}>
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ─── */}
      <section
        id="certifications"
        data-section="certifications"
        style={{ position: "relative", zIndex: 1, padding: "120px 24px", maxWidth: "900px", margin: "0 auto" }}
      >
        <SectionHeader title="Certifications" subtitle="Credentials & Achievements" visible={visibleSections.has("certifications")} />

        <div style={{ marginTop: "60px", display: "grid", gap: "20px" }}>
          {CERTIFICATIONS.map((cert: Certification, i: number) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "14px",
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                gap: "24px",
                opacity: visibleSections.has("certifications") ? 1 : 0,
                transform: visibleSections.has("certifications") ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${0.15 * i + 0.2}s`,
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))",
                  border: "1px solid rgba(99,102,241,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  flexShrink: 0,
                }}
              >
                ◈
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ color: "#fff", fontSize: "16px", fontWeight: 600, marginBottom: "4px" }}>{cert.title}</h4>
                <p style={{ color: "#5a5a6e", fontSize: "13.5px" }}>
                  {cert.issuer} &nbsp;·&nbsp; {cert.date}
                </p>
              </div>
              <span
                style={{
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.25)",
                  color: "#10b981",
                  padding: "4px 12px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                Verified
              </span>
            </div>
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "36px",
            color: "#4a4a5e",
            fontSize: "14px",
            fontStyle: "italic",
            opacity: visibleSections.has("certifications") ? 1 : 0,
            transition: "opacity 0.6s ease 0.8s",
          }}
        >
        </p>
      </section>

      {/* ─── SKILLS ─── */}
      <section
        id="skills"
        data-section="skills"
        style={{ position: "relative", zIndex: 1, padding: "120px 24px", maxWidth: "1000px", margin: "0 auto" }}
      >
        <SectionHeader title="Skills" subtitle="Technologies I Work With" visible={visibleSections.has("skills")} />

        <div style={{ marginTop: "60px" }}>
          {SKILL_CATEGORIES.map((category: SkillCategory) => (
            <div key={category} style={{ marginBottom: "48px" }}>
              {/* Category label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "24px",
                  opacity: visibleSections.has("skills") ? 1 : 0,
                  transform: visibleSections.has("skills") ? "translateX(0)" : "translateX(-20px)",
                  transition: "all 0.6s ease 0.2s",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: CATEGORY_COLORS[category].primary,
                  }}
                >
                  {category}
                </span>
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
              </div>

              {/* Skill cards grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
                {SKILLS.filter((s: Skill) => s.category === category).map((skill: Skill, i: number) => (
                  <div
                    key={skill.name}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={{
                      background: hoveredSkill === skill.name ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.025)",
                      border: hoveredSkill === skill.name ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "14px",
                      padding: "20px",
                      cursor: "default",
                      transition: "all 0.3s ease",
                      opacity: visibleSections.has("skills") ? 1 : 0,
                      transform: visibleSections.has("skills") ? "translateY(0)" : "translateY(20px)",
                      transitionDelay: `${0.08 * i + 0.3}s`,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                      <span style={{ color: "#fff", fontSize: "15px", fontWeight: 600 }}>{skill.name}</span>
                      <span style={{ color: "#6366f1", fontSize: "12px", fontWeight: 600 }}>{skill.level}%</span>
                    </div>
                    {/* Progress bar track */}
                    <div
                      style={{
                        height: "3px",
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: "2px",
                        overflow: "hidden",
                      }}
                    >
                      {/* Progress bar fill */}
                      <div
                        style={{
                          height: "100%",
                          width: visibleSections.has("skills") ? `${skill.level}%` : "0%",
                          background: `linear-gradient(90deg, ${CATEGORY_COLORS[category].primary}, ${CATEGORY_COLORS[category].secondary})`,
                          borderRadius: "2px",
                          transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${0.08 * i + 0.4}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section
        id="testimonials"
        data-section="testimonials"
        style={{ position: "relative", zIndex: 1, padding: "120px 24px", maxWidth: "900px", margin: "0 auto" }}
      >
        <SectionHeader title="Testimonials" subtitle="What People Say" visible={visibleSections.has("testimonials")} />

        <div style={{ marginTop: "60px", display: "grid", gap: "20px" }}>
          {/* Testimonial 1 */}
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "14px",
              padding: "28px 32px",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e: MouseEvent<HTMLDivElement>) => {
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
              e.currentTarget.style.background = "rgba(99,102,241,0.04)";
            }}
            onMouseLeave={(e: MouseEvent<HTMLDivElement>) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
              <div>
                <p style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>DMU (CEO)</p>
                <span style={{ fontSize: "13px", color: "#6366f1", fontWeight: 500 }}>CEO, Digital Marketing Universe</span>
              </div>
              <span style={{ fontSize: "14px", color: "#f59e0b", letterSpacing: "2px", whiteSpace: "nowrap" }}>⭐⭐⭐⭐⭐</span>
            </div>
            <p style={{ fontSize: "14.5px", color: "#6b6b7e", lineHeight: 1.8, fontWeight: 300, fontStyle: "italic" }}>
              "Qasim has shown excellent growth since joining our team. He builds modern web interfaces with attention to detail, accepts feedback well, and consistently delivers quality work within deadlines."
            </p>
          </div>

          {/* Testimonial 2 */}
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "14px",
              padding: "28px 32px",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e: MouseEvent<HTMLDivElement>) => {
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
              e.currentTarget.style.background = "rgba(99,102,241,0.04)";
            }}
            onMouseLeave={(e: MouseEvent<HTMLDivElement>) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
              <div>
                <p style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>Exeton Project Manager</p>
                <span style={{ fontSize: "13px", color: "#6366f1", fontWeight: 500 }}>Project Manager, Exeton</span>
              </div>
              <span style={{ fontSize: "14px", color: "#f59e0b", letterSpacing: "2px", whiteSpace: "nowrap" }}>⭐⭐⭐⭐⭐</span>
            </div>
            <p style={{ fontSize: "14.5px", color: "#6b6b7e", lineHeight: 1.8, fontWeight: 300, fontStyle: "italic" }}>
              "Working with Qasim was a great experience. He translated complex Figma designs into responsive, production-ready interfaces while maintaining clean code and consistency across the project."
            </p>
          </div>

          {/* Testimonial 3 */}
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "14px",
              padding: "28px 32px",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e: MouseEvent<HTMLDivElement>) => {
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
              e.currentTarget.style.background = "rgba(99,102,241,0.04)";
            }}
            onMouseLeave={(e: MouseEvent<HTMLDivElement>) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
              <div>
                <p style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>Senior Frontend Developer</p>
                <span style={{ fontSize: "13px", color: "#6366f1", fontWeight: 500 }}>Senior Frontend Developer</span>
              </div>
              <span style={{ fontSize: "14px", color: "#f59e0b", letterSpacing: "2px", whiteSpace: "nowrap" }}>⭐⭐⭐⭐⭐</span>
            </div>
            <p style={{ fontSize: "14.5px", color: "#6b6b7e", lineHeight: 1.8, fontWeight: 300, fontStyle: "italic" }}>
              "Qasim is dependable, detail-oriented, and genuinely interested in improving as an engineer. He takes feedback positively, learns quickly, and consistently delivers polished frontend implementations."
            </p>
          </div>
        </div>
      </section>

      {/* ─── RESUME DOWNLOAD BANNER ─── */}
      <section style={{ position: "relative", zIndex: 1, padding: "40px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <div
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(16,185,129,0.08))",
            border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: "20px",
            padding: "48px 32px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative glow blob */}
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "200px",
              height: "200px",
              background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />
          <h3 style={{ fontSize: "24px", fontWeight: 700, color: "#fff", marginBottom: "10px" }}>
            Want to see more?
          </h3>
          <p style={{ color: "#6b6b7e", fontSize: "14.5px", maxWidth: "480px", margin: "0 auto 28px" }}>
            Have a look at my full resume to explore my complete experience, education, and qualifications.
          </p>
          <button
            onClick={handleResumeDownload}
            style={{
              padding: "14px 40px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Sora', sans-serif",
              boxShadow: "0 8px 32px rgba(99,102,241,0.3)",
              transition: "all 0.3s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
            }}
            onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(99,102,241,0.45)";
            }}
            onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(99,102,241,0.3)";
            }}
          >
            <span style={{ fontSize: "16px" }}>↓</span> Download Resume
          </button>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section
        id="contact"
        data-section="contact"
        style={{ position: "relative", zIndex: 1, padding: "120px 24px 80px", maxWidth: "700px", margin: "0 auto", textAlign: "center" }}
      >
        <SectionHeader title="Contact" subtitle="Let's Work Together" visible={visibleSections.has("contact")} />

        <div
          style={{
            marginTop: "48px",
            opacity: visibleSections.has("contact") ? 1 : 0,
            transform: visibleSections.has("contact") ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease 0.3s",
          }}
        >
          <p style={{ color: "#6b6b7e", fontSize: "15.5px", lineHeight: 1.8, marginBottom: "40px", fontWeight: 300 }}>
            I'm currently open to new opportunities and collaborations. Whether you have a project in mind
            or just want to say hi — my inbox is always open.
          </p>

          <a
            href="mailto:mdqasim5911@gmail.com"
            style={{
              display: "inline-block",
              padding: "16px 44px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              borderRadius: "14px",
              color: "#fff",
              fontSize: "16px",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 8px 32px rgba(99,102,241,0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(99,102,241,0.45)";
            }}
            onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(99,102,241,0.3)";
            }}
          >
            Say Hello ✉
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "60px 24px 40px",
          background: "rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "48px",
              marginBottom: "60px",
            }}
          >
            {/* Brand column */}
            <div>
              <div
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #6366f1, #10b981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "2px",
                  marginBottom: "16px",
                }}
              >
                {"<Muhammad Qasim />"}
              </div>
              <p style={{ color: "#5a5a6e", fontSize: "13.5px", lineHeight: 1.8, fontWeight: 300 }}>
                A passionate developer crafting clean, scalable, and beautiful web applications.
                Turning ideas into impactful digital products.
              </p>
            </div>

            {/* Quick Links column */}
            <div>
              <h4 style={{ color: "#fff", fontSize: "14px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px" }}>
                Quick Links
              </h4>
              {NAV_ITEMS.map((item: string) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  style={{
                    display: "block",
                    background: "none",
                    border: "none",
                    color: "#5a5a6e",
                    fontSize: "14px",
                    cursor: "pointer",
                    padding: "6px 0",
                    textAlign: "left",
                    fontFamily: "'Sora', sans-serif",
                    transition: "color 0.3s ease",
                    width: "100%",
                  }}
                  onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.color = "#6366f1")}
                  onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.color = "#5a5a6e")}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Connect column */}
            <div>
              <h4 style={{ color: "#fff", fontSize: "14px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px" }}>
                Connect
              </h4>
              <div style={{ display: "flex", gap: "32px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {FOOTER_LINKS.slice(0, 3).map((link: FooterLink) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          color: "#5a5a6e",
                          textDecoration: "none",
                          fontSize: "14px",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
                          e.currentTarget.style.color = "#6366f1";
                          e.currentTarget.style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
                          e.currentTarget.style.color = "#5a5a6e";
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                      >
                    <span
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: "rgba(99,102,241,0.1)",
                        border: "1px solid rgba(99,102,241,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "13px",
                        color: "#6366f1",
                      }}
                    >
                      {link.icon}
                    </span>
                    {link.label}
                  </a>
                ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {FOOTER_LINKS.slice(3, 6).map((link: FooterLink) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        color: "#5a5a6e",
                        textDecoration: "none",
                        fontSize: "14px",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
                        e.currentTarget.style.color = "#6366f1";
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
                        e.currentTarget.style.color = "#5a5a6e";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <span
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: "rgba(99,102,241,0.1)",
                          border: "1px solid rgba(99,102,241,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "13px",
                          color: "#6366f1",
                        }}
                      >
                        {link.icon}
                      </span>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.05)",
              paddingTop: "28px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <p style={{ color: "#3a3a4e", fontSize: "13px" }}>© 2026 Muhammad Qasim. All rights reserved.</p>
            <p style={{ color: "#3a3a4e", fontSize: "13px" }}>Crafted with passion & precision</p>
          </div>
        </div>
      </footer>

      {/* ─── Global CSS: Animations + Responsive + Scrollbar ─── */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.6; transform: scaleY(1); }
          50%      { opacity: 1;   transform: scaleY(1.2); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translate(0, 0); }
          50%      { transform: translate(40px, -60px); }
        }
        @keyframes spinSlow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 1;   transform: translate(-50%, -50%) scale(1.1); }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          nav > div:nth-child(2) { display: none !important; }
          .hamburger            { display: flex !important; }
          .mobile-menu button   { font-size: 20px !important; }
          .exp-desc {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
        @media (min-width: 769px) {
          .hamburger { display: none !important; }
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar       { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(99,102,241,0.5); }

        /* Text Selection */
        ::selection { background: rgba(99,102,241,0.3); color: #fff; }
      `}</style>
    </div>
  );
};

/* ─── SectionHeader Component ─── */

const SectionHeader: FC<SectionHeaderProps> = ({ title, subtitle, visible }) => {
  return (
    <div
      style={{
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      <span
        style={{
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: "#6366f1",
          display: "block",
          marginBottom: "12px",
        }}
      >
        {subtitle}
      </span>
      <h2
        style={{
          fontSize: "clamp(32px, 5vw, 46px)",
          fontWeight: 800,
          color: "#fff",
          letterSpacing: "-1px",
          position: "relative",
          display: "inline-block",
        }}
      >
        {title}
        <div
          style={{
            position: "absolute",
            bottom: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "50px",
            height: "3px",
            background: "linear-gradient(90deg, #6366f1, #10b981)",
            borderRadius: "2px",
          }}
        />
      </h2>
    </div>
  );
};

/* ─── ProjectCard Component ─── */

const ProjectCard: FC<ProjectCardProps> = ({ title, desc, tags, color, index, visible, image }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: hovered ? `1px solid ${color}44` : "1px solid rgba(255,255,255,0.06)",
        borderRadius: "18px",
        padding: "28px",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 16px 48px ${color}15` : "none",
        opacity: visible ? 1 : 0,
        animationDelay: `${index * 0.15}s`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top gradient line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${color}, transparent)`,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Icon + index number row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: `${color}15`,
            border: `1px solid ${color}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            color: color,
          }}
        >
          ⬡
        </div>
        <span
          style={{
            fontSize: "11px",
            color: "#4a4a5e",
            padding: "4px 10px",
            background: "rgba(255,255,255,0.04)",
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          0{index + 1}
        </span>
      </div>
      {/* ADD THIS IMAGE CONTAINER BELOW */}
      <div style={{
        width: "100%",
        height: "180px",
        borderRadius: "12px",
        overflow: "hidden",
        marginBottom: "20px",
        border: "1px solid rgba(255,255,255,0.05)"
      }}>
        <img 
          src={image} 
          alt={title} 
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)"
          }} 
        />
      </div>

      <h3 style={{ color: "#fff", fontSize: "19px", fontWeight: 700, marginBottom: "10px" }}>{title}</h3>
      <p style={{ color: "#5a5a6e", fontSize: "13.5px", lineHeight: 1.7, marginBottom: "20px", fontWeight: 300 }}>{desc}</p>

      {/* Tech tags */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {tags.map((tag: string) => (
          <span
            key={tag}
            style={{
              background: `${color}10`,
              border: `1px solid ${color}25`,
              color: color,
              padding: "4px 10px",
              borderRadius: "6px",
              fontSize: "11.5px",
              fontWeight: 500,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
