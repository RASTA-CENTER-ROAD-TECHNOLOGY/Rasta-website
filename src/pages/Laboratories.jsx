import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import PageHeader from '../components/layout/PageHeader';
import AnimatedContent from '../components/reactbits/AnimatedContent';
import { LABORATORY_DIVISIONS, TESTING_FACILITIES } from '../data/rastaData';

export default function Laboratories() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [query, setQuery] = useState('');
  const tableWrapRef = useRef(null);

  const categories = ['All', ...TESTING_FACILITIES.map((t) => t.category)];

  const filteredTests = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = [];
    TESTING_FACILITIES.forEach((group) => {
      if (selectedCategory !== 'All' && group.category !== selectedCategory) return;
      group.tests.forEach((testName) => {
        if (!q || testName.toLowerCase().includes(q) || group.category.toLowerCase().includes(q)) {
          list.push({ category: group.category, testName });
        }
      });
    });
    return list;
  }, [selectedCategory, query]);

  useEffect(() => {
    if (!tableWrapRef.current) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.fromTo(
      tableWrapRef.current,
      { opacity: 0.4, y: 6 },
      { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' }
    );
  }, [selectedCategory]);

  return (
    <main>
      <PageHeader
        title="NABL Accredited Material Testing Laboratories"
        description="Assessed and accredited by NABL in accordance with ISO/IEC 17025:2017 for soil, aggregates, cement, concrete, bituminous binders, and field evaluation."
        breadcrumbs={[{ label: 'Laboratories' }]}
      />

      <section className="section-block section-block--white">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Laboratory Divisions and Equipment</h2>
              </div>
              <p className="section-head__sub">
                All testing instrumentation conforms to Bureau of Indian Standards (BIS), Indian Roads
                Congress (IRC), and Ministry of Road Transport and Highways (MoRT&amp;H) rules.
              </p>
            </div>

            <div className="arch-grid arch-grid--2" style={{ marginBottom: '28px' }}>
              {LABORATORY_DIVISIONS.map((div) => (
                <div key={div.name} className="photo-card">
                  <img src={div.image} alt={div.name} className="photo-card__img" style={{ height: '240px' }} />
                  <div className="photo-card__body">
                    <h3 className="photo-card__title">{div.name}</h3>
                    <ul className="arch-list" style={{ marginBottom: 0 }}>
                      {div.equipment.map((eq) => (
                        <li key={eq}>{eq}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="arch-grid arch-grid--2">
              <div className="photo-card">
                <img
                  src="/images/brochure/cons_p5_7_348x219.jpeg"
                  alt="Automatic Compression Testing Machine 3000 kN"
                  className="photo-card__img"
                />
                <div className="photo-card__body">
                  <div className="photo-card__sub">High-Capacity Testing</div>
                  <h3 className="photo-card__title">Automatic Compression and NDT Facilities</h3>
                  <p className="photo-card__text">
                    Includes 3000 kN Automatic Compression Testing Machine, 600 kN Universal Testing
                    Machine, Direct Shear apparatus, Ultrasonic Pulse Velocity tester, Profometer, and
                    Rebound Hammer.
                  </p>
                </div>
              </div>
              <div className="photo-card">
                <img
                  src="/images/brochure/cons_p5_8_204x270.jpeg"
                  alt="NABL Certificate of Accreditation ISO/IEC 17025:2017"
                  className="photo-card__img"
                  style={{ objectFit: 'contain', background: '#f8fafc', padding: '12px' }}
                />
                <div className="photo-card__body">
                  <div className="photo-card__sub">Certificate of Accreditation</div>
                  <h3 className="photo-card__title">NABL ISO/IEC 17025:2017</h3>
                  <p className="photo-card__text">
                    Accredited in the field of Testing at Volvo Construction Equipment Campus, # 7 &amp;
                    8, Phase 1, Peenya Industrial Area, Bengaluru - 560058.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block" id="testing-facilities">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Complete List of Testing Facilities Available at RASTA</h2>
              </div>
              <p className="section-head__sub">
                Filter by material group or enter a keyword to locate specific laboratory and field
                tests.
              </p>
            </div>

            <div className="table-toolbar">
              <div className="tab-bar" role="tablist" aria-label="Test Categories">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={selectedCategory === cat}
                    className={`tab-btn ${selectedCategory === cat ? 'is-active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <input
                type="search"
                className="search-input"
                placeholder="Search tests (e.g., CBR, Marshall, FWD)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search testing facilities"
              />
            </div>

            <div className="table-scroll" ref={tableWrapRef}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Test Category</th>
                    <th>Test Name</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTests.map((row, idx) => (
                    <tr key={`${row.category}-${row.testName}-${idx}`}>
                      <td>{idx + 1}</td>
                      <td style={{ fontWeight: 600, color: '#0f3d7a', whiteSpace: 'nowrap' }}>
                        {row.category}
                      </td>
                      <td style={{ color: '#0f172a' }}>{row.testName}</td>
                    </tr>
                  ))}
                  {filteredTests.length === 0 && (
                    <tr>
                      <td colSpan={3}>No testing methods match the current search filter.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </AnimatedContent>
        </div>
      </section>
    </main>
  );
}
