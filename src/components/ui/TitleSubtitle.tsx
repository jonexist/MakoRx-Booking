import React from 'react';
import { TTitleSubtitleProps } from '../../type';

export const TitleSubtitle: React.FC<TTitleSubtitleProps> = ({
  title,
  subtitle,
  hasHr,
}) => {
  return (
    <div className='hr'>
      <h1 className='header__title'>{title}</h1>
      <p className='headerr__subtitle'>{subtitle}</p>
      {hasHr && <hr />}
    </div>
  );
};
