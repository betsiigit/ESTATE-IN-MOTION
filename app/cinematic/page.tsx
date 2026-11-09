
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { properties } from "../data/properties";
import {
  ArrowDown,
  ArrowUpRight,
  RotateCcw,
  Volume2,
  VolumeX,
  Search,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./cinematic.css";

gsap.registerPlugin(ScrollTrigger);

// --------------------------------------------------
// CINEMATIC SCENES
// --------------------------------------------------

const scenes = [
  {
    number: "01",
    eyebrow: "THE ARRIVAL",
    title: "A different\nkind of home.",
    description: "Some places are beautiful. Others make you feel something.",
  video: "/videos/exterior.mp4",
    location: "THE RESIDENCE · ADDIS ABABA",
  },
  {
    number: "02",
    eyebrow: "THE ENTRANCE",
    title: "Step into\nyour somewhere.",
    description: "Beyond the entrance, a new story begins.",
   video: "/videos/entrance-fixed.mp4",
    location: "THE FIRST IMPRESSION",
  },
  {
    number: "03",
    eyebrow: "THE REVEAL",
    title: "Room to\nbreathe.",
    description: "Light, space, and thoughtful details come together.",
   video: "/videos/living-room-fixed.mp4",
    location: "THE LIVING SPACE",
  },
  {
    number: "04",
    eyebrow: "THE DETAILS",
    title: "Made for\nliving.",
    description: "Discover the little things that make a place feel like yours.",
  video: "/videos/details-fixed.mp4",
    location: "THE FINER DETAILS",
  },
];

// --------------------------------------------------
// PROPERTY DATA
// --------------------------------------------------


const categories = [
  {
    name: "Apartments",
    count: "01",
    description: "Thoughtful city living.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=85",
  },
  {
    name: "Villas",
    count: "02",
    description: "Space to call your own.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85",
  },
  {
    name: "Houses",
    count: "03",
    description: "A place to grow.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=85",
  },
  {
    name: "Penthouses",
    count: "04",
    description: "A different perspective.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=85",
  },
];

const neighborhoods = [
  {
    name: "Bole",
    description: "Modern city energy",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=900&q=85",
  },
  {
    name: "Old Airport",
    description: "Established residential living",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=85",
  },
  {
    name: "Kazanchis",
    description: "Connected city life",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=85",
  },
  {
    name: "CMC",
    description: "Room for a new chapter",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=900&q=85",
  },
];

// --------------------------------------------------
// PAGE
// --------------------------------------------------

export default function CinematicPage() {
  const tourRef = useRef<HTMLElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const copyRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [muted, setMuted] = useState(true);
  const [activeScene, setActiveScene] = useState(0);

  const [purpose, setPurpose] = useState<"All" | "Buy" | "Rent">("All");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  
  // --------------------------------------------------
  // GSAP CINEMATIC SCENE TRANSITIONS
  // --------------------------------------------------

  useEffect(() => {
    const tour = tourRef.current;
    if (!tour) return;

    const ctx = gsap.context(() => {
      const panels = sceneRefs.current.filter(
        (panel): panel is HTMLDivElement => panel !== null
      );

      const copies = copyRefs.current.filter(
        (copy): copy is HTMLDivElement => copy !== null
      );

      if (
        panels.length !== scenes.length ||
        copies.length !== scenes.length
      ) {
        return;
      }

      gsap.set(panels, {
        autoAlpha: 0,
        scale: 1.06,
      });

      gsap.set(panels[0], {
        autoAlpha: 1,
        scale: 1,
      });

      gsap.set(copies, {
        y: 45,
        autoAlpha: 0,
      });

      gsap.set(copies[0], {
        y: 0,
        autoAlpha: 1,
      });

      const transitionPositions = [0.85, 1.85, 2.85];
      const timelineDuration = 4.1;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: tour,
          start: "top top",
          end: "+=420%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const timelinePosition =
              self.progress * timelineDuration;

            let currentIndex = 0;

            transitionPositions.forEach((position) => {
              if (timelinePosition >= position + 0.7) {
                currentIndex++;
              }
            });

            const nextScene = Math.min(
              currentIndex,
              scenes.length - 1
            );

            setActiveScene((previous) =>
              previous === nextScene ? previous : nextScene
            );
          },
        },
      });

      for (let i = 0; i < scenes.length - 1; i++) {
        const position = transitionPositions[i];

        timeline.to(
          panels[i],
          {
            autoAlpha: 0,
            scale: 1.08,
            duration: 0.8,
            ease: "power2.inOut",
          },
          position
        );

        timeline.to(
          copies[i],
          {
            y: -35,
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.in",
          },
          position
        );

        timeline.to(
          panels[i + 1],
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
          },
          position + 0.25
        );

        timeline.to(
          copies[i + 1],
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          position + 0.55
        );
      }

      gsap.from(".cinematic-nav", {
        y: -25,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, tour);

    return () => {
      ctx.revert();
    };
  }, []);

  
