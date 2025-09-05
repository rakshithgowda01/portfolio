import React from 'react';
import { CometCard } from '@/components/ui/comet-card';
import { RollingGallery } from '@/components/ui/RollingGallery';

interface ContainerScrollProps {
  heading: string;
  description?: string;
  images: string[];
}

// Lightweight approximation of the Aceternity container scroll section.
// Uses a tall container with a sticky heading and a rolling gallery that feels animated while scrolling.
export const ContainerScroll: React.FC<ContainerScrollProps> = ({ heading, description, images }) => {
  return (
    <section className="relative w-full">
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-sm py-3">
        <h2 className="text-xl md:text-2xl font-bold tracking-wide">{heading}</h2>
        {description && <p className="text-sm md:text-base text-gray-600 mt-1">{description}</p>}
      </div>

      <div className="mt-3">
        <CometCard className="w-full">
          <div className="rounded-xl border border-gray-200 bg-white p-3">
            <RollingGallery images={images} height={220} speedMs={16000} />
          </div>
        </CometCard>
      </div>
    </section>
  );
};

export default ContainerScroll;

