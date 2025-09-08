'use client';

import Link from 'next/link';
import { 
  FaSearch, 
  FaUsers, 
  FaCalendarCheck, 
  FaMapMarkerAlt, 
  FaArrowRight, 
  FaRocket, 
  FaGlobe, 
  FaChevronDown,
  FaHeart,
  FaRegCompass,
  FaSyncAlt,
  FaStar,
  FaRegSmile,
  FaRegLightbulb
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <FaSearch />,
      title: "Discover & Explore",
      description: "Uncover hidden gems and popular attractions with AI-powered recommendations, real-time ratings, and personalized suggestions tailored to your interests."
    },
    {
      icon: <FaUsers />,
      title: "Collaborate Seamlessly",
      description: "Invite friends to share ideas, vote on destinations, leave comments, and make group decisions effortlessly with our intuitive collaboration tools."
    },
    {
      icon: <FaCalendarCheck />,
      title: "Plan & Organize",
      description: "Transform approved ideas into a beautiful, day-by-day itinerary with smart scheduling, time optimization, and flexible editing capabilities."
    }
  ];

  return (
    <div className={styles.container}>
      {/* Animated Background */}
      <div className={styles.animatedBg}>
        <div className={styles.bgOrb}></div>
        <div className={styles.bgOrb}></div>
        <div className={styles.bgOrb}></div>
      </div>

      {/* Hero Section */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={`${styles.logo} ${isScrolled ? styles.logoSmall : ''}`}>
              <FaSyncAlt />
              <span>Trip<span>Sync</span></span>
            </div>
            
            <h1 id="hero-title" className={styles.heroTitle}>
              <span className={styles.gradientText}>Plan your perfect trip together</span>
            </h1>
            
            <p className={styles.heroDescription}>
              Discover breathtaking destinations, collaborate seamlessly with friends, and create unforgettable day-by-day adventures with TripSync's intelligent planning tools.
            </p>

            <div className={styles.heroActions} role="group" aria-label="Primary actions">
              <Link href="/search" className={styles.actionLink}>
                <button className={`${styles.btn} ${styles.btnPrimary}`} aria-label="Start exploring destinations">
                  <FaSearch aria-hidden="true" />
                  <span className={styles.btnText}>Start Exploring</span>
                </button>
              </Link>
              <Link href="/how-it-works" className={styles.actionLink}>
                <button className={`${styles.btn} ${styles.btnSecondary}`} aria-label="Learn how TripSync works">
                  <span className={styles.btnText}>How it Works</span>
                  <FaArrowRight aria-hidden="true" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroImage} aria-hidden="true">
            <div className={styles.imageBlob}>
              <FaMapMarkerAlt className={styles.placeholderIcon} />
            </div>
            <div className={`${styles.floatingElement} ${styles.floating1}`}>
              <FaUsers />
            </div>
            <div className={`${styles.floatingElement} ${styles.floating2}`}>
              <FaCalendarCheck />
            </div>
            <div className={`${styles.floatingElement} ${styles.floating3}`}>
              <FaSearch />
            </div>
          </div>
        </div>

        <div className={styles.scrollIndicator}>
          <FaChevronDown />
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
      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <div className={styles.testimonialsHeader}>
          <h2 className={styles.sectionTitle}>What Travelers Say</h2>
          <p className={styles.sectionSubtitle}>Join thousands of travelers who've transformed their trip planning experience</p>
        </div>
        
        <div className={styles.testimonialsGrid}>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <div className={styles.rating}>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className={styles.testimonialText}>
                "TripSync made planning our group trip to Thailand so much easier. No more endless email chains and confusion about who's doing what!"
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.avatar}></div>
                <div className={styles.authorInfo}>
                  <h4>Sarah Johnson</h4>
                  <p>Bali Adventure</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <div className={styles.rating}>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className={styles.testimonialText}>
                "The collaborative features are fantastic! We could all add our must-see places and easily create an itinerary that worked for everyone."
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.avatar}></div>
                <div className={styles.authorInfo}>
                  <h4>Michael Chen</h4>
                  <p>European Tour</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialContent}>
              <div className={styles.rating}>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className={styles.testimonialText}>
                "I've always dreaded planning trips with friends, but TripSync changed everything. It's intuitive, beautiful, and actually fun to use!"
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.avatar}></div>
                <div className={styles.authorInfo}>
                  <h4>Jessica Williams</h4>
                  <p>Japan Discovery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready for Your Next Adventure?</h2>
          <p className={styles.ctaText}>
            Join thousands of travelers who've discovered the joy of collaborative trip planning. Create your Space, invite friends, and start building memories together.
          </p>
          <div className={styles.ctaActions}>
            <Link href="/register">
              <button className={`${styles.btn} ${styles.btnPrimary}`} aria-label="Get started free">
                <FaRocket />
                Get Started Free
              </button>
            </Link>
            <Link href="/spaces/directory">
              <button className={`${styles.btn} ${styles.btnSecondary}`}>
                <FaGlobe />
                Explore Destinations
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className={styles.interactiveDemo}>
        <div className={styles.demoHeader}>
          <h2 className={styles.sectionTitle}>Experience TripSync</h2>
          <p className={styles.sectionSubtitle}>Try our interactive planner to see how easy trip planning can be</p>
        </div>
        
        <div className={styles.demoContainer}>
          <div className={styles.demoCard}>
            <h3>Create your first trip</h3>
            <p>Select a destination and dates to get started</p>
            <div className={styles.demoInputs}>
              <div className={styles.inputGroup}>
                <label>Destination</label>
                <input type="text" placeholder="Where do you want to go?" />
              </div>
              <div className={styles.inputGroup}>
                <label>Travel Dates</label>
                <input type="text" placeholder="Select dates" />
              </div>
              <div className={styles.inputGroup}>
                <label>Travelers</label>
                <input type="text" placeholder="Who's coming?" />
              </div>
            </div>
            <button className={styles.demoCta}>Create Trip</button>
          </div>
        </div>
      </section>
    </div>
  );
}