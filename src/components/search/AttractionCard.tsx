'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './AttractionCard.module.css';
import { Card, CardImage, CardContent, CardTitle } from '../ui/Card';
import { FaStar, FaPlus, FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa';

type Props = {
  item: {
    id: string;
    place_id: string;
    name: string;
    city: string;
    rating: number;
    price_level?: number;
    photos: string[];
  };
  onAdd?: (placeId: string, date?: string) => void;
};

const MOCK_DATES = [
  '2025-09-01',
  '2025-09-02',
  '2025-09-03',
  '2025-09-04',
  '2025-09-05',
];

export default function AttractionCard({ item, onAdd }: Props) {
  const photo = item.photos?.[0] ?? '/images/placeholder-attraction.jpg';
  const [open, setOpen] = useState(false);
  const ddRef = useRef<HTMLDivElement>(null);

  // close on outside click/escape
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ddRef.current) return;
      if (!ddRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  const handlePick = (date: string) => {
    onAdd?.(item.place_id, date);
    setOpen(false);
  };

  return (
    <Card className={styles.card}  aria-label={`Attraction: ${item.name}`}>
      {/* Media */}
      <div className={styles.media}>
        <CardImage src={photo} alt={item.name} width={250} height={200} />

        {/* Add to trip dropdown trigger (top-right) */}
        <div className={`${styles.addWrap} ${open ? styles.open : ''}`} ref={ddRef}>
  <button
    className={`${styles.addButton} ${open ? styles.addOpen : ''}`}
    aria-haspopup="menu"
    aria-expanded={open}
    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(v => !v); }}
    title="Add to trip"
  >
    <FaPlus aria-hidden="true" />
    <FaChevronDown className={styles.chev} aria-hidden="true" />
  </button>

  {open && (
    <div className={styles.dropdown} role="menu" aria-label="Choose a date to add this attraction">
              <div className={styles.dropdownHeader}>Add to day</div>
              <ul className={styles.list}>
                {MOCK_DATES.map((d) => (
                  <li key={d}>
                    <button
                      role="menuitem"
                      className={styles.listItem}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handlePick(d);
                      }}
                    >
                      {new Date(d).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        weekday: 'short',
                      })}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <CardContent>
        <CardTitle>
          <Link href={`/attraction/${item.place_id}`}>{item.name}</Link>
        </CardTitle>

        <div className={styles.meta}>
          <div className={styles.location}>
            <FaMapMarkerAlt aria-hidden="true" />
            <span>{item.city}</span>
          </div>

          <div className={styles.rating}>
            <FaStar aria-hidden="true" />
            <span>{item.rating.toFixed(1)}</span>
          </div>
        </div>

        {item.price_level && (
          <div className={styles.price} aria-label={`Price level ${item.price_level} of 4`}>
            {'$'.repeat(item.price_level)}
            <span className={styles.priceLight}>{'$'.repeat(4 - (item.price_level || 0))}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
