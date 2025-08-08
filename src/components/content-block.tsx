import React from 'react';

type ContentBlockItem = {
  id: string;
  icon: React.ReactNode;
  text: string;
};

type ContentBlockProps = {
  title: string;
  subtitle: string;
  items: ContentBlockItem[];
};

export const ContentBlock: React.FC<ContentBlockProps> = ({ title, subtitle, items }) => {
  return (
    <div
      style={{
        display: 'flex',
        padding: '40px 60px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '30px',
        borderRadius: '25px',
        background: '#F2F2F2',
      }}>
      {/* Title */}
      <h1
        style={{
          color: '#000',
          fontFamily: 'Inter',
          fontSize: '60px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '110%',
          margin: 0,
        }}>
        {title}
      </h1>

      {/* Subtitle */}
      <h2
        style={{
          color: '#000',
          fontFamily: 'Inter',
          fontSize: '48px',
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: '120%',
          margin: 0,
          marginBottom: '50px'
        }}>
        {subtitle}
      </h2>

      {/* Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '35px', width: '100%' }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '30px',
            }}>
            {/* Icon Container */}
            <div
              style={{
                display: 'flex',
                width: '80px',
                height: '80px',
                padding: '18px',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '20px',
                background: '#E60528',
              }}>
              <div style={{ color: '#ffffff' }}>{item.icon}</div>
            </div>

            {/* Text */}
            <span
              style={{
                color: '#07060B',
                fontFamily: 'Inter',
                fontSize: '32px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '130%',
              }}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
