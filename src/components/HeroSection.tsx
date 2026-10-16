"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface DropdownItem {
  label: string;
  href: string;
}

interface DropdownMenu {
  id: string;
  label: string;
  items: DropdownItem[];
}

const dropdownsData: DropdownMenu[] = [
  {
    id: "service-menu",
    label: "Service",
    items: [
      { label: "Service", href: "#service" },
      { label: "Service details", href: "#service-detail" },
    ],
  },
  {
    id: "blog-menu",
    label: "Blog",
    items: [
      { label: "Blog one", href: "#blog-one" },
      { label: "Blog two", href: "#blog-two" },
      { label: "Blog three", href: "#blog-three" },
      { label: "Blog posts", href: "#blog-post" },
    ],
  },
  {
    id: "portfolio-menu",
    label: "Portfolio",
    items: [
      { label: "Portfolio one", href: "#portfolio-one" },
      { label: "Portfolio two", href: "#portfolio-two" },
      { label: "Portfolio three", href: "#portfolio-three" },
      { label: "Portfolio details", href: "#portfolio-detail" },
    ],
  },
  {
    id: "contact-menu",
    label: "Contact",
    items: [
      { label: "Contact one", href: "#contact-one" },
      { label: "Contact two", href: "#contact-two" },
      { label: "Contact three", href: "#contact-three" },
    ],
  },
];

