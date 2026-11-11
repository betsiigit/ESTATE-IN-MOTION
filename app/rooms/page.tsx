
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Dollhouse from "./Dollhouse";
import "./rooms.css";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Maximize2,
} from "lucide-react";

const rooms = [
  {
    number: "01",
    name: "The Living Room",
    category: "LIVING",
    description:
      "A place to slow down. Natural textures, generous proportions and light that changes throughout the day.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90",
    detail: "Warm minimalism · Natural light · Open living",
  },
  {
    number: "02",
    name: "The Bedroom",
    category: "PRIVATE",
    description:
      "A quieter kind of luxury. Soft materials and considered details create a space to truly switch off.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=90",
    detail: "Soft textures · Calm palette · Private retreat",
  },
  {
    number: "03",
    name: "The Kitchen",
    category: "GATHER",
    description:
      "Designed around the everyday rituals of cooking, sharing and spending time together.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=90",
    detail: "Natural finishes · Thoughtful storage · Gathering",
  },
  {
    number: "04",
    name: "The Bathroom",
    category: "RESTORE",
    description:
      "A personal sanctuary where understated materials and simple forms make room for stillness.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2000&q=90",
    detail: "Stone finishes · Quiet details · Everyday ritual",
  },
];

export default function RoomsPage() {
  const [activeRoom, setActiveRoom] = useState(0);
  const room = rooms[activeRoom];

  const nextRoom = () =>
    setActiveRoom((current) => (current + 1) % rooms.length);

  const previousRoom = () =>
    setActiveRoom((current) => (current - 1 + rooms.length) % rooms.length);

  return (
    <main className="rooms-page">
      <header className="rooms-nav">
        <Link href="/" className="rooms-brand">
          <span className="rooms-brand-mark">E.</span>
          <span>ESTATE IN MOTION</span>
        </Link>

        <nav className="rooms-nav-links">
          <Link href="/">Home</Link>
          <Link href="/properties">Properties</Link>
          <Link href="/rooms" className="current">Spaces</Link>
          <Link href="/architecture">Architecture</Link>
        </nav>

        <Link href="/contact" className="rooms-contact">
          Let's talk <ArrowUpRight size={15} />
        </Link>
      </header>

      <section className="rooms-intro">
        <div className="rooms-intro-top">
          <span>ESTATE IN MOTION® / THE INTERIOR COLLECTION</span>
          <span>ADDIS ABABA · ETHIOPIA</span>
        </div>

        <div className="rooms-intro-title">
          <span className="rooms-eyebrow">A DIFFERENT WAY TO FEEL AT HOME</span>
          <h1>
            Every room.
            <br />
            <em>A feeling.</em>
          </h1>
          <p>
            Step inside the details that make a house feel like yours.
            Explore spaces shaped by light, material and the way we live.
          </p>
        </div>

        <a href="#showroom" className="rooms-scroll">
          ENTER THE SHOWROOM <ArrowDown size={15} />
        </a>
      </section>

      <section className="room-showroom" id="showroom">
        <div className="room-showroom-heading">
          <div>
            <span className="rooms-eyebrow">01 — EXPLORE THE INTERIORS</span>
            <h2>
              Spaces that
              <br />
              <em>stay with you.</em>
            </h2>
          </div>
          <span className="room-counter">
            {room.number} <span>/ 04</span>
          </span>
        </div>


<div className="room-experience">
  <Dollhouse activeRoom={room.name} />

  <div className="room-information">
    <span className="rooms-eyebrow">CHOOSE YOUR SPACE</span>

    <div className="room-selector-list">
      {rooms.map((item, index) => (
        <button
          key={item.number}
          className={activeRoom === index ? "active" : ""}
          onClick={() => setActiveRoom(index)}
        >
          <span>{item.number}</span>
          <span>{item.name}</span>
          <ArrowUpRight size={16} />
        </button>
      ))}
    </div>

    <h3>{room.name}</h3>

    <p>{room.description}</p>

    <div className="room-detail-line" />

    <span className="room-detail">{room.detail}</span>
  </div>
</div>
      </section>

      <section className="rooms-manifesto">
        <span className="rooms-eyebrow">02 — THE DETAILS MATTER</span>
        <h2>
          Luxury isn't
          <br />
          <em>more. It's meaning.</em>
        </h2>
        <p>
          The way morning light falls across a wall. The texture beneath your
          fingertips. The feeling of arriving somewhere that understands you.
          That's where a home begins.
        </p>
        <Link href="/architecture">
          Discover our approach <ArrowUpRight size={17} />
        </Link>
      </section>

      <section className="rooms-cta">
        <span className="rooms-eyebrow">FIND YOUR SOMEWHERE</span>
        <h2>
          Imagine living
          <br />
          <em>in these spaces.</em>
        </h2>
        <Link href="/properties">
          Explore properties <ArrowUpRight size={17} />
        </Link>
      </section>

      <footer className="rooms-footer">
        <Link href="/" className="rooms-brand">
          <span className="rooms-brand-mark">E.</span>
          <span>ESTATE IN MOTION</span>
        </Link>
        <span>© 2026 ESTATE IN MOTION</span>
        <Link href="/">BACK TO HOME <ArrowLeft size={14} /></Link>
      </footer>
    </main>
  );
}