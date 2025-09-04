import Link from 'next/link';
import { FaCompass, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.mainSection}>
          {/* Brand block */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo} aria-label="TripSync home">
              <FaCompass aria-hidden="true" />
              <span>TripSync</span>
            </Link>
            <p className={styles.tagline}>
              Plan trips with friends, effortlessly.
            </p>

            <div className={styles.socials} role="group" aria-label="Social links">
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter aria-hidden="true" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram aria-hidden="true" />
              </Link>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Link columns */}
          <nav className={styles.links} aria-label="Footer">
            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>Product</h4>
              <Link href="/features">Features</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/spaces/directory">Spaces Directory</Link>
              <Link href="/how-it-works">How it works</Link>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>Company</h4>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/changelog">Changelog</Link>
              <Link href="/status">Status</Link>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>Support</h4>
              <Link href="/help">Help Center</Link>
              <Link href="/contact">Contact Support</Link>
              <Link href="/guides">Guides</Link>
              <Link href="/community">Community</Link>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.groupTitle}>Legal</h4>
              <Link href="/legal/terms">Terms</Link>
              <Link href="/legal/privacy">Privacy</Link>
              <Link href="/legal/cookies">Cookies</Link>
              <Link href="/legal/licenses">Licenses</Link>
            </div>
          </nav>
        </div>

        <div className={styles.bottomSection}>
          <p>© {year} TripSync. All rights reserved.</p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
