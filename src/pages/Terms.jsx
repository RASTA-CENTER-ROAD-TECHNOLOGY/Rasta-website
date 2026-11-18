import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import AnimatedContent from '../components/reactbits/AnimatedContent';
import { CONTACT_DETAILS } from '../data/rastaData';

const LEGAL_SECTIONS = [
  {
    title: 'Acceptance of Terms',
    paragraphs: [
      'This website provides official academic, training, research, and consultancy information for RASTA - Center for Road Technology, Bengaluru.',
      'By accessing or reading materials on this website, you agree to comply with these Terms and Conditions and applicable Indian laws.',
    ],
  },
  {
    title: 'Postgraduate Admissions and Statutory Governance',
    paragraphs: [
      'M.Tech, Ph.D., and M.Sc. (Engg.) programs at RASTA operate under the regulations of Visvesvaraya Technological University (VTU), Belgaum, and the All India Council for Technical Education (AICTE), New Delhi.',
      'Admission eligibility, curriculum structure, fee schedules, and examination rules remain subject to periodic updates issued by VTU, AICTE, and the RASTA Independent Trust.',
    ],
  },
  {
    title: 'Laboratory Testing and Technical Reports',
    paragraphs: [
      'Laboratory material tests are executed in accordance with NABL ISO/IEC 17025:2017 accreditation scope, Bureau of Indian Standards (BIS), Indian Roads Congress (IRC), and MoRT&H specifications.',
      'Test results apply solely to the samples received and tested at RASTA facilities or evaluated during recorded field investigations. Technical audit recommendations are advisory engineering assessments based on site data available at inspection time.',
    ],
  },
  {
    title: 'Copyright Disclaimer',
    paragraphs: [
      'All content, logos, photographs, technical tables, training manuals, and downloadable brochure PDFs published on this portal are the intellectual property of RASTA - Center for Road Technology and its Independent Trust (Volvo India Pvt. Ltd.).',
      'Client trademarks, agency emblems, and partner logos belong to their respective government and corporate owners and appear strictly to identify documented engagements from published RASTA brochures.',
      'You must not reproduce, redistribute, or modify institutional documents or training publications for commercial distribution without prior written authorization from RASTA.',
    ],
  },
  {
    title: 'Data Privacy and Legal Jurisdiction',
    paragraphs: [
      `Information submitted through inquiry forms or directed to ${CONTACT_DETAILS.email} is used solely to process academic admissions, corporate training nominations, or technical testing requests.`,
      'Any disputes arising from the use of this website or institutional services fall under the exclusive jurisdiction of competent courts in Bengaluru, Karnataka, India.',
    ],
  },
];

export default function Terms() {
  return (
    <main>
      <PageHeader
        title="Terms, Conditions, and Copyright Disclaimer"
        description="Governing terms for academic portals, NABL ISO/IEC 17025:2017 laboratory reporting, and intellectual property protection."
        breadcrumbs={[{ label: 'Terms and Conditions' }]}
      />

      <section className="section-block section-block--white">
        <div className="container">
          <AnimatedContent distance={28} duration={0.65}>
            <div className="arch-grid arch-grid--1">
              {LEGAL_SECTIONS.map((sec) => (
                <div key={sec.title} className="arch-cell">
                  <h2 className="arch-cell__title">{sec.title}</h2>
                  {sec.paragraphs.map((text, idx) => (
                    <p
                      key={text}
                      className="arch-cell__desc"
                      style={{ marginBottom: idx === sec.paragraphs.length - 1 ? 0 : '10px' }}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </AnimatedContent>
        </div>
      </section>
    </main>
  );
}
