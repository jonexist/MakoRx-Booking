import React from 'react';

type TitleSubtitleProps = {
  title: string;
  subtitle: string;
};

export const TitleSubtitle: React.FC<TitleSubtitleProps> = ({
  title,
  subtitle,
}) => {
  return (
    <div className='hr'>
      <h1 className='title'>{title}</h1>
      <p className='subtitle'>{subtitle}</p>
      <hr />
    </div>
  );
};
