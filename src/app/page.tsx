'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/* ─────────────────────────── COLORS ─────────────────────────── */
const COLORS = {
  primary: '#0078D4',
  primaryDark: '#005A9E',
  primaryLight: '#00B4D8',
  navy: '#1B2838',
  navyLight: '#243447',
  white: '#FFFFFF',
  offWhite: '#F0F8FF',
  textDark: '#1A1A2E',
  textMedium: '#4A5568',
  textLight: '#718096',
  border: '#E2E8F0',
};

/* ─────────────────────────── IMAGES ─────────────────────────── */
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
  building: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
  lobby: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
  interior1: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  interior2: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  bedroom: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
  living: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  pool: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80',
  fitness: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
  garden: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
  cityscape: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80',
};

/* ─────────────────────────── DATA ─────────────────────────── */
const TOWER_FEATURES = [
  {
    icon: '🏠',
    title: 'Smart Home System',
    description: 'Integrated IoT ecosystem with voice control, automated climate, lighting, and security — all manageable from your smartphone.',
  },
  {
    icon: '🌿',
    title: 'Green Building',
    description: 'LEED Gold certified with solar panels, rainwater harvesting, and energy-efficient systems for sustainable luxury living.',
  },
  {
    icon: '🌇',
    title: 'Panoramic Views',
    description: 'Floor-to-ceiling windows on every floor offer breathtaking 270-degree views of the Jakarta skyline and beyond.',
  },
  {
    icon: '🔒',
    title: '24/7 Security',
    description: 'Multi-layered security with biometric access, CCTV monitoring, and dedicated security personnel around the clock.',
  },
  {
    icon: '⚡',
    title: 'High-Speed Connectivity',
    description: 'Fiber optic internet up to 1 Gbps, 5G-ready infrastructure, and smart building network throughout every unit.',
  },
  {
    icon: '🏗️',
    title: 'Premium Construction',
    description: 'Earthquake-resistant structure with premium imported materials, double-glazed windows, and superior acoustic insulation.',
  },
];

const UNIT_TYPES = [
  {
    name: 'Studio',
    size: '35 - 45 sqm',
    price: 'From IDR 1.2B',
    beds: 'Studio',
    bath: '1 Bathroom',
    features: ['Smart home ready', 'Built-in wardrobe', 'Kitchenette', 'City view'],
    image: IMAGES.living,
  },
  {
    name: '1 Bedroom',
    size: '55 - 70 sqm',
    price: 'From IDR 2.5B',
    beds: '1 Bedroom',
    bath: '1 Bathroom',
    features: ['Separate living area', 'Walk-in closet', 'Full kitchen', 'Balcony'],
    image: IMAGES.interior2,
  },
  {
    name: '2 Bedroom',
    size: '85 - 120 sqm',
    price: 'From IDR 4.8B',
    beds: '2 Bedrooms',
    bath: '2 Bathrooms',
    features: ['Master suite', 'Family room', 'Service area', 'Double balcony'],
    image: IMAGES.bedroom,
  },
  {
    name: 'Penthouse',
    size: '200 - 400 sqm',
    price: 'From IDR 15B',
    beds: '3-4 Bedrooms',
    bath: '3-4 Bathrooms',
    features: ['Private elevator', 'Rooftop terrace', 'Wine cellar', 'Panoramic views'],
    image: IMAGES.interior1,
  },
];

const AMENITIES = [
  { icon: '🏊', name: 'Infinity Rooftop Pool', description: 'Sky-high pool with panoramic city views' },
  { icon: '💪', name: 'Fitness Center', description: 'State-of-the-art gym with personal trainers' },
  { icon: '💻', name: 'Co-Working Space', description: 'Modern workspace with meeting rooms' },
  { icon: '🌳', name: 'Sky Garden', description: 'Elevated garden oasis for relaxation' },
  { icon: '🧖', name: 'Spa & Wellness', description: 'Full-service spa with sauna and steam room' },
  { icon: '👶', name: 'Kids Playground', description: 'Safe indoor and outdoor play areas' },
  { icon: '🍽️', name: 'Resident Lounge', description: 'Private dining and entertainment space' },
  { icon: '🚗', name: 'Smart Parking', description: 'Automated multi-level parking system' },
];

