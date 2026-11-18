import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Phone } from 'lucide-react';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar';

const DesktopNavBar = lazy(() => import('./DesktopNavBar'));
const AppSidebar = lazy(() => import('./AppSidebar'));

function NavFallback() {
  return <div className="nav-loading-bar" aria-hidden="true" />;
}

export default function ResponsiveNavigation({ isMobile, children }) {
  if (isMobile) {
    return (
      <SidebarProvider defaultOpen={false} isMobileViewport={true}>
        <Suspense fallback={<NavFallback />}>
          <AppSidebar />
        </Suspense>
        <SidebarInset>
          <header className="mobile-top-header">
            <div className="mobile-top-header__left">
              <SidebarTrigger />
              <Link to="/" className="mobile-top-header__brand">
                <img src="/images/rasta-logo.png" alt="RASTA Center for Road Technology" />
              </Link>
            </div>
            <div className="mobile-top-header__actions">
              <a
                href="/RASTA_Complete_College_Brochure_2026.pdf"
                target="_blank"
                rel="noreferrer"
                className="mobile-icon-btn"
                aria-label="Download College Brochure PDF"
                title="College Brochure PDF"
              >
                <FileText size={16} strokeWidth={1.8} />
              </a>
              <a
                href="tel:+919606326161"
                className="mobile-icon-btn mobile-icon-btn--primary"
                aria-label="Call RASTA"
                title="Call +91 96063 26161"
              >
                <Phone size={16} strokeWidth={1.8} />
              </a>
            </div>
          </header>
          <div className="app-main-flow">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <div className="desktop-shell">
      <Suspense fallback={<NavFallback />}>
        <DesktopNavBar />
      </Suspense>
      <div className="app-main-flow">{children}</div>
    </div>
  );
}
