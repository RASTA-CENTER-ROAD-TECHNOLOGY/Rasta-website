import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Waves from '../reactbits/Waves';

export default function PageHeader({ title, description, breadcrumbs = [] }) {
  return (
    <section className="page-header">
      <div className="page-header__bg" aria-hidden="true">
        <Waves
          lightMode={true}
          lineColor="#003366"
          accentColor="#B45309"
          spacing={26}
          lineWidth={1}
          amplitude={14}
          speed={0.35}
          opacity={0.09}
          mouseInteraction={true}
          clickRipple={true}
        />
      </div>
      <div className="container page-header__inner">
        <div className="page-header__top">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            {breadcrumbs.map((crumb) => (
              <React.Fragment key={crumb.label}>
                <ChevronRight size={14} strokeWidth={1.8} />
                {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span>{crumb.label}</span>}
              </React.Fragment>
            ))}
          </nav>
        </div>
        <h1 className="page-header__title">{title}</h1>
        {description && <p className="page-header__desc">{description}</p>}
      </div>
    </section>
  );
}