const LOCATION_HIGHLIGHTS = [
  { label: 'CBD Jakarta', time: '5 min' },
  { label: 'Soekarno-Hatta Airport', time: '35 min' },
  { label: 'Premium Shopping Mall', time: '3 min' },
  { label: 'International School', time: '10 min' },
  { label: 'Hospital', time: '8 min' },
  { label: 'MRT Station', time: '2 min' },
];

/* ─────────────────────────── SCROLL HOOK ─────────────────────────── */
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const current = ref.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return { ref, isVisible };
}

/* ─────────────────────────── NAVIGATION ─────────────────────────── */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const navItems = ['about', 'features', 'units', 'amenities', 'location', 'contact'];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.98)' : 'transparent',
        borderBottom: scrolled ? `1px solid ${COLORS.border}` : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 72,
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: '0.15em',
            color: scrolled ? COLORS.navy : COLORS.white,
            textDecoration: 'none',
            transition: 'color 0.4s ease',
          }}
        >
          AZURE<span style={{ color: COLORS.primary, fontWeight: 700 }}>.</span>
        </a>

        {/* Desktop Links */}
        <div
          style={{
            display: 'flex',
            gap: 32,
            alignItems: 'center',
          }}
          className="nav-links-desktop"
        >
          {navItems.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '0.05em',
                color: scrolled ? COLORS.textMedium : 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                textTransform: 'capitalize',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? COLORS.textMedium : 'rgba(255,255,255,0.85)')}
            >
              {id}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.05em',
              color: COLORS.white,
              background: COLORS.primary,
              textDecoration: 'none',
              padding: '10px 24px',
              borderRadius: 6,
              transition: 'background 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.primaryDark)}
            onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.primary)}
          >
            Book Visit
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
          }}
        >
          <div style={{ width: 24, position: 'relative', height: 18 }}>
            <span
              style={{
                display: 'block',
                width: 24,
                height: 2,
                background: scrolled ? COLORS.navy : COLORS.white,
                position: 'absolute',
                top: menuOpen ? 8 : 0,
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(45deg)' : 'none',
                borderRadius: 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: 24,
                height: 2,
                background: scrolled ? COLORS.navy : COLORS.white,
                position: 'absolute',
                top: 8,
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 0.3s ease',
                borderRadius: 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: 24,
                height: 2,
                background: scrolled ? COLORS.navy : COLORS.white,
                position: 'absolute',
                top: menuOpen ? 8 : 16,
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(-45deg)' : 'none',
                borderRadius: 1,
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="nav-mobile-menu"
          style={{
            background: 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(12px)',
            borderTop: `1px solid ${COLORS.border}`,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {navItems.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 500,
                color: COLORS.textDark,
                textDecoration: 'none',
                textTransform: 'capitalize',
                padding: '8px 0',
              }}
            >
              {id}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.white,
              background: COLORS.primary,
              textDecoration: 'none',
              padding: '12px 24px',
              borderRadius: 6,
              textAlign: 'center',
              marginTop: 8,
            }}
          >
            Book a Visit
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────── SECTION HEADER ─────────────────────────── */
function SectionHeader({
  label,
  title,
  subtitle,
  light = false,
  center = true,
}: {
  label: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 64 }}>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.15em',
          color: light ? COLORS.primaryLight : COLORS.primary,
          textTransform: 'uppercase',
          marginBottom: 16,
        }}
      >
        {label}
      </p>
      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 600,
          color: light ? COLORS.white : COLORS.textDark,
          lineHeight: 1.2,
          marginBottom: subtitle ? 20 : 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            fontWeight: 400,
            color: light ? 'rgba(255,255,255,0.7)' : COLORS.textLight,
            lineHeight: 1.7,
            maxWidth: 640,
            margin: center ? '0 auto' : undefined,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────── HERO SECTION ─────────────────────────── */
