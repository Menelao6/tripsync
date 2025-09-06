'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './AddToTripDropdown.module.css';
import { FaPlus, FaCalendarAlt, FaChevronUp, FaChevronDown } from 'react-icons/fa';

type Props = {
  dates?: string[];
  onPick: (date: string) => void;
  label?: string;
};

export default function AddToTripDropdown({
  dates = [],
  onPick,
  label = 'Add to trip',
}: Props) {
  const [open, setOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Close on outside click / ESC
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  // Scroll indicators
  const updateScroll = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    setShowScrollTop(el.scrollTop > 0);
    setShowScrollBottom(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
  }, []);

  useEffect(() => {
    if (!open) return;
    updateScroll();
    const el = listRef.current;
    el?.addEventListener('scroll', updateScroll);
    window.addEventListener('resize', updateScroll);
    return () => {
      el?.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, [open, updateScroll]);

  const renderLabel = (iso: string) => {
    const d = new Date(iso);
    return isNaN(d.getTime())
      ? iso
      : d.toLocaleDateString(undefined, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        });
  };

  return (
    <div ref={rootRef} className={`${styles.addWrap} ${open ? styles.open : ''}`}>
      <button
        type="button"
        className={`${styles.addButton} ${open ? styles.addOpen : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
      >
        <span className={styles.buttonContent}>
          <span className={styles.iconContainer}><FaPlus aria-hidden /></span>
          <span className={styles.buttonText}>{label}</span>
        </span>
      </button>

      {open && (
        <div className={styles.dropdown} role="menu" aria-label="Choose a date">
          <div className={styles.dropdownHeader}>
            <FaCalendarAlt className={styles.headerIcon} aria-hidden />
            <span>Choose a day for your visit</span>
          </div>

          <div className={styles.scrollContainer} ref={listRef}>
            {showScrollTop && (
              <div className={`${styles.scrollIndicator} ${styles.scrollTop}`}>
                <FaChevronUp />
              </div>
            )}
            
            <ul className={styles.dateList} role="listbox" aria-label="Available trip days">
              {dates.length === 0 ? (
                <li className={styles.noDates}>No dates available</li>
              ) : (
                dates.map((iso) => (
                  <li key={iso} role="none">
                    <button
                      type="button"
                      role="menuitem"
                      className={styles.dateButton}
                      onClick={() => { onPick(iso); setOpen(false); }}
                    >
                      {renderLabel(iso)}
                    </button>
                  </li>
                ))
              )}
            </ul>

            {showScrollBottom && (
              <div className={`${styles.scrollIndicator} ${styles.scrollBottom}`}>
                <FaChevronDown />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}