import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  MoveUpRight,
} from "lucide-react";
import "./architecture.css";

const architecturalFeatures = [
  {
    number: "01",
    title: "Form & Structure",
    description:
      "A thoughtful balance of proportion, volume and geometry. Every line has a purpose, every space has a story.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "02",
    title: "Light & Space",
    description:
      "Natural light becomes part of the architecture, shaping the atmosphere and connecting interiors with the outside world.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
  },
  {
    number: "03",
    title: "Material & Texture",
    description:
      "Stone, timber, glass and carefully selected finishes bring depth, warmth and character to every space.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function ArchitecturePage() {
  return (
    <main className="architecture-page">
      <header className="architecture-nav">
        <Link href="/" className="architecture-logo">
          ESTATE <span>IN MOTION</span>
        </Link>

      <nav className="architecture-nav-links">
  <Link href="/">HOME</Link>
  <Link href="/journal">JOURNAL</Link>
  <Link href="/properties">PROPERTIES</Link>
  <Link href="/rooms">SPACES</Link>
  <Link href="/architecture" className="active">
    ARCHITECTURE
  </Link>
  <Link href="/contact">CONTACT</Link>
</nav>

        <Link href="/properties" className="architecture-nav-cta">
          EXPLORE HOMES <ArrowUpRight size={14} />
        </Link>
      </header>

      <section className="architecture-hero">
        <div className="architecture-hero-image" />

        <div className="architecture-hero-content">
          <span className="architecture-eyebrow">
            THE ART OF LIVING / 001
          </span>

          <h1>
            Beyond
            <br />
            <em>the ordinary.</em>
          </h1>

          <p>
            Architecture is more than what we see.
            It is how a space makes us feel, move,
            connect and belong.
          </p>

          <a href="#architecture-story" className="architecture-scroll">
            DISCOVER OUR APPROACH
            <ArrowDown size={15} />
          </a>
        </div>

        <span className="architecture-hero-index">
          01 — 03 / ARCHITECTURE
        </span>
      </section>

      <section
        className="architecture-intro"
        id="architecture-story"
      >
        <div className="architecture-intro-label">
          <span>01 / OUR PHILOSOPHY</span>
          <span>DESIGN WITH INTENTION</span>
        </div>

        <div className="architecture-intro-content">
          <h2>
            Spaces that
            <br />
            <em>say something.</em>
          </h2>

          <div className="architecture-intro-copy">
            <p>
              We believe remarkable architecture is not simply
              about creating beautiful buildings. It is about
              creating places that feel meaningful.
            </p>

            <p>
              From the first architectural line to the smallest
              interior detail, every element contributes to a
              more thoughtful way of living.
            </p>

            <Link href="/properties" className="architecture-text-link">
              EXPLORE THE COLLECTION
              <MoveUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="architecture-features">
        <div className="architecture-section-heading">
          <div>
            <span className="architecture-eyebrow">
              02 / THE DETAILS
            </span>
            <h2>
              Designed with
              <br />
              <em>purpose.</em>
            </h2>
          </div>

          <p>
            The character of a home lives in the details.
            Explore the elements that make a space distinctive.
          </p>
        </div>

        <div className="architecture-feature-grid">
          {architecturalFeatures.map((feature) => (
            <article
              className="architecture-feature-card"
              key={feature.number}
            >
              <div
                className="architecture-feature-image"
                style={{
                  backgroundImage: `url("${feature.image}")`,
                }}
              >
                <span>{feature.number}</span>
              </div>

              <div className="architecture-feature-info">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="architecture-materials">
        <div className="architecture-materials-image" />

        <div className="architecture-materials-content">
          <span className="architecture-eyebrow">
            03 / MATERIAL STUDY
          </span>

          <h2>
            Beauty in
            <br />
            <em>the details.</em>
          </h2>

          <p>
            Honest materials. Natural textures. Timeless finishes.
            A considered approach to the elements that make a
            house feel like home.
          </p>

          <Link href="/rooms" className="architecture-text-link">
            EXPLORE INTERIOR SPACES
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>

      <section className="architecture-closing">
        <span className="architecture-eyebrow">
          FIND YOUR SOMEWHERE
        </span>

        <h2>
          A different way
          <br />
          <em>to see home.</em>
        </h2>

        <Link href="/properties" className="architecture-closing-link">
          DISCOVER THE COLLECTION
          <ArrowUpRight size={16} />
        </Link>
      </section>

      <footer className="architecture-footer">
        <Link href="/" className="architecture-logo">
          ESTATE <span>IN MOTION</span>
        </Link>

        <span>ARCHITECTURE / DESIGN / LIVING</span>

        <Link href="/">
          BACK TO HOME <ArrowUpRight size={13} />
        </Link>
      </footer>
    </main>
  );
}