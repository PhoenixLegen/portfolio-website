'use client'
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  duration?: number;
  className? : string;
}

const Fade = ({ children, duration = 0.5, className = '' }: Props) => {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        } else {
          controls.start('hidden');
        }
      },
      { threshold: 0.1 } // Adjust the threshold as needed
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  const variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Fade;
