import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microLeftRef = useRef<HTMLSpanElement>(null);
  const microRightRef = useRef<HTMLSpanElement>(null);

  // Entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Visor image entrance
      tl.fromTo(
        visorRef.current,
        { scale: 0.85, opacity: 0, rotateZ: -2 },
        { scale: 1, opacity: 1, rotateZ: 0, duration: 1 },
        0
      );

      // Title character reveal
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        tl.fromTo(
          chars,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.02 },
          0.3
        );
      }

      // Subtitle
      tl.fromTo(
        subtitleRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.6
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.8
      );

      // Micro labels
      tl.fromTo(
        [microLeftRef.current, microRightRef.current],
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        1
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset elements when scrolling back to top
            gsap.set([visorRef.current, titleRef.current, subtitleRef.current, ctaRef.current], {
              opacity: 1,
              y: 0,
              scale: 1,
            });
          },
        },
      });

      // ENTRANCE (0-30%): Hold position (entrance handled by load animation)
      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        visorRef.current,
        { y: 0, scale: 1, opacity: 1 },
        { y: '-18vh', scale: 0.92, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        titleRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        subtitleRef.current,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        [microLeftRef.current, microRightRef.current],
        { opacity: 1 },
        { opacity: 0 },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Split title into characters
  const titleText = 'NOXXRAIDER';
  const titleChars = titleText.split('').map((char, i) => (
    <span key={i} className="char inline-block">
      {char}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-primary-dark bg-radial-glow flex items-center justify-center"
    >
      {/* Micro Labels */}
      <span
        ref={microLeftRef}
        className="absolute left-[6vw] top-[14vh] font-mono text-xs tracking-[0.14em] text-[#A7B0D5] uppercase"
      >
        SYSTEM READY
      </span>
      <span
        ref={microRightRef}
        className="absolute right-[6vw] top-[14vh] font-mono text-xs tracking-[0.14em] text-[#A7B0D5] uppercase"
      >
        v2.7.0
      </span>

      {/* Main Content */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Visor Image */}
        <div
          ref={visorRef}
          className="visor-ring w-[62vw] max-w-[600px] aspect-square mb-8"
        >
          <img
            src="/hero_visor.jpg"
            alt="NoxxRaider"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-display font-black text-[clamp(44px,8vw,84px)] tracking-[0.08em] text-[#F2F4FF] text-center glow-text mb-4"
        >
          {titleChars}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-display text-[clamp(16px,2.5vw,28px)] tracking-wider text-[#A7B0D5] text-center mb-12"
        >
          Raid smarter. Ban faster.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <button
            onClick={() => window.open('https://discord.com/oauth2/authorize', '_blank')}
            className="btn-primary flex items-center gap-3 text-[#F2F4FF]"
          >
            Add to Server
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary flex items-center gap-3"
          >
            View Features
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#05060B] to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
