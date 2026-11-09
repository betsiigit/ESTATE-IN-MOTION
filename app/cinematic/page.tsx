"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  MoveUpRight,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const properties = [
  {
    number: "01",
    name: "The Horizon House",
    location: "Bole, Addis Ababa",
    type: "Private Residence",
    price: "ETB 28,500,000",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "02",
    name: "Casa Verde",
    location: "Old Airport, Addis Ababa",
    type: "Modern Villa",
    price: "ETB 35,000,000",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "03",
    name: "The Quiet Residence",
    location: "CMC, Addis Ababa",
    type: "Contemporary Home",
    price: "ETB 19,800,000",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
  },
];

const rooms = [
  {
    name: "Living Room",
    number: "01",
    description:
      "Spaces made for slow mornings, meaningful conversations and the everyday moments that become memories.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90",
  },
  {
    name: "Bedroom",
    number: "02",
    description:
      "A personal retreat shaped by warmth, softness and the quiet luxury of having space to breathe.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=90",
  },
  {
    name: "Kitchen",
    number: "03",
    description:
      "Thoughtful details and timeless materials bring people together in the heart of the home.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=90",
  },
  {
    name: "Bathroom",
    number: "04",
    description:
      "An everyday ritual transformed into a peaceful moment of restoration and calm.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90",
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".hero-topline, .hero h1, .hero-side-note", {
        y: 45,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".hero-image", {
        scale: 1.08,
        opacity: 0,
        duration: 1.5,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>(".reveal-section").forEach((section) => {
        gsap.from(section, {
          y: 55,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            once: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      {/* NAVIGATION */}
      <header className="site-header">
        <Link href="/" className="brand" onClick={closeMenu}>
          <span className="brand-symbol">E.</span>
          <span>ESTATE IN MOTION</span>
        </Link>

        <nav className="desktop-nav">
          <Link href="/properties">Properties</Link>
          <Link href="/rooms">Spaces</Link>
          <Link href="/architecture">Architecture</Link>
          <Link href="/cinematic">Experience</Link>
        </nav>

        <Link href="/contact" className="header-contact">
          Let's talk <ArrowUpRight size={15} />
        </Link>

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {menuOpen && (
        <nav className="mobile-menu">
          <Link href="/properties" onClick={closeMenu}>Properties</Link>
          <Link href="/rooms" onClick={closeMenu}>Spaces</Link>
          <Link href="/architecture" onClick={closeMenu}>Architecture</Link>
          <Link href="/cinematic" onClick={closeMenu}>Experience</Link>
          <Link href="/contact" onClick={closeMenu}>Contact</Link>
        </nav>
      )}

      {/* HERO */}
      <section className="hero">
        <div className="hero-topline">
          <span>INDEPENDENT REAL ESTATE EXPERIENCE</span>
          <span>ADDIS ABABA · ETHIOPIA</span>
        </div>

        <div className="hero-title-wrap">
          <h1>
            Find your
            <span className="hero-title-second">
              somewhere<span className="hero-asterisk">*</span>
            </span>
          </h1>

          <p className="hero-side-note">
            Not just a property.
            <br />
            A place to become.
          </p>
        </div>

        <div className="hero-image">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90"
            alt="Beautiful contemporary luxury residence"
            fill
            priority
            unoptimized
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />

          <div className="hero-floating-label">
            <span>01 / 04</span>
            <span>THE ART OF LIVING</span>
          </div>
        </div>

        <div className="hero-bottom">
          <span>DISCOVER A DIFFERENT WAY HOME</span>
          <a href="#introduction">
            SCROLL TO EXPLORE <ArrowDown size={14} />
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="intro-section reveal-section" id="introduction">
        <div className="section-eyebrow">
          <span>01 — OUR PHILOSOPHY</span>
          <span>MORE THAN FOUR WALLS</span>
        </div>

        <div className="intro-content">
          <h2>
            A home is not
            <br />
            simply a place.
            <br />
            <span>It's a feeling.</span>
          </h2>

          <div className="intro-description">
            <p>
              We believe extraordinary spaces do more than look beautiful.
              They change the way you live, feel and experience the everyday.
            </p>

            <Link href="/architecture" className="text-link">
              Discover our philosophy <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="properties-section" id="properties">
        <div className="section-eyebrow">
          <span>02 — SELECTED SPACES</span>
          <span>CURATED WITH INTENTION</span>
        </div>

        <div className="properties-heading reveal-section">
          <h2>
            Spaces worth
            <br />
            <span>coming home to.</span>
          </h2>

          <p>
            A collection of distinctive properties, selected for their
            character, architecture and possibility.
          </p>
        </div>

        <div className="property-grid">
          {properties.map((property) => (
            <article
              className={`property-card property-card-${property.number}`}
              key={property.number}
            >
              <Link href="/properties" className="property-image">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />

                <span className="property-number">{property.number}</span>
                <span className="property-open">
                  <ArrowUpRight size={20} />
                </span>
              </Link>

              <div className="property-info">
                <div>
                  <span className="property-type">{property.type}</span>
                  <h3>{property.name}</h3>
                  <span className="property-location">
                    {property.location}
                  </span>
                </div>

                <span className="property-price">{property.price}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="properties-footer">
          <span>THOUGHTFULLY SELECTED. NEVER ORDINARY.</span>
          <Link href="/properties" className="round-link">
            Explore all properties <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      {/* ROOM EXPERIENCE */}
      <section className="experience-section" id="spaces">
        <div className="section-eyebrow">
          <span>03 — THE ROOM EXPERIENCE</span>
          <span>STEP INSIDE</span>
        </div>

        <div className="experience-heading reveal-section">
          <h2>
            Every room tells
            <br />
            <span>its own story.</span>
          </h2>
          <p>
            Explore the details. Discover the atmosphere.
            Experience the feeling of being home.
          </p>
        </div>

        <div className="room-experience">
          <div className="room-image-wrap">
            <div className="room-image" key={rooms[activeRoom].image}>
              <Image
                src={rooms[activeRoom].image}
                alt={rooms[activeRoom].name}
                fill
                unoptimized
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            <span className="room-image-top">
              {rooms[activeRoom].number} / 04
            </span>

            <span className="room-image-bottom">
              AN EXPERIENCE IN EVERY DETAIL
            </span>
          </div>

          <div className="room-selector">
            <span className="room-selector-label">EXPLORE THE ROOMS</span>

            {rooms.map((room, index) => (
              <button
                key={room.number}
                className={`room-option ${
                  activeRoom === index ? "active" : ""
                }`}
                onClick={() => setActiveRoom(index)}
              >
                <span>{room.number}</span>
                <strong>{room.name}</strong>
                <ArrowUpRight size={18} />
              </button>
            ))}

            <div className="room-description">
              <p>{rooms[activeRoom].description}</p>
              <Link href="/rooms" className="text-link">
                Explore all spaces <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="manifesto-section reveal-section">
        <div className="manifesto-top">
          <span>04 — A DIFFERENT PERSPECTIVE</span>
          <span>EST. 2026</span>
        </div>

        <div className="manifesto-content">
          <span className="manifesto-symbol">✳</span>

          <h2>
            The future of living
            <br />
            is not somewhere
            <br />
            <span>you find.</span>
            <br />
            It's somewhere
            <br />
            you feel.
          </h2>

          <p className="manifesto-signature">ESTATE IN MOTION®</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" className="brand">
              <span className="brand-symbol">E.</span>
              <span>ESTATE IN MOTION</span>
            </Link>

            <p>
              A new perspective on
              <br />
              spaces and living.
            </p>
          </div>

          <div className="footer-contact">
            <span>HAVE A PLACE IN MIND?</span>
            <Link href="/contact">
              Let's make it happen <MoveUpRight size={24} />
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 ESTATE IN MOTION</span>
          <span>ADDIS ABABA, ETHIOPIA</span>
          <a href="#top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            BACK TO TOP ↑
          </a>
        </div>
      </footer>
    </main>
  );
}