'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './AttractionCard.module.css';
import { Card, CardImage, CardContent, CardTitle } from '../ui/Card';
import { FaStar, FaPlus, FaMapMarkerAlt, FaCalendarAlt, FaTimes } from 'react-icons/fa';

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
  '2025-09-06',
  '2025-09-07',
  '2025-09-08',
  '2025-09-09',
  '2025-09-10',
];

export default function AttractionCard({ item, onAdd }: Props) {
  const photo = item.photos?.[0] ?? '/images/placeholder-attraction.jpg';
  const [open, setOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const ddRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

  // Check scroll indicators when dropdown opens
  useEffect(() => {
    if (!open || !listRef.current) return;
    
    const checkScroll = () => {
      if (!listRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      setShowScrollTop(scrollTop > 0);
      setShowScrollBottom(scrollTop + clientHeight < scrollHeight - 1);
    };

    // Check initially and on scroll
    const timer = setTimeout(checkScroll, 50);
    const listElement = listRef.current;
    
    if (listElement) {
      listElement.addEventListener('scroll', checkScroll);
    }
    
    return () => {
      clearTimeout(timer);
      if (listElement) {
        listElement.removeEventListener('scroll', checkScroll);
      }
    };
  }, [open]);

  const handlePick = (date: string) => {
    onAdd?.(item.place_id, date);
    setOpen(false);
  };

  return (
    <Card className={styles.card} aria-label={`Attraction: ${item.name}`}>
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
            title={open ? "Close" : "Add to trip"}
          >
            <div className={styles.buttonContent}>
              <div className={styles.iconContainer}>
                {open ? <FaTimes aria-hidden="true" /> : <FaPlus aria-hidden="true" />}
              </div>
              {open && <span className={styles.buttonText}>Add to Trip</span>}
            </div>
          </button>

          {open && (
            <div className={styles.dropdown} role="menu" aria-label="Choose a date to add this attraction">
              <div className={styles.dropdownHeader}>
                <FaCalendarAlt className={styles.headerIcon} />
                Choose a day
              </div>
              <div className={`${styles.scrollContainer} ${showScrollBottom ? 'showScrollBottom' : ''}`}>
                {showScrollTop && (
                  <div className={`${styles.scrollIndicator} ${styles.scrollTop}`}>
                    ▲
                  </div>
                )}
                <div 
                  className={styles.listContainer} 
                  ref={listRef}
                >
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
                          <div className={styles.dateInfo}>
                            <span className={styles.dayWeek}>
                              {new Date(d).toLocaleDateString(undefined, {
                                weekday: 'short',
                              })}
                            </span>
                            <span className={styles.monthDay}>
                              {new Date(d).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                {showScrollBottom && (
                  <div className={`${styles.scrollIndicator} ${styles.scrollBottom}`}>
                    ▼
                  </div>
                )}
                {/* Mobile scroll hint */}
                {showScrollBottom && (
                  <div className={styles.mobileScrollHint} aria-hidden="true"></div>
                )}
              </div>
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