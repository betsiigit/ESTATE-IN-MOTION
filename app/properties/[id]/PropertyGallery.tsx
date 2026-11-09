
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  X,
  Maximize2,
} from "lucide-react";

type PropertyGalleryProps = {
  images: string[];
  propertyName: string;
};

export default function PropertyGallery({
  images,
  propertyName,
}: PropertyGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const showPrevious = () => {
    setActiveImage((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setActiveImage((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  if (!images.length) return null;

  return (
    <section className="property-gallery">
      <div className="property-gallery-main">
        <Image
          src={images[activeImage]}
          alt={`${propertyName} - Image ${activeImage + 1}`}
          fill
          priority
          unoptimized
          sizes="(max-width: 900px) 100vw, 75vw"
          style={{ objectFit: "cover" }}
        />

        <button
          className="gallery-expand"
          onClick={() => setIsLightboxOpen(true)}
          aria-label="Open full-screen gallery"
        >
          <Maximize2 size={17} />
          <span>VIEW GALLERY</span>
        </button>

        <span className="gallery-counter">
          {String(activeImage + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </span>
      </div>

      <div className="property-gallery-thumbnails">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            className={`gallery-thumbnail ${
              activeImage === index ? "active" : ""
            }`}
            onClick={() => setActiveImage(index)}
            aria-label={`Show image ${index + 1}`}
            aria-pressed={activeImage === index}
          >
            <Image
              src={image}
              alt={`${propertyName} thumbnail ${index + 1}`}
              fill
              unoptimized
              sizes="(max-width: 700px) 25vw, 15vw"
              style={{ objectFit: "cover" }}
            />
          </button>
        ))}
      </div>

      {isLightboxOpen && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${propertyName} photo gallery`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsLightboxOpen(false);
            }
          }}
        >
          <button
            className="gallery-lightbox-close"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close gallery"
          >
            <X size={25} />
          </button>

          <button
            className="gallery-lightbox-arrow gallery-lightbox-previous"
            onClick={showPrevious}
            aria-label="Previous image"
          >
            <ArrowLeft size={25} />
          </button>

          <div className="gallery-lightbox-image">
            <Image
              src={images[activeImage]}
              alt={`${propertyName} - Image ${activeImage + 1}`}
              fill
              unoptimized
              sizes="100vw"
              style={{ objectFit: "contain" }}
            />
          </div>

          <button
            className="gallery-lightbox-arrow gallery-lightbox-next"
            onClick={showNext}
            aria-label="Next image"
          >
            <ArrowRight size={25} />
          </button>

          <span className="gallery-lightbox-counter">
            {propertyName} — {activeImage + 1} / {images.length}
          </span>
        </div>
      )}
    </section>
  );
}
