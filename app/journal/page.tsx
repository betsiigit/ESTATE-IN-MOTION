
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Compass,
  Utensils,
  Hotel,
  Coffee,
  Trees,
  CloudSun,
  Home,
  Heart,
} from "lucide-react";
import "./journal.css";

const lifestyles = [
  {
    id: "city",
    number: "01",
    name: "City Living",
    description: "For those who love the energy of the city.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=90",
    detail: "Apartments · City views · Restaurants · Convenience",
    neighborhoods: ["Bole", "Kazanchis"],
  },
  {
    id: "family",
    number: "02",
    name: "Family Living",
    description: "Room to grow, connect and make memories.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1000&q=90",
    detail: "Spacious homes · Gardens · Community · Comfort",
    neighborhoods: ["CMC", "Old Airport"],
  },
  {
    id: "quiet",
    number: "03",
    name: "Quiet Living",
    description: "A slower pace, privacy and peaceful surroundings.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=90",
    detail: "Villas · Green spaces · Privacy · Relaxation",
    neighborhoods: ["Old Airport", "CMC"],
  },
  {
    id: "luxury",
    number: "04",
    name: "Luxury Living",
    description: "Distinctive spaces and exceptional experiences.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&q=90",
    detail: "Premium homes · Fine dining · Hotels · City views",
    neighborhoods: ["Bole", "Kazanchis"],
  },
];

const neighborhoods = [
  {
    name: "Bole",
    subtitle: "THE CITY'S COSMOPOLITAN SIDE",
    description:
      "Discover contemporary homes, stylish cafés, shopping destinations and a lively urban atmosphere.",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1000&q=90",
    tags: ["City life", "Dining", "Shopping"],
  },
  {
    name: "Old Airport",
    subtitle: "SPACE TO FEEL AT HOME",
    description:
      "Explore residential streets, spacious homes and a more relaxed side of city living.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=90",
    tags: ["Residential", "Privacy", "Family"],
  },
  {
    name: "Kazanchis",
    subtitle: "CONNECTED CITY LIVING",
    description:
      "A central urban setting with hotels, business destinations and places to meet and unwind.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=90",
    tags: ["Business", "Hotels", "Lifestyle"],
  },
  {
    name: "CMC",
    subtitle: "A GROWING RESIDENTIAL COMMUNITY",
    description:
      "Discover modern residential developments, community spaces and room for a different pace of life.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1000&q=90",
    tags: ["Community", "Modern homes", "Space"],
  },
];

const stories = [
  {
    category: "ARCHITECTURE",
    title: "The new language of Ethiopian homes",
    description:
      "Exploring the relationship between modern architecture, local identity and the spaces we call home.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=85",
    read: "06 MIN READ",
  },
  {
    category: "INTERIORS",
    title: "Making room for a slower life",
    description:
      "Natural materials, warm light and thoughtful details that make everyday spaces feel special.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&q=85",
    read: "04 MIN READ",
  },
  {
    category: "LIFESTYLE",
    title: "Finding your own rhythm in Addis",
    description:
      "How the right neighborhood can shape your everyday routine and the way you experience a city.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=85",
    read: "05 MIN READ",
  },
];

