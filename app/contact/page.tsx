"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDown,
  MapPin,
  Mail,
  Phone,
  Check,
} from "lucide-react";
import "./contact.css";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="contact-page">
      <header className="contact-nav">
        <Link href="/" className="contact-logo">
          ESTATE <span>IN MOTION</span>
        </Link>

        <nav className="contact-nav-links">
          <Link href="/">HOME</Link>
          <Link href="/properties">PROPERTIES</Link>
          <Link href="/rooms">SPACES</Link>
          <Link href="/architecture">ARCHITECTURE</Link>
          <Link href="/contact" className="active">
            CONTACT
          </Link>
        </nav>

        <Link href="/properties" className="contact-nav-cta">
          EXPLORE HOMES <ArrowUpRight size={14} />
        </Link>
      </header>

      <section className="contact-hero">
        <div className="contact-hero-image" />

        <div className="contact-hero-content">
          <span className="contact-eyebrow">
            LET'S START A CONVERSATION / 001
          </span>

          <h1>
            Your next
            <br />
            <em>chapter starts here.</em>
          </h1>

          <p>
            Whether you're searching for a place to call home
            or simply exploring possibilities, we'd love to
            hear from you.
          </p>

          <a href="#contact-form" className="contact-scroll">
            GET IN TOUCH <ArrowDown size={15} />
          </a>
        </div>

        <span className="contact-hero-index">
          WE'D LOVE TO HEAR FROM YOU
        </span>
      </section>

      <section className="contact-main" id="contact-form">
        <div className="contact-information">
          <span className="contact-eyebrow">
            01 / CONTACT DETAILS
          </span>

          <h2>
            Let's find
            <br />
            <em>your somewhere.</em>
          </h2>

          <p className="contact-information-description">
            Tell us what you're looking for. Our team is here
            to help you explore properties and arrange your
            next viewing.
          </p>

          <div className="contact-detail-list">
            <div className="contact-detail">
              <span className="contact-detail-icon">
                <Mail size={17} />
              </span>
              <div>
                <span>EMAIL</span>
                <p>Get in touch by email</p>
              </div>
            </div>

            <div className="contact-detail">
              <span className="contact-detail-icon">
                <Phone size={17} />
              </span>
              <div>
                <span>PHONE</span>
                <p>Speak with our team</p>
              </div>
            </div>

            <div className="contact-detail">
              <span className="contact-detail-icon">
                <MapPin size={17} />
              </span>
              <div>
                <span>LOCATION</span>
                <p>Addis Ababa, Ethiopia</p>
              </div>
            </div>
          </div>

          <div className="contact-social">
            <span>FOLLOW OUR JOURNEY</span>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
             <span className="contact-instagram-text">IG</span>
            </a>
          </div>
        </div>

        <div className="contact-form-panel">
          <div className="contact-form-heading">
            <span className="contact-eyebrow">
              02 / SEND AN ENQUIRY
            </span>
            <h3>Tell us a little about it.</h3>
            <p>
              Fill in the details below and we'll be ready
              to help you take the next step.
            </p>
          </div>

          {submitted ? (
            <div className="contact-success">
              <span className="contact-success-icon">
                <Check size={24} />
              </span>
              <h3>Thank you for reaching out.</h3>
              <p>
                Your form has been completed in this preview.
                Enquiry delivery will be enabled when we connect
                the website to its backend.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
              >
                SEND ANOTHER ENQUIRY
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <label>
                  YOUR NAME
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    required
                  />
                </label>

                <label>
                  EMAIL ADDRESS
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                  />
                </label>
              </div>

              <div className="contact-form-row">
                <label>
                  PHONE NUMBER
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+251 ..."
                  />
                </label>

                <label>
                  WHAT ARE YOU LOOKING FOR?
                  <select name="enquiry" defaultValue="" required>
                    <option value="" disabled>
                      Select an enquiry
                    </option>
                    <option value="buy">Buying a property</option>
                    <option value="rent">Renting a property</option>
                    <option value="viewing">Schedule a viewing</option>
                    <option value="architecture">Architecture and design</option>
                    <option value="other">Something else</option>
                  </select>
                </label>
              </div>

              <label>
                PROPERTY OF INTEREST
                <input
                  type="text"
                  name="property"
                  placeholder="Property name (optional)"
                />
              </label>

              <label>
                YOUR MESSAGE
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us a little about what you have in mind..."
                  required
                />
              </label>

              <button type="submit" className="contact-submit">
                SEND ENQUIRY <ArrowUpRight size={16} />
              </button>

              <span className="contact-form-note">
                Your information will be used to respond to your enquiry.
              </span>
            </form>
          )}
        </div>
      </section>

      <section className="contact-bottom">
        <span className="contact-eyebrow">
          STILL EXPLORING?
        </span>

        <h2>
          Maybe your
          <br />
          <em>somewhere is here.</em>
        </h2>

        <Link href="/properties" className="contact-bottom-link">
          EXPLORE PROPERTIES <ArrowUpRight size={16} />
        </Link>
      </section>

      <footer className="contact-footer">
        <Link href="/" className="contact-logo">
          ESTATE <span>IN MOTION</span>
        </Link>

        <span>FIND YOUR SOMEWHERE.</span>

        <Link href="/">
          BACK TO HOME <ArrowUpRight size={13} />
        </Link>
      </footer>
    </main>
  );
}