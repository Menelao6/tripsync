'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './CityStrip.module.css';

type City = { 
  name: string; 
  image: string;
  country: string;
};

const CITIES: City[] = [
  { name: 'Tirana',    image: '/images/cities/tirana.jpg', country: 'Albania' },
  { name: 'Lisbon',    image: '/images/cities/lisbon.jpg' ,country: 'Portugal' },
  { name: 'Barcelona', image: '/images/cities/barcelona.jpg' ,country: 'Spain' },
  { name: 'Paris',     image: '/images/cities/paris.jpg' ,country: 'France' },
  { name: 'Rome',      image: '/images/cities/roma.jpg' ,country: 'Italy' },
  { name: 'Athens',    image: '/images/cities/athens.jpg' ,country: 'Greece' },
  { name: 'Prague',    image: '/images/cities/prague.jpg' ,country: 'Czechia' },
  { name: 'Vienna',    image: '/images/cities/vienna.jpg' ,country: 'Austria' },
  { name: 'Amsterdam', image: '/images/cities/amsterdam.jpg' ,country: 'Netherlands' },
];

export default function CityStrip({
  onPick,
  selectedCity,
}: { onPick: (city: string | null) => void; selectedCity?: string | null }) {
  const [local, setLocal] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [clickedCity, setClickedCity] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  
  const selected = selectedCity ?? local;

  useEffect(() => {
    const checkScrollable = () => {
      if (listRef.current) {
        setIsScrollable(listRef.current.scrollWidth > listRef.current.clientWidth);
      }
    };

    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, []);

  const scrollToSelected = () => {
    if (selected && listRef.current) {
      const selectedElement = listRef.current.querySelector(`[data-city="${selected}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  useEffect(() => {
    scrollToSelected();
  }, [selected]);

  const handleCityClick = (cityName: string) => {
    // Add click animation effect
    setClickedCity(cityName);
    setTimeout(() => setClickedCity(null), 300);

    // Toggle selection: if already selected, unselect it
    if (selected === cityName) {
      setLocal(null);
      onPick(null);
    } else {
      setLocal(cityName);
      onPick(cityName);
    }
  };

  return (
    <div className={styles.wrap} aria-label="Popular cities">
      {isScrollable && (
        <div className={styles.scrollHint}>
          <div className={styles.scrollIndicator}>
            <span>→</span>
          </div>
        </div>
      )}
      
      <ul 
        ref={listRef}
        className={styles.list} 
        role="listbox" 
        aria-orientation="horizontal"
      >
        {CITIES.map((city) => {
          const active = selected === city.name;
          const hovered = hoveredCity === city.name;
          const clicked = clickedCity === city.name;
          
          return (
            <li key={city.name} className={styles.item}>
              <button
                role="option"
                aria-selected={active}
                className={`${styles.btn} ${active ? styles.active : ''} ${hovered ? styles.hovered : ''} ${clicked ? styles.clicked : ''}`}
                onClick={() => handleCityClick(city.name)}
                onMouseEnter={() => setHoveredCity(city.name)}
                onMouseLeave={() => setHoveredCity(null)}
                title={`${city.name}, ${city.country}`}
                data-city={city.name}
              >
                <div className={styles.content}>
                  <div className={styles.avatarWrap}>
                    <img 
                      src={city.image} 
                      alt="" 
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/48x48/6366f1/white?text=${city.name.charAt(0)}`;
                      }}
                    />
                    <div className={styles.avatarOverlay}></div>
                  </div>

                  <div className={styles.cityInfo}>
                    <span className={styles.cityName}>{city.name}</span>
                    <span className={styles.country}>{city.country}</span>
                  </div>
                  
                  {active && <div className={styles.activeIndicator}></div>}
                  
                  <div className={styles.rippleContainer}>
                    <div className={styles.ripple}></div>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}