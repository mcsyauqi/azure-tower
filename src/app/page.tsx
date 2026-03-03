'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/* ─────────────────────────── IMAGES ─────────────────────────── */
const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
  interior1: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  interior2: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  interior3: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  bedroom: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
  living: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  pool: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80',
  building: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
  lobby: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
  architecture: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80',
};

/* ─────────────────────────── RESIDENCES DATA ─────────────────── */
const RESIDENCES = [
  {
    name: 'The Monolith',
    type: 'Penthouse',
    size: '400 sqm',
    beds: '4 Bedrooms',
    price: 'From IDR 45B',
    description:
      'A singular vision of absolute luxury. Floor-to-ceiling windows frame an unbroken panorama of Jakarta, while bespoke finishes in natural stone and blackened steel create an atmosphere of quiet grandeur.',
    image: IMAGES.interior1,
  },
  {
    name: 'The Canvas',
    type: 'Premium Residence',
    size: '200 sqm',
    beds: '3 Bedrooms',
    price: 'From IDR 18B',
    description:
      'Designed as a blank canvas for refined living. Open-plan spaces flow seamlessly from private quarters to social areas, with curated material palettes that speak to understated elegance.',
    image: IMAGES.interior2,
  },
  {
    name: 'The Frame',
    type: 'Executive Suite',
    size: '120 sqm',
    beds: '2 Bedrooms',
    price: 'From IDR 9.5B',
    description:
      'Every view is framed with intention. Precisely proportioned rooms balance intimacy with openness, featuring handcrafted joinery and integrated lighting that transforms throughout the day.',
    image: IMAGES.bedroom,
  },
  {
    name: 'The Line',
    type: 'Studio',
    size: '65 sqm',
    beds: 'Studio',
    price: 'From IDR 4.8B',
    description:
      'The essence of minimalism distilled into a single, perfectly resolved space. Clean lines define zones for rest, work, and contemplation without walls or compromise.',
    image: IMAGES.living,
  },
];

/* ─────────────────────────── FEATURES DATA ─────────────────────── */
const FEATURES = [
  {
    num: '01',
    title: 'Architecture',
    description:
      'Inspired by the meditative concrete works of Tadao Ando, Azure Tower rises as a monolithic sculpture against the Jakarta skyline. Raw, board-formed concrete walls meet floor-to-ceiling glass in a dialogue between mass and transparency, earth and sky.',
  },
  {
    num: '02',
    title: 'Technology',
    description:
      'Every residence integrates a bespoke smart home ecosystem. Climate, lighting, security, and entertainment respond to your presence intuitively. Voice, touch, or app - the interface disappears, leaving only the experience.',
  },
  {
    num: '03',
    title: 'Sustainability',
    description:
      'LEED Platinum certified and engineered for net-zero operation. Solar facade panels, rainwater harvesting, grey-water recycling, and a living green core ensure that luxury and responsibility coexist without compromise.',
  },
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
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
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

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
        borderBottom: '1px solid #CCCCCC',
        backdropFilter: 'blur(10px)',
        animation: 'navSlideDown 0.6s ease forwards',
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 70,
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: '0.3em',
            color: '#111',
            textDecoration: 'none',
          }}
        >
          AZURE
        </a>

        {/* Desktop Links */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            alignItems: 'center',
          }}
          className="nav-links-desktop"
        >
          {['philosophy', 'residences', 'features', 'gallery', 'contact'].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 400,
                letterSpacing: '0.1em',
                color: '#888',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#111')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
            >
              {id}
            </a>
          ))}
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
          <div style={{ width: 24, position: 'relative', height: 16 }}>
            <span
              style={{
                display: 'block',
                width: 24,
                height: 1,
                background: '#111',
                position: 'absolute',
                top: menuOpen ? 7 : 0,
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: 24,
                height: 1,
                background: '#111',
                position: 'absolute',
                top: 7,
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 0.3s ease',
              }}
            />
            <span
              style={{
                display: 'block',
                width: 24,
                height: 1,
                background: '#111',
                position: 'absolute',
                top: menuOpen ? 7 : 14,
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(-45deg)' : 'none',
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
            borderTop: '1px solid #CCCCCC',
            padding: '30px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          {['philosophy', 'residences', 'features', 'gallery', 'contact'].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 400,
                letterSpacing: '0.1em',
                color: '#888',
                textDecoration: 'none',
                textTransform: 'uppercase',
              }}
            >
              {id}
            </a>
          ))}
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

