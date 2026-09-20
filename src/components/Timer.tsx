import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Timer({ className }: { className?: string }) {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    intervalRef.current = window.setInterval(
      () => setTime((time) => time + 1),
      1000,
    );
    return () => clearInterval(intervalRef.current);
  }, []);

  const minutes = Math.trunc(time / 60);
  const seconds = (time % 60).toString().padStart(2, "0");

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >{`${minutes}:${seconds}`}</motion.div>
  );
}
