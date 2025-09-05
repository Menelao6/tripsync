import Link from 'next/link';
import Button from '@/components/ui/Button';
import { FaSearch, FaUsers, FaCalendarCheck, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 id="hero-title" className={styles.heroTitle}>
              <span className={styles.gradientText}>Plan your perfect trip together</span>{' '}
            </h1>
            <p className={styles.heroDescription}>
              Discover attractions, collaborate with friends, and build a day-by-day itinerary with TripSync.
            </p>

            <div className={styles.heroActions} role="group" aria-label="Primary actions">
              <Link href="/search" className={styles.actionLink}>
                <Button variant="primary" size="large" aria-label="Start exploring destinations">
                  <FaSearch aria-hidden="true" />
                  <span className={styles.btnText}>Start exploring</span>
                </Button>
              </Link>
              <Link href="/how-it-works" className={styles.actionLinkSecondary}>
                <Button variant="secondary" size="large" aria-label="Learn how TripSync works">
                  <span className={styles.btnText}>How it works</span>
                  <FaArrowRight aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroImage} aria-hidden="true">
            <div className={styles.imageBlob}>
              <FaMapMarkerAlt className={styles.placeholderIcon} />
            </div>
            <div className={styles.floatingElement} style={{ '--delay': '0s' } as React.CSSProperties}>
              <FaUsers />
            </div>
            <div className={styles.floatingElement} style={{ '--delay': '1s' } as React.CSSProperties}>
              <FaCalendarCheck />
            </div>
            <div className={styles.floatingElement} style={{ '--delay': '2s' } as React.CSSProperties}>
              <FaSearch />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features} aria-labelledby="features-title">
        <div className={styles.featuresHeader}>
          <h2 id="features-title" className={styles.sectionTitle}>How TripSync works</h2>
          <p className={styles.sectionSubtitle}>Collaborative travel planning made simple and fun</p>
        </div>

        <div className={styles.featuresGrid}>
          <article className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles['icon-discover']}`} aria-hidden="true">
              <FaSearch />
            </div>
            <h3 className={styles.featureTitle}>Discover</h3>
            <p className={styles.featureText}>Search cities and attractions. See ratings, essentials, and nearby suggestions.</p>
            <div className={styles.featureLink}>
              <Link href="/search">
                Explore now
                <FaArrowRight />
              </Link>
            </div>
          </article>

          <article className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles['icon-collaborate']}`} aria-hidden="true">
              <FaUsers />
            </div>
            <h3 className={styles.featureTitle}>Collaborate</h3>
            <p className={styles.featureText}>Invite friends to propose places, leave comments, and vote together.</p>
            <div className={styles.featureLink}>
              <Link href="/how-it-works">
                Learn more
                <FaArrowRight />
              </Link>
            </div>
          </article>

          <article className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles['icon-plan']}`} aria-hidden="true">
              <FaCalendarCheck />
            </div>
            <h3 className={styles.featureTitle}>Plan</h3>
            <p className={styles.featureText}>Approved picks flow into a clean, day-by-day itinerary you can tweak anytime.</p>
            <div className={styles.featureLink}>
              <Link href="/register">
                Get started
                <FaArrowRight />
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to start your adventure?</h2>
          <p className={styles.ctaText}>
            Create a Space, invite friends, and turn ideas into a shared plan - fast and free.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/register">
              <Button variant="primary" size="large" aria-label="Get started free">
                Get started - it&apos;s free
              </Button>
            </Link>
            <Link href="/spaces/directory">
              <Button variant="secondary" size="large">
                Explore destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}