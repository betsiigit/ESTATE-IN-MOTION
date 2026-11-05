
"use client";

import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Menu,
  X,
  Plus,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const properties = [
  {
    number: "01",
    name: "The Solstice House",
    location: "Palm Springs, California",
    type: "Private residence",
    price: "$2,450,000",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90",
  },
  {
    number: "02",
    name: "Casa Aurelia",
    location: "Tuscany, Italy",
    type: "Countryside villa",
    price: "$3,200,000",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=90",
  },
  {
    number: "03",
    name: "The Glass Residence",
    location: "Cape Town, South Africa",
    type: "Contemporary home",
    price: "$1,890,000",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90",
  },
];

const rooms = [
  {
    name: "Living room",
    number: "01",
    description: "A space to slow down, gather, and feel at home.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90",
    detail: "Natural oak · Limestone · Soft linen",
  },
  {
    name: "Kitchen",
    number: "02",
    description: "Where everyday rituals become something special.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90",
    detail: "Travertine · Brushed brass · Walnut",
  },
  {
    name: "Bedroom",
    number: "03",
    description: "A private retreat shaped around comfort and calm.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=90",
    detail: "Warm oak · Textured cotton · Ambient light",
  },
  {
    name: "Bathroom",
    number: "04",
    description: "A quiet space for a slower start and softer ending.",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1800&q=90",
    detail: "Natural stone · Matte fixtures · Warm light",
  },
];

const reveal = {
  hidden: {
    opacity: 0,
    y: 45,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [
        number,
        number,
        number,
        number
      ],
    },
  },
};

