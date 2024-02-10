import '../../styles/button.scss';
import { MotionProps, motion } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';
import { slideInFromRight } from '../../utils/motion';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & MotionProps & {
  isOutlined?: boolean
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <motion.button
      {...props}
      variants={slideInFromRight(1.3)}
      className={`button ${isOutlined ? 'outlined' : ''}`}
    />
  );
}