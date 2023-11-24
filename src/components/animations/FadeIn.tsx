'use client';

import { useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

interface FadeInProps {
  as?: React.ElementType;
  origin?: 'top' | 'bottom' | 'left' | 'right';
  duration?: number;
  delay?: number;
  size?: number;
  children?: React.ReactNode;
  [key: string]: any;
}

export const FadeIn = ({
  as: Component = 'h2',
  origin,
  duration = 1000,
  delay = 0,
  size = 100,
  children,
  ...props
}: FadeInProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const animationOrigin = () => {
    switch (origin) {
      case 'top':
        return `translateY(-${size}px)`;
      case 'bottom':
        return `translateY(${size}px)`;
      case 'left':
        return `translateX(-${size}px)`;
      case 'right':
        return `translateX(${size}px)`;
      default:
        return 'none';
    }
  };

  const style = {
    transform: isInView ? 'none' : animationOrigin(),
    opacity: isInView ? 1 : 0,
    transition: `all ${duration}ms cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}ms`,
  };

  if (Component === 'img') {
    return <Image ref={ref} style={style} alt={props.alt} src={props.src} />;
  }

  return (
    <Component ref={ref} style={style} {...props}>
      {children}
    </Component>
  );
};
