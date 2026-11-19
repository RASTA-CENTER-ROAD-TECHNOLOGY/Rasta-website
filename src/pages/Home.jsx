import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Download } from 'lucide-react';
import Topography from '../components/reactbits/Topography';
import Waves from '../components/reactbits/Waves';
import AccordionGallery from '../components/reactbits/AccordionGallery';
import AnimatedContent from '../components/reactbits/AnimatedContent';
import { LogoLoop } from '../components/reactbits/LogoLoop';
import RoadShowcaseCarousel from '../components/carousel/RoadShowcaseCarousel';
import HeroRoad3DScene from '../components/road/HeroRoad3DScene';
import PavementLayerExplorer from '../components/road/PavementLayerExplorer';
import HighwayCorridorInteractive from '../components/road/HighwayCorridorInteractive';
import {
  CAROUSEL_SLIDES,
  ESTEEMED_CLIENTS,
  FOUR_PILLARS,
  INSTITUTE_INFO,
  PARTNER_LOGOS,
  WORKSHOPS_AND_EVENTS,
} from '../data/rastaData';

gsap.registerPlugin(ScrollTrigger);

const PILLAR_PROMO_TILES = [
  {
    id: 'academics',
    kicker: 'VTU Extension Center',
    title: 'Postgraduate Academics',
    subtitle:
      'M.Tech in Highway Technology, Infrastructure Engineering, PG Diploma, and Ph.D. programs.',
    image: '/images/brochure/acad_p3_6_964x630.jpeg',
    alt: 'M.Tech Highway Technology students in modern RASTA classroom',
    primaryLink: { label: 'Explore Programs', to: '/academics' },
    secondaryLink: { label: 'Faculty and Syllabus', to: '/academics#faculty' },
    tone: 'light',
  },
  {
    id: 'labs',
    kicker: 'ISO/IEC 17025:2017 Accredited',
    title: 'NABL Testing Laboratories',
    subtitle:
      '62 accredited laboratory and field tests for soil, bitumen, aggregates, cement, and concrete.',
    image: '/images/pavement-lab-engineering.png',
    alt: 'NABL accredited pavement material testing laboratory at RASTA Bengaluru',
    primaryLink: { label: 'Inspect 62 Tests', to: '/laboratories' },
    secondaryLink: { label: 'Consultancy Scope', to: '/consultancy' },
    tone: 'soft',
  },
  {
    id: 'consultancy',
    kicker: 'State Technical Agency',
    title: 'Highway Consultancy and DPR',
    subtitle:
      '100+ national and state highway projects, proof checking, road safety audits, and FWD tests.',
    image: '/images/hero-highway.png',
    alt: 'Multi-lane expressway corridor showing geometric highway alignment',
    primaryLink: { label: 'View Projects', to: '/projects' },
    secondaryLink: { label: 'Consultancy Services', to: '/consultancy' },
    tone: 'soft',
  },
  {
    id: 'training',
    kicker: '5,000+ Engineers Trained',
    title: 'Sponsored R&D and Training',
    subtitle:
      '15+ funded research studies, 112+ technical papers, and ongoing executive training batches.',
    image: '/images/brochure/acad_p5_6_906x559.jpeg',
    alt: 'Highway engineering training workshop at RASTA campus Bengaluru',
    primaryLink: { label: 'Training Calendar', to: '/training' },
    secondaryLink: { label: 'Research and MOUs', to: '/research' },
    tone: 'light',
  },
];

const PILLAR_GALLERY_ITEMS = [
  {
    image: '/images/brochure/acad_p3_6_964x630.jpeg',
    label: 'Academics - VTU Postgraduate Programs',
    alt: 'M.Tech Highway Technology students in modern RASTA classroom',
  },
  {
    image: '/images/brochure/acad_p5_6_906x559.jpeg',
    label: 'Training - 3,300+ Practicing Engineers',
    alt: 'PWD engineering training session at RASTA Bengaluru',
  },
  {
    image: '/images/brochure/acad_p7_1_965x658.jpeg',
    label: 'Research and Development - Sponsored Studies',
    alt: 'Field performance assessment of highway pavement research stretch',
  },
  {
    image: '/images/brochure/cons_p5_4_348x219.jpeg',
    label: 'Consultancy and NABL Testing Laboratories',
    alt: 'RASTA mobile laboratory van and field equipment',
  },
];