/* ─────────────────────────── HERO SECTION ─────────────────────────── */
function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: '#fff',
        paddingTop: 70,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 40px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 60,
        }}
        className="hero-inner"
      >
        {/* Left: Typography */}
        <div style={{ flex: '1 1 50%' }} className="hero-text">
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(72px, 10vw, 140px)',
              fontWeight: 300,
              color: '#111',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              marginBottom: 16,
            }}
          >
            AZURE
          </h1>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(16px, 2vw, 24px)',
              fontWeight: 400,
              letterSpacing: '0.3em',
              color: '#888',
              marginBottom: 40,
            }}
          >
            TOWER JAKARTA
          </p>
          <div
            style={{
              width: 80,
              height: 1,
              background: '#CCC',
              marginBottom: 32,
              animation: 'expandWidth 1s ease forwards',
            }}
          />
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(14px, 1.2vw, 18px)',
              fontWeight: 300,
              color: '#888',
              lineHeight: 1.8,
              maxWidth: 400,
            }}
          >
            Redefining minimalism in luxury living
          </p>
        </div>

        {/* Right: Image */}
        <div style={{ flex: '1 1 50%', position: 'relative' }} className="hero-image-wrap">
          <img
            src={IMAGES.hero}
            alt="Azure Tower Jakarta exterior"
            className="img-mono"
            style={{
              width: '100%',
              height: '80vh',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-inner {
            flex-direction: column !important;
            text-align: center !important;
            padding-top: 40px !important;
            gap: 40px !important;
          }
          .hero-text {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-image-wrap img {
            height: 50vh !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────── PHILOSOPHY SECTION ─────────────────── */
function PhilosophySection() {
  const anim = useScrollAnimation();

  return (
    <section
      id="philosophy"
      style={{
        background: '#fff',
        padding: '120px 0',
        borderTop: '1px solid #CCCCCC',
      }}
    >
      <div
        ref={anim.ref}
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 40px',
          display: 'flex',
          gap: 80,
          alignItems: 'stretch',
          opacity: anim.isVisible ? 1 : 0.3,
          transition: 'opacity 0.8s ease',
        }}
        className="philosophy-inner"
      >
        {/* Left: Image */}
        <div
          style={{ flex: '1 1 45%', minHeight: 500 }}
          className="philosophy-image"
        >
          <img
            src={IMAGES.lobby}
            alt="Azure Tower lobby interior"
            className="img-mono"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>

        {/* Right: Text */}
        <div
          style={{
            flex: '1 1 55%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingRight: 40,
          }}
          className="philosophy-text"
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.2em',
              color: '#888',
              textTransform: 'uppercase',
              marginBottom: 40,
            }}
          >
            Our Philosophy
          </p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 300,
              color: '#111',
              lineHeight: 1.2,
              marginBottom: 40,
            }}
          >
            Less is the
            <br />
            ultimate luxury.
          </h2>
          <div
            style={{ width: 60, height: 1, background: '#CCC', marginBottom: 40 }}
          />
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              fontWeight: 300,
              color: '#888',
              lineHeight: 1.9,
              marginBottom: 24,
            }}
          >
            Azure Tower was born from a singular conviction: that true luxury is not
            about excess, but about the precise removal of everything unnecessary.
            Every surface, every proportion, every material has been considered and
            reconsidered until only the essential remains.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              fontWeight: 300,
              color: '#888',
              lineHeight: 1.9,
            }}
          >
            Drawing from the contemplative architecture of Tadao Ando and the
            spatial purity of John Pawson, we have created residences where silence
            speaks, where light becomes the primary material, and where the boundary
            between interior and sky dissolves entirely.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .philosophy-inner {
            flex-direction: column !important;
            gap: 40px !important;
          }
          .philosophy-image {
            min-height: 350px !important;
          }
          .philosophy-text {
            padding-right: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────── RESIDENCES SECTION ─────────────────── */
function ResidencesSection() {
  const anim = useScrollAnimation();

  return (
    <section
      id="residences"
      style={{
        background: '#F5F5F5',
        padding: '120px 0',
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 40px',
        }}
      >
        {/* Header */}
        <div
          ref={anim.ref}
          style={{
            marginBottom: 80,
            opacity: anim.isVisible ? 1 : 0.3,
            transition: 'opacity 0.8s ease',
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.2em',
              color: '#888',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            Residences
          </p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 300,
              color: '#111',
              lineHeight: 1.2,
            }}
          >
            Four ways to live
            <br />
            without compromise.
          </h2>
        </div>

        {/* Residence Rows */}
        {RESIDENCES.map((res, i) => (
          <ResidenceRow key={res.name} residence={res} index={i} />
        ))}
      </div>
    </section>
  );
}

function ResidenceRow({
  residence,
  index,
}: {
  residence: (typeof RESIDENCES)[number];
  index: number;
}) {
  const anim = useScrollAnimation();

  return (
    <div
      ref={anim.ref}
      style={{
        borderTop: '1px solid #CCCCCC',
        padding: '60px 0',
        display: 'flex',
        gap: 60,
        alignItems: 'center',
        opacity: anim.isVisible ? 1 : 0.3,
        transform: anim.isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`,
      }}
      className="residence-row"
    >
      {/* Image */}
      <div style={{ flex: '0 0 40%' }} className="residence-img-wrap">
        <img
          src={residence.image}
          alt={residence.name}
          className="img-mono"
          style={{
            width: '100%',
            height: 320,
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>

      {/* Text */}
      <div style={{ flex: '1 1 60%' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 16,
            marginBottom: 16,
          }}
        >
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(24px, 2.5vw, 36px)',
              fontWeight: 400,
              color: '#111',
            }}
          >
            {residence.name}
          </h3>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: '0.1em',
              color: '#888',
              textTransform: 'uppercase',
            }}
          >
            {residence.type}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 32,
            marginBottom: 24,
            flexWrap: 'wrap',
          }}
        >
          {[residence.size, residence.beds, residence.price].map((item) => (
            <span
              key={item}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 400,
                color: '#888',
                letterSpacing: '0.05em',
              }}
            >
              {item}
            </span>
          ))}
        </div>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            fontWeight: 300,
            color: '#888',
            lineHeight: 1.8,
            maxWidth: 520,
          }}
        >
          {residence.description}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────── FEATURES SECTION ─────────────────────── */
function FeaturesSection() {
  const anim = useScrollAnimation();

  return (
    <section
      id="features"
      style={{
        background: '#fff',
        padding: '120px 0',
        borderTop: '1px solid #CCCCCC',
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 40px',
        }}
      >
        {/* Header */}
        <div
          ref={anim.ref}
          style={{
            marginBottom: 80,
            opacity: anim.isVisible ? 1 : 0.3,
            transition: 'opacity 0.8s ease',
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.2em',
              color: '#888',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            Distinction
          </p>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 300,
              color: '#111',
              lineHeight: 1.2,
            }}
          >
            Built on three
            <br />
            principles.
          </h2>
        </div>

        {/* Three Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 60,
          }}
          className="features-grid"
        >
          {FEATURES.map((feature, i) => (
            <FeatureColumn key={feature.num} feature={feature} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .features-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
        }
      `}</style>
    </section>
  );
}

function FeatureColumn({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[number];
  index: number;
}) {
  const anim = useScrollAnimation();

  return (
    <div
      ref={anim.ref}
      style={{
        position: 'relative',
        opacity: anim.isVisible ? 1 : 0.3,
        transform: anim.isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`,
      }}
    >
      {/* Large background number */}
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(80px, 8vw, 120px)',
          fontWeight: 300,
          color: '#F0F0F0',
          position: 'absolute',
          top: -30,
          left: -10,
          lineHeight: 1,
          zIndex: 0,
          userSelect: 'none',
        }}
      >
        {feature.num}
      </span>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, paddingTop: 50 }}>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.15em',
            color: '#888',
            marginBottom: 12,
          }}
        >
          {feature.num}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ width: 30, height: 1, background: '#CCC' }} />
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(20px, 2vw, 28px)',
              fontWeight: 400,
              color: '#111',
            }}
          >
            {feature.title}
          </h3>
        </div>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            fontWeight: 300,
            color: '#888',
            lineHeight: 1.9,
          }}
        >
          {feature.description}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────── GALLERY SECTION ─────────────────────── */
function GallerySection() {
  const anim = useScrollAnimation();

  return (
    <section
      id="gallery"
      style={{
        background: '#fff',
        padding: '120px 0',
        borderTop: '1px solid #CCCCCC',
      }}
    >
      <div
        ref={anim.ref}
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 40px',
          opacity: anim.isVisible ? 1 : 0.3,
          transition: 'opacity 1s ease',
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.2em',
            color: '#888',
            textTransform: 'uppercase',
            marginBottom: 40,
          }}
        >
          Gallery
        </p>

        {/* Full-width image */}
        <div style={{ position: 'relative' }}>
          <img
            src={IMAGES.pool}
            alt="Azure Tower infinity pool overlooking Jakarta"
            className="img-mono"
            style={{
              width: '100%',
              height: 'clamp(300px, 50vw, 600px)',
              objectFit: 'cover',
              display: 'block',
              transition: 'filter 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </div>

        {/* Caption */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 300,
            color: '#888',
            marginTop: 24,
            letterSpacing: '0.05em',
          }}
        >
          The infinity-edge pool extends toward the horizon, blurring the boundary
          between water and sky — a daily meditation in architectural stillness.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────── CONTACT SECTION ─────────────────────── */
function ContactSection() {
  const anim = useScrollAnimation();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section
      id="contact"
      style={{
        background: '#fff',
        padding: '120px 0',
        borderTop: '1px solid #CCCCCC',
      }}
    >
      <div
        ref={anim.ref}
        style={{
          maxWidth: 600,
          margin: '0 auto',
          padding: '0 40px',
          textAlign: 'center',
          opacity: anim.isVisible ? 1 : 0.3,
          transition: 'opacity 0.8s ease',
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.2em',
            color: '#888',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          Private Viewing
        </p>
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 300,
            color: '#111',
            marginBottom: 24,
          }}
        >
          Inquire
        </h2>
        <div
          style={{
            width: 60,
            height: 1,
            background: '#CCC',
            margin: '0 auto 40px',
          }}
        />
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            fontWeight: 300,
            color: '#888',
            lineHeight: 1.8,
            marginBottom: 48,
          }}
        >
          Register your interest for a private consultation
          <br />
          with our residential specialists.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 24 }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              style={{
                width: '100%',
                padding: '16px 0',
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                fontWeight: 300,
                color: '#111',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid #111',
                outline: 'none',
                textAlign: 'center',
                letterSpacing: '0.05em',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#fff',
              background: '#111',
              border: '1px solid #111',
              padding: '18px 48px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.color = '#111';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#111';
              e.currentTarget.style.color = '#fff';
            }}
          >
            Request Information
          </button>

          {submitted && (
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 300,
                color: '#888',
                marginTop: 24,
              }}
            >
              Thank you. We will be in touch shortly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

/* ─────────────────────────── FOOTER ─────────────────────────── */
function Footer() {
  return (
    <footer
      style={{
        background: '#000',
        padding: '60px 40px',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 13,
          fontWeight: 400,
          letterSpacing: '0.2em',
          color: '#fff',
          marginBottom: 16,
        }}
      >
        AZURE TOWER JAKARTA &middot; &copy; 2026
      </p>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          fontWeight: 300,
          color: '#888',
        }}
      >
        Made with &hearts; by{' '}
        <a
          href="https://creativism.id"
          style={{
            color: '#fff',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#CCC')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')}
          target="_blank"
          rel="noopener noreferrer"
        >
          Creativism
        </a>
      </p>
    </footer>
  );
}

/* ─────────────────────────── RESPONSIVE STYLES ─────────────────── */
function ResponsiveStyles() {
  return (
    <style>{`
      @media (max-width: 768px) {
        .residence-row {
          flex-direction: column !important;
          gap: 30px !important;
          padding: 40px 0 !important;
        }
        .residence-row .residence-img-wrap {
          flex: 1 1 100% !important;
        }
        .residence-row .residence-img-wrap img {
          height: 240px !important;
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
      <PhilosophySection />
      <ResidencesSection />
      <FeaturesSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </>
  );
}
