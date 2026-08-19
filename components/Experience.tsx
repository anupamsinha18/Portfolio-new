"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const ExperienceSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #050505;
  color: #ffffff;
  padding: 8rem 3rem;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 5rem 1.5rem;
  }
`;

const SectionHeader = styled.div`
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.8rem;
  color: #888888;
  margin-bottom: 5rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 1rem;

  span.number {
    color: #ffffff;
    font-weight: bold;
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
  }
`;

const ExperienceContainer = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 4rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const CompanyList = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;

  @media (max-width: 900px) {
    flex-direction: row;
    border-left: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    overflow-x: auto;
    padding-bottom: 0.5rem;
    
    &::-webkit-scrollbar {
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
    }
  }
`;

const ActiveBar = styled.div<{ activeIndex: number; totalCount: number }>`
  position: absolute;
  left: -1px;
  top: ${props => props.activeIndex * 72}px;
  height: 72px;
  width: 2px;
  background-color: #ffffff;
  box-shadow: 0 0 10px #ffffff;
  transition: top 0.3s cubic-bezier(0.25, 1, 0.5, 1);

  @media (max-width: 900px) {
    display: none; // hide vertical active line on mobile
  }
`;

const CompanyButton = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  font-family: var(--font-geist-sans), sans-serif;
  color: ${props => (props.isActive ? "#ffffff" : "#666666")};
  font-size: 1.15rem;
  font-weight: ${props => (props.isActive ? "600" : "400")};
  text-align: left;
  height: 72px;
  padding: 0 2rem;
  cursor: pointer;
  transition: color 0.3s ease, background-color 0.3s ease;
  display: flex;
  align-items: center;
  white-space: nowrap;

  &:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.01);
  }

  @media (max-width: 900px) {
    height: 50px;
    padding: 0 1.5rem;
    border-bottom: ${props => (props.isActive ? "2px solid #ffffff" : "none")};
    font-size: 1rem;
    border-radius: 0;
  }
`;

const ContentPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 400px;
`;

const RoleHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 1.5rem;
`;

const RoleTitle = styled.h3`
  font-family: var(--font-geist-sans), sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0;
  color: #ffffff;

  span.company {
    color: #888888;
    font-weight: 300;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const MetadataRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.8rem;
  color: #888888;

  span.meta-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    
    svg {
      color: #ffffff;
    }
  }
`;

const DetailsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const DetailItem = styled.li`
  font-family: var(--font-geist-sans), sans-serif;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #b0b0b0;
  position: relative;
  padding-left: 2rem;

  &::before {
    content: "/*";
    position: absolute;
    left: 0;
    top: 0;
    color: #555555;
    font-family: var(--font-geist-mono), monospace;
    font-size: 0.85rem;
    font-weight: bold;
  }

  span.accent {
    color: #ffffff;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

interface ExperienceData {
  company: string;
  role: string;
  location: string;
  duration: string;
  bullets: string[];
}

const EXPERIENCE_DATA: ExperienceData[] = [
  {
    company: "UElement",
    role: "Frontend Developer (Next.js)",
    location: "Pune, IN (Remote)",
    duration: "FEB 2026 – PRESENT",
    bullets: [
      "Owned frontend development for 3+ client-facing <span class='accent'>Next.js applications</span>, translating 30+ Figma designs into responsive layouts.",
      "Built 20+ reusable React components and integrated 15+ REST APIs, implementing <span class='accent'>state management</span> and modular patterns.",
      "Optimized Core Web Vitals, raising Lighthouse Performance scores from <span class='accent'>68 to 93</span> via SSR/SSG caching, asset compression, and code splitting."
    ]
  },
  {
    company: "Ib Arts Pvt. Ltd.",
    role: "Web Developer",
    location: "Kolkata, IN",
    duration: "DEC 2024 – AUG 2025",
    bullets: [
      "Developed and maintained highly responsive websites using <span class='accent'>React, HTML5, CSS3</span>, and WordPress Elementor/Divi builder setups.",
      "Optimized 10+ client sites, improving asset performance, compression, and lazy loading triggers.",
      "Delivered 10+ production environments for high-profile clients including <span class='accent'>BlueCoast, Bombay Hair, and Zang SMP</span>."
    ]
  },
  {
    company: "JodiSure",
    role: "Frontend Developer (Contract)",
    location: "Kolkata, IN",
    duration: "OCT 2024 – NOV 2024",
    bullets: [
      "Led frontend development for a matrimony production platform serving <span class='accent'>500+ active users</span>, creating administrative workflows and data dashboards.",
      "Created highly responsive web and mobile interfaces using <span class='accent'>React Native, React, and TypeScript</span>."
    ]
  },
  {
    company: "Bytewave",
    role: "Frontend Developer",
    location: "IN (Remote)",
    duration: "APR 2024 – OCT 2024",
    bullets: [
      "Built and deployed production-grade applications using <span class='accent'>React, Node.js, Express, and SQL databases</span>.",
      "Designed database architecture utilizing SQLite and PostgreSQL systems for optimal client-side queries."
    ]
  }
];

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Reveal section headers
      gsap.from(".exp-header", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animation when tab changes
  useEffect(() => {
    if (listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [activeIndex]);

  const activeExp = EXPERIENCE_DATA[activeIndex];

  return (
    <ExperienceSection id="experience" ref={containerRef}>
      <SectionHeader className="exp-header">
        <span className="number">02</span> WORK EXPERIENCE
      </SectionHeader>

      <ExperienceContainer className="exp-header">
        <CompanyList>
          <ActiveBar activeIndex={activeIndex} totalCount={EXPERIENCE_DATA.length} />
          {EXPERIENCE_DATA.map((exp, idx) => (
            <CompanyButton
              key={idx}
              isActive={idx === activeIndex}
              onClick={() => setActiveIndex(idx)}
            >
              {exp.company}
            </CompanyButton>
          ))}
        </CompanyList>

        <ContentPanel>
          <RoleHeader>
            <RoleTitle>
              {activeExp.role} <span className="company">@ {activeExp.company}</span>
            </RoleTitle>
            <MetadataRow>
              <span className="meta-item">
                <Calendar size={14} />
                {activeExp.duration}
              </span>
              <span className="meta-item">
                <MapPin size={14} />
                {activeExp.location}
              </span>
            </MetadataRow>
          </RoleHeader>

          <DetailsList ref={listRef}>
            {activeExp.bullets.map((bullet, idx) => (
              <DetailItem
                key={idx}
                dangerouslySetInnerHTML={{ __html: bullet }}
              />
            ))}
          </DetailsList>
        </ContentPanel>
      </ExperienceContainer>
    </ExperienceSection>
  );
}
