import { motion } from "framer-motion";
import { useRef } from "react";
import useIsMobile from "../Hook/useIsMobile"; // আপনার হুক ফাইল

export const AnimatedOnScroll = ({ children, variants, className }) => {
  const ref = useRef(null);
  const isMobile = useIsMobile(); // ফিক্সড হুক থেকে ভ্যালু নিচ্ছে

  // যদি মোবাইল ভিউ হয়, তাহলে কোনো অ্যানিমেশন ছাড়াই একটি সাধারণ div রিটার্ন করি
  // এটাই অ্যানিমেশন বন্ধ করার সবচেয়ে নির্ভরযোগ্য উপায়
  if (isMobile) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  // যদি ডেস্কটপ ভিউ হয়, তাহলে motion.div রিটার্ন করি
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden" // ডেস্কটপে সবসময় 'hidden' থেকে শুরু হবে
      whileInView="show" // যখন ভিউপোর্টে আসবে, 'show' ট্রিগার করবে
      viewport={{ once: true, amount: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