const cardsData = [
  { pack: 0, order: 4, src: "/assets/hero-01.webp", priority: true },
  { pack: 0, order: 0, src: "/assets/hero-02.webp", priority: false },
  { pack: 0, order: 1, src: "/assets/hero-03.webp", priority: false },
  { pack: 0, order: 2, src: "/assets/hero-04.webp", priority: false },
  { pack: 0, order: 3, src: "/assets/hero-05.webp", priority: false },
  { pack: 1, order: 4, src: "/assets/hero-06.webp", priority: false },
  { pack: 1, order: 0, src: "/assets/hero-07.webp", priority: false },
  { pack: 1, order: 1, src: "/assets/hero-08.webp", priority: false },
  { pack: 1, order: 2, src: "/assets/hero-09.webp", priority: false },
  { pack: 1, order: 3, src: "/assets/hero-10.webp", priority: false },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuVideoRef = useRef<HTMLVideoElement>(null);
  const artworksRef = useRef<(HTMLImageElement | null)[]>([]);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationsRef = useRef<Animation[]>([]);
  const heroVisibleRef = useRef<boolean>(true);

  // Close all dropdowns
  const closeDropdowns = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  const handleDropdownEnter = (id: string) => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setActiveDropdown(id);
  };

  const handleDropdownLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      closeDropdowns();
    }, 200);
  };

  const toggleDropdown = (id: string) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  // Open / Close navigation dialog
  const openMenu = () => {
    closeDropdowns();
    if (dialogRef.current) {
      dialogRef.current.showModal();
      document.body.classList.add("menu-open");
      menuToggleRef.current?.setAttribute("aria-expanded", "true");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduced && menuVideoRef.current) {
        menuVideoRef.current.play().catch(() => {});
      }
      syncPlayback();
    }
  };

  const closeMenu = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      document.body.classList.remove("menu-open");
      menuToggleRef.current?.setAttribute("aria-expanded", "false");
      if (menuVideoRef.current) {
        menuVideoRef.current.pause();
      }
      menuToggleRef.current?.focus();
      syncPlayback();
    }
  };

  // Playback sync function
  const syncPlayback = useCallback(() => {
    const isPaused =
      document.hidden ||
      !heroVisibleRef.current ||
      Boolean(dialogRef.current?.open);

    animationsRef.current.forEach((animation) => {
      if (isPaused) {
        animation.pause();
      } else {
        animation.play();
      }
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("js-ready");

    // Reveal IntersectionObserver
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = heroRef.current?.querySelectorAll(".reveal");
    revealElements?.forEach((el) => revealObserver.observe(el));

    // Animation configuration
    const ease = "cubic-bezier(.645,.045,.355,1)";
    const cycle = 11900;
    const pose = (x = 0, y = 0, angle = 0) =>
      `translate(${x}%, ${y}%) rotate(${angle}deg)`;
    const fan: [number, number, number][] = [
      [-3, 6, -29],
      [-3, 5, -22],
      [-3, 4, -11],
      [-2, 2, 0],
      [0, 0, 13],
    ];

    function buildAnimation() {
      // Cancel previous animations
      animationsRef.current.forEach((anim) => anim.cancel());
      animationsRef.current = [];

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const compact = window.matchMedia("(max-width: 479px)").matches;
      const tablet = window.matchMedia("(max-width: 767px)").matches;
      const shifts = compact
        ? [-32, 32]
        : tablet
        ? [-56, 64]
        : [-128, 128];

      const cards = artworksRef.current.filter(
        (card): card is HTMLImageElement => card !== null
      );
      const words = wordsRef.current.filter(
        (word): word is HTMLSpanElement => word !== null
      );

      cards.forEach((card) => card.style.removeProperty("transform"));
      words.forEach((word) => word.style.removeProperty("transform"));

      if (reducedMotion) {
        cards.forEach((card) => {
          const pack = card.dataset.pack;
          const order = Number(card.dataset.order);
          card.style.transform =
            pack === "0" ? pose(...fan[order]) : pose(0, -300);
        });
        words.forEach((word, i) => {
          word.style.transform = `translateX(${shifts[i]}px)`;
        });
        return;
      }

      // Card animation frames
      cards.forEach((card) => {
        const pack = Number(card.dataset.pack);
        const order = Number(card.dataset.order);
        const start = pack === 0 ? 0 : 6200;
        const enter = start + order * 200;
        const spread = start + 1800;
        const close = start + 3200;
        const leave = start + 3900 + (4 - order) * 200;
        const hidden = pose(0, -300);

        const frames: [number, string][] = [
          [0, hidden],
          [enter, hidden],
          [enter + 1000, pose()],
          [spread, pose()],
          [spread + 900, pose(...fan[order])],
          [close, pose(...fan[order])],
          [close + 700, pose()],
          [leave, pose()],
          [leave + 1000, hidden],
          [cycle, hidden],
        ];

        const anim = card.animate(
          frames.map(([time, transform]) => ({
            offset: time / cycle,
            transform,
            easing: ease,
          })),
          { duration: cycle, iterations: Infinity, fill: "both" }
        );
        animationsRef.current.push(anim);
      });

      // Word animation frames
      words.forEach((word, i) => {
        const closed = "translateX(0px)";
        const open = `translateX(${shifts[i]}px)`;
        const frames: [number, string][] = [
          [0, closed],
          [1000, open],
          [4700, open],
          [5700, closed],
          [6200, closed],
          [7200, open],
          [10900, open],
          [cycle, closed],
        ];

        const anim = word.animate(
          frames.map(([time, transform]) => ({
            offset: time / cycle,
            transform,
            easing: ease,
          })),
          { duration: cycle, iterations: Infinity, fill: "both" }
        );
        animationsRef.current.push(anim);
      });

      syncPlayback();
    }

    // Hero visibility tracking
    const heroEl = heroRef.current;
    let visibilityObserver: IntersectionObserver | null = null;
    if (heroEl) {
      visibilityObserver = new IntersectionObserver(([entry]) => {
        heroVisibleRef.current = entry.isIntersecting;
        syncPlayback();
      });
      visibilityObserver.observe(heroEl);
    }

    const onVisibilityChange = () => syncPlayback();
    document.addEventListener("visibilitychange", onVisibilityChange);

    const mqlReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mql479 = window.matchMedia("(max-width: 479px)");
    const mql767 = window.matchMedia("(max-width: 767px)");

    mqlReduced.addEventListener("change", buildAnimation);
    mql479.addEventListener("change", buildAnimation);
    mql767.addEventListener("change", buildAnimation);

    // Initial build once fonts and cards are ready
    const cardElements = artworksRef.current.filter(
      (card): card is HTMLImageElement => card !== null
    );
    Promise.allSettled([
      document.fonts.ready,
      ...cardElements.map((card) => card.decode().catch(() => {})),
    ]).then(buildAnimation);

    // Keydown global listeners
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDropdowns();
        if (dialogRef.current?.open) {
          closeMenu();
        }
      }
    };
    document.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      revealObserver.disconnect();
      visibilityObserver?.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("keydown", handleGlobalKeyDown);
      mqlReduced.removeEventListener("change", buildAnimation);
      mql479.removeEventListener("change", buildAnimation);
      mql767.removeEventListener("change", buildAnimation);
      animationsRef.current.forEach((anim) => anim.cancel());
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, [closeDropdowns, syncPlayback]);

  // Click outside dropdowns
  const handleDropdownBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      closeDropdowns();
    }
  };

  return (
    <main>
      <section
        ref={heroRef}
        className="hero"
        id="hero"
        aria-labelledby="hero-title"
      >
        {/* Ambient atmospheric glows */}
        <div className="hero-light" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>

        {/* Vertical architectural guide lines */}
        <div className="guide-lines" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>

        {/* Global agency header navigation */}
        <header className="header">
          <div className="container navigation">
            <a href="/" className="brand" aria-label="Wazemtech agency home">
              <img
                src="/assets/logo.svg"
                width={156}
                height={32}
                alt="Wazemtech"
              />
            </a>

            <nav className="desktop-nav" aria-label="Main navigation">
              <a href="/" aria-current="page">
                Home
              </a>
              <a href="#about">About</a>

              {dropdownsData.map((dropdown) => {
                const isOpen = activeDropdown === dropdown.id;
                return (
                  <div
                    key={dropdown.id}
                    className={`dropdown ${isOpen ? "is-open" : ""}`}
                    onPointerEnter={() => handleDropdownEnter(dropdown.id)}
                    onPointerLeave={handleDropdownLeave}
                    onBlur={handleDropdownBlur}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={dropdown.id}
                      onClick={() => toggleDropdown(dropdown.id)}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setActiveDropdown(dropdown.id);
                        }
                      }}
                    >
                      {dropdown.label}
                      <img src="/assets/chevron.svg" alt="" />
                    </button>
                    <div className="dropdown-menu" id={dropdown.id}>
                      {dropdown.items.map((item) => (
                        <a key={item.label} href={item.href}>
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </nav>

            <button
              ref={menuToggleRef}
              className="menu-toggle"
              type="button"
              aria-label="Open menu"
              title="Open menu"
              aria-expanded="false"
              aria-controls="navigation-dialog"
              onClick={openMenu}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </header>

        {/* Main Hero Content Area */}
        <div className="container hero-content">
          <div className="hero-spacer" aria-hidden="true" />

          <div className="hero-heading">
            <h1 id="hero-title">
              <span
                ref={(el) => {
                  wordsRef.current[0] = el;
                }}
                className="word word-design"
              >
                <span>Design</span>
              </span>
              <span
                ref={(el) => {
                  wordsRef.current[1] = el;
                }}
                className="word word-studio"
              >
                <span>Studio</span>
              </span>
            </h1>

            {/* Fanning Card Deck Stack */}
            <div className="image-stack" aria-hidden="true">
              {cardsData.map((card, index) => (
                <img
                  key={index}
                  ref={(el) => {
                    artworksRef.current[index] = el;
                  }}
                  className="artwork"
                  data-pack={card.pack}
                  data-order={card.order}
                  src={card.src}
                  alt=""
                  width={282}
                  height={366}
                  loading={card.priority ? undefined : "lazy"}
                  {...(card.priority ? { fetchPriority: "high" } : {})}
                />
              ))}
            </div>
          </div>

          {/* Hero Bottom Bar */}
          <div className="hero-bottom">
            <div className="intro">
              <p className="reveal">
                We blend creativity with technical expertise to craft experiences
                that captivate audiences, communicate your brand message.
              </p>
              <div className="reveal">
                <a className="talk-button" href="#contact">
                  <span className="button-words">
                    <span>Let's talk</span>
                    <span aria-hidden="true">Let's talk</span>
                  </span>
                  <span className="button-dot" aria-hidden="true" />
                </a>
              </div>
            </div>

            <nav className="service-list" aria-label="Our services">
              <a className="service-link reveal" href="#service">
                <span>Creative direction</span>
                <span className="arrows" aria-hidden="true">
                  <img src="/assets/arrow.svg" alt="" />
                  <img src="/assets/arrow.svg" alt="" />
                </span>
              </a>
              <a className="service-link reveal" href="#service">
                <span>Interaction design</span>
                <span className="arrows" aria-hidden="true">
                  <img src="/assets/arrow.svg" alt="" />
                  <img src="/assets/arrow.svg" alt="" />
                </span>
              </a>
              <a className="service-link reveal" href="#service">
                <span>Web design</span>
                <span className="arrows" aria-hidden="true">
                  <img src="/assets/arrow.svg" alt="" />
                  <img src="/assets/arrow.svg" alt="" />
                </span>
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Accessible Navigation Modal Dialog */}
      <dialog
        ref={dialogRef}
        id="navigation-dialog"
        className="navigation-dialog"
        data-lenis-prevent
        aria-label="Navigation"
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            closeMenu();
          }
        }}
        onClose={closeMenu}
      >
        <button
          className="close-menu"
          type="button"
          aria-label="Close menu"
          title="Close menu"
          onClick={closeMenu}
        >
          <span />
          <span />
        </button>

        <nav className="panel-links" aria-label="Expanded navigation">
          <a href="/" aria-current="page" onClick={closeMenu}>
            Home
          </a>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#service" onClick={closeMenu}>
            Service
          </a>
          <a href="#portfolio" onClick={closeMenu}>
            Portfolio
          </a>
          <a href="#blog" onClick={closeMenu}>
            Blog
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
        </nav>

        <div className="panel-bottom">
          <div className="social-links">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <img src="/assets/social-facebook.svg" alt="" />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <img src="/assets/social-linkedin.svg" alt="" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img src="/assets/social-instagram.svg" alt="" />
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <img src="/assets/social-x.svg" alt="" />
            </a>
          </div>

          <video
            ref={menuVideoRef}
            className="menu-video"
            muted
            loop
            playsInline
            preload="none"
            poster="/assets/menu-poster.jpg"
          >
            <source src="/assets/menu-video.mp4" type="video/mp4" />
          </video>
        </div>
      </dialog>
    </main>
  );
}
