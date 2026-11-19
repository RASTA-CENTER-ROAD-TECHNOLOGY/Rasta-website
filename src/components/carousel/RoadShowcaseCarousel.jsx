import React, { Suspense, lazy } from 'react';
import { useInitialScreenMode } from '../../hooks/useInitialScreenMode';

const CircularCarousel = lazy(() => import('./CircularCarousel'));
const DepthCarousel = lazy(() => import('./DepthCarousel'));

function CarouselFallback() {
  return (
    <div className="carousel-loading-box">
      <span>Loading highway gallery...</span>
    </div>
  );
}

export default function RoadShowcaseCarousel({ items }) {
  const { isMobile } = useInitialScreenMode();

  const circularItems = items.map((item) => ({
    src: item.src,
    alt: item.alt,
    title: item.title,
    subtitle: item.subtitle,
  }));

  return (
    <div className="road-carousel-container">
      <Suspense fallback={<CarouselFallback />}>
        <div
          className="circular-carousel-wrap"
          style={{ width: '100%', height: isMobile ? '400px' : '540px', position: 'relative' }}
        >
          <CircularCarousel
            items={circularItems}
            preset="cylinder"
            intro="rise"
            cardWidth={isMobile ? 160 : 230}
            aspectRatio={1.18}
            gap={isMobile ? 14 : 24}
            speed={isMobile ? 10 : 12}
            fadeColor="#FFFFFF"
            cornerRadius={0}
            captions={true}
          />
        </div>
      </Suspense>
    </div>
  );
}