function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src={IMAGES.hero}
          alt="Azure Tower modern skyscraper"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {/* Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,120,212,0.85) 0%, rgba(27,40,56,0.92) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px',
          width: '100%',
          textAlign: 'center',
          paddingTop: 72,
        }}
        className="hero-content"
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: '0.25em',
            color: COLORS.primaryLight,
            textTransform: 'uppercase',
            marginBottom: 24,
            opacity: 1,
            animation: 'fadeInUp 0.8s ease forwards',
          }}
        >
          Luxury High-Rise Living in Jakarta
        </p>

        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 700,
            color: COLORS.white,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 24,
            opacity: 1,
            animation: 'fadeInUp 0.8s ease 0.15s both',
          }}
        >
          AZURE TOWER
        </h1>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(16px, 1.5vw, 22px)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.6,
            maxWidth: 600,
            margin: '0 auto',
            marginBottom: 48,
            opacity: 1,
            animation: 'fadeInUp 0.8s ease 0.3s both',
          }}
        >
          Where modern architecture meets sky-blue elegance.
          <br />
          A new landmark of refined urban living.
        </p>

        <div
          style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            flexWrap: 'wrap',
            opacity: 1,
            animation: 'fadeInUp 0.8s ease 0.45s both',
          }}
        >
          <a
            href="#units"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              color: COLORS.white,
              background: COLORS.primary,
              padding: '16px 36px',
              borderRadius: 8,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              border: `2px solid ${COLORS.primary}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = COLORS.primaryDark;
              e.currentTarget.style.borderColor = COLORS.primaryDark;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = COLORS.primary;
              e.currentTarget.style.borderColor = COLORS.primary;
            }}
          >
            Explore Units
          </a>
          <a
            href="#contact"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              color: COLORS.white,
              background: 'transparent',
              padding: '16px 36px',
              borderRadius: 8,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              border: '2px solid rgba(255,255,255,0.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
            }}
          >
            Schedule a Visit
          </a>
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 48,
            marginTop: 80,
            flexWrap: 'wrap',
            opacity: 1,
            animation: 'fadeInUp 0.8s ease 0.6s both',
          }}
          className="hero-stats"
        >
          {[
            { value: '45', label: 'Floors' },
            { value: '320+', label: 'Units' },
            { value: '2026', label: 'Completion' },
            { value: 'LEED', label: 'Gold Certified' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  fontWeight: 700,
                  color: COLORS.white,
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.6)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── ABOUT SECTION ─────────────────────────── */
function AboutSection() {
  const anim = useScrollAnimation();

  return (
    <section
      id="about"
      style={{
        background: COLORS.white,
        padding: '80px 0',
      }}
      className="section-padding"
    >
      <div
        ref={anim.ref}
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          gap: 64,
          alignItems: 'center',
          opacity: anim.isVisible ? 1 : 0,
          transform: anim.isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
        className="about-inner"
      >
        {/* Left: Image */}
        <div style={{ flex: '1 1 45%' }} className="about-image">
          <div style={{ position: 'relative' }}>
            <img
              src={IMAGES.building}
              alt="Azure Tower architecture"
              style={{
                width: '100%',
                height: 520,
                objectFit: 'cover',
                display: 'block',
                borderRadius: 12,
              }}
            />
            {/* Accent bar */}
            <div
              style={{
                position: 'absolute',
                bottom: -16,
                left: 32,
                right: 32,
                height: 4,
                background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
                borderRadius: 2,
              }}
            />
          </div>
        </div>

        {/* Right: Text */}
        <div
          style={{
            flex: '1 1 55%',
          }}
          className="about-text"
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.15em',
              color: COLORS.primary,
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            About Azure Tower
          </p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 600,
              color: COLORS.textDark,
              lineHeight: 1.2,
              marginBottom: 24,
            }}
          >
            A Vision of Modern
            <br />
            Architectural Excellence
          </h2>
          <div
            style={{
              width: 60,
              height: 3,
              background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
              borderRadius: 2,
              marginBottom: 28,
            }}
          />
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              fontWeight: 400,
              color: COLORS.textMedium,
              lineHeight: 1.8,
              marginBottom: 20,
            }}
          >
            Azure Tower rises 45 stories above the Jakarta skyline, a testament to the
            belief that exceptional design elevates every aspect of daily life. Conceived
            by internationally acclaimed architects, every line and surface has been
            crafted with precision and purpose.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              fontWeight: 400,
              color: COLORS.textMedium,
              lineHeight: 1.8,
              marginBottom: 32,
            }}
          >
            The tower&apos;s distinctive glass facade reflects the sky in ever-changing shades
            of azure, creating a living canvas that evolves with the light. Inside,
            thoughtfully designed residences blend contemporary aesthetics with
            intuitive technology for a truly modern lifestyle.
          </p>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { value: '45', label: 'Storeys' },
              { value: '320+', label: 'Premium Units' },
              { value: '8', label: 'Amenity Floors' },
            ].map((item) => (
              <div key={item.label}>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 32,
                    fontWeight: 700,
                    color: COLORS.primary,
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {item.value}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    color: COLORS.textLight,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FEATURES SECTION ─────────────────────────── */
function FeaturesSection() {
  const anim = useScrollAnimation();

  return (
    <section
      id="features"
      style={{
        background: COLORS.offWhite,
        padding: '80px 0',
      }}
      className="section-padding"
    >
      <div
        ref={anim.ref}
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px',
          opacity: anim.isVisible ? 1 : 0,
          transform: anim.isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <SectionHeader
          label="Tower Features"
          title="Built for the Future"
          subtitle="Azure Tower integrates cutting-edge technology with sustainable design, delivering an unparalleled living experience."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 28,
          }}
          className="features-grid"
        >
          {TOWER_FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              style={{
                background: COLORS.white,
                borderRadius: 12,
                padding: 32,
                borderTop: `3px solid ${COLORS.primary}`,
                boxShadow: '0 2px 16px rgba(0,120,212,0.06)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                opacity: anim.isVisible ? 1 : 0,
                transform: anim.isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 0.08}s`,
              }}
              className="feature-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,120,212,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,120,212,0.06)';
              }}
            >
              <span style={{ fontSize: 36, display: 'block', marginBottom: 16 }}>{feature.icon}</span>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 20,
                  fontWeight: 600,
                  color: COLORS.textDark,
                  marginBottom: 12,
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 400,
                  color: COLORS.textLight,
                  lineHeight: 1.7,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── UNITS SECTION ─────────────────────────── */
function UnitsSection() {
  const anim = useScrollAnimation();

  return (
    <section
      id="units"
      style={{
        background: COLORS.white,
        padding: '80px 0',
      }}
      className="section-padding"
    >
      <div
        ref={anim.ref}
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px',
          opacity: anim.isVisible ? 1 : 0,
          transform: anim.isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <SectionHeader
          label="Residences"
          title="Find Your Perfect Space"
          subtitle="From efficient studios to expansive penthouses, every unit is designed with meticulous attention to detail and bathed in natural light."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
          }}
          className="units-grid"
        >
          {UNIT_TYPES.map((unit, i) => (
            <div
              key={unit.name}
              style={{
                background: COLORS.white,
                borderRadius: 12,
                overflow: 'hidden',
                border: `1px solid ${COLORS.border}`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                opacity: anim.isVisible ? 1 : 0,
                transform: anim.isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 0.1}s`,
              }}
              className="unit-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,120,212,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={unit.image}
                  alt={`Azure Tower ${unit.name}`}
                  style={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    background: COLORS.primary,
                    color: COLORS.white,
                    padding: '6px 14px',
                    borderRadius: 20,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {unit.price}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: 24 }}>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 22,
                    fontWeight: 600,
                    color: COLORS.textDark,
                    marginBottom: 8,
                  }}
                >
                  {unit.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: COLORS.textLight,
                    marginBottom: 4,
                  }}
                >
                  {unit.size} &middot; {unit.beds}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: COLORS.textLight,
                    marginBottom: 16,
                  }}
                >
                  {unit.bath}
                </p>

                {/* Features */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {unit.features.map((feat) => (
                    <li
                      key={feat}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        color: COLORS.textMedium,
                        padding: '6px 0',
                        borderBottom: `1px solid ${COLORS.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <span style={{ color: COLORS.primary, fontSize: 14 }}>&#10003;</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    color: COLORS.primary,
                    border: `2px solid ${COLORS.primary}`,
                    padding: '12px 0',
                    borderRadius: 8,
                    textDecoration: 'none',
                    marginTop: 20,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = COLORS.primary;
                    e.currentTarget.style.color = COLORS.white;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = COLORS.primary;
                  }}
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── AMENITIES SECTION (DARK) ─────────────────── */
function AmenitiesSection() {
  const anim = useScrollAnimation();

  return (
    <section
      id="amenities"
      style={{
        background: COLORS.navy,
        padding: '80px 0',
        position: 'relative',
      }}
      className="section-padding"
    >
      <div
        ref={anim.ref}
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px',
          opacity: anim.isVisible ? 1 : 0,
          transform: anim.isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <SectionHeader
          label="Amenities"
          title="World-Class Lifestyle Facilities"
          subtitle="Every floor offers a curated experience designed around comfort, wellness, and community."
          light
        />

        {/* Amenities Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
            marginBottom: 64,
          }}
          className="amenities-grid"
        >
          {AMENITIES.map((amenity, i) => (
            <div
              key={amenity.name}
              style={{
                background: COLORS.navyLight,
                borderRadius: 12,
                padding: 28,
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.3s ease',
                opacity: anim.isVisible ? 1 : 0,
                transform: anim.isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 0.06}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,120,212,0.4)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: 32, display: 'block', marginBottom: 16 }}>{amenity.icon}</span>
              <h4
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 17,
                  fontWeight: 600,
                  color: COLORS.white,
                  marginBottom: 8,
                }}
              >
                {amenity.name}
              </h4>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.6,
                }}
              >
                {amenity.description}
              </p>
            </div>
          ))}
        </div>

        {/* Pool Image Banner */}
        <div style={{ borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
          <img
            src={IMAGES.pool}
            alt="Azure Tower infinity rooftop pool"
            style={{
              width: '100%',
              height: 'clamp(250px, 35vw, 450px)',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 40%, rgba(27,40,56,0.8) 100%)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: 40,
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  fontWeight: 600,
                  color: COLORS.white,
                  marginBottom: 8,
                }}
              >
                Infinity Rooftop Pool
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                Swim above the clouds with breathtaking 360-degree city views.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── LOCATION SECTION ─────────────────────────── */
function LocationSection() {
  const anim = useScrollAnimation();

  return (
    <section
      id="location"
      style={{
        background: COLORS.offWhite,
        padding: '80px 0',
      }}
      className="section-padding"
    >
      <div
        ref={anim.ref}
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px',
          opacity: anim.isVisible ? 1 : 0,
          transform: anim.isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <SectionHeader
          label="Location"
          title="Perfectly Connected"
          subtitle="Situated in the heart of Jakarta's most prestigious district, Azure Tower places you at the center of everything."
        />

        <div
          style={{
            display: 'flex',
            gap: 48,
            alignItems: 'stretch',
          }}
          className="location-inner"
        >
          {/* Map / Image */}
          <div style={{ flex: '1 1 55%' }} className="location-image">
            <div style={{ borderRadius: 12, overflow: 'hidden', height: '100%', minHeight: 400 }}>
              <img
                src={IMAGES.cityscape}
                alt="Jakarta city skyline near Azure Tower"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* Connectivity */}
          <div
            style={{
              flex: '1 1 45%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            className="location-details"
          >
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 24,
                fontWeight: 600,
                color: COLORS.textDark,
                marginBottom: 8,
              }}
            >
              Prime CBD Location
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: COLORS.textLight,
                lineHeight: 1.7,
                marginBottom: 32,
              }}
            >
              Direct access to Jakarta&apos;s business hub, premium dining, world-class
              shopping, and excellent transport links.
            </p>

            {/* Distance items */}
            {LOCATION_HIGHLIGHTS.map((loc) => (
              <div
                key={loc.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 0',
                  borderBottom: `1px solid ${COLORS.border}`,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 15,
                    fontWeight: 500,
                    color: COLORS.textDark,
                  }}
                >
                  {loc.label}
                </span>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    color: COLORS.primary,
                    background: `${COLORS.primary}10`,
                    padding: '6px 16px',
                    borderRadius: 20,
                  }}
                >
                  {loc.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── CONTACT / CTA SECTION ─────────────────────────── */
function ContactSection() {
  const anim = useScrollAnimation();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', unit: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', unit: '' });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    fontFamily: "'Inter', sans-serif",
    fontSize: 15,
    fontWeight: 400,
    color: COLORS.textDark,
    background: COLORS.white,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  return (
    <section
      id="contact"
      style={{
        background: COLORS.white,
        padding: '80px 0',
      }}
      className="section-padding"
    >
      <div
        ref={anim.ref}
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px',
          opacity: anim.isVisible ? 1 : 0,
          transform: anim.isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 64,
            alignItems: 'center',
          }}
          className="contact-inner"
        >
          {/* Left: CTA Copy */}
          <div style={{ flex: '1 1 50%' }} className="contact-text">
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: COLORS.primary,
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              Get in Touch
            </p>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 600,
                color: COLORS.textDark,
                lineHeight: 1.2,
                marginBottom: 24,
              }}
            >
              Begin Your Life
              <br />
              Above the Clouds
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 16,
                fontWeight: 400,
                color: COLORS.textMedium,
                lineHeight: 1.8,
                marginBottom: 32,
              }}
            >
              Schedule a private viewing of our show units or speak with our
              residential consultants to find the perfect home at Azure Tower.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Sales Gallery', value: 'SCBD Lot 18, Jakarta Selatan' },
                { label: 'Phone', value: '+62 21 5088 8800' },
                { label: 'Email', value: 'living@azuretower.id' },
                { label: 'Hours', value: 'Mon - Sun, 09:00 - 18:00' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: 16 }}>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: 600,
                      color: COLORS.textDark,
                      minWidth: 100,
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      color: COLORS.textLight,
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div
            style={{
              flex: '1 1 50%',
              background: COLORS.offWhite,
              borderRadius: 16,
              padding: 40,
              border: `1px solid ${COLORS.border}`,
            }}
            className="contact-form"
          >
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 24,
                fontWeight: 600,
                color: COLORS.textDark,
                marginBottom: 8,
              }}
            >
              Schedule a Visit
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: COLORS.textLight,
                marginBottom: 28,
              }}
            >
              Fill in your details and our team will contact you shortly.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input
                type="text"
                placeholder="Full Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.primary)}
                onBlur={(e) => (e.currentTarget.style.borderColor = COLORS.border)}
              />
              <input
                type="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.primary)}
                onBlur={(e) => (e.currentTarget.style.borderColor = COLORS.border)}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.primary)}
                onBlur={(e) => (e.currentTarget.style.borderColor = COLORS.border)}
              />
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                style={{
                  ...inputStyle,
                  color: formData.unit ? COLORS.textDark : COLORS.textLight,
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23718096' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                  paddingRight: 40,
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.primary)}
                onBlur={(e) => (e.currentTarget.style.borderColor = COLORS.border)}
              >
                <option value="">Interested Unit Type</option>
                <option value="studio">Studio</option>
                <option value="1br">1 Bedroom</option>
                <option value="2br">2 Bedroom</option>
                <option value="penthouse">Penthouse</option>
              </select>

              <button
                type="submit"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color: COLORS.white,
                  background: COLORS.primary,
                  border: 'none',
                  padding: '16px 0',
                  borderRadius: 8,
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                  marginTop: 8,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.primaryDark)}
                onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.primary)}
              >
                Submit Inquiry
              </button>

              {submitted && (
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#10B981',
                    textAlign: 'center',
                    marginTop: 8,
                  }}
                >
                  Thank you! Our team will contact you within 24 hours.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FOOTER ─────────────────────────── */
function Footer() {
  return (
    <footer
      style={{
        background: COLORS.navy,
        padding: '60px 24px 32px',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        {/* Top */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 48,
            flexWrap: 'wrap',
            gap: 32,
          }}
          className="footer-top"
        >
          <div>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: COLORS.white,
                marginBottom: 8,
              }}
            >
              AZURE<span style={{ color: COLORS.primary }}>.</span>
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: 'rgba(255,255,255,0.5)',
                maxWidth: 280,
                lineHeight: 1.6,
              }}
            >
              Luxury high-rise living in the heart of Jakarta.
              Where the sky meets your home.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }} className="footer-links">
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.white, marginBottom: 16, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Explore
              </p>
              {['About', 'Features', 'Units', 'Amenities'].map((item) => (
                <p key={item} style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 10, cursor: 'pointer' }}>
                  {item}
                </p>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.white, marginBottom: 16, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Contact
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>+62 21 5088 8800</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>living@azuretower.id</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>SCBD Lot 18, Jakarta</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 24 }} />

        {/* Bottom */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            &copy; 2026 Azure Tower Jakarta. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            Made with &hearts; by{' '}
            <a
              href="https://creativism.id"
              style={{
                color: COLORS.primary,
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.primaryLight)}
              onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.primary)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Creativism
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────── RESPONSIVE STYLES ─────────────────────────── */
function ResponsiveStyles() {
  return (
    <style>{`
      /* Section padding responsive */
      .section-padding {
        padding-top: 80px !important;
        padding-bottom: 80px !important;
      }
      @media (min-width: 1024px) {
        .section-padding {
          padding-top: 128px !important;
          padding-bottom: 128px !important;
        }
      }

      /* Navigation */
      @media (max-width: 768px) {
        .nav-links-desktop { display: none !important; }
        .nav-hamburger { display: block !important; }
      }

      /* Hero stats */
      @media (max-width: 600px) {
        .hero-stats {
          gap: 24px !important;
        }
      }

      /* About */
      @media (max-width: 900px) {
        .about-inner {
          flex-direction: column !important;
          gap: 40px !important;
        }
        .about-image img {
          height: 350px !important;
        }
      }

      /* Features grid */
      @media (max-width: 900px) {
        .features-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
      }
      @media (max-width: 600px) {
        .features-grid {
          grid-template-columns: 1fr !important;
        }
      }

      /* Units grid */
      @media (max-width: 1024px) {
        .units-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
      }
      @media (max-width: 600px) {
        .units-grid {
          grid-template-columns: 1fr !important;
        }
      }

      /* Amenities grid */
      @media (max-width: 900px) {
        .amenities-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
      }
      @media (max-width: 600px) {
        .amenities-grid {
          grid-template-columns: 1fr !important;
        }
      }

      /* Location */
      @media (max-width: 900px) {
        .location-inner {
          flex-direction: column !important;
          gap: 32px !important;
        }
        .location-image > div {
          min-height: 280px !important;
        }
      }

      /* Contact */
      @media (max-width: 900px) {
        .contact-inner {
          flex-direction: column !important;
          gap: 40px !important;
        }
      }

      /* Footer */
      @media (max-width: 600px) {
        .footer-top {
          flex-direction: column !important;
        }
        .footer-links {
          flex-direction: column !important;
          gap: 32px !important;
        }
      }
    `}</style>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function Home() {
  return (
    <>
      <ResponsiveStyles />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <UnitsSection />
      <AmenitiesSection />
      <LocationSection />
      <ContactSection />
      <Footer />
    </>
  );
}
