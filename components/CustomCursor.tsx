"use client";

import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";

const CursorDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #ffffff;
  border-radius: 50%;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 10000;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
`;

const CursorRing = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s, border-color 0.3s;
`;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable custom cursor on mobile devices
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Fast coordinate tracking
    const mouse = { x: 0, y: 0 };
    
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Move small dot instantly
      gsap.set(dot, { x: mouse.x, y: mouse.y });
      
      // Smoothly follow with outer ring
      gsap.to(ring, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.25,
        ease: "power2.out"
      });
    };

    // Magnification triggers
    const onMouseEnterLink = () => {
      if (!ring || !dot) return;
      gsap.to(ring, {
        width: 60,
        height: 60,
        borderColor: "#ffffff",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        duration: 0.3
      });
      gsap.to(dot, {
        scale: 0,
        duration: 0.3
      });
    };

    const onMouseLeaveLink = () => {
      if (!ring || !dot) return;
      gsap.to(ring, {
        width: 40,
        height: 40,
        borderColor: "rgba(255, 255, 255, 0.4)",
        backgroundColor: "transparent",
        duration: 0.3
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.3
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Attach listeners to interactive elements
    const addListeners = () => {
      const links = document.querySelectorAll("a, button, input, textarea, [role='button']");
      links.forEach((link) => {
        link.addEventListener("mouseenter", onMouseEnterLink);
        link.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };

    // Add listeners on mount and set up observer for dynamic elements
    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      const links = document.querySelectorAll("a, button, input, textarea, [role='button']");
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <CursorDot ref={dotRef} className="custom-cursor-dot" />
      <CursorRing ref={ringRef} className="custom-cursor-ring" />
    </>
  );
}
