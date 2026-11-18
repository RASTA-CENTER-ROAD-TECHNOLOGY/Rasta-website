import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import CardNav from './CardNav';

const RouterNavLink = forwardRef(({ href = '/', className, children, ...rest }, ref) => {
  const isExternal =
    href.startsWith('http') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.endsWith('.pdf');
  if (isExternal) {
    return (
      <a
        ref={ref}
        href={href}
        className={className}
        target={href.startsWith('http') || href.endsWith('.pdf') ? '_blank' : undefined}
        rel="noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link ref={ref} to={href} className={className} {...rest}>
      {children}
    </Link>
  );
});

RouterNavLink.displayName = 'RouterNavLink';

const cardNavItems = [
  {
    label: 'Institution',
    description: 'Volvo Group initiative founded in 2002 to unite academic learning with field execution.',
    links: [
      { label: 'Home Overview', href: '/' },
      { label: 'About RASTA', href: '/about' },
      { label: 'Management & Advisory Council', href: '/about#management' },
      { label: 'Alumni Network', href: '/alumni' },
      { label: 'Terms and Conditions', href: '/terms' },
    ],
  },
  {
    label: 'Academic',
    description: 'VTU Extension Center and AICTE approved postgraduate highway programs.',
    links: [
      { label: 'Affiliation and Courses', href: '/academics' },
      { label: 'Faculty and Staff', href: '/academics#faculty' },
      { label: 'Campus Infrastructure & Library', href: '/academics#infrastructure' },
      { label: 'Placement and Announcements', href: '/academics#placement' },
      { label: 'Download Brochure PDF', href: '/RASTA_Complete_College_Brochure_2026.pdf' },
    ],
  },
  {
    label: 'Training and R&D',
    description: 'More than 3,300 engineers trained and 15+ sponsored highway research grants.',
    links: [
      { label: 'Training Programs', href: '/training' },
      { label: 'Training Calendar 2025-26', href: '/training#calendar' },
      { label: 'Resource Persons & Events', href: '/training#resource-persons' },
      { label: 'R&D Funded Projects', href: '/research' },
      { label: 'Publications and MOUs', href: '/research#publications' },
    ],
  },
  {
    label: 'Consultancy and Labs',
    description: 'NABL ISO/IEC 17025:2017 testing facility, PMGSY STA, and highway audits.',
    links: [
      { label: 'Consultancy Services', href: '/consultancy' },
      { label: 'NABL Laboratories', href: '/laboratories' },
      { label: '62 Testing Facilities', href: '/laboratories#testing-facilities' },
      { label: '100+ Projects Portfolio', href: '/projects' },
      { label: 'Contact RASTA', href: '/contact' },
    ],
  },
];

export default function DesktopNavBar() {
  return (
    <header className="desktop-header-shell">
      <div className="desktop-cardnav-wrap">
        <div className="container">
          <CardNav
            logo="/images/rasta-logo.png"
            logoAlt="RASTA - Center for Road Technology"
            logoHref="/"
            items={cardNavItems}
            cta={{ label: 'Contact Us', href: '/contact' }}
            theme="light"
            surface="glass"
            cardEffect="rise"
            openOn="click"
            maxWidth={1180}
            cardHeight={184}
            accentColor="#003366"
            linkComponent={RouterNavLink}
            style={{ '--cn-radius': '0px', '--cn-bar': '56px' }}
          />
        </div>
      </div>
    </header>
  );
}
