import { useState, useEffect } from "react";
import type { FC, MouseEvent } from "react";

/* ─── TypeScript Interfaces ─── */

interface Skill {
  name: string;
  icon: string;
  level: number;
  category: SkillCategory;
}

type SkillCategory = "Frontend" | "Backend" | "Database";

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
  icon: string;
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
  { name: "HTML", icon: "◈", level: 95, category: "Frontend" },
  { name: "CSS", icon: "◈", level: 92, category: "Frontend" },
  { name: "JavaScript", icon: "◈", level: 85, category: "Frontend" },
  { name: "React", icon: "◈", level: 90, category: "Frontend" },
  { name: "Tailwind CSS", icon: "◈", level: 80, category: "Frontend" },
  { name: "Node.js", icon: "◈", level: 75, category: "Backend" },
  { name: "Express", icon: "◈", level: 70, category: "Backend" },
  { name: "MongoDB", icon: "◈", level: 70, category: "Database" },
  { name: "Firebase", icon: "◈", level: 78, category: "Database" },
];

const NAV_ITEMS: string[] = ["Home", "Experience", "Projects", "Certifications", "Skills", "Contact"];

const PROJECTS: Project[] = [
  {
    title: "ApplyWise Job Portal",
    desc: "A full-featured job portal enabling job seekers to browse listings, submit applications, and track statuses, while employers can post jobs and manage candidates.",
    tags: ["React", "Node.js", "MongoDB"],
    color: "#6366f1",
    image: "/applywise.png",
  },
  {
    title: "Quick-Bill SaaS App",
    desc: "A comprehensive billing solution for small businesses, featuring invoicing, payment tracking, and client management.",
    tags: ["Firebase", "Tailwind", "React"],
    color: "#10b981",
    image: "/img1.png",
  },
  {
    title: "Ecommerce Website",
    desc: "A modern ecommerce platform with product listings, shopping cart, and secure checkout functionality.",
    tags: ["React", "MongoDB", "Firebase"],
    color: "#8b5cf6",
    image: "/clone-project.png",
  },
];

const CERTIFICATIONS: Certification[] = [
  { title: "Software Development Certification", issuer: "Microsoft", date: "Dec 2025", placeholder: true },
  { title: "Responsive Web Design Certification", issuer: "FreecodeCamp", date: "Oct 2025", placeholder: true },
  { title: "Front End Development Certification", issuer: "SimpliLearn", date: "Oct 2025", placeholder: true },
];

const FOOTER_LINKS: FooterLink[] = [
  { label: "GitHub", icon: "⬡", href: "https://github.com/mdqasim786" },
  { label: "LinkedIn", icon: "in", href: "https://linkedin.com/in/md-qasim" },
  { label: "Email", icon: "✉", href: "mailto:mdqasim5911@gmail.com" },
];

const SKILL_CATEGORIES: SkillCategory[] = ["Frontend", "Backend", "Database"];

const CATEGORY_COLORS: Record<SkillCategory, { primary: string; secondary: string }> = {
  Frontend: { primary: "#6366f1", secondary: "#8b5cf6" },
  Backend: { primary: "#10b981", secondary: "#34d399" },
  Database: { primary: "#8b5cf6", secondary: "#a78bfa" },
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
    link.href = "https://docs.google.com/uc?export=download&id=1cltFyEokx2kycIhgbmNvuVlLDgiv6CaX";
    link.setAttribute("download", "Muhammad_Qasim_Resume.pdf");
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
              background: "none",
              border: "none",
              color: "#e2e2e8",
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
            onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.color = "#e2e2e8")}
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
          I craft immersive digital experiences with clean code, intuitive design, and a
          passion for turning ideas into reality. From concept to deployment — I build
          solutions that users love.
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
                    Frontend Developer Intern
                  </h3>
                  <p style={{ fontSize: "15px", color: "#6366f1", fontWeight: 500 }}>Appverse Technologies</p>
                </div>
                <span
                  style={{
                    background: "rgba(16,185,129,0.12)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    color: "#10b981",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  Jan 2026 — Mar 2026
                </span>
              </div>

              <p style={{ marginTop: "18px", color: "#6b6b7e", lineHeight: 1.8, fontSize: "14.5px", fontWeight: 300 }}>
                Contributed to fronend web application development, working with React and CSS to build
                scalable features. Collaborated with senior developers to implement APIs, integrated
                Firebase for authentication and real-time database operations, and participated in agile
                sprint cycles. Gained hands-on experience with code reviews, version control, and production deployments.
              </p>

              <div style={{ display: "flex", gap: "8px", marginTop: "20px", flexWrap: "wrap" }}>
                {["React", "Node.js", "Firebase", "MongoDB", "Git"].map((tag: string) => (
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
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {FOOTER_LINKS.map((link: FooterLink) => (
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
