'use client';

import { plusIcon } from '@/app/assets/images';
import Image from 'next/image';
import { useState } from 'react';

interface CollapseProps {
  title: string;
  children: React.ReactNode;
}

export const Collapse = ({ title, children }: CollapseProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='questions__list'>
      <div className='questions__box' onClick={() => setExpanded(!expanded)}>
        <div className='questions__box-header'>
          <h3>{title}</h3>
          <Image src={plusIcon} alt='more' className={expanded ? 'rotate' : ''} />
        </div>
        <div className={`questions__box-content ${expanded ? 'expanded' : ''}`}>{children}</div>
      </div>
    </div>
  );
};
