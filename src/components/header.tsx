import { ReactNode } from 'react';
import { tv } from 'tailwind-variants';
import { BPALogo, Line, MainLogo } from './icons';

const headerStyles = tv({
  base: 'flex items-center gap-[80px] py-[40px]',
});

const headerLogosStyles = tv({
  base: 'flex items-center gap-[25px]',
});
const headerTextStyles = tv({
  base: 'text-[#1A1A1A] font-bold text-[72px] flex items-center gap-[20px] leading-[120%]',
});

export const Header = ({
  text = 'Статистика посещения магазина',
}: {
  text?: string | ReactNode;
}) => {
  return (
    <header className={headerStyles()}>
      <section className={headerLogosStyles()}>
        <MainLogo /> <Line /> <BPALogo />
      </section>
      <h1 className={headerTextStyles()}>{text}</h1>
    </header>
  );
};
