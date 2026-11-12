
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, ArrowRight } from "lucide-react";
import "./journal.css";

const stories = [
  {
    number: "01",
    category: "ARCHITECTURE",
    title: "The art of living with less",
    description:
      "Discover how thoughtful architecture creates spaces that feel open, calm and timeless.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=90",
    date: "DESIGN NOTES · 08 MIN READ",
  },
  {
    number: "02",
    category: "INTERIORS",
    title: "A quieter kind of luxury",
    description:
      "Natural materials, warm textures and the beauty of spaces designed around everyday life.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=90",
    date: "LIVING · 06 MIN READ",
  },
  {
    number: "03",
    category: "LIFESTYLE",
    title: "Finding your place in the city",
    description:
      "A closer look at the neighborhoods, communities and places that make a home meaningful.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=90",
    date: "CITY GUIDE · 05 MIN READ",
  },
];

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("ALL STORIES");

  const categories = [
    "ALL STORIES",
    "ARCHITECTURE",
    "INTERIORS",
    "LIFESTYLE",
  ];

  const filteredStories =
    activeCategory === "ALL STORIES"
      ? stories
      : stories.filter((story) => story.category === activeCategory);

  return (
    <main className="journal-page">
      <section className="journal-hero">
        <div className="journal-hero-top">
          <span>THE ESTATE IN MOTION JOURNAL</span>
          <span>VOL. 01 — 2026</span>
        </div>

        <div className="journal-hero-content">
          <span className="journal-eyebrow">A PERSPECTIVE ON LIVING</span>
          <h1>
            Spaces.
            <br />
            Stories.
            <br />
            <em>Living.</em>
          </h1>

          <div className="journal-hero-bottom">
            <p>
              Thoughtful perspectives on architecture, interiors
              and the art of finding a place to call home.
            </p>

            <a href="#journal-stories" className="journal-scroll">
              EXPLORE THE JOURNAL
              <ArrowDown size={16} />
            </a>
          </div>
        </div>

        <div className="journal-hero-image">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=90"
            alt="Contemporary luxury architecture"
            fill
            priority
            unoptimized
          />
          <span>THE BEAUTY OF CONSIDERED LIVING</span>
        </div>
      </section>

      <section className="journal-intro">
        <span>01 / OUR PERSPECTIVE</span>
        <p>
          A home is more than a place. It is an expression of
          architecture, identity and the way we choose to live.
        </p>
        <span>DESIGNED TO INSPIRE</span>
      </section>

      <section className="journal-stories" id="journal-stories">
        <div className="journal-section-heading">
          <div>
            <span>THE LATEST STORIES</span>
            <h2>Ideas worth <em>exploring.</em></h2>
          </div>
          <span>CURATED FOR CURIOUS MINDS</span>
        </div>

        <div className="journal-filters">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={activeCategory === category ? "active" : ""}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="journal-grid">
          {filteredStories.map((story) => (
            <article className="journal-card" key={story.number}>
              <div className="journal-card-image">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  unoptimized
                />
                <span>{story.number}</span>
                <ArrowUpRight size={22} />
              </div>

              <div className="journal-card-meta">
                <span>{story.category}</span>
                <span>{story.date}</span>
              </div>

              <h3>{story.title}</h3>
              <p>{story.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="journal-quote">
        <span>A THOUGHT TO TAKE WITH YOU</span>
        <h2>
          Architecture is not simply about building spaces.
          It is about <em>shaping experiences.</em>
        </h2>
      </section>

      <section className="journal-cta">
        <span>CONTINUE EXPLORING</span>
        <h2>Find a place that feels like yours.</h2>
        <Link href="/properties">
          EXPLORE PROPERTIES <ArrowRight size={17} />
        </Link>
      </section>
    </main>
  );
}
