import React from 'react';
import { tv } from 'tailwind-variants';
import DefaultLayout from './default';

const gridLayout = tv({
  base: 'grid w-full relative grid-cols-1 md:grid-cols-[2fr_1fr] md:gap-x-[69px] w-full h-full max-h-[100vh] p-4 sm:p-8 md:p-12 lg:p-20 overflow-hidden',
  variants: {
    withGap: {
      true: 'gap-y-2 sm:gap-y-3 md:gap-y-4 lg:gap-y-6',
    },
  },
  defaultVariants: {
    withGap: true,
  },
});

const leftColumn = tv({
  base: 'flex flex-col gap-y-4 sm:gap-y-8 md:gap-y-12 lg:gap-y-20 h-full overflow-y-auto',
});

const rightColumn = tv({
  base: 'flex  flex-col gap-y-4 sm:gap-y-8 md:gap-y-12 lg:gap-y-20 h-full pt-61 overflow-y-auto',
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
          {leftSlot1 && <div className="w-full flex-shrink-0">{leftSlot1}</div>}
          {leftSlot3 && <div className="w-full flex-shrink-0">{leftSlot3}</div>}
          {leftSlot2 && <div className="w-full flex-1 min-h-0 overflow-auto">{leftSlot2}</div>}
        </div>
        <div className={rightColumn()}>
          {rightContentSlot && <div className="w-full flex-shrink-0">{rightContentSlot}</div>}
          {rightImageSlot && (
            <div className="w-full md:w-[calc(33.33%-69px/2)] absolute z-100 right-0 -bottom-10 flex-shrink-0">
              <div className="h-full">{rightImageSlot}</div>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};
