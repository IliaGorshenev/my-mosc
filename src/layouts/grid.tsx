import React from 'react';
import { tv } from 'tailwind-variants';
import DefaultLayout from './default';

const gridLayout = tv({
  base: 'grid w-full grid-cols-1 md:grid-cols-[2fr_1fr] md:gap-x-[69px] w-full min-h-full p-20',
  variants: {
    withGap: {
      true: 'gap-y-4 md:gap-y-6',
    },
  },
  defaultVariants: {
    withGap: true,
  },
});

const leftColumn = tv({
  base: 'flex flex-col space-y-4 gap-y-20 md:space-y-6',
});

const rightColumn = tv({
  base: 'flex flex-col space-y-4 gap-y-20 md:space-y-6',
});

interface GridLayoutProps {
  leftSlot1?: React.ReactNode;
  leftSlot2?: React.ReactNode;
  leftSlot3?: React.ReactNode;
  rightContentSlot?: React.ReactNode;
  rightImageSlot?: React.ReactNode;
  className?: string;
}

export const GridLayout: React.FC<GridLayoutProps> = ({
  leftSlot1,
  leftSlot2,
  leftSlot3,
  rightContentSlot,
  rightImageSlot,
  className,
}) => {
  return (
    <DefaultLayout>
      <div className={gridLayout({ className })}>
        <div className={leftColumn()}>
          {leftSlot1 && <div className="w-full">{leftSlot1}</div>}
          {leftSlot2 && <div className="w-full">{leftSlot2}</div>}
          {leftSlot3 && <div className="w-full">{leftSlot3}</div>}
        </div>
        <div className={rightColumn()}>
          {rightContentSlot && <div className="w-full">{rightContentSlot}</div>}
          {rightImageSlot && (
            <div className="w-full">
              <div className="">{rightImageSlot}</div>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};
