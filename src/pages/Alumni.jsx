import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import AnimatedContent from '../components/reactbits/AnimatedContent';
import { ALUMNI_STORIES, ESTEEMED_CLIENTS } from '../data/rastaData';

export default function Alumni() {
  return (
    <main>
      <PageHeader
        title="RASTA Alumni and Industry Placement"
        description="More than 1,000 M.Tech graduates and 3 Ph.D. scholars serve across national highway agencies, research laboratories, and global engineering consultancies."
        breadcrumbs={[{ label: 'Alumni' }]}
      />

      <section className="section-block section-block--white">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Alumni Profiles and Achievements</h2>
              </div>
              <Link to="/contact" className="btn btn--primary">
                Connect With Alumni Cell
              </Link>
            </div>
            <div className="arch-grid arch-grid--3">
              {ALUMNI_STORIES.map((al) => (
                <div key={al.name} className="arch-cell">
                  <p className="arch-cell__sub">{al.batch}</p>
                  <h3 className="arch-cell__title">{al.name}</h3>
                  <p className="arch-cell__desc" style={{ fontWeight: 600, color: '#334155' }}>
                    {al.position}
                  </p>
                  <p className="arch-cell__desc" style={{ marginBottom: 0 }}>
                    {al.summary}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Industry Recruiters and Partner Organizations</h2>
              </div>
            </div>
            <div className="clients-ledger">
              {ESTEEMED_CLIENTS.map((org) => {
                const name = typeof org === 'string' ? org : org.name;
                const logo = typeof org === 'object' ? org.logo : null;
                return (
                  <div key={name} className="client-cell">
                    {logo && (
                      <div className="client-cell__logo-wrap">
                        <img
                          src={logo}
                          alt={`${name} logo`}
                          className="client-cell__logo"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <span className="client-cell__name">{name}</span>
                  </div>
                );
              })}
            </div>
          </AnimatedContent>
        </div>
      </section>
    </main>
  );
}
