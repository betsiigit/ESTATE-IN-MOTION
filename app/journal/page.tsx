
"use client";

import { useEffect, useState } from "react";
import {
  localPlaces,
  getMapSearchUrl,
  type PlaceCategory,
} from "./places";
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
  Cloud,
CloudDrizzle,
CloudRain,
Droplets,
Sun,
Wind,
RefreshCw,
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
  propertyId: 1,
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


function getWeatherDescription(code: number) {
  if (code === 0) return "Clear sky";
  if ([1, 2].includes(code)) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if ([45, 48].includes(code)) return "Foggy";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67].includes(code)) return "Rain";
  if ([71, 73, 75, 77].includes(code)) return "Snow";
  if ([80, 81, 82].includes(code)) return "Rain showers";
  if ([85, 86].includes(code)) return "Snow showers";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";
  return "Current conditions";
}

function getWeatherIcon(code: number) {
  if (code === 0) return Sun;
  if ([1, 2, 3, 45, 48].includes(code)) return Cloud;
  if ([51, 53, 55, 56, 57].includes(code)) return CloudDrizzle;
  if ([61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)) {
    return CloudRain;
  }
  return Cloud;
}


export default function JournalPage() {

  


  const [activeLifestyle, setActiveLifestyle] = useState("city");
  const [activeNeighborhood, setActiveNeighborhood] = useState("Bole");

  const selectedLifestyle = lifestyles.find(
    (item) => item.id === activeLifestyle
  );
const [activePlaceCategory, setActivePlaceCategory] =
  useState<"All" | PlaceCategory>("All");

const neighborhoodPlaces = localPlaces.filter(
  (place) =>
    place.neighborhood === activeNeighborhood &&
    (activePlaceCategory === "All" ||
      place.category === activePlaceCategory)
);
  const suggestedNeighborhoods = selectedLifestyle
    ? neighborhoods.filter((place) =>
        selectedLifestyle.neighborhoods.includes(place.name)
      )
    : neighborhoods;

  const currentNeighborhood =
    neighborhoods.find((place) => place.name === activeNeighborhood) ??
    neighborhoods[0];



type WeatherData = {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  maxTemperature: number;
  minTemperature: number;
  rainChance: number;
};

const [weather, setWeather] = useState<WeatherData | null>(null);
const [weatherLoading, setWeatherLoading] = useState(true);
const [weatherError, setWeatherError] = useState(false);

useEffect(() => {
  const controller = new AbortController();

  async function loadWeather() {
    try {
      setWeatherLoading(true);
      setWeatherError(false);

      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=8.9806&longitude=38.7578&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=1&timezone=Africa%2FAddis_Ababa",
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error("Weather request failed");
      }

      const data = await response.json();

      setWeather({
        temperature: data.current.temperature_2m,
        feelsLike: data.current.apparent_temperature,
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        weatherCode: data.current.weather_code,
        maxTemperature: data.daily.temperature_2m_max[0],
        minTemperature: data.daily.temperature_2m_min[0],
        rainChance: data.daily.precipitation_probability_max[0] ?? 0,
      });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      setWeatherError(true);
    } finally {
      if (!controller.signal.aborted) {
        setWeatherLoading(false);
      }
    }
  }

  loadWeather();

  return () => controller.abort();
}, []);


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
            <span className="journal-section-label">
              03 / LIFE AROUND YOU
            </span>
            <h2>
              Your neighborhood,
              <br />
              <em>your lifestyle.</em>
            </h2>
          </div>
          <p>
            Discover restaurants, cafés and places to stay around
            the neighborhood you are exploring.
          </p>
        </div>

        <div className="local-place-heading">
          <div>
            <MapPin size={16} />
            <span>{activeNeighborhood}, Addis Ababa</span>
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              activeNeighborhood + ", Addis Ababa, Ethiopia"
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            EXPLORE ON MAP <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="place-filters">
          {(["All", "Restaurant", "Cafe", "Hotel"] as const).map(
            (category) => (
              <button
                key={category}
                className={
                  activePlaceCategory === category ? "active" : ""
                }
                onClick={() => setActivePlaceCategory(category)}
              >
                {category === "All" ? "ALL PLACES" : category.toUpperCase()}
              </button>
            )
          )}
        </div>

        <div className="local-place-grid">
          {neighborhoodPlaces.map((place) => (
            <article className="local-place-card" key={place.name}>
              <div className="local-place-icon">
                {place.category === "Restaurant" ? (
                  <Utensils />
                ) : place.category === "Cafe" ? (
                  <Coffee />
                ) : (
                  <Hotel />
                )}
              </div>

              <span>{place.category.toUpperCase()}</span>
              <h3>{place.name}</h3>
              <p>{place.description}</p>

              <a
                href={getMapSearchUrl(place)}
                target="_blank"
                rel="noreferrer"
              >
                FIND LOCATION <ArrowUpRight size={15} />
              </a>
            </article>
          ))}
        </div>

        {neighborhoodPlaces.length === 0 && (
          <p>No places found in this category yet.</p>
        )}

      
<div className="journal-weather-card">
  <div className="weather-card-top">
    <div>
      <span className="weather-eyebrow">ADDIS ABABA · LIVE WEATHER</span>
      <h3>Weather around the city</h3>
      <p>Current conditions across Addis Ababa</p>
    </div>
    <CloudSun size={25} />
  </div>

  {weatherLoading ? (
    <p className="weather-status">Loading live weather...</p>
  ) : weatherError || !weather ? (
    <div className="weather-error">
      <p>Weather is temporarily unavailable.</p>
      <button onClick={() => window.location.reload()}>
        <RefreshCw size={14} /> Try again
      </button>
    </div>
  ) : (
    <>
      <div className="weather-main">
        <div>
          {(() => {
            const WeatherIcon = getWeatherIcon(weather.weatherCode);
            return <WeatherIcon size={42} strokeWidth={1.4} />;
          })()}
          <span>{getWeatherDescription(weather.weatherCode)}</span>
        </div>
        <strong>{Math.round(weather.temperature)}°</strong>
      </div>

      <p className="weather-feels">
        Feels like {Math.round(weather.feelsLike)}°C
      </p>

      <div className="weather-details">
        <div>
          <Droplets size={17} />
          <span>Humidity</span>
          <strong>{weather.humidity}%</strong>
        </div>
        <div>
          <Wind size={17} />
          <span>Wind</span>
          <strong>{weather.windSpeed} km/h</strong>
        </div>
        <div>
          <CloudRain size={17} />
          <span>Rain chance</span>
          <strong>{weather.rainChance}%</strong>
        </div>
        <div>
          <Sun size={17} />
          <span>High / Low</span>
          <strong>
            {Math.round(weather.maxTemperature)}° / {Math.round(weather.minTemperature)}°
          </strong>
        </div>
      </div>
    </>
  )}
</div>

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
       <Link
  href={
    activeNeighborhood === "Bole"
      ? "/properties/1"
      : "/properties"
  }
>
  EXPLORE PROPERTIES <ArrowUpRight size={16} />
</Link>
      </section>
    </main>
  );
}
