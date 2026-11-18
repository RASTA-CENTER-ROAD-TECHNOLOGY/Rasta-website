import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import PavementStrata3DViewer from './PavementStrata3DViewer';

const STRATA = [
  {
    id: 'surface',
    name: 'Surface Course (BC / SMA / PQC)',
    standard: 'IRC:111 / IRC:SP:76 / MoRT&H Section 500 & 600',
    thickness: '40 mm - 300 mm',
    color: '#1E222A',
    summary:
      'High-friction wearing surface engineered for skid resistance, rutting control, and axle load distribution.',
    labTests: [
      'Marshall Stability & Flow',
      'Wheel Rutting and Indirect Tensile Strength',
      'Bitumen Viscosity, Softening Point & Penetration',
      'Flexural and 3000 kN Concrete Compressive Strength',
    ],
    fieldTools: 'British Pendulum Tester (BPN), MERLIN & Bump Integrator, Core Extraction Rig',
    route: '/laboratories',
  },
  {
    id: 'binder',
    name: 'Binder Course (DBM / DLC)',
    standard: 'IRC:37 / IRC:SP:49 / MoRT&H Section 500',
    thickness: '50 mm - 150 mm',
    color: '#3A4454',
    summary:
      'Structural bituminous or dry lean concrete layer transferring heavy traffic stresses to the road base.',
    labTests: [
      'Bituminous Mix Design (DBM / DLC)',
      'Centrifuge Bitumen Extraction & Gradation',
      'Aggregate Crushing, Impact & Los Angeles Abrasion',
      'High-Volume Fly Ash Cement Optimization',
    ],
    fieldTools: 'Falling Weight Deflectometer (FWD), Benkelman Beam Deflection (BBD)',
    route: '/consultancy',
  },
  {
    id: 'base',
    name: 'Base Course (WMM)',
    standard: 'MoRT&H Clause 406 / IRC:109',
    thickness: '150 mm - 250 mm',
    color: '#6A7E98',
    summary:
      'Well-graded crushed aggregate base providing uniform load-spreading stiffness and internal drainage.',
    labTests: [
      'Wet & Dry Sieve Gradation Analysis',
      'Flakiness & Elongation Shape Index',
      'Specific Gravity & Water Absorption',
      'Polished Stone Value & Bulk Density',
    ],
    fieldTools: 'Field Density (Sand Replacement & Core Cutter), Plate Load Test',
    route: '/laboratories#testing-facilities',
  },
  {
    id: 'subbase',
    name: 'Granular Sub-Base (GSB)',
    standard: 'MoRT&H Clause 401 / IRC:37',
    thickness: '150 mm - 300 mm',
    color: '#C2A26A',
    summary:
      'Drainage and frost-protection granular cushion designed to carry construction traffic and protect the subgrade.',
    labTests: [
      'Permeability & Aggregate Mix Drainage Tests',
      'Light and Heavy Proctor Compaction',
      'Utilization of Recycled C&D & Brick Masonry Waste',
      'Plasticity & Fines Screening',
    ],
    fieldTools: 'Field Permeability Apparatus, Rapid Moisture Meter, Dynamic Cone Penetrometer',
    route: '/research',
  },
  {
    id: 'subgrade',
    name: 'Compacted Soil Subgrade',
    standard: 'IRC:36 / IS:2720 / MoRT&H Clause 305',
    thickness: 'Top 500 mm Engineered Embankment',
    color: '#7C4A2A',
    summary:
      'Foundation soil layer evaluated for bearing capacity, swell control, and chemical or geosynthetic stabilization.',
    labTests: [
      'California Bearing Ratio (CBR) & Triaxial Test',
      'Atterberg Limits & Free Swell Index',
      'Direct Shear & Hydrometer Analysis',
      'Stabilizer Evaluation (Terrazyme, RBI Grade-81, Stabilig, Jute Geotextiles)',
    ],
    fieldTools: 'Dynamic Cone Penetration Test (DCPT), Nuclear / Non-Nuclear Density Gauge',
    route: '/laboratories#testing-facilities',
  },
];

export default function PavementLayerExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stackRefs = useRef([]);
  const panelRef = useRef(null);

  const activeLayer = STRATA[activeIndex];

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    stackRefs.current.forEach((el, idx) => {
      if (!el) return;
      const isSelected = idx === activeIndex;
      gsap.to(el, {
        x: isSelected ? 14 : 0,
        scale: isSelected ? 1.015 : 1,
        opacity: isSelected ? 1 : 0.82,
        duration: prefersReduced ? 0 : 0.35,
        ease: 'power3.out',
      });
    });

    if (panelRef.current && !prefersReduced) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.36, ease: 'power3.out' }
      );
    }
  }, [activeIndex]);

  return (
    <div className="pavement-explorer">
      <div className="pavement-explorer__left">
        <PavementStrata3DViewer activeIndex={activeIndex} onSelectLayer={setActiveIndex} />

        <div className="pavement-stack" role="tablist" aria-label="Highway Pavement Layers">
          {STRATA.map((item, idx) => {
            const selected = idx === activeIndex;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  stackRefs.current[idx] = el;
                }}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`pavement-stratum-btn ${selected ? 'is-active' : ''}`}
              >
                <span
                  className="pavement-stratum-swatch"
                  style={{ backgroundColor: item.color }}
                />
                <span className="pavement-stratum-meta">
                  <span className="pavement-stratum-name">{item.name}</span>
                  <span className="pavement-stratum-std">{item.thickness}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pavement-explorer__right" ref={panelRef}>
        <div className="pavement-detail-header">
          <div className="pavement-detail-subtitle">{activeLayer.standard}</div>
          <h3 className="pavement-detail-title">{activeLayer.name}</h3>
          <p className="pavement-detail-summary">{activeLayer.summary}</p>
        </div>

        <div className="pavement-detail-grid">
          <div className="pavement-detail-card">
            <h4 className="pavement-detail-subhead">NABL ISO/IEC 17025:2017 Laboratory Tests</h4>
            <ul className="arch-list" style={{ marginBottom: 0 }}>
              {activeLayer.labTests.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="pavement-detail-card">
            <h4 className="pavement-detail-subhead">Field Investigation Apparatus</h4>
            <p className="arch-cell__desc" style={{ marginBottom: 0 }}>
              {activeLayer.fieldTools}
            </p>
          </div>
        </div>

        <div className="pavement-detail-footer">
          <Link to={activeLayer.route} className="btn btn--primary">
            <span>Inspect Standards and Testing Methods</span>
            <ArrowRight size={15} strokeWidth={1.8} />
          </Link>
        </div>
      </div>
    </div>
  );
}
