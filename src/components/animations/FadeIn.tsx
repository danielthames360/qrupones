'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

interface FadeInProps {
  as: React.ElementType;
  origin?: 'top' | 'bottom' | 'left' | 'right';
  duration?: number;
  delay?: number;
  size?: number;
  hoverScale?: number;
  children?: React.ReactNode;
  [key: string]: any;
}

export const FadeIn = ({
  as: Component = 'div',
  origin,
  duration = 1000,
  delay = 0,
  size = 100,
  hoverScale,
  children,
  ...props
}: FadeInProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const variants = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: duration / 1000, delay: delay / 1000 },
    },
    hidden: {
      opacity: 0,
      x: origin === 'left' ? -size : origin === 'right' ? size : 0,
      y: origin === 'top' ? -size : origin === 'bottom' ? size : 0,
    },
    hover: {
      scale: hoverScale || 1,
    },
  };

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
        return 'initial';
    }
  };

  const style = {
    transform: isInView ? 'initial' : animationOrigin(),
    opacity: isInView ? 1 : 0,
    transition: `all ${duration}ms cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}ms`,
  };

  if (Component === 'img') {
    return <Image ref={ref} style={style} alt={props.alt} src={props.src} />;
  }

  const MotionComponent = motion(Component) || motion.div;

  return (
    <MotionComponent
      ref={ref}
      variants={variants}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      whileHover={hoverScale ? 'hover' : ''}
      {...props}>
      {children}
    </MotionComponent>
  );
};
