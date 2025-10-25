import { motion } from 'framer-motion';
import { child, container, hover } from './home/components/motionConfige';

export const AnimatedText = ({ text }) => {
  const characters = text.split('');

  return (
    <motion.div
      className="inline-block"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          whileHover={char !== ' ' ? hover : undefined}
          className="inline-block cursor-pointer"
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
};