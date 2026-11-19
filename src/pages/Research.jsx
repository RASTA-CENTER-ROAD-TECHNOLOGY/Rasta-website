import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import AnimatedContent from '../components/reactbits/AnimatedContent';
import {
  ACTIVE_MOUS,
  FUNDED_RESEARCH_BROCHURE,
  FUNDED_RESEARCH_EXTENDED,
  PUBLICATIONS,
} from '../data/rastaData';

const RD_OBJECTIVES = [
  'Promote applied research studies whose findings inform national highway standards, codes, and specifications.',
  'Develop advanced pavement materials using alternate and marginal resources including geosynthetics, C&D waste, waste plastic, and industrial by-products.',
  'Operate as an affiliated VTU Research Center for Ph.D. and M.Sc. (Engg.) scholars in Civil Engineering.',
  'Build academia-industry collaborations to fund student research and digital infrastructure innovation.',
];

export default function Research() {
  return (
    <main>
      <PageHeader
        title="Research and Development (R&D)"
        description="VTU affiliated research center executing sponsored projects for NRIDA, KSHIP, KRIDL, KSCST, Volvo Group, ACC Cements, and Saint Gobain."
        breadcrumbs={[{ label: 'R&D' }]}
      />

      <section className="section-block section-block--white" id="overview">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">R&amp;D Mandate and Objectives</h2>
              </div>
            </div>
            <div className="arch-grid arch-grid--2">
              {RD_OBJECTIVES.map((obj, idx) => (
                <div key={obj} className="arch-cell">
                  <p className="arch-cell__sub">Objective {idx + 1}</p>
                  <p className="arch-cell__desc" style={{ marginBottom: 0, color: '#0f172a' }}>
                    {obj}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block" id="funded-projects">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Featured Funded Research Projects</h2>
              </div>
            </div>
            <div className="arch-grid arch-grid--3" style={{ marginBottom: '40px' }}>
              {FUNDED_RESEARCH_BROCHURE.map((p) => (
                <div key={p.title} className="arch-cell">
                  <p className="arch-cell__sub">Grant Value: Rs. {p.value}</p>
                  <h3 className="arch-cell__title" style={{ fontSize: '16.5px' }}>
                    {p.title}
                  </h3>
                  <p className="arch-cell__desc" style={{ marginBottom: '6px' }}>
                    <strong>Sponsor:</strong> {p.sponsor}
                  </p>
                  <p className="arch-cell__desc" style={{ marginBottom: 0 }}>
                    <strong>Timeline:</strong> {p.period}
                  </p>
                </div>
              ))}
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '14px' }}>
              Complete Sponsored Research Ledger (15 Studies)
            </h3>
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Title of Research Study / Project</th>
                    <th>Sector</th>
                    <th>Sponsoring Ministry / Organization</th>
                    <th>Sanction / Duration</th>
                    <th>Value (Rs.)</th>
                  </tr>
                </thead>
                <tbody>
                  {FUNDED_RESEARCH_EXTENDED.map((row) => (
                    <tr key={row.sl}>
                      <td>{row.sl}</td>
                      <td style={{ fontWeight: 600, color: '#0f172a' }}>{row.title}</td>
                      <td>{row.sector}</td>
                      <td>{row.sponsor}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>{row.sanction}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block section-block--white" id="publications">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Selected Research Publications</h2>
              </div>
            </div>
            <div className="arch-grid arch-grid--2">
              {PUBLICATIONS.map((pub) => (
                <div key={pub} className="arch-cell">
                  <p className="arch-cell__desc" style={{ marginBottom: 0, color: '#0f172a' }}>
                    {pub}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block" id="mous">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Memoranda of Understanding (MOUs)</h2>
              </div>
            </div>
            <div className="arch-grid arch-grid--3">
              {ACTIVE_MOUS.map((mou) => {
                const CardTag = mou.url ? 'a' : 'div';
                const linkProps = mou.url
                  ? {
                      href: mou.url,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      title: `Visit official website of ${mou.partner}`,
                    }
                  : {};

                return (
                  <CardTag
                    key={mou.partner}
                    className={`arch-cell mou-card ${mou.url ? 'mou-card--link' : ''}`}
                    {...linkProps}
                  >
                    {mou.logo && (
                      <div className="mou-card__logo-wrap">
                        <img
                          src={mou.logo}
                          alt={`${mou.partner} logo`}
                          className="mou-card__logo"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <h3 className="arch-cell__title" style={{ fontSize: '17px' }}>
                      {mou.partner}
                    </h3>
                    <p className="arch-cell__desc" style={{ marginBottom: 0 }}>
                      {mou.detail}
                    </p>
                  </CardTag>
                );
              })}
            </div>
          </AnimatedContent>
        </div>
      </section>
    </main>
  );
}
