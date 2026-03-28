import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Ban,
  Users,
  Lock,
  FileText,
  Shield,
  Radar,
  RotateCcw,
  ClipboardList,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = {
  left: [
    { icon: Ban, label: 'Mass Ban', desc: 'Bulk user removal' },
    { icon: Users, label: 'Role Cleanup', desc: 'Automated role management' },
    { icon: Lock, label: 'Channel Lock', desc: 'Instant lockdown' },
    { icon: FileText, label: 'Log Export', desc: 'Full audit trails' },
  ],
  right: [
    { icon: Shield, label: 'Anti-Spam', desc: 'Smart detection' },
    { icon: Radar, label: 'Raid Detect', desc: 'Real-time alerts' },
    { icon: RotateCcw, label: 'One-Click Undo', desc: 'Instant rollback' },
    { icon: ClipboardList, label: 'Audit Trail', desc: 'Complete history' },
  ],
};

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const leftCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rightCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      // Portrait card
      scrollTl.fromTo(
        portraitRef.current,
        { scale: 0.82, opacity: 0, y: '10vh' },
        { scale: 1, opacity: 1, y: 0, ease: 'none' },
        0
      );

      // Left cards
      leftCardsRef.current.forEach((card, i) => {
        if (card) {
          scrollTl.fromTo(
            card,
            { x: '-40vw', opacity: 0, rotateZ: -6 },
            { x: 0, opacity: 1, rotateZ: 0, ease: 'none' },
            i * 0.02
          );
        }
      });

      // Right cards
      rightCardsRef.current.forEach((card, i) => {
        if (card) {
          scrollTl.fromTo(
            card,
            { x: '40vw', opacity: 0, rotateZ: 6 },
            { x: 0, opacity: 1, rotateZ: 0, ease: 'none' },
            i * 0.02
          );
        }
      });

      // Connector lines
      if (linesRef.current) {
        const paths = linesRef.current.querySelectorAll('path');
        paths.forEach((path) => {
          const length = (path as SVGPathElement).getTotalLength?.() || 200;
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          scrollTl.to(path, { strokeDashoffset: 0, ease: 'none' }, 0.1);
        });
      }

      // SETTLE (30-70%): Hold - elements stay in place

      // EXIT (70-100%)
      scrollTl.to(
        portraitRef.current,
        { scale: 0.95, opacity: 0, y: '-8vh', ease: 'power2.in' },
        0.7
      );

      leftCardsRef.current.forEach((card) => {
        if (card) {
          scrollTl.to(card, { x: '-20vw', opacity: 0, ease: 'power2.in' }, 0.7);
        }
      });

      rightCardsRef.current.forEach((card) => {
        if (card) {
          scrollTl.to(card, { x: '20vw', opacity: 0, ease: 'power2.in' }, 0.7);
        }
      });

      if (linesRef.current) {
        scrollTl.to(linesRef.current, { opacity: 0 }, 0.7);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="section-pinned bg-primary-dark flex items-center justify-center"
    >
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,6,11,0.8)_100%)]" />

      {/* Connector Lines SVG */}
      <svg
        ref={linesRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
      >
        {/* Left side connectors */}
        <path d="M 16vw 22vh L 33vw 35vh" className="connector-line" />
        <path d="M 16vw 36vh L 33vw 42vh" className="connector-line" />
        <path d="M 16vw 52vh L 33vw 50vh" className="connector-line" />
        <path d="M 16vw 68vh L 33vw 58vh" className="connector-line" />
        {/* Right side connectors */}
        <path d="M 84vw 22vh L 67vw 35vh" className="connector-line" />
        <path d="M 84vw 36vh L 67vw 42vh" className="connector-line" />
        <path d="M 84vw 52vh L 67vw 50vh" className="connector-line" />
        <path d="M 84vw 68vh L 67vw 58vh" className="connector-line" />
      </svg>

      {/* Left Column Cards */}
      <div className="absolute left-[8vw] top-1/2 -translate-y-1/2 flex flex-col gap-4">
        {features.left.map((feature, i) => (
          <div
            key={feature.label}
            ref={(el) => { leftCardsRef.current[i] = el; }}
            className="hud-card w-[18vw] min-w-[160px] flex items-center gap-4"
            style={{ top: `${22 + i * 14}vh` }}
          >
            <feature.icon className="w-5 h-5 text-[#B14BFF] flex-shrink-0" />
            <div>
              <h3 className="font-display text-sm tracking-wider text-[#F2F4FF]">
                {feature.label}
              </h3>
              <p className="font-mono text-xs text-[#A7B0D5]">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Center Portrait */}
      <div
        ref={portraitRef}
        className="relative z-10 w-[34vw] max-w-[400px] h-[54vh] max-h-[500px] border border-[#B14BFF]/40 glow-accent"
        style={{ background: 'rgba(11, 14, 31, 0.6)' }}
      >
        <img
          src="/features_center.jpg"
          alt="Features"
          className="w-full h-full object-cover"
        />
        {/* Diagonal sheen overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(177,75,255,0.1) 0%, transparent 50%, rgba(177,75,255,0.05) 100%)',
          }}
        />
      </div>

      {/* Right Column Cards */}
      <div className="absolute right-[8vw] top-1/2 -translate-y-1/2 flex flex-col gap-4">
        {features.right.map((feature, i) => (
          <div
            key={feature.label}
            ref={(el) => { rightCardsRef.current[i] = el; }}
            className="hud-card w-[18vw] min-w-[160px] flex items-center gap-4"
            style={{ top: `${22 + i * 14}vh` }}
          >
            <feature.icon className="w-5 h-5 text-[#B14BFF] flex-shrink-0" />
            <div>
              <h3 className="font-display text-sm tracking-wider text-[#F2F4FF]">
                {feature.label}
              </h3>
              <p className="font-mono text-xs text-[#A7B0D5]">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
