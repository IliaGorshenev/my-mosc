import DefaultLayout from '@/layouts/default';
import React from 'react';
import { tv } from 'tailwind-variants';

const threeColumnGrid = tv({
  base: 'grid grid-cols-3 gap-[40px] w-full',
});

interface ThreeColumnGridProps {
  slot1?: React.ReactNode;
  slot2?: React.ReactNode;
  slot3?: React.ReactNode;
  className?: string;
}

export const ThreeColumnGrid: React.FC<ThreeColumnGridProps> = ({
  slot1,
  slot2,
  slot3,
  className,
}) => {
  return (
    <DefaultLayout>
      <div className={threeColumnGrid({ className })}>
        {slot1 && <div className="w-full">{slot1}</div>}
        {slot2 && <div className="w-full">{slot2}</div>}
        {slot3 && <div className="w-full">{slot3}</div>}
      </div>
    </DefaultLayout>
  );
};
