import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import AnimatedContent from '../components/reactbits/AnimatedContent';
import {
  ADVISORY_COUNCIL_2024_25,
  INSTITUTE_INFO,
  MANAGEMENT_TRUSTEES,
  OUTREACH_MILESTONES,
  TECHNICAL_ADVISORS_HISTORY,
} from '../data/rastaData';

export default function About() {
  return (
    <main>
      <PageHeader
        title="About RASTA - Center for Road Technology"
        description="Founded in 2002 in Bengaluru to unite highway engineering education, applied research, and construction practice."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      <section className="section-block section-block--white" id="genesis">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Institutional History and Purpose</h2>
              </div>
            </div>

            <div className="arch-grid arch-grid--2">
              <div className="arch-cell">
                <p className="arch-cell__sub">Established in Bengaluru in 2002</p>
                <h3 className="arch-cell__title">{INSTITUTE_INFO.acronymExpansion}</h3>
                <p className="arch-cell__desc">{INSTITUTE_INFO.founderNote}</p>
                <p className="arch-cell__desc">{INSTITUTE_INFO.governanceNote}</p>
                <p className="arch-cell__desc" style={{ marginBottom: 0 }}>
                  {INSTITUTE_INFO.preamble}
                </p>
              </div>
              <div className="photo-card">
                <img
                  src="/images/rasta-campus-lobby.jpg"
                  alt="RASTA Center for Road Technology entrance at Volvo Peenya campus"
                  className="photo-card__img"
                  style={{ height: '280px' }}
                />
                <div className="photo-card__body">
                  <div className="photo-card__sub">Peenya Campus, Bengaluru</div>
                  <p className="photo-card__text">
                    Volvo Construction Equipment Campus, Peenya Industrial Area, Bengaluru - 560058.
                  </p>
                </div>
              </div>
            </div>

            <div className="arch-grid arch-grid--2" style={{ marginTop: '24px' }}>
              <div className="arch-cell arch-cell--tinted">
                <p className="arch-cell__sub">Vision</p>
                <h3 className="arch-cell__title">Centre of Excellence</h3>
                <p className="arch-cell__desc" style={{ marginBottom: 0, fontSize: '16px', color: '#0f172a' }}>
                  {INSTITUTE_INFO.vision}
                </p>
              </div>
              <div className="arch-cell arch-cell--tinted">
                <p className="arch-cell__sub">Mission</p>
                <h3 className="arch-cell__title">Knowledge Dissemination</h3>
                <p className="arch-cell__desc" style={{ marginBottom: 0, fontSize: '16px', color: '#0f172a' }}>
                  {INSTITUTE_INFO.mission}
                </p>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block" id="experts">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Eminent Experts and Technical Advisors</h2>
              </div>
              <p className="section-head__sub">
                Distinguished civil engineering professors have guided RASTA technical policy since
                its inception in 2002.
              </p>
            </div>
            <div className="arch-grid arch-grid--3">
              {TECHNICAL_ADVISORS_HISTORY.map((expert) => (
                <div key={expert.name} className="photo-card">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="photo-card__img photo-card__img--portrait"
                  />
                  <div className="photo-card__body">
                    <div className="photo-card__sub">{expert.tenure}</div>
                    <h3 className="photo-card__title">{expert.name}</h3>
                    <p className="photo-card__text" style={{ fontWeight: 600, marginBottom: '8px' }}>
                      {expert.role}
                    </p>
                    <p className="photo-card__text">{expert.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block section-block--white" id="management">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Management and Board of Trustees</h2>
              </div>
              <p className="section-head__sub">
                RASTA operates as an independent non-profit trust supported by Volvo Group India and
                industry executives.
              </p>
            </div>
            <div className="arch-grid arch-grid--3">
              {MANAGEMENT_TRUSTEES.map((person) => (
                <div key={person.name} className="arch-cell">
                  <p className="arch-cell__sub">{person.title}</p>
                  <h3 className="arch-cell__title">{person.name}</h3>
                  <p className="arch-cell__desc" style={{ fontWeight: 600, color: '#334155' }}>
                    {person.affiliation}
                  </p>
                  <p className="arch-cell__desc" style={{ marginBottom: 0 }}>
                    {person.summary}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block" id="advisory-council">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">RASTA Advisory Council (2024-2025)</h2>
              </div>
              <p className="section-head__sub">
                Sixteen national highway administrators, directors, and professors form the RASTA
                Advisory Council.
              </p>
            </div>
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Member Name</th>
                    <th>Designation and Organization</th>
                  </tr>
                </thead>
                <tbody>
                  {ADVISORY_COUNCIL_2024_25.map((m) => (
                    <tr key={m.sl}>
                      <td>{m.sl}</td>
                      <td style={{ fontWeight: 600, color: '#0f172a' }}>{m.name}</td>
                      <td>{m.designation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block section-block--white" id="outreach">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Conferences, ROADTECH, and Industry Expos</h2>
              </div>
              <p className="section-head__sub">
                Key milestones from facility inauguration in 2008 to NHAI MANTHAN Expo participation.
              </p>
            </div>
            <div className="arch-grid arch-grid--3">
              {OUTREACH_MILESTONES.map((item) => (
                <div key={item.title} className="photo-card">
                  <img src={item.image} alt={item.title} className="photo-card__img" />
                  <div className="photo-card__body">
                    <div className="photo-card__sub">Year {item.year}</div>
                    <h3 className="photo-card__title">{item.title}</h3>
                    <p className="photo-card__text">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </section>
    </main>
  );
}
