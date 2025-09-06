'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ImageCarousel.module.css';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

type Props = {
  images: string[];                // array of URLs
  alt?: string;
  aspect?: '16/9' | '4/3' | '1/1';
};

export default function ImageCarousel({ images, alt = 'Attraction photo', aspect = '16/9' }: Props) {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const startX = useRef(0);
  const deltaX = useRef(0);

  const next = () => setI((p) => (p + 1) % images.length);
  const prev = () => setI((p) => (p - 1 + images.length) % images.length);

  // keyboard for fullscreen
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // prevent body scroll when open
  useEffect(() => {
    if (open) {
      const b = document.body;
      const prev = b.style.overflow;
      b.style.overflow = 'hidden';
      return () => { b.style.overflow = prev; };
    }
  }, [open]);

  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchMove  = (e: React.TouchEvent) => { deltaX.current = e.touches[0].clientX - startX.current; };
  const onTouchEnd   = () => {
    if (deltaX.current > 50) prev();
    if (deltaX.current < -50) next();
    deltaX.current = 0;
  };

  return (
    <>
      <div className={`${styles.wrap} ${styles[`a${aspect.replace('/','_')}`]}`}>
        <button
          className={styles.inner}
          onClick={() => setOpen(true)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          aria-label="Open gallery"
        >
          <img src={images[i]} alt={alt} className={styles.img} />
        </button>

        {/* arrows (desktop) */}
        {images.length > 1 && (
          <>
            <button className={`${styles.nav} ${styles.left}`} onClick={prev} aria-label="Previous image">
              <FaChevronLeft />
            </button>
            <button className={`${styles.nav} ${styles.right}`} onClick={next} aria-label="Next image">
              <FaChevronRight />
            </button>
          </>
        )}

        {/* dots */}
        {images.length > 1 && (
          <div className={styles.dots} role="tablist" aria-label="Gallery thumbnails">
            {images.map((_, idx) => (
              <button
                key={idx}
                className={`${styles.dot} ${idx === i ? styles.active : ''}`}
                onClick={() => setI(idx)}
                role="tab"
                aria-selected={idx === i}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox */}
      {open && (
        <div className={styles.lightbox} role="dialog" aria-modal="true">
          <button className={styles.close} onClick={() => setOpen(false)} aria-label="Close">
            <FaTimes />
          </button>

          <button className={`${styles.navFs} ${styles.left}`} onClick={prev} aria-label="Previous image">
            <FaChevronLeft />
          </button>
          <img src={images[i]} alt={alt} className={styles.imgFs} />
          <button className={`${styles.navFs} ${styles.right}`} onClick={next} aria-label="Next image">
            <FaChevronRight />
          </button>
        </div>
      )}
    </>
  );
}