export default function JournalPage() {
  const [activeLifestyle, setActiveLifestyle] = useState("city");
  const [activeNeighborhood, setActiveNeighborhood] = useState("Bole");

  const selectedLifestyle = lifestyles.find(
    (item) => item.id === activeLifestyle
  );

  const suggestedNeighborhoods = selectedLifestyle
    ? neighborhoods.filter((place) =>
        selectedLifestyle.neighborhoods.includes(place.name)
      )
    : neighborhoods;

  const currentNeighborhood =
    neighborhoods.find((place) => place.name === activeNeighborhood) ??
    neighborhoods[0];

  return (
    <main className="journal-page">
      {/* HERO */}
      <section className="journal-hero">
        <div className="journal-hero-top">
          <span>ESTATE IN MOTION / JOURNAL</span>
          <span>ADDIS ABABA · ETHIOPIA</span>
        </div>

        <div className="journal-hero-main">
          <div className="journal-hero-copy">
            <span className="journal-eyebrow">
              A CITY. A HOME. A WAY OF LIVING.
            </span>

            <h1>
              Find your
              <br />
              <em>way of living.</em>
            </h1>

            <p>
              More than finding a property. Discover the neighborhoods,
              experiences and everyday moments that make a place feel like
              home.
            </p>

            <a href="#lifestyles" className="journal-explore-link">
              EXPLORE THE JOURNAL <ArrowDown size={16} />
            </a>
          </div>

          <div className="journal-hero-visual">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=90"
              alt="Contemporary luxury home"
              fill
              priority
              unoptimized
            />
            <div className="journal-hero-caption">
              <span>01 / ADDIS ABABA</span>
              <span>A NEW PERSPECTIVE ON HOME</span>
            </div>
          </div>
        </div>

        <div className="journal-hero-footer">
          <span>ARCHITECTURE</span>
          <span>LIFESTYLE</span>
          <span>NEIGHBORHOODS</span>
          <span>EXPERIENCES</span>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="journal-intro">
        <span className="journal-section-label">A DIFFERENT WAY TO DISCOVER</span>
        <h2>
          The right home is about more than four walls.
          <em> It's about everything around it.</em>
        </h2>
        <p>
          From the home you imagine to the places you visit every day,
          discover the lifestyle that feels right for you.
        </p>
      </section>

      {/* LIFESTYLE DISCOVERY */}
      <section className="journal-lifestyles" id="lifestyles">
        <div className="journal-heading-row">
          <div>
            <span className="journal-section-label">01 / YOUR WAY OF LIVING</span>
            <h2>
              What does your
              <br />
              <em>life look like?</em>
            </h2>
          </div>
          <p>
            Every lifestyle is different. Choose the one that feels closest
            to yours and discover places that match it.
          </p>
        </div>

        <div className="lifestyle-grid">
          {lifestyles.map((item) => (
            <button
              key={item.id}
              className={`lifestyle-card ${
                activeLifestyle === item.id ? "selected" : ""
              }`}
              onClick={() => {
                setActiveLifestyle(item.id);
                setActiveNeighborhood(item.neighborhoods[0]);
              }}
            >
              <div className="lifestyle-image">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  unoptimized
                />
                <span className="lifestyle-number">{item.number}</span>
                <Heart size={19} className="lifestyle-heart" />
              </div>

              <div className="lifestyle-card-info">
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <ArrowUpRight size={20} />
              </div>
            </button>
          ))}
        </div>

        {selectedLifestyle && (
          <div className="lifestyle-result">
            <div>
              <span>YOUR SELECTED LIFESTYLE</span>
              <h3>{selectedLifestyle.name}</h3>
              <p>{selectedLifestyle.detail}</p>
            </div>
            <div className="lifestyle-result-neighborhoods">
              <span>PLACES TO EXPLORE</span>
              {selectedLifestyle.neighborhoods.map((name) => (
                <button
                  key={name}
                  onClick={() => {
                    setActiveNeighborhood(name);
                    document
                      .getElementById("neighborhoods")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {name} <ArrowUpRight size={15} />
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* NEIGHBORHOODS */}
      <section className="journal-neighborhoods" id="neighborhoods">
        <div className="journal-heading-row">
          <div>
            <span className="journal-section-label">02 / EXPLORE ADDIS ABABA</span>
            <h2>
              A city of
              <br />
              <em>different stories.</em>
            </h2>
          </div>
          <p>
            Discover the character of each neighborhood and find the
            surroundings that fit your everyday life.
          </p>
        </div>

        <div className="neighborhood-layout">
          <div className="neighborhood-list">
            {suggestedNeighborhoods.map((place, index) => (
              <button
                key={place.name}
                className={
                  activeNeighborhood === place.name ? "active" : ""
                }
                onClick={() => setActiveNeighborhood(place.name)}
              >
                <span>0{index + 1}</span>
                <strong>{place.name}</strong>
                <ArrowUpRight size={19} />
              </button>
            ))}
          </div>

          <div className="neighborhood-feature">
            <div className="neighborhood-feature-image">
              <Image
                src={currentNeighborhood.image}
                alt={currentNeighborhood.name}
                fill
                unoptimized
              />
              <span>{currentNeighborhood.subtitle}</span>
            </div>

            <div className="neighborhood-feature-info">
              <div>
                <span>DISCOVER THE NEIGHBORHOOD</span>
                <h3>{currentNeighborhood.name}</h3>
                <p>{currentNeighborhood.description}</p>
                <div className="neighborhood-tags">
                  {currentNeighborhood.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <MapPin size={23} />
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL EXPERIENCES */}
      <section className="journal-experiences">
        <div className="journal-heading-row">
          <div>
            <span className="journal-section-label">03 / LIFE AROUND YOU</span>
            <h2>
              Make yourself
              <br />
              <em>at home.</em>
            </h2>
          </div>
          <p>
            The best parts of a neighborhood are often found just outside
            your front door.
          </p>
        </div>

        <div className="experience-grid">
          <div>
            <Utensils />
            <h3>Restaurants</h3>
            <p>Discover places for memorable meals and evenings out.</p>
          </div>
          <div>
            <Coffee />
            <h3>Cafés</h3>
            <p>Find your next favorite coffee spot and meeting place.</p>
          </div>
          <div>
            <Hotel />
            <h3>Hotels</h3>
            <p>Explore hospitality, stays and places to welcome guests.</p>
          </div>
          <div>
            <Trees />
            <h3>Leisure</h3>
            <p>Explore green spaces, recreation and things to do.</p>
          </div>
          <div>
            <CloudSun />
            <h3>Local Weather</h3>
            <p>See the conditions and forecast around your chosen area.</p>
          </div>
          <div>
            <Compass />
            <h3>Explore More</h3>
            <p>Discover the places and experiences that make a neighborhood yours.</p>
          </div>
        </div>

        <p className="journal-data-note">
          Local recommendations and live weather will be connected in the
          next development stage.
        </p>
      </section>

      {/* EDITORIAL STORIES */}
      <section className="journal-stories">
        <div className="journal-heading-row">
          <div>
            <span className="journal-section-label">04 / THE JOURNAL</span>
            <h2>
              Stories worth
              <br />
              <em>living for.</em>
            </h2>
          </div>
          <p>
            Ideas, perspectives and inspiration about architecture,
            interiors and modern living.
          </p>
        </div>

        <div className="journal-story-grid">
          {stories.map((story, index) => (
            <article className="journal-story-card" key={story.title}>
              <div className="journal-story-image">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  unoptimized
                />
                <span>0{index + 1}</span>
                <ArrowUpRight size={20} />
              </div>
              <div className="journal-story-meta">
                <span>{story.category}</span>
                <span>{story.read}</span>
              </div>
              <h3>{story.title}</h3>
              <p>{story.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="journal-final">
        <span>YOUR NEXT CHAPTER STARTS HERE</span>
        <h2>
          Find more than a home.
          <br />
          Find <em>your place.</em>
        </h2>
        <Link href="/properties">
          EXPLORE PROPERTIES <ArrowRight size={17} />
        </Link>
      </section>
    </main>
  );
}
