"use client";

import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Award, Zap, Shield } from "lucide-react";

const AboutSection = styled.section`
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
  margin-bottom: 4rem;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 6rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const Narrative = styled.h2`
  font-family: var(--font-geist-sans), sans-serif;
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 1.35;
  letter-spacing: -0.02em;
  color: #e0e0e0;
  margin: 0;

  span.accent {
    color: #ffffff;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const EducationCard = styled.div`
  background: rgba(15, 15, 15, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2.5rem;
  display: flex;
  gap: 1.5rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: border-color 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    flex-direction: column;
  }
`;

const EduIconWrapper = styled.div`
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
`;

const EduDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h3 {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
  }

  p.inst {
    font-family: var(--font-geist-sans), sans-serif;
    color: #888888;
    font-size: 0.95rem;
    margin: 0;
  }

  div.meta {
    display: flex;
    gap: 1.5rem;
    font-family: var(--font-geist-mono), monospace;
    font-size: 0.8rem;
    color: #aaaaaa;
    margin-top: 0.5rem;
    
    span.cgpa {
      color: #00ff66;
      font-weight: bold;
    }
  }
`;

const MetricsColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
`;

const PerformanceCard = styled.div`
  position: relative;
  background: radial-gradient(circle at top left, rgba(255, 255, 255, 0.03), transparent);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const GaugeContainer = styled.div`
  position: relative;
  width: 170px;
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GaugeSvg = styled.svg`
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
`;

const ScoreTextGroup = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span.score {
    font-family: var(--font-geist-mono), monospace;
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1;
    color: #00ff66;
    text-shadow: 0 0 16px rgba(0, 255, 102, 0.4);
  }

  span.max-score {
    font-family: var(--font-geist-mono), monospace;
    font-size: 0.7rem;
    color: #888888;
    margin-top: 4px;
    letter-spacing: 0.1em;
  }
`;

const MetricBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(0, 255, 102, 0.08);
  border: 1px solid rgba(0, 255, 102, 0.25);
  color: #00ff66;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  letter-spacing: 0.05em;
`;


const PerformanceLabel = styled.div`
  font-family: var(--font-geist-sans), sans-serif;
  
  h5 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
  }

  p {
    font-size: 0.85rem;
    color: #888888;
    margin: 0;
    line-height: 1.5;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.6rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  padding: 1.2rem 1rem;
  transition: transform 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(0, 255, 102, 0.25);
    background: rgba(255, 255, 255, 0.04);
  }

  svg {
    color: #00ff66;
    display: block;
    margin: 0 auto;
  }

  span.title {
    font-family: var(--font-geist-sans), sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fade in animations triggered on scroll
      gsap.from(".reveal-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".reveal-card", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <AboutSection id="about" ref={containerRef}>
      <SectionHeader className="reveal-text">
        <span className="number">01</span> ABOUT ME
      </SectionHeader>

      <Grid>
        <InfoColumn>
          <Narrative className="reveal-text">
            I am a full-stack frontend developer focused on crafting <span className="accent">hyperrealistic interfaces</span> and pixel-perfect interactive architectures. Using Next.js, TypeScript, and modern animation tools like GSAP, I turn complex design mockups into immersive digital systems that perform flawlessly.
          </Narrative>

          <EducationCard className="reveal-card">
            <EduIconWrapper>
              <GraduationCap size={24} />
            </EduIconWrapper>
            <EduDetails>
              <h3>B.Tech in Information Technology</h3>
              <p className="inst">Durgapur, India</p>
              <div className="meta">
                <span>AUG 2019 &ndash; AUG 2023</span>
                <span>CGPA: <span className="cgpa">8.87</span></span>
              </div>
            </EduDetails>
          </EducationCard>
        </InfoColumn>

        <MetricsColumn>
          <PerformanceCard className="reveal-card">
            <MetricBadge>
              68 &rarr; 93 SCORE BOOST (+37%)
            </MetricBadge>
            <GaugeContainer>
              <GaugeSvg viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.06)"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="url(#lighthouseGradient)"
                  strokeWidth="8"
                  strokeDasharray="326.7"
                  strokeDashoffset="22.8"
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 8px rgba(0, 255, 102, 0.4))" }}
                />
                <defs>
                  <linearGradient id="lighthouseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00ff66" />
                    <stop offset="100%" stopColor="#00cc66" />
                  </linearGradient>
                </defs>
              </GaugeSvg>
              <ScoreTextGroup>
                <span className="score">93</span>
                <span className="max-score">/ 100 OVERALL</span>
              </ScoreTextGroup>
            </GaugeContainer>
            <PerformanceLabel>
              <h5>Lighthouse Performance Score</h5>
              <p>
                Successfully optimized client web apps, raising Lighthouse metrics from 68 to 93 through server-side optimizations, image caching, and strict asset budgets.
              </p>
            </PerformanceLabel>
            
            <FeatureGrid>
              <FeatureItem>
                <Zap size={18} />
                <span className="title">SSR / SSG Caching</span>
              </FeatureItem>
              <FeatureItem>
                <Shield size={18} />
                <span className="title">Code Splitting</span>
              </FeatureItem>
            </FeatureGrid>
          </PerformanceCard>
        </MetricsColumn>
      </Grid>
    </AboutSection>
  );
}
