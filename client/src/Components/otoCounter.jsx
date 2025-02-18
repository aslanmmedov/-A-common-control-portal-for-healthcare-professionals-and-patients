import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Counter = ({ start = 0, end = 100, duration = 2 }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / (duration * 1000), 1);
      setCount(Math.floor(start + progress * (end - start)));

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [start, end, duration]);

  return (
    <motion.div 
      className="text-4xl font-bold"
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
    >
      {count}
    </motion.div>
  );
};
