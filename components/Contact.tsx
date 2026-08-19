"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const GithubIcon = ({ size = 18, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
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

const LinkedinIcon = ({ size = 18, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ContactSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #080808;
  color: #ffffff;
  padding: 8rem 3rem 4rem 3rem;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 5rem 1.5rem 3rem 1.5rem;
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 6rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const InfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`;

const Title = styled.h2`
  font-family: var(--font-geist-sans), sans-serif;
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.03em;
  margin: 0;

  span.accent {
    color: #888888;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const ConnectionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const ConnectionLink = styled.a`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-family: var(--font-geist-sans), sans-serif;
  font-size: 1.1rem;
  color: #a0a0a0;
  text-decoration: none;
  width: fit-content;
  transition: color 0.3s ease;

  span.icon-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    color: #ffffff;
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  }

  &:hover {
    color: #ffffff;
    span.icon-box {
      background-color: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.4);
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
    }
  }
`;

const FormPanel = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const FormGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label<{ shrink: boolean }>`
  position: absolute;
  left: 0;
  top: ${props => (props.shrink ? "-20px" : "10px")};
  font-family: var(--font-geist-mono), monospace;
  font-size: ${props => (props.shrink ? "0.75rem" : "0.9rem")};
  color: ${props => (props.shrink ? "#ffffff" : "#666666")};
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const FormInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 0;
  color: #ffffff;
  font-family: var(--font-geist-sans), sans-serif;
  font-size: 1rem;
  outline: none;
  width: 100%;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #ffffff;
  }
`;

const FormTextarea = styled.textarea`
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 0;
  color: #ffffff;
  font-family: var(--font-geist-sans), sans-serif;
  font-size: 1rem;
  outline: none;
  width: 100%;
  height: 120px;
  resize: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #ffffff;
  }
`;

const SubmitButton = styled.button`
  background-color: #ffffff;
  border: 1px solid #ffffff;
  color: #000000;
  font-family: var(--font-geist-sans), sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 1rem 2rem;
  border-radius: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: fit-content;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: transparent;
    color: #ffffff;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusBanner = styled.div<{ isError?: boolean }>`
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.85rem;
  padding: 0.9rem 1.2rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: ${props => (props.isError ? "rgba(255, 50, 50, 0.08)" : "rgba(0, 255, 102, 0.08)")};
  border: 1px solid ${props => (props.isError ? "rgba(255, 50, 50, 0.25)" : "rgba(0, 255, 102, 0.25)")};
  color: ${props => (props.isError ? "#ff6666" : "#00ff66")};
  line-height: 1.4;
`;

const SpinIcon = styled(Loader2)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;


const Footer = styled.div`
  margin-top: 6rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-geist-mono), monospace;
  font-size: 0.75rem;
  color: #555555;
  width: 100%;

  span.credit {
    color: #888888;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [activeField, setActiveField] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".contact-anim", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field: string) => setActiveField(field);
  const handleBlur = (field: string) => {
    if (formData[field as keyof typeof formData] === "") {
      setActiveField(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setStatus("submitting");
    setStatusMessage("Opening Gmail...");

    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Anupam,\n\n${formData.message}\n\nBest regards,\n${formData.name}`
    );

    // Detect if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    const mailtoUrl = `mailto:18anupam.sinha@gmail.com?subject=${subject}&body=${body}`;
    const webGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=18anupam.sinha@gmail.com&su=${subject}&body=${body}`;

    setTimeout(() => {
      if (isMobile) {
        // Open Gmail / Mail app on phone
        window.location.href = mailtoUrl;
      } else {
        // Open Gmail web compose in a new tab on desktop
        const win = window.open(webGmailUrl, "_blank", "noopener,noreferrer");
        if (!win) {
          // Fallback if popup blocked
          window.location.href = mailtoUrl;
        }
      }

      setStatus("success");
      setStatusMessage("Gmail launched successfully! Ready to send.");
      setFormData({ name: "", message: "" });
    }, 400);
  };

  return (
    <ContactSection id="contact" ref={containerRef}>
      <SectionHeader className="contact-anim">
        <span className="number">05</span> CONNECT
      </SectionHeader>

      <ContentGrid>
        <InfoPanel className="contact-anim">
          <Title>
            LET'S INITIATE<br />
            <span className="accent">SOMETHING CREATIVE.</span>
          </Title>

          <ConnectionList>
            <ConnectionLink href="mailto:18anupam.sinha@gmail.com">
              <span className="icon-box"><Mail size={18} /></span>
              18anupam.sinha@gmail.com
            </ConnectionLink>
            <ConnectionLink href="tel:+919835153473">
              <span className="icon-box"><Phone size={18} /></span>
              +91-9835153473
            </ConnectionLink>
            <ConnectionLink href="https://github.com/anupamsinha18" target="_blank" rel="noopener noreferrer">
              <span className="icon-box"><GithubIcon size={18} /></span>
              GITHUB PROFILE
            </ConnectionLink>
            <ConnectionLink href="https://www.linkedin.com/in/anupam-sinha-9851961a9/" target="_blank" rel="noopener noreferrer">
              <span className="icon-box"><LinkedinIcon size={18} /></span>
              LINKEDIN PROFILE
            </ConnectionLink>
          </ConnectionList>
        </InfoPanel>

        <FormPanel onSubmit={handleSubmit} className="contact-anim">
          <FormGroup>
            <InputLabel shrink={activeField === "name" || formData.name !== ""}>
              Full Name
            </InputLabel>
            <FormInput
              type="text"
              name="name"
              value={formData.name}
              onFocus={() => handleFocus("name")}
              onBlur={() => handleBlur("name")}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <InputLabel shrink={activeField === "message" || formData.message !== ""}>
              Your Message
            </InputLabel>
            <FormTextarea
              name="message"
              value={formData.message}
              onFocus={() => handleFocus("message")}
              onBlur={() => handleBlur("message")}
              onChange={handleChange}
              required
            />
          </FormGroup>

          {status !== "idle" && (
            <StatusBanner isError={status === "error"}>
              {status === "submitting" && <SpinIcon size={18} />}
              {status === "success" && <CheckCircle2 size={18} />}
              {status === "error" && <AlertCircle size={18} />}
              <span>{statusMessage}</span>
            </StatusBanner>
          )}

          <SubmitButton type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? (
              <>
                LAUNCHING GMAIL... <SpinIcon size={16} />
              </>
            ) : status === "success" ? (
              <>
                GMAIL LAUNCHED! <CheckCircle2 size={16} />
              </>
            ) : (
              <>
                DISPATCH VIA GMAIL <Send size={16} />
              </>
            )}
          </SubmitButton>
        </FormPanel>
      </ContentGrid>

      <Footer className="contact-anim">
        <div>&copy; 2026 ANUPAM SINHA. ALL RIGHTS RESERVED.</div>
        <div className="credit">
          CURATED WITH <span className="credit">NEXT.JS + EMOTION + GSAP</span>
        </div>
      </Footer>
    </ContactSection>
  );
}