// --------------------------------------------------
// VIDEO PLAYBACK
// --------------------------------------------------

useEffect(() => {
  const videos = Array.from(
    document.querySelectorAll<HTMLVideoElement>(".scene-video")
  );

  let cancelled = false;

  const playActiveVideo = async () => {
    const activeVideo = videos[activeScene];

    if (!activeVideo) return;

    // Pause inactive videos first.
    videos.forEach((video, index) => {
      if (index !== activeScene && !video.paused) {
        video.pause();
      }
    });

    activeVideo.muted = muted;

    try {
      await activeVideo.play();

      if (cancelled) {
        activeVideo.pause();
      }
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        // Expected when the user scrolls to another scene quickly.
        return;
      }

      console.error(
        `Scene ${activeScene + 1} playback failed:`,
        error,
        activeVideo.error
      );
    }
  };

  playActiveVideo();

  return () => {
    cancelled = true;
  };
}, [activeScene, muted]);


  // --------------------------------------------------
  // PROPERTY FILTERING
  // --------------------------------------------------

  const filteredProperties = properties.filter((property) => {
  const matchesCategory =
    category === "All" || property.category === category;

  const searchText =
    `${property.name} ${property.location} ${property.category}`.toLowerCase();

  const matchesSearch = searchText.includes(search.toLowerCase());

  return matchesCategory && matchesSearch;
});
  // --------------------------------------------------
  // ACTIONS
  // --------------------------------------------------

  const replayTour = () => {
    if (!tourRef.current) return;

    const top =
      tourRef.current.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  const chooseCategory = (name: string) => {
    const normalized = name.replace(/s$/, "");

    setCategory(normalized);

    document
      .getElementById("properties")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const clearFilters = () => {
    setPurpose("All");
    setCategory("All");
    setSearch("");
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <main className="cinematic-page" id="top">

      {/* NAVIGATION */}

      <nav className="cinematic-nav">
        <Link href="/" className="cinematic-logo">
          ESTATE<span>IN MOTION</span>
        </Link>

       <div className="cinematic-nav-center">
  <Link href="/properties">PROPERTIES</Link>
  <Link href="/rooms">SPACES</Link>
  <Link href="/architecture">ARCHITECTURE</Link>
  <Link href="/contact">CONTACT</Link>
</div>

<Link href="/properties" className="cinematic-nav-link">
  EXPLORE HOMES <ArrowUpRight size={14} />
</Link>
      </nav>

      {/* CINEMATIC INTRO */}

      <section className="cinematic-tour" ref={tourRef}>
        <div className="cinematic-scenes">

          {scenes.map((scene, index) => (
            <div
              className="cinematic-scene"
              key={scene.number}
              ref={(el) => {
                sceneRefs.current[index] = el;
              }}
            >

  <video
  className="scene-video"
  src={scene.video}
  muted
  loop
  playsInline
  preload="none"
/>

              <div className="scene-shade" />

              <div
                className="scene-copy"
                ref={(el) => {
                  copyRefs.current[index] = el;
                }}
              >
                <span className="scene-eyebrow">
                  <span>{scene.number}</span>
                  {scene.eyebrow}
                </span>

                <h1>
                  {scene.title.split("\n").map((line, i) => (
                    <span key={i}>{line}</span>
                  ))}
                </h1>

                <p>{scene.description}</p>

                <div className="scene-location">
                  <span />
                  {scene.location}
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* CINEMATIC CONTROLS */}

        <div className="cinematic-bottom">

          <div className="cinematic-progress">
            <span>0{activeScene + 1}</span>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${((activeScene + 1) / scenes.length) * 100}%`,
                }}
              />
            </div>

            <span>04</span>
          </div>

          <div className="cinematic-scroll-hint">
            SCROLL TO EXPLORE <ArrowDown size={14} />
          </div>

          <button
            className="sound-toggle"
            onClick={() => setMuted((value) => !value)}
            aria-label={muted ? "Unmute videos" : "Mute videos"}
          >
            {muted ? (
              <VolumeX size={16} />
            ) : (
              <Volume2 size={16} />
            )}

            {muted ? "SOUND OFF" : "SOUND ON"}
          </button>

        </div>
      </section>

      {/* PROPERTY SEARCH */}

      <section className="property-search-section" id="properties">
        <div className="section-shell">

          <div className="section-kicker">
            <span>01 / FIND YOUR PLACE</span>
            <span>ADDIS ABABA · ETHIOPIA</span>
          </div>

          <div className="search-heading">
            <div>
              <span className="section-eyebrow">
                A PLACE THAT FEELS LIKE YOURS
              </span>

              <h2>
                Find your <em>somewhere.</em>
              </h2>
            </div>

            <p>
              Whether you're looking to buy or rent, discover spaces
              that make coming home feel different.
            </p>
          </div>

          <div className="property-search-box">

            <div className="purpose-switch">
              {(["All", "Buy", "Rent"] as const).map((item) => (
                <button
                  key={item}
                  className={purpose === item ? "active" : ""}
                  onClick={() => setPurpose(item)}
                >
                  {item === "All" ? "All homes" : item}
                </button>
              ))}
            </div>

            <div className="search-controls">

              <label className="search-field">
                <MapPin size={18} />

                <span>
                  <small>LOCATION OR KEYWORD</small>

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Try Bole, villa, apartment..."
                  />
                </span>
              </label>

             <div className="property-filter-row">
 <div className="category-grid">
  {categories.map((item) => (
    <Link
      href={`/properties?category=${encodeURIComponent(item.name)}`}
      className="category-card"
      key={item.name}
      style={{
        backgroundImage: `url("${item.image}")`,
      }}
    >
      <span className="category-number">{item.count}</span>

      <span className="category-card-bottom">
        <span>
          <strong>{item.name}</strong>
          <small>{item.description}</small>
        </span>

        <ArrowUpRight size={20} />
      </span>
    </Link>
  ))}
</div>
  <span className="property-result-count">
    {filteredProperties.length.toString().padStart(2, "0")} SPACES
  </span>
</div>

              <button
                className="search-submit"
                onClick={() =>
                  document
                    .getElementById("property-results")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Search size={17} />
                SEARCH HOMES
              </button>

            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}

      <section className="featured-section" id="property-results">
        <div className="section-shell">

          <div className="featured-heading">
            <div>
              <span className="section-eyebrow">
                THE PROPERTY COLLECTION
              </span>

              <h2>
                Spaces worth <em>discovering.</em>
              </h2>
            </div>

            <span className="demo-label">
              ILLUSTRATIVE DEMO LISTINGS
            </span>
          </div>

          <div className="listing-toolbar">
            <span>
              {filteredProperties.length} properties to explore
            </span>

            <button onClick={clearFilters}>
              CLEAR FILTERS <RotateCcw size={13} />
            </button>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="property-grid">

          {filteredProperties.map((property) => (
  <Link
    href={`/properties/${property.id}`}
    className="property-card"
    key={property.id}
    aria-label={`Explore ${property.name}`}
  >
    <div
      className="property-image"
      style={{
        backgroundImage: `url("${property.image}")`,
      }}
    >
      <span className="property-tag">
        {property.featured ? "Featured" : property.category}
      </span>

      <span className="demo-stamp">
        DEMO
      </span>
    </div>

    <div className="property-card-content">

     <div className="property-card-top">
  <span>{property.category}</span>
  <span>{property.type.toUpperCase()}</span>
</div>

      <h3>{property.name}</h3>

      <p className="property-location">
        <MapPin size={14} />
        {property.location}
      </p>

      <div className="property-features">
        <span>
          <BedDouble size={15} />
          {property.bedrooms} beds
        </span>

        <span>
          <Bath size={15} />
          {property.bathrooms} baths
        </span>

        <span>
          <Maximize2 size={14} />
          {property.area} m²
        </span>
      </div>

      <div className="property-card-footer">
        <span>PRICE ON REQUEST</span>

        <span className="property-arrow">
          <ArrowUpRight size={17} />
        </span>
      </div>

    </div>
  </Link>
))}

            </div>
          ) : (
            <div className="empty-properties">
              <Search size={25} />

              <h3>No matching properties</h3>

              <p>
                Try changing your search or clearing the filters.
              </p>

              <button onClick={clearFilters}>
                SHOW ALL PROPERTIES
              </button>
            </div>
          )}

        </div>
      </section>

      {/* PROPERTY CATEGORIES */}

      <section className="categories-section">
        <div className="section-shell">

          <div className="section-kicker">
            <span>02 / EXPLORE BY TYPE</span>
            <span>FIND YOUR KIND OF SPACE</span>
          </div>

          <div className="categories-heading">
            <span className="section-eyebrow">
              ROOM FOR EVERY STORY
            </span>

            <h2>
              What does <em>home</em> look like?
            </h2>
          </div>

          <div className="category-grid">
          {categories.map((item) => (
  <Link
    href={`/properties?category=${encodeURIComponent(item.name)}`}
    className="category-card"
    key={item.name}
    style={{
      backgroundImage: `url("${item.image}")`,
    }}
  >
    <span className="category-number">
      {item.count}
    </span>

    <span className="category-card-bottom">
      <span>
        <strong>{item.name}</strong>
        <small>{item.description}</small>
      </span>

      <ArrowUpRight size={20} />
    </span>
  </Link>
))}
          </div>

        </div>
      </section>

      {/* LOCATIONS */}

      <section className="locations-section" id="locations">
        <div className="section-shell">

          <div className="locations-heading">
            <div>
              <span className="section-eyebrow">
                03 / EXPLORE THE CITY
              </span>

              <h2>
                Find your place in <em>Addis.</em>
              </h2>
            </div>

            <p>
              Every neighborhood has its own rhythm.
              Discover the character of the city, one place at a time.
            </p>
          </div>

          <div className="locations-grid">
           {neighborhoods.map((place, index) => (
  <Link
    href={`/properties?location=${encodeURIComponent(place.name)}`}
    className="location-card"
    key={place.name}
  >
    <div
      className="location-image"
      style={{
        backgroundImage: `url("${place.image}")`,
      }}
    />

    <div className="location-card-caption">
      <span>0{index + 1}</span>

      <div>
        <h3>{place.name}</h3>
        <p>{place.description}</p>
      </div>

      <ArrowUpRight size={18} />
    </div>
  </Link>
))}
          </div>

          <p className="location-note">
            Neighborhoods shown for discovery. Property availability
            will be added as verified listings become available.
          </p>

        </div>
      </section>

      {/* BRAND STORY */}

      <section className="story-section" id="about">
        <div className="story-image">
          <div className="story-image-overlay" />
          <span>THE ART OF FINDING HOME</span>
        </div>

        <div className="story-content">
          <span className="section-eyebrow">
            04 / OUR PHILOSOPHY
          </span>

          <h2>
            Real estate is more than <em>real estate.</em>
          </h2>

          <p>
            It's where ordinary days become memories.
            It's the quiet morning light, the room that brings everyone
            together, and the feeling of finally being home.
          </p>

          <p>
            Estate in Motion brings properties to life through thoughtful
            discovery and immersive experiences.
          </p>

          <a href="#how-it-works" className="story-link">
            DISCOVER OUR APPROACH <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section className="how-section" id="how-it-works">
        <div className="section-shell">

          <div className="section-kicker">
            <span>05 / THE EXPERIENCE</span>
            <span>FROM DISCOVERY TO DOORWAY</span>
          </div>

          <div className="how-heading">
            <span className="section-eyebrow">
              A MORE THOUGHTFUL JOURNEY
            </span>

            <h2>
              Your next chapter, <em>in motion.</em>
            </h2>
          </div>

          <div className="steps-grid">
            <article>
              <span>01</span>
              <h3>Discover</h3>
              <p>
                Explore properties and find spaces that speak to you.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Experience</h3>
              <p>
                See the spaces through immersive photos and cinematic tours.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Connect</h3>
              <p>
                Ask questions and arrange a viewing for a property.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Find home</h3>
              <p>
                Take the next step toward a place that feels like yours.
              </p>
            </article>
          </div>

        </div>
      </section>

      {/* FINAL CTA */}

      <section className="final-cta" id="contact">
        <div className="final-cta-image" />

        <div className="final-cta-content">
          <span>YOUR NEXT CHAPTER STARTS HERE</span>

          <h2>
            Somewhere is <em>waiting.</em>
          </h2>

          <p>
            Explore the possibilities. Find a space that feels like home.
          </p>

         <Link href="/properties">
  EXPLORE PROPERTIES <ArrowUpRight size={16} />
</Link>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="estate-footer">
        <div className="footer-main">

          <div className="footer-brand">
            <Link href="/" className="cinematic-logo">
              ESTATE<span>IN MOTION</span>
            </Link>

            <p>
              A new way to discover, experience, and find your somewhere.
            </p>
          </div>

          <div className="footer-column">
            <span>EXPLORE</span>
            <a href="#properties">Properties</a>
            <a href="#locations">Locations</a>
            <a href="#how-it-works">How it works</a>
          </div>

          <div className="footer-column">
            <span>DISCOVER</span>
            <a href="#about">Our story</a>
            <a href="#properties">Buy a property</a>
            <a href="#properties">Rent a property</a>
          </div>

          <div className="footer-column">
            <span>GET IN TOUCH</span>
            <a href="#contact">Contact</a>
            <a href="#contact">Request a viewing</a>
          </div>

        </div>

        <div className="footer-bottom">
          <span>© 2026 ESTATE IN MOTION</span>
          <span>MADE BY BETSELOT T.</span>

          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            BACK TO TOP ↑
          </a>
        </div>
      </footer>

    </main>
  );
}
