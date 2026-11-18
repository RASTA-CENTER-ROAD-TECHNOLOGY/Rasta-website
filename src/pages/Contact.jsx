import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import AnimatedContent from '../components/reactbits/AnimatedContent';
import { CONTACT_DETAILS } from '../data/rastaData';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Academics / M.Tech Admissions',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <PageHeader
        title="Contact RASTA - Center for Road Technology"
        description="Reach our academic admissions team, training coordinators, consultancy desk, or NABL testing laboratory at Peenya Industrial Area, Bengaluru."
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <section className="section-block section-block--white">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="arch-grid arch-grid--2">
              <div className="arch-cell">
                <p className="arch-cell__sub">Campus Address and Telephones</p>
                <h2 className="arch-cell__title">Peenya Campus Headquarters</h2>
                <p className="arch-cell__desc" style={{ color: '#0f172a', fontWeight: 500 }}>
                  {CONTACT_DETAILS.address}
                </p>

                <div style={{ marginBottom: '18px' }}>
                  <div style={{ fontWeight: 600, fontSize: '13.5px', marginBottom: '4px' }}>
                    Landline Numbers
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13.5px', color: '#0f3d7a' }}>
                    {CONTACT_DETAILS.landlines.join(' / ')}
                  </div>
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <div style={{ fontWeight: 600, fontSize: '13.5px', marginBottom: '4px' }}>
                    General Helpline and Training Desk
                  </div>
                  <div style={{ fontSize: '14px', color: '#334155' }}>
                    Primary Call / WhatsApp: {CONTACT_DETAILS.primaryMobile}
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#475569' }}>
                    Training Phones: {CONTACT_DETAILS.trainingHelplines.join(', ')}
                  </div>
                </div>

                <div style={{ marginBottom: '0px' }}>
                  <div style={{ fontWeight: 600, fontSize: '13.5px', marginBottom: '4px' }}>
                    Official Electronic Contact
                  </div>
                  <div>
                    Email:{' '}
                    <a href={`mailto:${CONTACT_DETAILS.email}`}>{CONTACT_DETAILS.email}</a>
                  </div>
                  <div>Website: {CONTACT_DETAILS.website}</div>
                </div>
              </div>

              <div className="arch-cell">
                <p className="arch-cell__sub">Request Information or Quote</p>
                <h2 className="arch-cell__title">Send an Inquiry</h2>

                {submitted ? (
                  <div className="notice-box">
                    <strong>Inquiry Recorded</strong>
                    <p style={{ margin: '8px 0 0' }}>
                      Thank you, {formState.name || 'Visitor'}. Your inquiry regarding{' '}
                      <strong>{formState.category}</strong> is ready. For immediate response, send
                      your message directly to{' '}
                      <a href={`mailto:${CONTACT_DETAILS.email}`}>{CONTACT_DETAILS.email}</a> or call{' '}
                      {CONTACT_DETAILS.primaryMobile}.
                    </p>
                    <button
                      type="button"
                      className="btn btn--secondary"
                      style={{ marginTop: '14px' }}
                      onClick={() => setSubmitted(false)}
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form className="form-stack" onSubmit={handleSubmit}>
                    <div className="form-field">
                      <label htmlFor="inq-name">Full Name *</label>
                      <input
                        id="inq-name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="inq-email">Email Address *</label>
                      <input
                        id="inq-email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="inq-phone">Mobile Number</label>
                      <input
                        id="inq-phone"
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="+91"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="inq-cat">Department / Subject</label>
                      <select
                        id="inq-cat"
                        value={formState.category}
                        onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                      >
                        <option>Academics / M.Tech Admissions</option>
                        <option>Training and Workshops</option>
                        <option>Consultancy and DPR Services</option>
                        <option>NABL Material Testing</option>
                        <option>Research and Ph.D. Inquiry</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label htmlFor="inq-msg">Message *</label>
                      <textarea
                        id="inq-msg"
                        rows={4}
                        required
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="State your academic, training, testing, or consultancy requirements"
                      />
                    </div>
                    <button type="submit" className="btn btn--primary">
                      Prepare Inquiry
                    </button>
                  </form>
                )}
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
                <h2 className="section-head__title">Direct Officials</h2>
              </div>
            </div>
            <div className="arch-grid arch-grid--3">
              {CONTACT_DETAILS.people.map((person) => (
                <div key={person.name} className="arch-cell">
                  <p className="arch-cell__sub">{person.role}</p>
                  <h3 className="arch-cell__title" style={{ fontSize: '18px' }}>
                    {person.name}
                  </h3>
                  <p className="arch-cell__desc" style={{ marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                    {person.phone}
                  </p>
                  <a href={`mailto:${person.email}`} className="arch-cell__link">
                    {person.email}
                  </a>
                </div>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </section>
    </main>
  );
}
