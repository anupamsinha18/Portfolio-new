"use client";

import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image, { StaticImageData } from "next/image";
import { ExternalLink } from "lucide-react";
import geminiImg from "@/public/images/gemini.png";
import hrmsImg from "@/public/images/hrms.png";

const GithubIcon = ({ size = 16, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ProjectsSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #080808;
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(15, 15, 15, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease;

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 
                0 0 40px rgba(255, 255, 255, 0.03);
    
    img {
      transform: scale(1.04) translateY(-2%);
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  img {
    object-fit: cover;
    object-position: center top;
    transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
  }

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const ProjectInfo = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex-grow: 1;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ProjectTitle = styled.h3`
  font-family: var(--font-geist-sans), sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
`;

const ProjectDescription = styled.p`
  font-family: var(--font-geist-sans), sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #a0a0a0;
  margin: 0;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const TechTag = styled.span`
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.75rem;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: #cccccc;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1.5rem;
`;

const ActionButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-geist-sans), sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #888888;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;

  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    color: #ffffff;
    svg {
      transform: translateY(-2px) rotate(15deg);
    }
  }
`;

interface ProjectData {
  title: string;
  description: string;
  image: StaticImageData | string;
  tags: string[];
  github: string;
  live: string;
}

const PROJECTS_DATA: ProjectData[] = [
  {
    title: "AI Chat Application (Gemini Clone)",
    description: "A production-grade AI conversation interface replicating Google Gemini. Integrated the Nvidia Nemotron LLM via OpenRouter. Utilized advanced Context API designs to optimize React render patterns.",
    image: geminiImg,
    tags: ["React.js", "OpenRouter API", "Context API", "Nvidia Nemotron"],
    github: "https://github.com/anupamsinha18/Gemniclone",
    live: "https://clone-geminii.netlify.app/"
  },
  {
    title: "HRMS Lite (Human Resource Management)",
    description: "A modular, responsive employee management system designed with FastAPIs and React. Implemented real-time check-in and attendance metrics utilizing MongoDB for safe document persistence and error logs.",
    image: hrmsImg,
    tags: ["React.js", "FastAPI", "MongoDB", "REST APIs"],
    github: "https://github.com/anupamsinha18/hrms",
    live: "https://imaginative-macaron-d13858.netlify.app/"
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".project-card-anim", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
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

  return (
    <ProjectsSection id="projects" ref={containerRef}>
      <SectionHeader className="project-card-anim">
        <span className="number">03</span> CHOSEN WORKS
      </SectionHeader>

      <ProjectsGrid>
        {PROJECTS_DATA.map((project, idx) => (
          <ProjectCard key={idx} className="project-card-anim">
            <ImageWrapper>
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
              />
            </ImageWrapper>
            <ProjectInfo>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TechStack>
                {project.tags.map((tag, tagIdx) => (
                  <TechTag key={tagIdx}>{tag}</TechTag>
                ))}
              </TechStack>
              <ActionButtons>
                <ActionButton href={project.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon size={16} /> CODEBASE
                </ActionButton>
                <ActionButton href={project.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} /> LIVE PREVIEW
                </ActionButton>
              </ActionButtons>
            </ProjectInfo>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsSection>
  );
}
