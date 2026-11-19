import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import AnimatedContent from '../components/reactbits/AnimatedContent';
import {
  ACADEMIC_INFRASTRUCTURE,
  ACADEMIC_PROGRAMS,
  FACULTY_ROSTER,
  TRAINING_CALENDAR_2025_26,
} from '../data/rastaData';

export default function Academics() {
  return (
    <main>
      <PageHeader
        title="Academics, Programs, and Faculty"
        description="AICTE approved and VTU affiliated Extension and Research Center offering postgraduate degrees, diplomas, and doctoral research."
        breadcrumbs={[{ label: 'Academic' }]}
      />

      <section className="section-block section-block--white" id="affiliation">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div className="vtu-title-wrapper">
                <img
                  src="/logos/vtu-logo.png"
                  alt="VTU Emblem"
                  className="vtu-watermark-logo"
                  aria-hidden="true"
                />
                <h2 className="section-head__title">VTU Extension Center and AICTE Approval</h2>
              </div>
            </div>
            <div className="notice-box">
              RASTA - Center for Road Technology is approved by the All India Council for Technical
              Education (AICTE), New Delhi, and operates as a recognized Extension and Research Center
              of Visvesvaraya Technological University (VTU), Belgaum. Approximately 1,000 graduates
              have received M.Tech degrees in Highway Technology and Infrastructure Management, and 3
              Ph.D. degrees have been awarded through the RASTA Research Center.
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block" id="programs">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Academic Courses Offered</h2>
              </div>
              <p className="section-head__sub">
                Each program combines classroom theory with NABL laboratory experimentation and field
                highway visits.
              </p>
            </div>
            <div className="arch-grid arch-grid--2">
              {ACADEMIC_PROGRAMS.map((prog) => (
                <div key={prog.code} className="arch-cell">
                  <p className="arch-cell__sub">{prog.code} - {prog.duration}</p>
                  <h3 className="arch-cell__title">{prog.title}</h3>
                  <p className="arch-cell__desc">
                    <strong>Objectives:</strong> {prog.objectives}
                  </p>
                  <p className="arch-cell__desc" style={{ marginBottom: 0 }}>
                    <strong>Scope:</strong> {prog.scope}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block section-block--white" id="faculty">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Academic Leadership, Faculty, and Technical Staff</h2>
              </div>
              <p className="section-head__sub">
                Supported by full-time academicians, road construction specialists, and guest faculty
                from national research institutions.
              </p>
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>
              Institutional Leadership and Business Development
            </h3>
            <div className="arch-grid arch-grid--4" style={{ marginBottom: '40px' }}>
              {FACULTY_ROSTER.leadership.map((item) => (
                <div key={item.name} className="arch-cell arch-cell--faculty">
                  {item.image && (
                    <div className="faculty-card__media">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="faculty-card__img"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="faculty-card__body">
                    <h4 className="arch-cell__title" style={{ fontSize: '17px' }}>
                      {item.name}
                    </h4>
                    <p className="arch-cell__desc">{item.role}</p>
                    {item.email && (
                      <a href={`mailto:${item.email}`} className="arch-cell__link">
                        <Mail size={14} aria-hidden="true" />
                        <span>{item.email}</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>
              Full-Time Teaching Faculty
            </h3>
            <div className="arch-grid arch-grid--4" style={{ marginBottom: '40px' }}>
              {FACULTY_ROSTER.teaching.map((f) => (
                <div key={f.name} className="arch-cell arch-cell--faculty">
                  {f.image && (
                    <div className="faculty-card__media">
                      <img
                        src={f.image}
                        alt={f.name}
                        className="faculty-card__img"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="faculty-card__body">
                    <p className="arch-cell__sub">{f.division}</p>
                    <h4 className="arch-cell__title" style={{ fontSize: '17px' }}>
                      {f.name}
                    </h4>
                    <p className="arch-cell__desc">{f.role}</p>
                    {f.email && (
                      <a href={`mailto:${f.email}`} className="arch-cell__link">
                        <Mail size={14} aria-hidden="true" />
                        <span>{f.email}</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="arch-grid arch-grid--2">
              <div className="arch-cell">
                <h4 className="arch-cell__title">Guest Faculty</h4>
                <ul className="arch-list" style={{ marginBottom: 0 }}>
                  {FACULTY_ROSTER.guestFaculty.map((g) => (
                    <li key={g.name}>
                      <strong>{g.name}</strong> - {g.role}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="arch-cell">
                <h4 className="arch-cell__title">Support and Laboratory Staff</h4>
                <ul className="arch-list" style={{ marginBottom: 0 }}>
                  {FACULTY_ROSTER.supportStaff.map((s) => (
                    <li key={s.name}>
                      <strong>{s.name}</strong> ({s.role}){s.contact ? ` - ${s.contact}` : ''}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block" id="infrastructure">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Classrooms, Technical Library, and E-Resources</h2>
              </div>
            </div>

            <div className="arch-grid arch-grid--3" style={{ marginBottom: '28px' }}>
              <div className="photo-card">
                <img
                  src="/images/brochure/acad_p3_4_1044x654.jpeg"
                  alt="RASTA Technical Library"
                  className="photo-card__img"
                />
                <div className="photo-card__body">
                  <h3 className="photo-card__title">Technical Reference Library</h3>
                  <p className="photo-card__text">{ACADEMIC_INFRASTRUCTURE.library.summary}</p>
                </div>
              </div>
              <div className="photo-card">
                <img
                  src="/images/computer-lab.jpg"
                  alt="RASTA Computer Laboratory"
                  className="photo-card__img"
                />
                <div className="photo-card__body">
                  <h3 className="photo-card__title">Computer Laboratory</h3>
                  <p className="photo-card__text">{ACADEMIC_INFRASTRUCTURE.computerLab}</p>
                </div>
              </div>
              <div className="photo-card">
                <img
                  src="/images/brochure/acad_p3_6_964x630.jpeg"
                  alt="RASTA Lecture Classrooms"
                  className="photo-card__img"
                />
                <div className="photo-card__body">
                  <h3 className="photo-card__title">Classrooms and Seminar Halls</h3>
                  <p className="photo-card__text">{ACADEMIC_INFRASTRUCTURE.classrooms}</p>
                </div>
              </div>
            </div>

            <div className="arch-cell" id="e-resources">
              <h3 className="arch-cell__title">Digital Engineering Tools and Journals</h3>
              <ul className="arch-list" style={{ marginBottom: 0 }}>
                {ACADEMIC_INFRASTRUCTURE.library.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="section-block section-block--white" id="placement">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="section-head">
              <div>
                <h2 className="section-head__title">Student Placement, Announcements, and ROADTECH</h2>
              </div>
            </div>

            <div className="arch-grid arch-grid--2" id="announcements">
              <div className="arch-cell">
                <p className="arch-cell__sub">ROADTECH National Conference (Since 2008)</p>
                <h3 className="arch-cell__title">Where Talent Meets Opportunities</h3>
                <p className="arch-cell__desc">
                  ROADTECH is a two-day national conference on road infrastructure technologies
                  organized by M.Tech students of RASTA. Civil engineering students from across
                  India submit technical papers and participate in interactive sessions.
                </p>
                <Link to="/about#outreach" className="arch-cell__link">
                  View Outreach Gallery
                </Link>
              </div>
              <div className="arch-cell">
                <p className="arch-cell__sub">Admissions and Placement</p>
                <h3 className="arch-cell__title">M.Tech Admissions and Industry Onboarding</h3>
                <p className="arch-cell__desc">
                  Applications are invited for M.Tech in Highway Technology (CHT) and Infrastructure
                  Construction and Management (CIM). Construction firms, design consultants, and
                  highway agencies recruit RASTA graduates for immediate project deployment.
                </p>
                <Link to="/contact" className="arch-cell__link">
                  Contact Admissions Office
                </Link>
              </div>
            </div>

            <div style={{ marginTop: '28px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '14px' }}>
                Upcoming Technical Enrichment Schedule (2025-2026)
              </h3>
              <div className="table-scroll">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Sl. No.</th>
                      <th>Program Title</th>
                      <th>Duration</th>
                      <th>Schedule</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRAINING_CALENDAR_2025_26.slice(0, 4).map((row) => (
                      <tr key={row.sl}>
                        <td>{row.sl}</td>
                        <td style={{ fontWeight: 600, color: '#0f172a' }}>{row.title}</td>
                        <td>{row.duration}</td>
                        <td>{row.schedule}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>
    </main>
  );
}
