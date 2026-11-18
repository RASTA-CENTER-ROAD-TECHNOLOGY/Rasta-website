import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, GraduationCap, Briefcase } from 'lucide-react';
import { CONTACT_DETAILS } from '../../data/rastaData';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__top-bar" aria-hidden="true" />
      <div className="container site-footer__grid">
        <div className="site-footer__brand-col">
          <Link to="/" className="site-footer__logo-link">
            <img
              src="/images/rasta-dark-logo.png"
              alt="RASTA Center for Road Technology"
              className="site-footer__logo"
            />
          </Link>
          <p className="site-footer__about">
            Resource Centre for Asphalt and Soil Training Academy. Center for Road Technology
            established in Bengaluru in 2002 as an initiative by the Volvo Group.
          </p>
          <div className="site-footer__address">
            <div>{CONTACT_DETAILS.address}</div>
            <div>Landline: {CONTACT_DETAILS.landlines.join(' / ')}</div>
            <div>Email: {CONTACT_DETAILS.email}</div>
          </div>
          <div className="site-footer__social" aria-label="Social and brochure quick links">
            <a
              href={CONTACT_DETAILS.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="site-footer__social-btn site-footer__social-btn--linkedin"
              data-tooltip="LinkedIn"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <Linkedin size={19} />
            </a>
            <a
              href={CONTACT_DETAILS.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="site-footer__social-btn site-footer__social-btn--instagram"
              data-tooltip="Instagram"
              title="Instagram"
              aria-label="Instagram"
            >
              <Instagram size={19} />
            </a>
            <a
              href="/RASTA_Academic_Brochure.pdf"
              target="_blank"
              rel="noreferrer"
              className="site-footer__social-btn site-footer__social-btn--academic"
              data-tooltip="Academic Brochure (PDF)"
              title="Academic Brochure (PDF)"
              aria-label="Download Academic Brochure (PDF)"
            >
              <GraduationCap size={19} />
            </a>
            <a
              href="/RASTA_Consultancy_Brochure_2025.pdf"
              target="_blank"
              rel="noreferrer"
              className="site-footer__social-btn site-footer__social-btn--consultancy"
              data-tooltip="Consultancy Brochure (PDF)"
              title="Consultancy Brochure (PDF)"
              aria-label="Download Consultancy Brochure (PDF)"
            >
              <Briefcase size={19} />
            </a>
          </div>
        </div>

        <div className="site-footer__col">
          <h3 className="site-footer__heading">Academic</h3>
          <ul className="site-footer__links">
            <li><Link to="/academics#affiliation">VTU Affiliation</Link></li>
            <li><Link to="/academics#programs">PG and Ph.D. Programs</Link></li>
            <li><Link to="/academics#faculty">Faculty Roster</Link></li>
            <li><Link to="/academics#infrastructure">Library and E-Resources</Link></li>
            <li><Link to="/alumni">Alumni Network</Link></li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h3 className="site-footer__heading">Training and R&D</h3>
          <ul className="site-footer__links">
            <li><Link to="/training">Training Programs</Link></li>
            <li><Link to="/training#calendar">Training Calendar 2025-26</Link></li>
            <li><Link to="/research">Funded R&D Projects</Link></li>
            <li><Link to="/research#publications">Technical Publications</Link></li>
            <li><Link to="/research#mous">Industry MOUs</Link></li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h3 className="site-footer__heading">Consultancy and Legal</h3>
          <ul className="site-footer__links">
            <li><Link to="/consultancy">Consultancy Services</Link></li>
            <li><Link to="/laboratories">NABL ISO/IEC 17025:2017 Labs</Link></li>
            <li><Link to="/projects">Projects Portfolio</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/terms">Terms and Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <div className="site-footer__copyright">
            Copyright {year} RASTA - Center for Road Technology. Managed by an Independent Trust of Volvo India Pvt. Ltd. All rights reserved.
          </div>
          <div className="site-footer__disclaimer">
            Academic programs are affiliated to VTU, Belgaum and approved by AICTE. Laboratory testing conforms to NABL ISO/IEC 17025:2017, BIS, IRC, and MoRT&amp;H standards.{' '}
            <Link to="/terms">Read Terms and Copyright Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
