import React from 'react';
import { theme } from 'styles/theme';

type ProgressBarProps = {
  progress: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div style={{ width: '100%', background: '#e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
      <div
        style={{
          width: `${progress}%`,
          background: `${theme.colors.primary}`,
          height: '20px',
          transition: 'width 0.3s ease-in-out',
        }}
      />
    </div>
  );
};
