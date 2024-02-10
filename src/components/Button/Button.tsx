import '../../styles/button.scss';
import { MotionProps, motion } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';
import { slideInFromRight } from '../../utils/motion';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & MotionProps;

export function Button (props: ButtonProps) {
  return (
    <motion.button variants={slideInFromRight(1.3)} className="button" {...props} />
  );
}