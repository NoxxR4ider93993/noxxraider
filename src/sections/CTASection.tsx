import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BookOpen, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Portrait animation
      gsap.fromTo(
        portraitRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: portraitRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Body animation
      gsap.fromTo(
        bodyRef.current,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.1,
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Links animation
      gsap.fromTo(
        linksRef.current,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.3,
          scrollTrigger: {
            trigger: linksRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative bg-secondary-dark min-h-screen flex flex-col items-center justify-center py-20"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(177,75,255,0.12), transparent 55%), #0B0E1F',
      }}
    >
      {/* Portrait */}
      <div
        ref={portraitRef}
        className="w-[18vw] max-w-[200px] h-[28vh] max-h-[300px] border border-[#B14BFF]/40 glow-accent mb-8"
        style={{ background: 'rgba(11, 14, 31, 0.6)' }}
      >
        <img
          src="/cta_center.jpg"
          alt="CTA"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Heading */}
      <h2
        ref={headingRef}
        className="font-display text-[clamp(28px,5vw,48px)] font-bold text-[#F2F4FF] tracking-wider text-center mb-4"
      >
        Ready to lock down?
      </h2>

      {/* Body */}
      <p
        ref={bodyRef}
        className="font-mono text-sm text-[#A7B0D5] text-center max-w-md mb-10 px-6"
      >
        Add NoxxRaider. Choose your permissions. Start protecting.
      </p>

      {/* Primary CTA */}
      <div ref={ctaRef} className="mb-8">
        <button
          onClick={() => window.open('https://discord.com/oauth2/authorize', '_blank')}
          className="btn-primary flex items-center gap-3 text-[#F2F4FF] animate-pulse-glow"
        >
          Add to Server
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Secondary Links */}
      <div ref={linksRef} className="flex items-center gap-6 mb-16">
        <a
          href="#"
          className="flex items-center gap-2 font-mono text-sm text-[#A7B0D5] hover:text-[#B14BFF] transition-colors"
          onClick={(e) => {
            e.preventDefault();
            alert('Documentation coming soon!');
          }}
        >
          <BookOpen className="w-4 h-4" />
          Documentation
        </a>
        <span className="text-[#A7B0D5]/30">|</span>
        <a
          href="#"
          className="flex items-center gap-2 font-mono text-sm text-[#A7B0D5] hover:text-[#B14BFF] transition-colors"
          onClick={(e) => {
            e.preventDefault();
            alert('Support server coming soon!');
          }}
        >
          <MessageCircle className="w-4 h-4" />
          Support Server
        </a>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 left-0 right-0 text-center">
        <p className="font-mono text-xs text-[#A7B0D5]/50">
          Not affiliated with Discord.
        </p>
        <p className="font-mono text-xs text-[#A7B0D5]/30 mt-2">
          © 2024 NoxxRaider. All rights reserved.
        </p>
      </footer>
    </section>
  );
};

export default CTASection;
