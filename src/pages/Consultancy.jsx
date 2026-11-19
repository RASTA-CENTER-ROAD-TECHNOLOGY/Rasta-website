import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import AnimatedContent from '../components/reactbits/AnimatedContent';
import { CONSULTANCY_DOMAINS, INSTITUTE_INFO } from '../data/rastaData';

const FIELD_GALLERY = [
  {
    src: '/images/brochure/cons_p11_1_348x288.jpeg',
    title: 'Benkelman Beam Deflection Studies',
    sub: 'Structural Evaluation',
  },
  {
    src: '/images/brochure/cons_p11_4_348x288.jpeg',
    title: 'MERLIN for Roughness Studies',
    sub: 'Unevenness Survey',
  },
  {
    src: '/images/brochure/cons_p11_2_348x288.jpeg',
    title: 'Core Cutting Tests on Bituminous Layers',
    sub: 'Layer Verification',
  },
  {
    src: '/images/brochure/cons_p11_5_348x286.jpeg',
    title: 'Skid Resistance Test Using British Pendulum Tester',
    sub: 'Surface Friction',
  },
  {
    src: '/images/brochure/cons_p11_3_348x288.jpeg',
    title: 'Traffic Volume Count',
    sub: 'Traffic Engineering',
  },
  {
    src: '/images/brochure/cons_p11_6_348x286.jpeg',
    title: 'Axle Load Studies',
    sub: 'Pavement Loading',
  },
];

export default function Consultancy() {
  return (
    <main>
      <PageHeader
        title="Highway Consultancy and Engineering Services"
        description="Helping government and corporate clients build safe, durable roads right the first time through technical audits, pavement design, and DPR preparation."
        breadcrumbs={[{ label: 'Consultancy' }]}
      />

      <section className="section-block section-block--white">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">National Technical Agency Roles</h2>
              </div>
              <Link to="/projects" className="btn btn--primary">
                View Consultancy Projects
              </Link>
            </div>
            <div className="arch-grid arch-grid--3">
              <div className="arch-cell arch-cell--tinted">
                <p className="arch-cell__sub">PMGSY Karnataka</p>
                <h3 className="arch-cell__title">State Technical Agency (STA)</h3>
                <p className="arch-cell__desc" style={{ marginBottom: 0 }}>
                  Recognized as the State Technical Agency (STA) for Pradhan Mantri Gram Sadak Yojana
                  (PMGSY) for technical and commercial scrutiny of rural road projects in Karnataka.
                </p>
              </div>
              <div className="arch-cell arch-cell--tinted">
                <p className="arch-cell__sub">World Bank and PAC</p>
                <h3 className="arch-cell__title">7-State Citizen Monitoring</h3>
                <p className="arch-cell__desc" style={{ marginBottom: 0 }}>
                  Technical Partner to Public Awareness Centre (PAC) for Citizen Monitoring of PMGSY
                  Rural Roads in Assam, Jharkhand, Karnataka, Meghalaya, Odisha, Rajasthan, and
                  Uttarakhand.
                </p>
              </div>
              <div className="arch-cell arch-cell--tinted">
                <p className="arch-cell__sub">IRC and BIS Panels</p>
                <h3 className="arch-cell__title">Standards Formulation</h3>
                <p className="arch-cell__desc" style={{ marginBottom: 0 }}>
                  Faculty members of RASTA serve on technical committees of the Indian Roads Congress
                  (IRC) and Bureau of Indian Standards (BIS) to formulate highway specifications.
                </p>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Complete Consultancy Service Matrix</h2>
              </div>
              <Link to="/laboratories" className="btn btn--secondary">
                Inspect 62 NABL Tests
              </Link>
            </div>
            <div className="arch-grid arch-grid--2">
              {CONSULTANCY_DOMAINS.map((domain) => (
                <div key={domain.title} className="arch-cell">
                  <h3 className="arch-cell__title">{domain.title}</h3>
                  <ul className="arch-list" style={{ marginBottom: 0 }}>
                    {domain.services.map((srv) => (
                      <li key={srv}>{srv}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block section-block--white">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Field Investigation and Survey Methods</h2>
              </div>
            </div>
            <div className="arch-grid arch-grid--3">
              {FIELD_GALLERY.map((item) => (
                <div key={item.title} className="photo-card">
                  <img src={item.src} alt={item.title} className="photo-card__img" />
                  <div className="photo-card__body">
                    <div className="photo-card__sub">{item.sub}</div>
                    <h3 className="photo-card__title">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block section-block--tint">
        <div className="container">
          <div className="notice-box">
            <strong>Consultancy Inquiries:</strong> Contact Dr. K. M. Mallesha at +91 99009 23722 or
            email {INSTITUTE_INFO.shortName} at group.rasta@rastaindia.com for Project Management
            Consultancy, Third-Party Audits, DPR preparation, or NABL testing quotes.
          </div>
        </div>
      </section>
    </main>
  );
}
