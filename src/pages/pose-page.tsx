import { ContentBlock } from '@/components/content-block';
import { Header } from '@/components/header';
import { GridLayout } from '@/layouts/grid';
import {
  poseDetectionData,
  poseDetectionItems,
  retailPoseApplicationData,
  retailPoseApplicationItems,
} from './const';

export const liveIcon = (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12.9719" cy="13" r="12.5" fill="#E60528" />
  </svg>
);

const PosePage = () => {
  return (
    <GridLayout
      leftSlot1={
        <Header
          text={
            <>
              {liveIcon}{' '}
              <span>
                Live-трансляция{' '}
                <span
                  style={{
                    color: '#E60528',
                    fontFamily: 'Inter',
                    fontSize: '72px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: '120%',
                  }}>
                  |
                </span>{' '}
                Позы человека
              </span>
            </>
          }
        />
      }
      leftSlot2={
        <img
          src="/we.png"
          alt="human"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      }
      rightContentSlot={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '43px' }}>
          <ContentBlock
            title={poseDetectionData.title}
            subtitle={poseDetectionData.subtitle}
            items={poseDetectionItems}
          />
          <svg
            width="1180"
            height="3"
            viewBox="0 0 1180 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect width="1180" height="3" rx="1.5" fill="#DBDBDB" />
          </svg>

          <ContentBlock
            title={retailPoseApplicationData.title}
            subtitle={retailPoseApplicationData.subtitle}
            items={retailPoseApplicationItems}
          />
        </div>
      }
      rightImageSlot={<img  className='mt-auto'  src="/robot-4.png" alt="Moscow" />}></GridLayout>
  );
};

export default PosePage;
