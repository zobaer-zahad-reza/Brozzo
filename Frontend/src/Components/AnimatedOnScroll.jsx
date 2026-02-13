import { motion } from "framer-motion";
import { useRef } from "react";
import useIsMobile from "../Hook/useIsMobile";

export const AnimatedOnScroll = ({ children, variants, className }) => {
  const ref = useRef(null);
  const isMobile = useIsMobile(); 

  if (isMobile) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden" 
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
