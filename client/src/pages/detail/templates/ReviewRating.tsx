import React, { useState, useMemo } from 'react';

interface RatingProps {
  count: number;
  value: number;
  onChange: (value: number) => void;
  size?: number;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
}

interface IconProps {
  size?: number;
  color?: string;
  type: 'full' | 'half' | 'empty';
}

const StarIcon = ({ size = 50, color = '#aaa', type }: IconProps) => (
  <svg height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {type === 'empty' && (
      <path
        d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68a1,1,0,0,0,.4,1,1,1,0,0,0,1.05.07L12,18.76l5.1,2.68a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.89l.72,4.19-3.76-2a1,1,0,0,0-.94,0l-3.76,2,.72-4.19a1,1,0,0,0-.29-.89l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z"
        fill={color}
      />
    )}
    {type === 'full' && (
      <path
        d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z"
        fill={color}
      />
    )}
    {type === 'half' && (
      <>
        <path
          d="M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7c0.1,0.1,0.3,0.1,0.5,0.1v0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z M15.8,13.6c-0.2,0.2-0.3,0.6-0.3,0.9l0.7,4.2l-3.8-2c-0.1-0.1-0.3-0.1-0.5-0.1V5.7l1.9,3.8c0.1,0.3,0.4,0.5,0.8,0.5l4.2,0.6L15.8,13.6z"
          fill={color}
        />
      </>
    )}
  </svg>
);

const ReviewRating: React.FC<RatingProps> = ({
  count,
  value,
  onChange,
  size = 40,
  color = '#ffd700',
  hoverColor = '#ffd700',
  activeColor = '#ffd700',
}) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(value); // Start with `value`

  const getColor = (index: number) => {
    const isHovered = hoverValue !== undefined && index <= hoverValue;
    const isActive = index < value;
    return isHovered ? hoverColor : isActive ? activeColor : color;
  };

  const getStarType = (index: number): 'full' | 'half' | 'empty' => {
    const currentValue = hoverValue !== undefined ? hoverValue : value;
    if (index + 0.5 === currentValue) return 'half';
    return index < currentValue ? 'full' : 'empty';
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const halfPoint = rect.width / 2;
    setHoverValue(x < halfPoint ? index + 0.5 : index + 1);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const halfPoint = rect.width / 2;
    onChange(x < halfPoint ? index + 0.5 : index + 1);
  };

  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          onMouseMove={(e) => handleMouseMove(e, i)}
          onMouseEnter={() => setHoverValue(i + 1)}
          onMouseLeave={() => setHoverValue(value)} // Start from the current value
          onClick={(e) => handleClick(e, i)}
          style={{ display: 'inline-block', cursor: 'pointer' }}
        >
          <StarIcon size={size} color={getColor(i)} type={getStarType(i)} />
        </div>
      )),
    [count, value, hoverValue, size]
  );

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '35px',
      }}
    >
      {stars}
      <div>
        <span
          style={{ marginLeft: '0.5rem', fontSize: '0.875rem', width: '30px', display: 'flex', justifyContent: 'end' }}
        >
          {hoverValue !== undefined ? hoverValue : value}/5
        </span>
      </div>
    </div>
  );
};

export default ReviewRating;
