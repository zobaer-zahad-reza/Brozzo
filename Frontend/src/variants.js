export const fadeIn = (direction, delay) => {
  return{
    hidden: {
      y: direction === 'up' ? 60 : direction === 'down' ? -60 : 0,
      x: direction === 'left' ? 60 : direction === 'right' ? -60 : 0,
      opacity: 0,
    },
    show:{
      y: 0,
      x: 0,
      opacity: 1,
      transition:{
        type: 'tween',
        duration: 1.0, 
        delay: delay,
        ease: [0.16, 1, 0.3, 1], 
      }
    }
  }
}


export const containerVariants = {
    hidden: { opacity: 0 },
    
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1, 
        },
    },
};

export const itemVariants = {
    hidden: { y: 30, opacity: 0 }, 
    
    show: { 
        y: 0, 
        opacity: 1, 
        transition: { 
            type: 'spring', 
            stiffness: 120,
            damping: 20 
        } 
    },
};