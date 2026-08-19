"use client";

import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";
import Image from "next/image";
import StatusWidget from "./StatusWidget";

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #050505;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 3rem 1rem 3rem;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem 1rem 1.5rem;
    height: auto;
    min-height: 100vh;
  }
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 10;
  width: 100%;
`;

const Logo = styled.a`
  font-family: var(--font-geist-sans), sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
  line-height: 0.9;
  letter-spacing: -0.05em;
  color: #ffffff;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  span.lastName {
    color: #666666;
    margin-left: 0.8rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;

  @media (max-width: 768px) {
    display: none; // hamburger or simple stacked links on mobile later
  }
`;

const NavLink = styled.a`
  font-family: var(--font-geist-sans), sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #888888;
  text-decoration: none;
  position: relative;
  padding: 0.2rem 0;
  transition: color 0.3s ease;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background-color: #ffffff;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #ffffff;
    &::after {
      width: 100%;
    }
  }
`;

const MainContent = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const MarqueeContainer = styled.div`
  position: absolute;
  width: 120%;
  left: -10%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  user-select: none;
  pointer-events: none;
  z-index: 1;
  opacity: 0.85;

  @media (max-width: 768px) {
    gap: 0.8rem;
  }
`;

const MarqueeRow = styled.div<{ direction: "left" | "right" }>`
  display: flex;
  white-space: nowrap;
  font-family: var(--font-geist-sans), sans-serif;
  font-weight: 900;
  font-size: 10.5vw;
  line-height: 0.85;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.04);
  overflow: hidden;

  /* Accent highlights on text */
  span.highlight {
    color: #ffffff;
    -webkit-text-stroke: 0;
    text-shadow: 0 0 40px rgba(255, 255, 255, 0.15);
  }
  span.unhigh{
  color: #ffffff;
  }

  @media (max-width: 768px) {
    font-size: 14vw;
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.06);
  }
`;

const MarqueeInner = styled.div`
  display: inline-flex;
  gap: 2.5rem;
  padding-right: 2.5rem;
`;

const CenterCardWrapper = styled.div`
  position: relative;
  width: 320px;
  height: 420px;
  z-index: 5;
  perspective: 1000px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 250px;
    height: 330px;
    margin: 4rem 0;
  }
`;

const PortraitCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8);
 
  opacity: 0.12;
  filter: url(#mirage-filter) grayscale(100%) contrast(1.1) brightness(0.9);

  img {
    transition: filter 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
    object-fit: cover;
  }

  &:hover {
    opacity: 0.95;
    border-color: rgba(255, 255, 255, 0.35);
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.9), 
                0 0 30px rgba(255, 255, 255, 0.15);
    filter: grayscale(0%) contrast(1) brightness(1);

    img {
      transform: scale(1.03);
    }
  }
`;

const OverlayBadge = styled.div<{ top?: string; bottom?: string; left?: string; right?: string }>`
  position: absolute;
  top: ${props => props.top || "auto"};
  bottom: ${props => props.bottom || "auto"};
  left: ${props => props.left || "auto"};
  right: ${props => props.right || "auto"};
  background: rgba(20, 20, 20, 0.7);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 40px;
  padding: 0.6rem 1.2rem;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.7rem;
  color: #ffffff;
  z-index: 6;
  pointer-events: none;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  span.bullet {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #00ff66;
  }
`;

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Endless background marquees using GSAP
    const animateRow = (ref: React.RefObject<HTMLDivElement | null>, toLeft: boolean) => {
      if (!ref.current) return;
      
      const width = ref.current.scrollWidth / 2;
      gsap.set(ref.current, { x: 0 });
      
      gsap.to(ref.current, {
        x: toLeft ? -width : width,
        ease: "none",
        duration: 25,
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const val = parseFloat(x);
            return toLeft ? val % width : (val < 0 ? (val % width) + width : val % width) - width;
          })
        }
      });
    };

    animateRow(row1Ref, true);
    animateRow(row2Ref, false);
    animateRow(row3Ref, true);

    // 2. Parallax mouse effect on card overlay badges
    const handleMouseMove = (e: MouseEvent) => {
      // Subtle parallax shift on overlay badges only
      gsap.to(".overlay-badge-1", {
        x: (e.clientX - window.innerWidth / 2) * 0.02,
        y: (e.clientY - window.innerHeight / 2) * 0.02,
        ease: "power2.out",
        duration: 0.8,
      });
      gsap.to(".overlay-badge-2", {
        x: (e.clientX - window.innerWidth / 2) * -0.015,
        y: (e.clientY - window.innerHeight / 2) * -0.015,
        ease: "power2.out",
        duration: 0.8,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(".overlay-badge", {
        x: 0,
        y: 0,
        ease: "power2.out",
        duration: 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    cardRef.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      cardRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <HeroSection id="home">
      <Navbar>
        <Logo href="#home">
          ANUPAM
          <span className="lastName">SINHA</span>
        </Logo>
        <NavLinks>
          <NavLink href="#about">ABOUT</NavLink>
          <NavLink href="#experience">EXPERIENCE</NavLink>
          <NavLink href="#projects">PROJECTS</NavLink>
          <NavLink href="#skills">SKILLS</NavLink>
          <NavLink href="#contact">CONTACT</NavLink>
        </NavLinks>
      </Navbar>

      <MainContent>
        <MarqueeContainer>
          <MarqueeRow direction="left">
            <MarqueeInner ref={row1Ref}>
            <span className="unhigh">FRONTEND DEVELOPER</span>  &bull; <span className="highlight">FRONTEND DEVELOPER</span> &bull;  <span className="unhigh">FRONTEND DEVELOPER</span> &bull; <span className="highlight">FRONTEND DEVELOPER</span> &bull;
            </MarqueeInner>
          </MarqueeRow>
          <MarqueeRow direction="right">
            <MarqueeInner ref={row2Ref}>
               <span className="unhigh">FULL STACK DEVELOPER </span> &bull; <span className="highlight">CREATIVE DEVELOPER</span> &bull; <span className="unhigh">FULL STACK DEVELOPER</span> &bull; <span className="highlight">CREATIVE DEVELOPER</span> &bull;
            </MarqueeInner>
          </MarqueeRow>
          <MarqueeRow direction="left">
            <MarqueeInner ref={row3Ref}>
              <span className="unhigh">NEXT.JS SPECIALIST</span>  &bull; <span className="highlight">REACT ENGINEER</span> &bull;  <span className="unhigh">NEXT.JS SPECIALIST</span> &bull; <span className="highlight">REACT ENGINEER</span> &bull;
            </MarqueeInner>
          </MarqueeRow>
        </MarqueeContainer>

        <CenterCardWrapper ref={cardRef}>
          <PortraitCard>
            <Image
              src="/images/profile.jpg"
              alt="Anupam Sinha Profile"
              fill
              priority
            />
          </PortraitCard>
          
          <OverlayBadge top="-20px" left="-40px" className="overlay-badge overlay-badge-1">
            <span className="bullet"></span>
            NEXT.JS SPECIALIST
          </OverlayBadge>

          <OverlayBadge bottom="-20px" right="-40px" className="overlay-badge overlay-badge-2">
            LIGHTHOUSE SCORE: 93+
          </OverlayBadge>
        </CenterCardWrapper>
      </MainContent>

      <StatusWidget />

      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="mirage-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.06" numOctaves="2" result="noise">
              <animate attributeName="baseFrequency" dur="10s" values="0.015 0.06;0.025 0.09;0.015 0.06" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </HeroSection>
  );
}
