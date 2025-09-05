'use client';

import styles from './CityStrip.module.css';
import { useState } from 'react';

type City = { name: string; image: string };

const CITIES: City[] = [
  { name: 'Tirana',    image: '/images/cities/tirana.jpg' },
  { name: 'Lisbon',    image: '/images/cities/lisbon.jpg' },
  { name: 'Barcelona', image: '/images/cities/barcelona.jpg' },
  { name: 'Paris',     image: '/images/cities/paris.jpg' },
  { name: 'Rome',      image: '/images/cities/roma.jpg' },
  { name: 'Athens',    image: '/images/cities/athens.jpg' },
  { name: 'Prague',    image: '/images/cities/prague.jpg' },
  { name: 'Vienna',    image: '/images/cities/vienna.jpg' },
  { name: 'Amsterdam', image: '/images/cities/amsterdam.jpg' },
];

export default function CityStrip({
  onPick,
  selectedCity,
}: { onPick: (city: string) => void; selectedCity?: string }) {
  const [local, setLocal] = useState<string | null>(null);
  const selected = selectedCity ?? local;

  return (
    <div className={styles.wrap} aria-label="Popular cities">
      <ul className={styles.list} role="listbox" aria-orientation="horizontal">
        {CITIES.map((c) => {
          const active = selected === c.name;
          return (
            <li key={c.name} className={styles.item}>
              <button
                role="option"
                aria-selected={active}
                className={`${styles.btn} ${active ? styles.active : ''}`}
                onClick={() => { setLocal(c.name); onPick(c.name); }}
                title={c.name}
              >
                {/* Default state: icon on left, text on right */}
                <span className={styles.avatarWrap}>
                  <img src={c.image} alt="" loading="lazy" />
                </span>

                <span className={styles.label}>{c.name}</span>
                
                {/* Active state indicator */}
                {active && <span className={styles.activeIndicator}></span>}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}