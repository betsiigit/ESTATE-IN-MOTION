"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./properties.css";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Bath,
  Maximize2,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

type Property = {
  id: number;
  name: string;
  location: string;
  type: string;
  category: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  description: string;
  featured?: boolean;
};

const properties: Property[] = [
  {
    id: 1,
    name: "The Horizon House",
    location: "Bole, Addis Ababa",
    type: "Private Residence",
    category: "Villa",
    price: 28500000,
    bedrooms: 4,
    bathrooms: 3,
    area: 420,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90",
    description:
      "A contemporary residence where warm materials, generous spaces and thoughtful architecture come together.",
    featured: true,
  },
  {
    id: 2,
    name: "Casa Verde",
    location: "Old Airport, Addis Ababa",
    type: "Modern Villa",
    category: "Villa",
    price: 35000000,
    bedrooms: 5,
    bathrooms: 4,
    area: 510,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=90",
    description:
      "A calm and spacious home with an elegant interior and a strong connection to its surroundings.",
    featured: true,
  },
  {
    id: 3,
    name: "The Quiet Residence",
    location: "CMC, Addis Ababa",
    type: "Contemporary Home",
    category: "House",
    price: 19800000,
    bedrooms: 3,
    bathrooms: 3,
    area: 280,
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=90",
    description:
      "A carefully considered home designed around natural light, comfort and everyday living.",
  },
  {
    id: 4,
    name: "The Urban Edit",
    location: "Kazanchis, Addis Ababa",
    type: "Luxury Apartment",
    category: "Apartment",
    price: 12500000,
    bedrooms: 2,
    bathrooms: 2,
    area: 165,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=90",
    description:
      "A refined city apartment with an open layout and a warm, modern interior.",
  },
  {
    id: 5,
    name: "The Garden House",
    location: "Summit, Addis Ababa",
    type: "Family Residence",
    category: "House",
    price: 22500000,
    bedrooms: 4,
    bathrooms: 3,
    area: 360,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=90",
    description:
      "A welcoming family home with generous living spaces and a peaceful residential atmosphere.",
  },
  {
    id: 6,
    name: "Residence No. 06",
    location: "Sarbet, Addis Ababa",
    type: "Luxury Apartment",
    category: "Apartment",
    price: 15800000,
    bedrooms: 3,
    bathrooms: 2,
    area: 210,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90",
    description:
      "A sophisticated apartment combining understated finishes with practical, comfortable design.",
  },
];

const categories = ["All spaces", "Villa", "House", "Apartment"];

function formatPrice(price: number) {
  return `ETB ${price.toLocaleString("en-US")}`;
}