export default function Home() {
  const [activeRoom, setActiveRoom] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // GSAP + Lenis animation engine
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      // Scroll reveal animations
      const revealElements = gsap.utils.toArray<HTMLElement>([
        ".section-eyebrow",
        ".intro-bottom-note",
        ".properties-heading",
        ".experience-heading",
        ".room-experience",
        ".properties-footer",
        ".manifesto-content",
        ".footer-main",
      ]);

      revealElements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 65,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Hero image parallax
      gsap.to(".hero-image", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-image",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hero title movement
      gsap.to(".hero-title-wrap", {
        y: -80,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Continuous floating label
      gsap.to(".hero-floating-label", {
        y: -18,
        rotate: -4,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Continuous decorative star
      gsap.to(".hero-asterisk", {
        rotation: 360,
        duration: 18,
        repeat: -1,
        ease: "none",
      });

      // Property card image movement
      gsap.utils
        .toArray<HTMLElement>(".property-image")
        .forEach((image) => {
          gsap.fromTo(
            image,
            {
              backgroundPosition: "center 35%",
            },
            {
              backgroundPosition: "center 65%",
              ease: "none",
              scrollTrigger: {
                trigger: image,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });

      // Manifesto typography reveal
      gsap.fromTo(
        ".manifesto-content h2",
        {
          y: 100,
          opacity: 0,
          skewY: 5,
        },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".manifesto-section",
            start: "top 65%",
          },
        }
      );
    });

    return () => {
      context.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <main id="top">
      {/* NAVIGATION */}
      <header className="site-header">
        <a href="#top" className="brand">
          <span className="brand-symbol">E.</span>
          <span className="brand-name">
            ESTATE
            <br />
            IN MOTION
          </span>
        </a>

        <nav className="desktop-nav">
          <a href="#properties">Properties</a>
          <a href="#experience">Experience</a>
          <a href="#studio">Our philosophy</a>
        </nav>

        <a href="#contact" className="header-contact">
          Let&apos;s talk <ArrowUpRight size={16} />
        </a>

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* MOBILE NAVIGATION */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <a href="#properties" onClick={() => setMenuOpen(false)}>
              Properties
            </a>
            <a href="#experience" onClick={() => setMenuOpen(false)}>
              Experience
            </a>
            <a href="#studio" onClick={() => setMenuOpen(false)}>
              Our philosophy
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="hero">
        <div className="hero-topline">
          <span>INDEPENDENT REAL ESTATE COLLECTIVE</span>
          <span>EST. MMXXVI — ADDIS ABABA / EVERYWHERE</span>
        </div>

        <div className="hero-title-wrap">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            SPACE
            <span className="hero-title-second">
              <span className="hero-asterisk">✳</span>
              TO
            </span>
            <span className="hero-title-outline">BELONG.</span>
          </motion.h1>

          <motion.div
            className="hero-side-note"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <span className="side-note-line" />
            <p>
              We find spaces that
              <br />
              feel like they were
              <br />
              always meant for you.
            </p>
            <span className="side-note-index">01 / 04</span>
          </motion.div>
        </div>

        <motion.div
          className="hero-image"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{
            duration: 1.3,
            delay: 0.3,
            ease: [0.77, 0, 0.175, 1],
          }}
        >
          <div className="hero-image-overlay" />

          <div className="hero-image-caption">
            <span>01 — ARCHITECTURE THAT SPEAKS</span>
            <span>
              SCROLL TO EXPLORE <ArrowDown size={14} />
            </span>
          </div>

          <div className="hero-floating-label">
            <span>THE ART OF</span>
            <strong>LIVING WELL.</strong>
            <ArrowDownRight size={25} />
          </div>
        </motion.div>

        <div className="hero-bottom">
          <p>
            More than a place.
            <br />
            A feeling that stays.
          </p>
          <span>
            SCROLL DOWN <ArrowDown size={14} />
          </span>
          <span>09°01&apos; N — 38°45&apos; E</span>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="intro-section" id="studio">
        <div className="section-eyebrow">
          <span>01 / A DIFFERENT PERSPECTIVE</span>
          <span>THE WAY WE SEE IT</span>
        </div>

        <motion.div
          className="intro-content"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2>
            Not just four walls.
            <br />
            <span>A world of your own.</span>
          </h2>

          <div className="intro-description">
            <span className="intro-star">✳</span>
            <p>
              We believe the right space can change the way you experience
              life. That&apos;s why we look beyond addresses, square meters,
              and floor plans — to find places with character, soul, and a
              story worth living.
            </p>
            <a href="#properties" className="text-link">
              Discover our approach <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.div>

        <div className="intro-bottom-note">
          <span>THOUGHTFULLY FOUND.</span>
          <span>INTENTIONALLY DIFFERENT.</span>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="properties-section" id="properties">
        <div className="section-eyebrow light-eyebrow">
          <span>02 / SELECTED SPACES</span>
          <span>A FEW PLACES WE LOVE</span>
        </div>

        <div className="properties-heading">
          <h2>
            Places with
            <br />
            <span>presence.</span>
          </h2>
          <p>
            A considered collection of extraordinary spaces.
            Each one has something to say.
          </p>
        </div>

        <div className="property-grid">
          {properties.map((property, index) => (
            <motion.article
              className={`property-card property-card-${index + 1}`}
              key={property.number}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="property-image"
                style={{
                  backgroundImage: `url("${property.image}")`,
                }}
              >
                <span className="property-number">
                  {property.number}
                </span>

                <span className="property-open">
                  <ArrowUpRight size={22} />
                </span>
              </div>

              <div className="property-info">
                <div>
                  <span className="property-type">{property.type}</span>
                  <h3>{property.name}</h3>
                  <p>{property.location}</p>
                </div>
                <span className="property-price">{property.price}</span>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="properties-footer">
          <span>CURATED, NOT CROWDED.</span>
          <a href="#contact" className="round-link">
            Explore all properties <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      {/* ROOM EXPERIENCE */}
      <section className="experience-section" id="experience">
        <div className="section-eyebrow">
          <span>03 / STEP INSIDE</span>
          <span>THE ROOM EXPERIENCE</span>
        </div>

        <div className="experience-heading">
          <h2>
            Every room.
            <br />
            <span>Its own story.</span>
          </h2>
          <p>
            Explore the details that make a house feel like home.
            Choose a room and take a closer look.
          </p>
        </div>

        <div className="room-experience">
          <div className="room-image-wrap">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRoom}
                className="room-image"
                style={{
                  backgroundImage: `url("${rooms[activeRoom].image}")`,
                }}
                initial={{
                  opacity: 0,
                  scale: 1.12,
                  x: 30,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                  x: -20,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </AnimatePresence>

            <div className="room-image-top">
              <span>INTERACTIVE SPACE / 0{activeRoom + 1}</span>
              <span>MOVE THROUGH THE HOME</span>
            </div>

            <div className="room-image-bottom">
              <div>
                <span>NOW EXPLORING</span>
                <h3>{rooms[activeRoom].name}</h3>
              </div>
              <span className="room-detail">
                {rooms[activeRoom].detail}
              </span>
            </div>
          </div>

          <div className="room-selector">
            <span className="room-selector-label">
              CHOOSE YOUR SPACE
            </span>

            {rooms.map((room, index) => (
              <button
                key={room.number}
                className={`room-option ${
                  activeRoom === index ? "active" : ""
                }`}
                onClick={() => setActiveRoom(index)}
              >
                <span className="room-option-number">
                  {room.number}
                </span>
                <span className="room-option-name">{room.name}</span>

                {activeRoom === index ? (
                  <ArrowUpRight size={19} />
                ) : (
                  <Plus size={18} />
                )}
              </button>
            ))}

            <AnimatePresence mode="wait">
              <motion.p
                className="room-description"
                key={activeRoom}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                {rooms[activeRoom].description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="manifesto-section">
        <div className="manifesto-top">
          <span>04 / WHAT WE BELIEVE</span>
          <span>A NOTE ON LIVING</span>
        </div>

        <motion.div
          className="manifesto-content"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="manifesto-symbol">“</span>
          <h2>
            The best places
            <br />
            aren&apos;t just seen.
            <br />
            <span>They&apos;re felt.</span>
          </h2>

          <div className="manifesto-signature">
            <span>ESTATE IN MOTION</span>
            <span>FIND YOUR FEELING.</span>
          </div>
        </motion.div>
      </section>

      {/* CONTACT */}
      <footer className="footer" id="contact">
        <div className="footer-top">
          <span>HAVE A PLACE IN MIND?</span>
          <span>LET&apos;S MAKE IT HAPPEN.</span>
        </div>

        <div className="footer-main">
          <h2>
            Find your
            <br />
            <span>somewhere.</span>
          </h2>

          <a
            href="mailto:hello@estateinmotion.com"
            className="footer-contact"
          >
            Start a conversation <ArrowUpRight size={23} />
          </a>
        </div>

        <div className="footer-bottom">
          <a href="#top" className="footer-brand">
            ESTATE IN MOTION<span>®</span>
          </a>

          <span>AN INDEPENDENT REAL ESTATE COLLECTIVE</span>
          <span>© 2026 — ALL RIGHTS RESERVED</span>

          <a href="#top" className="back-to-top">
            BACK TO TOP <ArrowDown size={14} />
          </a>
        </div>
      </footer>
    </main>
  );
}
