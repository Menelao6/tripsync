'use client';

import styles from './AttractionDetail.module.css';
import ImageCarousel from './ImageCarousel';
import AddToTripDropdown from './AddToTripDropdown';
import { FaMapMarkerAlt, FaStar, FaClock, FaEuroSign, FaAccessibleIcon } from 'react-icons/fa';

export type AttractionDetailData = {
  place_id: string;
  name: string;
  city: string;
  address?: string;
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  photos: string[];
  overview?: string;
  about?: string;
  prices?: string;
  reviews?: Array<{ author: string; rating: number; text: string }>;
};

export default function AttractionDetail({ data, mockDates }: { data: AttractionDetailData; mockDates: string[] }) {
  const handleAddToTrip = (date: string) => {
    console.log('Add to trip', data.place_id, date);
    // Here you would typically connect to your state management or API
  };

  return (
    <div className={styles.page}>
      <div className={styles.gallery}>
        <ImageCarousel images={data.photos} alt={data.name} aspect="16/9" />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>{data.name}</h1>
            <div className={styles.actions}>
              <AddToTripDropdown dates={mockDates} onPick={handleAddToTrip} />
            </div>
          </div>
          
          <div className={styles.meta}>
            <div className={styles.location}>
              <FaMapMarkerAlt />
              <span>{data.city}{data.address ? `, ${data.address}` : ''}</span>
            </div>
            
            {data.rating && (
              <div className={styles.rating}>
                <FaStar />
                <span>{data.rating.toFixed(1)}</span>
                {data.user_ratings_total && (
                  <span className={styles.ratingCount}>({data.user_ratings_total} reviews)</span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={styles.layout}>
          <main className={styles.main}>
            <section id="overview" className={styles.section}>
              <h2>Overview</h2>
              <p>{data.overview || 'No overview available yet.'}</p>
            </section>

            <section id="prices" className={styles.section}>
              <h2>Prices & Hours</h2>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <FaEuroSign />
                  </div>
                  <div className={styles.infoContent}>
                    <h3>Admission</h3>
                    <p>{data.prices || 'Pricing information not available'}</p>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <FaClock />
                  </div>
                  <div className={styles.infoContent}>
                    <h3>Opening Hours</h3>
                    <p>Daily 10:00 - 18:00</p>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <FaAccessibleIcon />
                  </div>
                  <div className={styles.infoContent}>
                    <h3>Accessibility</h3>
                    <p>Wheelchair accessible, elevators available</p>
                  </div>
                </div>
              </div>
            </section>

            {data.reviews && data.reviews.length > 0 && (
              <section id="reviews" className={styles.section}>
                <h2>Visitor Reviews</h2>
                <div className={styles.reviews}>
                  {data.reviews.map((review, index) => (
                    <div key={index} className={styles.review}>
                      <div className={styles.reviewHeader}>
                        <div className={styles.reviewAuthor}>{review.author}</div>
                        <div className={styles.reviewRating}>
                          <FaStar />
                          <span>{review.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <p className={styles.reviewText}>{review.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section id="about" className={styles.section}>
              <h2>Additional Information</h2>
              <p>{data.about || 'Additional details coming soon.'}</p>
            </section>
          </main>

          <aside className={styles.sidebar}>
            <div className={styles.sticky}>
              <div className={styles.quickInfo}>
                <h3>Quick Facts</h3>
                <div className={styles.infoList}>
                  <div className={styles.infoListItem}>
                    <span className={styles.infoLabel}>Price Level</span>
                    <span className={styles.infoValue}>
                      {data.price_level ? '$'.repeat(data.price_level) : 'Not specified'}
                    </span>
                  </div>
                  <div className={styles.infoListItem}>
                    <span className={styles.infoLabel}>Category</span>
                    <span className={styles.infoValue}>Museum</span>
                  </div>
                  <div className={styles.infoListItem}>
                    <span className={styles.infoLabel}>Duration</span>
                    <span className={styles.infoValue}>2-3 hours</span>
                  </div>
                  <div className={styles.infoListItem}>
                    <span className={styles.infoLabel}>Best Time to Visit</span>
                    <span className={styles.infoValue}>Weekday mornings</span>
                  </div>
                </div>
              </div>

              <nav className={styles.pageNav}>
                <h3>Page Sections</h3>
                <ul>
                  <li><a href="#overview">Overview</a></li>
                  <li><a href="#prices">Prices & Hours</a></li>
                  {data.reviews && data.reviews.length > 0 && (
                    <li><a href="#reviews">Reviews</a></li>
                  )}
                  <li><a href="#about">Additional Info</a></li>
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}