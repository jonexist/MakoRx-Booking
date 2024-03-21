import React from 'react';

type TitleSubtitleProps = {
  title: string;
  subtitle?: string;
  hasHr?: boolean;
};

export const TitleSubtitle: React.FC<TitleSubtitleProps> = ({
  title,
  subtitle,
  hasHr,
}) => {
  return (
    <div className='hr'>
      <h1 className='title'>{title}</h1>
      <p className='subtitle'>{subtitle}</p>
      {hasHr && <hr />}
    </div>
  );
};
