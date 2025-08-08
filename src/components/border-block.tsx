import React from 'react';
import { tv } from 'tailwind-variants';

const borderBlock = tv({
  base: 'flex flex-col justify-center items-center gap-[10px] flex-1 self-stretch rounded-[40px] border-[3px] border-[#DBDBDB] bg-white py-[50px] px-[20px] ',
});

interface BorderBlockProps {
  children: React.ReactNode;
  className?: string;
}

export const BorderBlock: React.FC<BorderBlockProps> = ({ children, className }) => {
  return <div className={borderBlock({ className })}>{children}</div>;
};