const CAROUSEL_FILTERS = [
  { id: 'all', label: 'All Facilities' },
  { id: 'labs', label: 'NABL Laboratories' },
  { id: 'field', label: 'Field Investigations' },
  { id: 'campus', label: 'Campus and Academics' },
];

const METRIC_TARGETS = [
  { target: 25, suffix: '+', label: 'Years of Experience', detail: 'Established in Bengaluru in 2002' },
  { target: 50, suffix: '+', label: 'Faculty and Industry Experts', detail: 'Full-time faculty and guest specialists' },
  { target: 150, suffix: '+', label: 'Education and Training Programs', detail: 'Campus and on-site workshops' },
  { target: 5000, suffix: '+', label: 'Graduates and Trainees', detail: 'Includes 3,300+ practicing engineers' },
  { target: 62, suffix: '', label: 'NABL and Field Tests', detail: 'ISO/IEC 17025:2017 accredited' },
  { target: 150, suffix: '+', label: 'Consultancy and R&D Projects', detail: 'Ongoing and completed studies' },
];

export default function Home() {
  const heroRef = useRef(null);
  const metricsRef = useRef(null);
  const pillarDetailRef = useRef(null);

  const [activePillarIdx, setActivePillarIdx] = useState(0);
  const [carouselFilter, setCarouselFilter] = useState('all');

  const activePillar = FOUR_PILLARS[activePillarIdx] || FOUR_PILLARS[0];

  const filteredCarouselSlides = useMemo(() => {
    if (carouselFilter === 'labs') return CAROUSEL_SLIDES.filter((s) => s.category === 'labs');
    if (carouselFilter === 'field') return CAROUSEL_SLIDES.filter((s) => s.category === 'field');
    if (carouselFilter === 'campus') return CAROUSEL_SLIDES.filter((s) => s.category === 'campus');
    return CAROUSEL_SLIDES;
  }, [carouselFilter]);

  const partnerLoopItems = useMemo(
    () =>
      PARTNER_LOGOS.map((partner) => ({
        node: (
          <div className="partner-logo-card" title={partner.name}>
            <img
              src={partner.src}
              alt={partner.name}
              className="partner-logo-img"
              loading="lazy"
            />
          </div>
        ),
        title: partner.name,
      })),
    []
  );

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return undefined;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-stagger',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.72, stagger: 0.08, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.hero-3d-reveal',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.25, ease: 'power3.out' }
      );
    }, heroEl);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const container = metricsRef.current;
    if (!container) return undefined;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const ctx = gsap.context(() => {
      const nodes = container.querySelectorAll('[data-count-target]');
      nodes.forEach((node) => {
        const endVal = Number(node.getAttribute('data-count-target') || 0);
        const suffix = node.getAttribute('data-count-suffix') || '';
        const counter = { val: 0 };

        gsap.to(counter, {
          val: endVal,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 88%',
            once: true,
          },
          onUpdate: () => {
            node.textContent = `${Math.round(counter.val).toLocaleString('en-IN')}${suffix}`;
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!pillarDetailRef.current) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.fromTo(
      pillarDetailRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.32, ease: 'power3.out' }
    );
  }, [activePillarIdx]);

  return (
    <main>
      <section className="apple-hero" ref={heroRef}>
        <div className="hero-topography-layer" aria-hidden="true">
          <Topography
            lightMode={true}
            color="#003366"
            lineCount={18}
            lineWidth={0.9}
            elevation={0.9}
            tilt={38}
            speed={0.14}
            glow={0}
            opacity={0.14}
            mouseInteraction={true}
            hoverEffect="lift"
            clickEffect="pulse"
            markers="survey"
          />
        </div>

        <div className="container apple-hero__inner">
          <p className="apple-hero__kicker hero-stagger">
            Volvo Group Initiative | Peenya Campus, Bengaluru | AICTE &amp; NABL ISO/IEC 17025:2017
          </p>
          <h1 className="apple-hero__title hero-stagger">{INSTITUTE_INFO.fullName}</h1>
          <p className="apple-hero__lead hero-stagger">{INSTITUTE_INFO.tagline}</p>
          <p className="apple-hero__sub hero-stagger">
            Total Solutions Provider in Highway Technology uniting VTU postgraduate degrees,
            practicing engineer workshops, sponsored road research, and NABL testing consultancy.
          </p>
          <div className="apple-hero__actions hero-stagger">
            <Link to="/academics" className="btn btn--primary">
              <span>Explore Academic Programs</span>
              <ArrowRight size={16} strokeWidth={1.8} />
            </Link>
            <Link to="/consultancy" className="btn btn--secondary">
              <span>Consultancy Services</span>
            </Link>
            <a
              href="/RASTA_Consultancy_Brochure_2025.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn btn--secondary"
            >
              <Download size={16} strokeWidth={1.8} />
              <span>Consultancy Brochure</span>
            </a>
          </div>

          <div className="apple-hero__stage hero-3d-reveal">
            <HeroRoad3DScene />
          </div>
        </div>
      </section>

      <section className="metrics-strip" aria-label="Institutional Metrics" ref={metricsRef}>
        <div className="container">
          <div className="metrics-grid">
            {METRIC_TARGETS.map((m) => (
              <div key={m.label} className="metric-cell">
                <div
                  className="metric-cell__val"
                  data-count-target={m.target}
                  data-count-suffix={m.suffix}
                >
                  {m.target.toLocaleString('en-IN')}
                  {m.suffix}
                </div>
                <div className="metric-cell__label">{m.label}</div>
                <div className="metric-cell__sub">{m.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="apple-promo-band">
        <div className="apple-promo-band__header container">
          <AnimatedContent distance={24} duration={0.6}>
            <h2 className="apple-section-title">Four Core Pillars in Highway Technology</h2>
            <p className="apple-section-subtitle">
              Integrated engineering capability spanning VTU academic degrees, field training,
              funded materials research, and accredited road consultancy.
            </p>
          </AnimatedContent>
        </div>

        <div className="apple-promo-wrap">
          <div className="apple-promo-grid">
            {PILLAR_PROMO_TILES.map((tile) => (
              <article
                key={tile.id}
                className={`apple-promo-tile ${
                  tile.tone === 'light' ? 'apple-promo-tile--light' : 'apple-promo-tile--soft'
                }`}
              >
                <div className="apple-promo-tile__copy">
                  <div className="apple-promo-tile__kicker">{tile.kicker}</div>
                  <h3 className="apple-promo-tile__title">{tile.title}</h3>
                  <p className="apple-promo-tile__sub">{tile.subtitle}</p>
                  <div className="apple-promo-tile__links">
                    <Link to={tile.primaryLink.to} className="apple-text-link">
                      <span>{tile.primaryLink.label}</span>
                      <ArrowRight size={14} strokeWidth={2} />
                    </Link>
                    <Link to={tile.secondaryLink.to} className="apple-text-link">
                      <span>{tile.secondaryLink.label}</span>
                      <ArrowRight size={14} strokeWidth={2} />
                    </Link>
                  </div>
                </div>
                <div className="apple-promo-tile__media">
                  <img src={tile.image} alt={tile.alt} loading="lazy" />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="container apple-accordion-block">
          <AccordionGallery
            items={PILLAR_GALLERY_ITEMS}
            defaultIndex={0}
            accentColor="#003366"
            overlayColor="#1D1D1F"
            textColor="#FFFFFF"
            height={380}
            gap={10}
            radius={0}
            grayscale={false}
            onActiveChange={setActivePillarIdx}
          />

          <div className="pillar-detail-strip" ref={pillarDetailRef}>
            <div className="pillar-detail-strip__main">
              <h3 className="pillar-detail-strip__title">{activePillar.title}</h3>
              <p className="pillar-detail-strip__desc">{activePillar.summary}</p>
            </div>
            <ul className="pillar-detail-strip__list">
              {activePillar.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="pillar-detail-strip__cta">
              <Link to={activePillar.link} className="btn btn--primary">
                <span>Open {activePillar.title}</span>
                <ArrowRight size={15} strokeWidth={1.8} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block section-block--white">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="apple-section-center">
              <h2 className="apple-section-title">
                Interactive Pavement Structure and Testing Explorer
              </h2>
              <p className="apple-section-subtitle">
                Select any structural road layer to inspect IRC and MoRT&amp;H design standards,
                NABL laboratory tests, and field instruments.
              </p>
            </div>
            <PavementLayerExplorer />
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block section-block--studio">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="apple-section-center">
              <h2 className="apple-section-title">End-to-End Highway Engineering Lifecycle</h2>
              <p className="apple-section-subtitle">
                Select any engineering stage along the highway lifecycle to inspect RASTA field
                capabilities and verified project references.
              </p>
            </div>
            <HighwayCorridorInteractive />
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block section-block--showcase" id="visual-showcase">
        <div className="showcase-waves-bg" aria-hidden="true">
          <Waves
            lightMode={true}
            lineColor="#003366"
            accentColor="#B45309"
            spacing={26}
            lineWidth={1}
            amplitude={16}
            speed={0.35}
            opacity={0.09}
            mouseInteraction={true}
            clickRipple={true}
          />
        </div>
        <div className="container showcase-foreground">
          <div className="apple-section-center">
            <h2 className="apple-section-title">Campus, NABL Laboratories, and Field Gallery</h2>
            <p className="apple-section-subtitle">
              Inspect 3D interactive facility views across testing laboratories, highway field
              diagnostics, and academic classrooms.
            </p>
            <div
              className="tab-bar"
              style={{ marginTop: '20px', display: 'inline-flex' }}
              role="tablist"
              aria-label="Filter Infrastructure Gallery"
            >
              {CAROUSEL_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={carouselFilter === f.id}
                  className={`tab-btn ${carouselFilter === f.id ? 'is-active' : ''}`}
                  onClick={() => setCarouselFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className="carousel-stage-panel">
            <RoadShowcaseCarousel items={filteredCarouselSlides} />
          </div>
        </div>
      </section>

      <section className="section-block section-block--studio">
        <div className="container">
          <AnimatedContent distance={24} duration={0.65} stagger={0.08}>
            <div className="section-head">
              <div>
                <h2 className="apple-section-title" style={{ textAlign: 'left', margin: 0 }}>
                  Accreditations, Mandates, and Recent Events
                </h2>
              </div>
              <Link to="/training#workshops" className="btn btn--secondary">
                All Training Events
              </Link>
            </div>
          </AnimatedContent>

          <div className="arch-grid arch-grid--2" style={{ marginBottom: '28px' }}>
            {INSTITUTE_INFO.accreditations.map((item) => (
              <div key={item} className="arch-cell">
                <p className="arch-cell__desc" style={{ margin: 0, color: '#1D1D1F', fontWeight: 500 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="arch-grid arch-grid--4">
            {WORKSHOPS_AND_EVENTS.slice(0, 4).map((ev) => (
              <div key={ev.title} className="arch-cell">
                <p className="arch-cell__sub">{ev.date}</p>
                <h3 className="arch-cell__title" style={{ fontSize: '16px' }}>
                  {ev.title}
                </h3>
                <span style={{ fontSize: '13px', color: '#515154' }}>{ev.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="partner-loop-band" aria-label="Government and Industry Collaborations">
        <div className="container">
          <div className="partner-loop-label">
            Trusted by Public Authorities, Metro Agencies, and Infrastructure Enterprises
          </div>
        </div>
        <LogoLoop
          logos={partnerLoopItems}
          speed={60}
          direction="left"
          logoHeight={48}
          gap={36}
          pauseOnHover={true}
          fadeOut={true}
          draggable={true}
          ariaLabel="RASTA Client and Partner Organizations"
        />
      </section>
    </main>
  );
}