export default function PropertiesPage() {
  const [activeCategory, setActiveCategory] = useState("All spaces");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [selectedProperty, setSelectedProperty] =
    useState<Property | null>(null);

  const filteredProperties = useMemo(() => {
    let result = properties.filter((property) => {
      const matchesCategory =
        activeCategory === "All spaces" ||
        property.category === activeCategory;

      const searchText = search.trim().toLowerCase();
      const matchesSearch =
        !searchText ||
        property.name.toLowerCase().includes(searchText) ||
        property.location.toLowerCase().includes(searchText) ||
        property.type.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });

    if (sort === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else {
      result = [...result].sort(
        (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
      );
    }

    return result;
  }, [activeCategory, search, sort]);

  return (
    <main className="properties-page">
      <header className="properties-nav">
        <Link href="/" className="properties-brand">
          <span className="properties-brand-mark">E.</span>
          <span>ESTATE IN MOTION</span>
        </Link>

        <nav className="properties-nav-links">
          <Link href="/">Home</Link>
          <Link href="/properties" className="current">Properties</Link>
          <Link href="/rooms">Spaces</Link>
          <Link href="/architecture">Architecture</Link>
          <Link href="/cinematic">Experience</Link>
        </nav>

        <Link href="/contact" className="properties-contact-link">
          Let's talk <ArrowUpRight size={15} />
        </Link>
      </header>

      <section className="properties-hero">
        <div className="properties-hero-top">
          <span>ESTATE IN MOTION® / PROPERTY COLLECTION</span>
          <span>ADDIS ABABA · ETHIOPIA</span>
        </div>

        <div className="properties-hero-title">
          <h1>
            Find a space.
            <br />
            <span>Find your place.</span>
          </h1>
          <p>
            A considered collection of distinctive spaces.
            <br />
            Each with a story waiting to become yours.
          </p>
        </div>

        <div className="properties-hero-image">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90"
            alt="Contemporary architectural residence"
            fill
            priority
            unoptimized
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="properties-hero-image-caption">
            <span>THE ART OF FINDING HOME</span>
            <span>01 — 06</span>
          </div>
        </div>

        <a href="#collection" className="properties-scroll-link">
          EXPLORE THE COLLECTION <ArrowDown size={15} />
        </a>
      </section>

      <section className="collection-section" id="collection">
        <div className="collection-heading">
          <div>
            <span className="properties-eyebrow">01 — THE COLLECTION</span>
            <h2>
              A place for
              <br />
              <em>what comes next.</em>
            </h2>
          </div>

          <p>
            Explore homes selected for their architecture, character and
            possibility. Your next chapter might be right here.
          </p>
        </div>

        <div className="property-toolbar">
          <div className="property-search">
            <Search size={17} />
            <input
              type="search"
              placeholder="Search by name or location..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search properties"
            />
            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <label className="property-sort">
            <SlidersHorizontal size={16} />
            <span>Sort by</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort properties"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to high</option>
              <option value="price-high">Price: High to low</option>
            </select>
          </label>
        </div>

        <div className="property-filter-row">
          <div className="property-filters">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`property-filter ${
                  activeCategory === category ? "active" : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <span className="property-result-count">
            {filteredProperties.length.toString().padStart(2, "0")} SPACES
          </span>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="properties-list-grid">
            {filteredProperties.map((property, index) => (
              <article className="listing-card" key={property.id}>
                <button
                  className="listing-image"
                  onClick={() => setSelectedProperty(property)}
                  aria-label={`View ${property.name}`}
                >
                  <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    unoptimized
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="listing-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {property.featured && (
                    <span className="listing-featured">SELECTED SPACE</span>
                  )}
                  <span className="listing-open">
                    <ArrowUpRight size={20} />
                  </span>
                </button>

                <div className="listing-details">
                  <div className="listing-title-row">
                    <div>
                      <span className="listing-type">{property.type}</span>
                      <h3>{property.name}</h3>
                      <p>{property.location}</p>
                    </div>
                    <span className="listing-price">
                      {formatPrice(property.price)}
                    </span>
                  </div>

                  <div className="listing-specs">
                    <span><BedDouble size={15} /> {property.bedrooms} Beds</span>
                    <span><Bath size={15} /> {property.bathrooms} Baths</span>
                    <span><Maximize2 size={14} /> {property.area} m²</span>
                  </div>

                  <button
                    className="listing-view-link"
                    onClick={() => setSelectedProperty(property)}
                  >
                    Explore property <ArrowUpRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="properties-empty">
            <span>NOTHING HERE JUST YET</span>
            <h3>No spaces found.</h3>
            <p>Try another search or choose a different category.</p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All spaces");
              }}
            >
              Clear filters <ArrowRight size={15} />
            </button>
          </div>
        )}
      </section>

      <section className="properties-closing">
        <span className="properties-eyebrow">02 — YOUR NEXT CHAPTER</span>
        <h2>
          Still looking for
          <br />
          <em>that feeling?</em>
        </h2>
        <p>
          Tell us what home means to you. Let's find a space that feels right.
        </p>
        <Link href="/contact">
          Start a conversation <ArrowUpRight size={17} />
        </Link>
      </section>

      <footer className="properties-footer">
        <Link href="/" className="properties-brand">
          <span className="properties-brand-mark">E.</span>
          <span>ESTATE IN MOTION</span>
        </Link>
        <span>© 2026 ESTATE IN MOTION</span>
        <Link href="/">BACK TO HOME <ArrowLeft size={14} /></Link>
      </footer>

      {selectedProperty && (
        <div
          className="property-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProperty(null);
            }
          }}
        >
          <section
            className="property-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="property-modal-title"
          >
            <button
              className="property-modal-close"
              onClick={() => setSelectedProperty(null)}
              aria-label="Close property details"
            >
              <X size={21} />
            </button>

            <div className="property-modal-image">
              <Image
                src={selectedProperty.image}
                alt={selectedProperty.name}
                fill
                unoptimized
                sizes="(max-width: 800px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="property-modal-content">
              <span className="properties-eyebrow">
                {selectedProperty.type} / {selectedProperty.location}
              </span>
              <h2 id="property-modal-title">{selectedProperty.name}</h2>
              <strong>{formatPrice(selectedProperty.price)}</strong>
              <p>{selectedProperty.description}</p>

              <div className="property-modal-specs">
                <span><BedDouble size={16} /> {selectedProperty.bedrooms} Bedrooms</span>
                <span><Bath size={16} /> {selectedProperty.bathrooms} Bathrooms</span>
                <span><Maximize2 size={15} /> {selectedProperty.area} m²</span>
              </div>

              <Link href="/contact" className="property-modal-contact">
                Enquire about this property <ArrowUpRight size={17} />
              </Link>
              <button
                className="property-modal-back"
                onClick={() => setSelectedProperty(null)}
              >
                <ArrowLeft size={15} /> Back to collection
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}