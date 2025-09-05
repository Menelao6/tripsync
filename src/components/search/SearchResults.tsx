'use client';

import styles from './SearchResults.module.css';
import AttractionCard from './AttractionCard';
import Button from '../ui/Button';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

type Attraction = {
  id: string;
  place_id: string;
  name: string;
  city: string;
  rating: number;
  price_level?: number;
  photos: string[];
};

type Props = {
  items: Attraction[];
  loading: boolean;
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (p: number) => void;
};

export default function SearchResults({ items, loading, page, totalPages, total, onPageChange }: Props) {
  // Check if items is defined before accessing length
  const hasItems = items && items.length > 0;
  
  if (!loading && !hasItems) {
    return (
      <div className={styles.noResults}>
        <h3>No results found</h3>
        <p>Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.meta}>
        <p className={styles.count}><strong>{total}</strong> results found</p>
        {hasItems && (
          <p className={styles.pageInfo}>Page {page} of {totalPages}</p>
        )}
      </div>

      <div className={styles.grid} aria-busy={loading}>
        {loading
          ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
          : items.map(it => <AttractionCard key={it.id} item={it} />)}
      </div>

      {hasItems && totalPages > 1 && (
        <div className={styles.pagination}>
          <Button
            variant="secondary"
            size="medium"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page <= 1}
            icon={<FaArrowLeft />}
          >
            Previous
          </Button>
          
          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1))
              .map((p, i, arr) => (
                <div key={p}>
                  {i > 0 && arr[i - 1] !== p - 1 && <span className={styles.ellipsis}>...</span>}
                  <button
                    className={`${styles.pageButton} ${p === page ? styles.active : ''}`}
                    onClick={() => onPageChange(p)}
                    disabled={p === page}
                  >
                    {p}
                  </button>
                </div>
              ))}
          </div>
          
          <Button
            variant="secondary"
            size="medium"
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
            icon={<FaArrowRight />}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonButtons}>
          <div className={styles.skeletonButton}></div>
          <div className={styles.skeletonButton}></div>
        </div>
      </div>
    </div>
  );
}