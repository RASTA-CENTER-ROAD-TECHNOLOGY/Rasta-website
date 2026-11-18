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

  const depthItems = items.map((item) => ({
    image: item.src,
    alt: item.alt,
    title: item.title,
    subtitle: item.subtitle,
  }));

  return (
    <div className="road-carousel-container">
      <Suspense fallback={<CarouselFallback />}>
        {isMobile ? (
          <div className="depth-carousel-wrap" style={{ height: '370px', position: 'relative' }}>
            <DepthCarousel
              items={depthItems}
              cardWidth={210}
              cardHeight={265}
              radius={0}
              tint="#0F3D7A"
              depth={170}
              spread={46}
              tilt={16}
              tiltDirection="right"
              perspective={1400}
              visibleCards={4}
              falloff={0.18}
              blur={4}
              autoplay={true}
              autoplayDelay={3200}
              loop={true}
              showControls={true}
              showIndicators={true}
            />
          </div>
        ) : (
          <div className="circular-carousel-wrap" style={{ width: '100%', height: '540px', position: 'relative' }}>
            <CircularCarousel
              items={circularItems}
              preset="cylinder"
              intro="rise"
              cardWidth={230}
              aspectRatio={1.18}
              gap={24}
              speed={12}
              fadeColor="#FFFFFF"
              cornerRadius={0}
              captions={true}
            />
          </div>
        )}
      </Suspense>
    </div>
  );
}
