import { motion } from "framer-motion";

export default function CategoryCard({
  text,
  expanded,
  active,
  boosted,
}: {
  text: string;
  expanded: boolean;
  active: boolean;
  boosted: boolean;
}) {
  return (
    <motion.div
      className={`h-full flex items-center justify-center border border-bread-dark/80 rounded-full p-1 ${expanded && active ? "col-start-3 row-start-1" : ""}`}
      layout
      animate={{
        opacity: expanded && !active ? 0 : 1,
        ...(active &&
          boosted && {
            borderColor: "orange",
            boxShadow: "0px 0px 10px 6px orange",
            backgroundColor: "orange",
          }),
      }}
      transition={{
        opacity: { duration: 0.4, type: "tween", delay: expanded ? 0 : 0.6 },
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: expanded ? (boosted ? 3 : 0.6) : 0,
        duration: 1,
      }}
    >
      <motion.div
        className="h-full w-full flex items-center justify-center border-2 border-bread-dark text-center text-bread-dark font-sans uppercase rounded-full text-xl font-bold"
        animate={{
          backgroundColor: active
            ? boosted
              ? "var(--color-jam-500)"
              : "var(--color-bread-dark)"
            : "var(--color-bread-dark-transparent)",
          color: active
            ? "var(--color-bread-light)"
            : "var(--color-bread-dark)",
        }}
        transition={{ duration: 0.4, delay: expanded ? 0 : 0.8 }}
      >
        {text}
      </motion.div>
    </motion.div>
  );
}
