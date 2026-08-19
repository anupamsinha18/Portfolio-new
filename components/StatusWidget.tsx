"use client";

import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

const WidgetContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.75rem;
  color: #888888;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const LocationText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span.time {
    color: #ffffff;
  }
`;

const OpenToWork = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #a0a0a0;
  
  span.status {
    color: #ffffff;
  }
`;

const GreenDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #00ff66;
  border-radius: 50%;
  position: relative;
  box-shadow: 0 0 10px #00ff66;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #00ff66;
    animation: pulse 2s infinite ease-in-out;
  }

  @keyframes pulse {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.8;
    }
    100% {
      transform: translate(-50%, -50%) scale(2.5);
      opacity: 0;
    }
  }
`;

export default function StatusWidget() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      // Format time in Asia/Kolkata
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      
      try {
        const formatter = new Intl.DateTimeFormat("en-US", options);
        setTime(formatter.format(new Date()));
      } catch (e) {
        // Fallback
        const now = new Date();
        const istOffset = 5.5 * 60 * 60 * 1000;
        const istTime = new Date(now.getTime() + istOffset + now.getTimezoneOffset() * 60 * 1000);
        const pad = (num: number) => String(num).padStart(2, "0");
        setTime(`${pad(istTime.getHours())}:${pad(istTime.getMinutes())}:${pad(istTime.getSeconds())}`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <WidgetContainer>
      <LocationText>
        BASED IN INDIA &bull; <span className="time">{time || "LOADING..."} IST</span>
      </LocationText>
      <OpenToWork>
        <GreenDot />
        <span className="status">OPEN TO WORK</span> FOR FULL-TIME / CONTRACTS
      </OpenToWork>
    </WidgetContainer>
  );
}
