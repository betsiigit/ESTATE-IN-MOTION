
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  BedDouble,
  Bath,
  Maximize2,
  MapPin,
} from "lucide-react";

import { properties } from "../../data/properties";
import "./property-detail.css";
import PropertyGallery from "./PropertyGallery";

export const instant = false;

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;

  const property = properties.find(
    (item) => item.id === Number(id)
  );

  if (!property) {
    notFound();
  }

  return (
    <main className="property-detail-page">
      <header className="property-detail-nav">
        <Link href="/" className="property-detail-logo">
          ESTATE<span>IN MOTION</span>
        </Link>

        <div className="property-detail-nav-links">
  <Link href="/journal" className="property-back-link">
    <ArrowLeft size={16} />
    BACK TO JOURNAL
  </Link>

  <Link href="/properties" className="property-back-link">
    ALL PROPERTIES
  </Link>
</div>
      </header>

     <section className="property-detail-hero">
  <PropertyGallery
    images={property.galleryImages?.length
      ? property.galleryImages
      : [property.image]}
    propertyName={property.name}
  />

  <div className="property-detail-heading">
    <div>
      <span className="property-detail-eyebrow">
        {property.category} / {property.type}
      </span>

      <h1>{property.name}</h1>

      <p className="property-detail-location">
        <MapPin size={16} />
        {property.location}
      </p>
    </div>

    <div className="property-detail-price">
      <span>PRICE ON REQUEST</span>
      <strong>
        ETB {property.price.toLocaleString("en-US")}
      </strong>
    </div>
  </div>
</section>

      <section className="property-detail-content">
        <div className="property-detail-description">
          <span className="property-detail-eyebrow">
            THE PROPERTY
          </span>

          <h2>A place designed around living.</h2>

          <p>{property.description}</p>

          <Link href="/contact" className="property-enquiry-link">
            ENQUIRE ABOUT THIS PROPERTY
            <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="property-detail-facts">
          <div>
            <BedDouble size={21} />
            <strong>{property.bedrooms}</strong>
            <span>BEDROOMS</span>
          </div>

          <div>
            <Bath size={21} />
            <strong>{property.bathrooms}</strong>
            <span>BATHROOMS</span>
          </div>

          <div>
            <Maximize2 size={21} />
            <strong>{property.area} m²</strong>
            <span>AREA</span>
          </div>
        </div>
      </section>

      <footer className="property-detail-footer">
        <Link href="/">ESTATE IN MOTION</Link>
        <span>FIND YOUR SOMEWHERE.</span>
        <Link href="/properties">EXPLORE MORE PROPERTIES</Link>
      </footer>
    </main>
  );
}
