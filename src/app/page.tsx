import Link from 'next/link';
import Button from '@/components/ui/Button';
import { FaSearch, FaUsers, FaCalendarCheck, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroContent}>
          <h1 id="hero-title" className={styles.heroTitle}>
            Plan your perfect trip <span className={styles.highlight}>together</span>
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
              </Button>
            </Link>
          </div>
        </div>

        <div className={styles.heroImage} aria-hidden="true">
          <div className={styles.imageBlob}>
            <FaMapMarkerAlt className={styles.placeholderIcon} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features} aria-labelledby="features-title">
        <h2 id="features-title" className={styles.sectionTitle}>How TripSync works</h2>

        <div className={styles.featuresGrid}>
          <article className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles['icon-discover']}`}  aria-hidden="true">
              <FaSearch />
            </div>
            <h3 className={styles.featureTitle}>Discover</h3>
            <p className={styles.featureText}>Search cities and attractions. See ratings, essentials, and nearby suggestions.</p>
          </article>

          <article className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles['icon-collaborate']}`} aria-hidden="true">
              <FaUsers />
            </div>
            <h3 className={styles.featureTitle}>Collaborate</h3>
            <p className={styles.featureText}>Invite friends to propose places, leave comments, and vote together.</p>
          </article>

          <article className={styles.featureCard}>
            <div className={`${styles.featureIcon} ${styles['icon-plan']}`} aria-hidden="true">
              <FaCalendarCheck />
            </div>
            <h3 className={styles.featureTitle}>Plan</h3>
            <p className={styles.featureText}>Approved picks flow into a clean, day-by-day itinerary you can tweak anytime.</p>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta} aria-labelledby="cta-title">
        <h2 id="cta-title" className={styles.ctaTitle}>Ready to start your adventure?</h2>
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
      </section>
    </div>
  );
}
