"use client";

import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layout, Database } from "lucide-react";

const SkillsSection = styled.section`
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const SkillCategoryCard = styled.div`
  background: rgba(15, 15, 15, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 1.2rem;
`;

const CategoryIconWrapper = styled.div`
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const CategoryTitle = styled.h3`
  font-family: var(--font-geist-sans), sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: #ffffff;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const SkillTag = styled.span`
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.8rem;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  color: #a0a0a0;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  cursor: default;

  &:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
  }
`;

interface CategoryData {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".skill-card-anim", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.25,
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

  const CATEGORIES: CategoryData[] = [
    {
      title: "Frontend & Languages",
      icon: <Layout size={20} />,
      skills: ["JavaScript (ES6+)", "React.js", "React Native", "Next.js", "HTML5", "CSS3", "GSAP", "C++", "Python"]
    },
    {
      title: "Backend & Databases",
      icon: <Database size={20} />,
      skills: ["Node.js", "Express.js", "FastAPI", "SQL", "MySQL", "MongoDB"]
    },
    {
      title: "Tools & Ecosystems",
      icon: <Layout size={20} />, // Fallback or standard layout icon representing structural tools
      skills: ["Git", "GitHub", "Postman", "Figma", "Razorpay", "Render", "Vercel"]
    }
  ];

  return (
    <SkillsSection id="skills" ref={containerRef}>
      <SectionHeader className="skill-card-anim">
        <span className="number">04</span> TECHNICAL SKILLS
      </SectionHeader>

      <SkillsGrid>
        {CATEGORIES.map((category, idx) => (
          <SkillCategoryCard key={idx} className="skill-card-anim">
            <CategoryHeader>
              <CategoryIconWrapper>{category.icon}</CategoryIconWrapper>
              <CategoryTitle>{category.title}</CategoryTitle>
            </CategoryHeader>
            <TagsContainer>
              {category.skills.map((skill, skillIdx) => (
                <SkillTag key={skillIdx}>{skill}</SkillTag>
              ))}
            </TagsContainer>
          </SkillCategoryCard>
        ))}
      </SkillsGrid>
    </SkillsSection>
  );
}
