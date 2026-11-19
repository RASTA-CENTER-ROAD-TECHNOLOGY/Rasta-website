import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import AnimatedContent from '../components/reactbits/AnimatedContent';
import {
  RESOURCE_PERSONS,
  TRAINING_CALENDAR_2025_26,
  TRAINING_TOPICS,
  WORKSHOPS_AND_EVENTS,
} from '../data/rastaData';

export default function Training() {
  return (
    <main>
      <PageHeader
        title="Professional Training and Continuing Education"
        description="More than 3,300 practicing engineers from government agencies, construction companies, and consulting firms trained at RASTA and on job sites."
        breadcrumbs={[{ label: 'Training' }]}
      />

      <section className="section-block section-block--white" id="programs">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Specialized Training Programs</h2>
              </div>
              <Link to="/contact" className="btn btn--primary">
                Request Corporate Training
              </Link>
            </div>
            <div className="arch-grid arch-grid--2" style={{ marginBottom: '32px' }}>
              <div className="arch-cell">
                <p className="arch-cell__sub">1 to 15 Days Duration</p>
                <h3 className="arch-cell__title">Campus and On-Site Workshops</h3>
                <p className="arch-cell__desc">
                  RASTA conducts custom short-term programs ranging from 1 day to 15 days based on
                  client specifications. Training occurs both at the RASTA Peenya campus and directly
                  at highway project job sites.
                </p>
                <p className="arch-cell__desc" style={{ marginBottom: 0 }}>
                  Participants receive completion certificates issued jointly with VTU or
                  independently by RASTA.
                </p>
              </div>
              <div className="arch-cell arch-cell--tinted">
                <p className="arch-cell__sub">Training Helpline</p>
                <h3 className="arch-cell__title">Direct Training Coordinators</h3>
                <ul className="arch-list" style={{ marginBottom: 0 }}>
                  <li>Phone: +91 98805 49544 / +91 97313 39914</li>
                  <li>Alternate Numbers: +91 93435 09933 / +91 98862 78478</li>
                  <li>Email: group.rasta@rastaindia.com</li>
                  <li>Venue: VOLVO Construction Equipment Campus, Peenya Industrial Area, Bengaluru - 560058</li>
                </ul>
              </div>
            </div>

            <h3 id="topics" style={{ fontFamily: 'var(--font-serif)', marginBottom: '14px' }}>
              14 Core Highway Training Subjects
            </h3>
            <div className="clients-ledger">
              {TRAINING_TOPICS.map((topic, idx) => (
                <div key={topic} className="client-cell">
                  <span style={{ color: '#0f3d7a', fontWeight: 700, marginRight: '8px' }}>
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  {topic}
                </div>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block" id="calendar">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">RASTA Training Calendar 2025-2026</h2>
              </div>
            </div>
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Sl. No.</th>
                    <th>Proposed Training Program</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {TRAINING_CALENDAR_2025_26.map((item) => (
                    <tr key={item.sl}>
                      <td>{item.sl}</td>
                      <td style={{ fontWeight: 600, color: '#0f172a' }}>{item.title}</td>
                      <td>{item.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block section-block--white" id="resource-persons">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Distinguished Workshop Resource Persons</h2>
              </div>
            </div>
            <div className="arch-grid arch-grid--3">
              {RESOURCE_PERSONS.map((rp) => (
                <div key={rp.name} className="arch-cell">
                  <h3 className="arch-cell__title" style={{ fontSize: '17px' }}>
                    {rp.name}
                  </h3>
                  <p className="arch-cell__desc" style={{ marginBottom: 0 }}>
                    {rp.role}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block" id="workshops">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Workshops, Symposiums, and FDPs Conducted</h2>
              </div>
            </div>
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Event Title</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {WORKSHOPS_AND_EVENTS.map((ev) => (
                    <tr key={ev.title}>
                      <td style={{ whiteSpace: 'nowrap' }}>{ev.date}</td>
                      <td style={{ fontWeight: 600, color: '#0f172a' }}>{ev.title}</td>
                      <td>{ev.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedContent>
        </div>
      </section>
    </main>
  );
}
