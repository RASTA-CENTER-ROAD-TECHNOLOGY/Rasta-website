import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import PageHeader from '../components/layout/PageHeader';
import AnimatedContent from '../components/reactbits/AnimatedContent';
import {
  ACADEMIC_BROCHURE_CONSULTANCY,
  COMPLETED_PROJECTS,
  ESTEEMED_CLIENTS,
  FUNDED_RESEARCH_EXTENDED,
  ONGOING_PROJECTS,
} from '../data/rastaData';

const TABS = [
  { id: 'ongoing', label: `Ongoing Consultancy (${ONGOING_PROJECTS.length})` },
  { id: 'completed', label: `Completed Consultancy (${COMPLETED_PROJECTS.length})` },
  { id: 'academic', label: `Academic Brochure Works (${ACADEMIC_BROCHURE_CONSULTANCY.length})` },
  { id: 'research', label: `Funded R&D Projects (${FUNDED_RESEARCH_EXTENDED.length})` },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [search, setSearch] = useState('');
  const tableRef = useRef(null);

  const q = search.trim().toLowerCase();

  useEffect(() => {
    if (!tableRef.current) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.fromTo(
      tableRef.current,
      { opacity: 0.4, y: 6 },
      { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' }
    );
  }, [activeTab]);

  const filteredOngoing = useMemo(
    () =>
      ONGOING_PROJECTS.filter(
        (p) => !q || p.client.toLowerCase().includes(q) || p.services.toLowerCase().includes(q)
      ),
    [q]
  );

  const filteredCompleted = useMemo(
    () =>
      COMPLETED_PROJECTS.filter(
        (p) => !q || p.client.toLowerCase().includes(q) || p.services.toLowerCase().includes(q)
      ),
    [q]
  );

  const filteredAcademic = useMemo(
    () =>
      ACADEMIC_BROCHURE_CONSULTANCY.filter(
        (p) => !q || p.client.toLowerCase().includes(q) || p.title.toLowerCase().includes(q)
      ),
    [q]
  );

  const filteredResearch = useMemo(
    () =>
      FUNDED_RESEARCH_EXTENDED.filter(
        (p) => !q || p.title.toLowerCase().includes(q) || p.sponsor.toLowerCase().includes(q)
      ),
    [q]
  );

  return (
    <main>
      <PageHeader
        title="Consultancy and Sponsored Research Projects"
        description="Complete project index covering 7 ongoing works, 87 completed consultancy assignments, 12 academic brochure engagements, and 15 funded R&D studies."
        breadcrumbs={[{ label: 'Projects' }]}
      />

      <section className="section-block section-block--white">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="table-toolbar">
              <div className="tab-bar" role="tablist" aria-label="Project Categories">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === t.id}
                    className={`tab-btn ${activeTab === t.id ? 'is-active' : ''}`}
                    onClick={() => setActiveTab(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <input
                type="search"
                className="search-input"
                placeholder="Filter by client, highway, or service..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Filter projects"
              />
            </div>

            <div ref={tableRef}>
              {activeTab === 'ongoing' && (
                <div className="table-scroll">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Sl. No.</th>
                        <th>Client</th>
                        <th>Services Rendered</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOngoing.map((row) => (
                        <tr key={row.sl}>
                          <td>{row.sl}</td>
                          <td style={{ fontWeight: 600, color: '#0f172a', minWidth: '220px' }}>{row.client}</td>
                          <td>{row.services}</td>
                        </tr>
                      ))}
                      {filteredOngoing.length === 0 && (
                        <tr>
                          <td colSpan={3}>No ongoing projects match your search query.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'completed' && (
                <div className="table-scroll">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Sl. No.</th>
                        <th>Client</th>
                        <th>Services Rendered</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCompleted.map((row) => (
                        <tr key={row.sl}>
                          <td>{row.sl}</td>
                          <td style={{ fontWeight: 600, color: '#0f172a', minWidth: '240px' }}>{row.client}</td>
                          <td>{row.services}</td>
                        </tr>
                      ))}
                      {filteredCompleted.length === 0 && (
                        <tr>
                          <td colSpan={3}>No completed projects match your search query.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'academic' && (
                <div className="table-scroll">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Sl. No.</th>
                        <th>Title of Assignment</th>
                        <th>Name of Client</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAcademic.map((row) => (
                        <tr key={row.sl}>
                          <td>{row.sl}</td>
                          <td>{row.title}</td>
                          <td style={{ fontWeight: 600, color: '#0f172a', minWidth: '220px' }}>{row.client}</td>
                        </tr>
                      ))}
                      {filteredAcademic.length === 0 && (
                        <tr>
                          <td colSpan={3}>No assignments match your search query.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'research' && (
                <div className="table-scroll">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Sl. No.</th>
                        <th>Research Study Title</th>
                        <th>Sector</th>
                        <th>Sponsoring Agency</th>
                        <th>Sanction</th>
                        <th>Value (Rs.)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredResearch.map((row) => (
                        <tr key={row.sl}>
                          <td>{row.sl}</td>
                          <td style={{ fontWeight: 600, color: '#0f172a' }}>{row.title}</td>
                          <td>{row.sector}</td>
                          <td>{row.sponsor}</td>
                          <td>{row.sanction}</td>
                          <td style={{ whiteSpace: 'nowrap' }}>{row.value}</td>
                        </tr>
                      ))}
                      {filteredResearch.length === 0 && (
                        <tr>
                          <td colSpan={6}>No research studies match your search query.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Performance Evaluation and KIADB Inspections</h2>
              </div>
            </div>
            <div className="arch-grid arch-grid--4">
              <div className="photo-card">
                <img src="/images/brochure/acad_p7_1_965x658.jpeg" alt="NRIDA Waste Plastic road evaluation" className="photo-card__img" />
                <div className="photo-card__body">
                  <div className="photo-card__sub">NRIDA / PMGSY</div>
                  <p className="photo-card__text">Performance Evaluation Studies - Waste Plastic Road</p>
                </div>
              </div>
              <div className="photo-card">
                <img src="/images/brochure/acad_p7_3_1006x688.jpeg" alt="NRIDA Cement Concrete road evaluation" className="photo-card__img" />
                <div className="photo-card__body">
                  <div className="photo-card__sub">NRIDA / PMGSY</div>
                  <p className="photo-card__text">Performance Evaluation Studies - Cement Concrete Road</p>
                </div>
              </div>
              <div className="photo-card">
                <img src="/images/brochure/acad_p7_2_922x658.jpeg" alt="KIADB field inspection" className="photo-card__img" />
                <div className="photo-card__body">
                  <div className="photo-card__sub">KIADB / PMC</div>
                  <p className="photo-card__text">KIADB Industrial Area Field Inspection</p>
                </div>
              </div>
              <div className="photo-card">
                <img src="/images/brochure/acad_p7_4_1013x690.jpeg" alt="KIADB project review" className="photo-card__img" />
                <div className="photo-card__body">
                  <div className="photo-card__sub">KIADB / QMC</div>
                  <p className="photo-card__text">KIADB Site Review and Quality Monitoring</p>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block section-block--white">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Client Organizations Served</h2>
              </div>
            </div>
            <div className="clients-ledger">
              {ESTEEMED_CLIENTS.map((c) => (
                <div key={c} className="client-cell">
                  {c}
                </div>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </section>
    </main>
  );
}
