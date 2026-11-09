"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./properties.css";
import { properties, Property } from "../data/properties";
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


const categories = ["All spaces", "Villa", "House", "Apartment"];



function formatPrice(price: number) {
  return `ETB ${price.toLocaleString("en-US")}`;
}

function PropertiesContent() {
    const searchParams = useSearchParams();

const categoryFromUrl = searchParams.get("category");

const locationFromUrl = searchParams.get("location");

const categoryMap: Record<string, string> = {
  Apartments: "Apartment",
  Villas: "Villa",
  Houses: "House",
  Penthouses: "All spaces",
};



  const [activeCategory, setActiveCategory] = useState("All spaces");

useEffect(() => {
  if (categoryFromUrl) {
    setActiveCategory(categoryMap[categoryFromUrl] || "All spaces");
  }
}, [categoryFromUrl]);


useEffect(() => {
  if (locationFromUrl) {
    setActiveLocation(locationFromUrl);
  }
}, [locationFromUrl]);


const [activeLocation, setActiveLocation] = useState("All locations");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [selectedProperty, setSelectedProperty] =
    useState<Property | null>(null);

  const filteredProperties = useMemo(() => {
    let result = properties.filter((property) => {
const matchesCategory =
  activeCategory === "All spaces" ||
  property.category === activeCategory;

const matchesLocation =
  activeLocation === "All locations" ||
  property.location
    .toLowerCase()
    .includes(activeLocation.toLowerCase());

      const searchText = search.trim().toLowerCase();
      const matchesSearch =
        !searchText ||
        property.name.toLowerCase().includes(searchText) ||
        property.location.toLowerCase().includes(searchText) ||
        property.type.toLowerCase().includes(searchText);

return matchesCategory && matchesLocation && matchesSearch;
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
}, [activeCategory, activeLocation, search, sort]);

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
  className="properties-sort-select"
>
  <option value="featured">Featured</option>
  <option value="price-low">Price: Low to high</option>
  <option value="price-high">Price: High to low</option>
</select>
          </label>
        </div>
<div className="property-filter-row">
  <label className="category-dropdown">
    <span>PROPERTY TYPE</span>

    <select
      value={activeCategory}
      onChange={(event) => setActiveCategory(event.target.value)}
      aria-label="Filter by property type"
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>

    <ArrowDown size={16} />
  </label>

  <span className="property-result-count">
    {filteredProperties.length.toString().padStart(2, "0")} SPACES
  </span>
</div>

        {filteredProperties.length > 0 ? (
          <div className="properties-list-grid">
            {filteredProperties.map((property, index) => (
              <article className="listing-card" key={property.id}>
               <Link
  href={`/properties/${property.id}`}
  className="listing-image"
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
</Link>

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

  <Link
  href={`/properties/${property.id}`}
  className="listing-view-link"
>
  Explore property <ArrowUpRight size={16} />
</Link>   </div>
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
                setActiveLocation("All locations");
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

      
    </main>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div>Loading properties...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}