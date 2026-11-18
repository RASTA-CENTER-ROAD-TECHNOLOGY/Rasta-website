import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const CORRIDOR_STATIONS = [
  {
    id: 'dpr',
    label: 'Reconnaissance & DPR',
    title: 'Geometric Alignment and Detailed Project Report (DPR)',
    summary:
      'Topographic surveys, traffic volume forecasts, soil exploration, and life-cycle cost pavement design for new highways.',
    metrics: 'BMRCL Service Roads, NHAI, IIT-Madras, and SHDP Corridors',
    image: '/images/hero-highway.png',
    link: '/consultancy',
  },
  {
    id: 'soil',
    label: 'Subgrade Stabilization',
    title: 'Ground Improvement and Alternate Materials',
    summary:
      'CBR testing, triaxial evaluation, and field performance trials with Terrazyme, RBI Grade-81, Stabilig, and Jute Geotextiles.',
    metrics: 'NRIDA Sponsored Multi-Year Field Research Across Karnataka',
    image: '/images/brochure/acad_p7_1_965x658.jpeg',
    link: '/research',
  },
  {
    id: 'mix',
    label: 'Mix Design & QA/QC',
    title: 'Bituminous and Concrete Mix Characterization',
    summary:
      'NABL accredited mix design for GSB, WMM, DBM, BC, SMA, DLC, and PQC layers with third-party plant and site monitoring.',
    metrics: 'KIADB Industrial Parks, Toyota Bidadi, and BREN Sports City',
    image: '/images/brochure/cons_p5_6_228x144.jpeg',
    link: '/laboratories',
  },
  {
    id: 'deflection',
    label: 'Structural Deflection',
    title: 'Falling Weight Deflectometer and Benkelman Beam',
    summary:
      'Non-destructive structural evaluation of flexible and rigid pavements to compute remaining life and overlay thickness.',
    metrics: 'BBMP Roads, KUIDFC ADB Towns, and Airport Runways',
    image: '/images/brochure/cons_p11_1_348x288.jpeg',
    link: '/consultancy',
  },
  {
    id: 'roughness',
    label: 'Roughness & Skid Audit',
    title: 'MERLIN, Bump Integrator, and British Pendulum',
    summary:
      'Wheel-path unevenness profiling, macro-texture checks, and surface friction verification for highways and airport runways.',
    metrics: '165 km NH-48, Hisar Airport, Koppal, and Vijayapur Airports',
    image: '/images/brochure/cons_p11_4_348x288.jpeg',
    link: '/projects',
  },
  {
    id: 'safety',
    label: 'Safety & Asset Audit',
    title: 'Blackspot Studies, Junction Design, and STA Scrutiny',
    summary:
      'Accident remedial plans, pedestrian safety audits, and State Technical Agency scrutiny for rural and urban highway networks.',
    metrics: 'Bengaluru Traffic Police 16 Junctions, PRAMC, and PMGSY Karnataka',
    image: '/images/brochure/cons_p5_4_348x219.jpeg',
    link: '/projects',
  },
];

export default function HighwayCorridorInteractive() {
  const [selected, setSelected] = useState(0);
  const progressRef = useRef(null);
  const cardRef = useRef(null);

  const activeStation = CORRIDOR_STATIONS[selected];

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const pct = ((selected + 1) / CORRIDOR_STATIONS.length) * 100;
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${pct}%`,
        duration: prefersReduced ? 0 : 0.45,
        ease: 'power3.out',
      });
    }

    if (cardRef.current && !prefersReduced) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.38, ease: 'power3.out' }
      );
    }
  }, [selected]);

  return (
    <div className="corridor-explorer">
      <div className="corridor-stage-banner">
        <img
          src="/images/highway-aerial-bg.png"
          alt=""
          className="corridor-stage-banner__bg"
          aria-hidden="true"
        />
        <div className="corridor-stage-banner__veil" aria-hidden="true" />
        <div className="corridor-stage-banner__content">
          <div className="corridor-progress-track">
            <div ref={progressRef} className="corridor-progress-fill" />
          </div>
          <div className="corridor-tabs" role="tablist" aria-label="Highway Engineering Stages">
            {CORRIDOR_STATIONS.map((st, idx) => {
              const active = idx === selected;
              return (
                <button
                  key={st.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelected(idx)}
                  className={`corridor-tab-btn ${active ? 'is-active' : ''}`}
                >
                  <span>{st.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="corridor-detail" ref={cardRef}>
        <div className="corridor-detail__media">
          <img src={activeStation.image} alt={activeStation.title} />
        </div>
        <div className="corridor-detail__body">
          <h3 className="corridor-detail__title">{activeStation.title}</h3>
          <p className="corridor-detail__desc">{activeStation.summary}</p>
          <div className="corridor-detail__metrics">{activeStation.metrics}</div>
          <Link to={activeStation.link} className="btn btn--primary">
            <span>View Technical Scope</span>
            <ArrowRight size={15} strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </div>
  );
}
