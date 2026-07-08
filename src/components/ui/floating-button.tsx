'use client';

import { ReactNode, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOnClickOutside } from 'usehooks-ts';

type FloatingButtonProps = {
  className?: string;
  children: ReactNode;
  triggerContent: ReactNode;
  orientation?: 'vertical' | 'horizontal';
};

type FloatingButtonItemProps = {
  children: ReactNode;
};

const list = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1
    }
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1
    }
  }
};

const item = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 5 }
};

const btn = {
  visible: { rotate: '45deg' },
  hidden: { rotate: 0 }
};

function FloatingButton({ className, children, triggerContent, orientation = 'vertical' }: FloatingButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(ref as any, () => setIsOpen(false));

  const listClasses = orientation === 'horizontal'
    ? "flex flex-row items-center absolute bottom-14 left-1/2 -translate-x-1/2 gap-2 z-20"
    : "flex flex-col items-center absolute bottom-14 gap-2 z-20";

  return (
    <div className="flex flex-col items-center relative" ref={ref}>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={listClasses}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={list}>
            {children}
          </motion.ul>
        )}
        <motion.div
          variants={btn}
          className="cursor-pointer z-20"
          animate={isOpen ? 'visible' : 'hidden'}
          onClick={() => setIsOpen(!isOpen)}>
          {triggerContent}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function FloatingButtonItem({ children }: FloatingButtonItemProps) {
  return <motion.li variants={item}>{children}</motion.li>;
}

export { FloatingButton, FloatingButtonItem };
