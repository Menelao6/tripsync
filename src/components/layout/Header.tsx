'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import { 
  FaCompass, 
  FaUser, 
  FaTimes, 
  FaBars, 
  FaSearch, 
  FaUsers, 
  FaCheckCircle, 
  FaCalendarAlt,
  FaBell,
  FaHome,
  FaQuestionCircle,
  FaFolderOpen,
  FaSignInAlt,
  FaRocket
} from 'react-icons/fa';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchCurrentY = useRef(0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Handle scroll events to detect if page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

   useEffect(() => {
    if (!isMenuOpen && menuRef.current) menuRef.current.style.transform = '';
  }, [isMenuOpen]);

  // Demo login/logout function
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    setIsMenuOpen(false);
  };

  // Swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMenuOpen) return;
    
    touchCurrentY.current = e.touches[0].clientY;
    const diff = touchCurrentY.current - touchStartY.current;
    
    // If swiping down, move the menu accordingly
    if (diff > 0 && menuRef.current) {
      menuRef.current.style.transform = `translateY(${diff}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!isMenuOpen) return;
    
    const diff = touchCurrentY.current - touchStartY.current;
    
    // If swiped down significantly, close the menu
    if (diff > 100) {
      setIsMenuOpen(false);
    }
    
    // Reset menu position
    if (menuRef.current) {
      menuRef.current.style.transform = 'translateY(0)';
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={`${styles.logo} ${isMenuOpen ? styles.hidden : ''}`}>
          <FaCompass />
          <span>TripSync</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          {isLoggedIn ? (
            // Logged in navigation
            <>
              <Link href="/explore" className={pathname === '/explore' ? styles.active : ''}>
                <FaSearch />
                Explore
              </Link>
              <Link href="/spaces" className={pathname === '/spaces' ? styles.active : ''}>
                <FaUsers />
                My Spaces
              </Link>
              <Link href="/approvals" className={pathname === '/approvals' ? styles.active : ''}>
                <FaCheckCircle />
                Approvals
              </Link>
              <Link href="/itinerary" className={pathname === '/itinerary' ? styles.active : ''}>
                <FaCalendarAlt />
                Itinerary
              </Link>
            </>
          ) : (
            // Logged out navigation
            <>
              <Link href="/" className={pathname === '/' ? styles.active : ''}>
                Home
              </Link>
              <Link href="/explore" className={pathname === '/explore' ? styles.active : ''}>
                Explore
              </Link>
              <Link href="/how-it-works" className={pathname === '/how-it-works' ? styles.active : ''}>
                How It Works
              </Link>
              <Link href="/directory" className={pathname === '/directory' ? styles.active : ''}>
                Spaces Directory
              </Link>
            </>
          )}
        </nav>
        
        {/* Desktop Actions */}
        <div className={styles.actions}>
          {isLoggedIn ? (
            // Logged in actions
            <>
              <Link href="/notifications" className={styles.notificationIcon}>
                <FaBell />
                <span className={styles.notificationBadge}>3</span>
              </Link>
              <Link href="/profile" className={styles.profileLink}>
                <div className={styles.avatar}>
                  <FaUser />
                </div>
              </Link>
              <Button variant="secondary" size="small" onClick={toggleLogin}>
                Log Out
              </Button>
            </>
          ) : (
            // Logged out actions
            <>
              <Button variant="secondary" size="small" onClick={toggleLogin}>
                Sign In
              </Button>
              <Button variant="primary" size="small" onClick={toggleLogin}>
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button - Hidden when menu is open */}
        <button 
          className={`${styles.menuToggle} ${isMenuOpen ? styles.hidden : ''}`}
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <FaBars />
        </button>

        {/* Mobile Menu Overlay with iPhone-like effect */}
        <div 
          className={`${styles.mobileOverlay} ${isMenuOpen ? styles.open : ''}`} 
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Mobile Menu with swipe support */}
        {mounted && createPortal(
          <div 
          ref={menuRef}
          className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className={styles.menuHeader}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <span className={styles.menuTitle}>Menu</span>
            <button 
              className={styles.closeButton}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>
          
          <nav className={styles.mobileNav}>
            {isLoggedIn ? (
              // Logged in mobile navigation
              <>
                <div className={styles.menuSection}>
                  <span className={styles.sectionLabel}>Navigation</span>
                  <Link href="/explore" className={`${styles.menuItem} ${pathname === '/explore' ? styles.active : ''}`}>
                    <div className={styles.menuIcon}>
                      <FaSearch />
                    </div>
                    <div className={styles.menuContent}>
                      <span className={styles.menuText}>Explore</span>
                      <span className={styles.menuDescription}>Discover new places</span>
                    </div>
                  </Link>
                  <Link href="/spaces" className={`${styles.menuItem} ${pathname === '/spaces' ? styles.active : ''}`}>
                    <div className={styles.menuIcon}>
                      <FaUsers />
                    </div>
                    <div className={styles.menuContent}>
                      <span className={styles.menuText}>My Spaces</span>
                      <span className={styles.menuDescription}>Your trip groups</span>
                    </div>
                  </Link>
                  <Link href="/approvals" className={`${styles.menuItem} ${pathname === '/approvals' ? styles.active : ''}`}>
                    <div className={styles.menuIcon}>
                      <FaCheckCircle />
                    </div>
                    <div className={styles.menuContent}>
                      <span className={styles.menuText}>Approvals</span>
                      <span className={styles.menuDescription}>3 pending requests</span>
                    </div>
                  </Link>
                  <Link href="/itinerary" className={`${styles.menuItem} ${pathname === '/itinerary' ? styles.active : ''}`}>
                    <div className={styles.menuIcon}>
                      <FaCalendarAlt />
                    </div>
                    <div className={styles.menuContent}>
                      <span className={styles.menuText}>Itinerary</span>
                      <span className={styles.menuDescription}>Your travel plans</span>
                    </div>
                  </Link>
                </div>
                
                <div className={styles.menuSection}>
                  <span className={styles.sectionLabel}>Account</span>
                  <Link href="/notifications" className={`${styles.menuItem} ${pathname === '/notifications' ? styles.active : ''}`}>
                    <div className={styles.menuIcon}>
                      <FaBell />
                    </div>
                    <div className={styles.menuContent}>
                      <span className={styles.menuText}>Notifications</span>
                      <span className={styles.menuDescription}>3 unread</span>
                    </div>
                    <span className={styles.notificationIndicator}>3</span>
                  </Link>
                  <Link href="/profile" className={`${styles.menuItem} ${pathname === '/profile' ? styles.active : ''}`}>
                    <div className={styles.menuIcon}>
                      <FaUser />
                    </div>
                    <div className={styles.menuContent}>
                      <span className={styles.menuText}>Profile</span>
                      <span className={styles.menuDescription}>Account settings</span>
                    </div>
                  </Link>
                </div>
                
                <div className={styles.menuActions}>
                  <Button variant="secondary" size="large" onClick={toggleLogin}>
                    Log Out
                  </Button>
                </div>
              </>
            ) : (
              // Logged out mobile navigation
              <>
                <div className={styles.menuSection}>
                  <span className={styles.sectionLabel}>Navigation</span>
                  <Link href="/" className={`${styles.menuItem} ${pathname === '/' ? styles.active : ''}`}>
                    <div className={styles.menuIcon}>
                      <FaHome />
                    </div>
                    <div className={styles.menuContent}>
                      <span className={styles.menuText}>Home</span>
                      <span className={styles.menuDescription}>Welcome to TripSync</span>
                    </div>
                  </Link>
                  <Link href="/explore" className={`${styles.menuItem} ${pathname === '/explore' ? styles.active : ''}`}>
                    <div className={styles.menuIcon}>
                      <FaSearch />
                    </div>
                    <div className={styles.menuContent}>
                      <span className={styles.menuText}>Explore</span>
                      <span className={styles.menuDescription}>Discover new places</span>
                    </div>
                  </Link>
                  <Link href="/how-it-works" className={`${styles.menuItem} ${pathname === '/how-it-works' ? styles.active : ''}`}>
                    <div className={styles.menuIcon}>
                      <FaQuestionCircle />
                    </div>
                    <div className={styles.menuContent}>
                      <span className={styles.menuText}>How It Works</span>
                      <span className={styles.menuDescription}>Learn about TripSync</span>
                    </div>
                  </Link>
                  <Link href="/directory" className={`${styles.menuItem} ${pathname === '/directory' ? styles.active : ''}`}>
                    <div className={styles.menuIcon}>
                      <FaFolderOpen />
                    </div>
                    <div className={styles.menuContent}>
                      <span className={styles.menuText}>Spaces Directory</span>
                      <span className={styles.menuDescription}>Browse public trips</span>
                    </div>
                  </Link>
                </div>
                
                <div className={styles.menuActions}>
                  <Button variant="secondary" size="large" onClick={toggleLogin}>
                    <FaSignInAlt />
                    Sign In
                  </Button>
                  <Button variant="primary" size="large" onClick={toggleLogin}>
                    <FaRocket />
                    Get Started
                  </Button>
                </div>
              </>
            )}
          </nav>
        </div>, document.body)}
      </div>
    </header>
  );
};

export default Header;