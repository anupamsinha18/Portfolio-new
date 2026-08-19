"use client";

import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #050505;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4rem 3rem;
  z-index: 9999;
  box-sizing: border-box;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.8rem;
  color: #666666;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
  gap: 2rem;
`;

const ConsoleLog = styled.div`
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.9rem;
  color: #888888;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.4rem;
  line-height: 1.4;
`;

const LogLine = styled.div<{ active?: boolean }>`
  color: ${(props) => (props.active ? "#ffffff" : "#444444")};
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &::before {
    content: ">";
    color: #00ff66;
    font-weight: bold;
  }
`;

const PercentageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
`;

const ProgressInfo = styled.div`
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.85rem;
  color: #888888;
  max-width: 300px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ProgressNumber = styled.h1`
  font-size: 14vw;
  font-weight: 800;
  line-height: 0.75;
  margin: 0;
  font-family: var(--font-geist-mono), monospace;
  letter-spacing: -0.05em;
  color: #ffffff;
  display: flex;
  align-items: flex-end;
  
  span {
    font-size: 4vw;
    font-weight: 300;
    color: #666666;
    margin-bottom: 1.5vw;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #333333, #ffffff, #00ff66);
  width: 0%;
`;

interface LoaderProps {
  onComplete: () => void;
}

const LOG_MESSAGES = [
  "INITIALIZING PORTFOLIO ENGINE...",
  "CAFFEINATING ALGORITHMS & BROWSER THREADS...",
  "CENTERING DIVS WITH 100% MATHEMATICAL PRECISION...",
  "OPTIMIZING LIGHTHOUSE METRICS (LIGHTSPEED MODE)...",
  "CONVINCING CSS GRID TO COOPERATE UNCONDITIONALLY...",
  "DISABLING BROWSER LAG PREVENTIVELY...",
  "PORTFOLIO READY: PREPARE TO BE IMPRESSED! 🚀"
];

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentLogs, setCurrentLogs] = useState<string[]>([]);
  const logIndexRef = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for percentage loading
      const tl = gsap.timeline({
        onComplete: () => {
          // Slide up exit animation
          gsap.to(containerRef.current, {
            y: "-100%",
            duration: 1.2,
            ease: "power4.inOut",
            onComplete: onComplete
          });
        }
      });

      // Animate progress number state
      tl.to(
        { val: 0 },
        {
          val: 100,
          duration: 3.5,
          ease: "power2.out",
          onUpdate: function () {
            const currentVal = Math.floor(this.targets()[0].val);
            setProgress(currentVal);
            
            // Sync progress bar width
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${currentVal}%`;
            }

            // Sync console log messages based on progress percentage
            const expectedLogIndex = Math.min(
              LOG_MESSAGES.length - 1,
              Math.floor((currentVal / 100) * LOG_MESSAGES.length)
            );

            if (expectedLogIndex >= logIndexRef.current) {
              const logsToAdd: string[] = [];
              for (let i = logIndexRef.current; i <= expectedLogIndex; i++) {
                logsToAdd.push(LOG_MESSAGES[i]);
              }
              if (logsToAdd.length > 0) {
                setCurrentLogs((prev) => {
                  const nextLogs = [...prev, ...logsToAdd];
                  return nextLogs.slice(-3); // keep only last 3 logs
                });
                logIndexRef.current = expectedLogIndex + 1;
              }
            }
          }
        }
      );
    });

    return () => ctx.revert();
  }, [onComplete]);

  // Format progress to always show 3 digits (e.g. 009, 045, 100)
  const formattedProgress = String(progress).padStart(3, "0");

  return (
    <LoaderContainer ref={containerRef}>
      <Header>
        <div>ANUPAM SINHA &copy; 2026</div>
        <div>FRONTEND DEVELOPER // FULL STACK</div>
      </Header>

      <ContentWrapper>
        <ConsoleLog>
          {currentLogs.map((log, idx) => (
            <LogLine key={idx} active={idx === currentLogs.length - 1}>
              {log}
            </LogLine>
          ))}
        </ConsoleLog>

        <PercentageWrapper>
          <ProgressInfo>
            [ SYSTEM BOOTING ]<br />
            OPTIMIZING EXPERIENCE INTERFACES FOR SMOOTH SCROLLING AND MOTIONGRAPHICS.
          </ProgressInfo>
          <ProgressNumber>
            {formattedProgress}
            <span>%</span>
          </ProgressNumber>
        </PercentageWrapper>
      </ContentWrapper>

      <ProgressBar ref={progressBarRef} />
    </LoaderContainer>
  );
}
