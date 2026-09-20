// QuestionCard.tsx
import {
  motion,
  useAnimation,
  type HTMLMotionProps,
  type Transition,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

interface QuestionCardProps extends HTMLMotionProps<"div"> {
  points: number;
  layoutId: string;
  transition: Transition;
  expanded: boolean;
  active: boolean;
  boosted: boolean;
  disabled?: boolean;
}

function t(c: string, a: number) {
  return `color-mix(in srgb, var(--color-${c}) ${a}%, transparent)`;
}

export default function QuestionCard({
  points,
  layoutId,
  transition,
  expanded,
  active,
  boosted,
  disabled,
  ...props
}: QuestionCardProps) {
  const thisTransition = useMemo<Transition>(
    () => ({
      ...transition,
      opacity: { duration: 0.6, delay: expanded ? 0 : 0.4 },
    }),
    [transition, expanded],
  );

  const [[prevVariant, storedVariant], setVariantHistory] = useState([
    "base",
    "base",
  ]);

  const controls = useAnimation();

  const variants = {
    base: {
      opacity: 1,
      backgroundColor: t("toast-500", 80),
      color: "var(--color-bread-dark)",
      transition: thisTransition,
    },
    inactive: {
      opacity: 0,
      transition: thisTransition,
    },
    active: {
      opacity: 1,
      backgroundColor: "var(--color-bread-dark)",
      color: "var(--color-bread-light)",
      transition: thisTransition,
    },
    disabled: {
      opacity: 1,
      backgroundColor: t("toast-500", 35),
      color: t("bread-dark", 60),
      transition: {
        ...thisTransition,
        backgroundColor: {
          delay: prevVariant === "active" ? 0.8 : 0,
        },
        color: {
          delay: prevVariant === "active" ? 0.8 : 0,
        },
      },
    },
    hover: {
      backgroundColor: "var(--color-bread-dark)",
      color: "var(--color-bread-light)",
      transition: { duration: 0.3 },
    },
  };

  const variant = expanded
    ? active
      ? "active"
      : "inactive"
    : disabled
      ? "disabled"
      : "base";

  useEffect(() => {
    if (boosted && active) {
      const runSequence = async () => {
        await controls.start({
          backgroundColor: "var(--color-jam-500)",
          color: "var(--color-bread-light)",
          transform: ["scale(1.0)", "scale(1.1)", "scale(1.0)"],
          transition: { transform: { delay: 0.2, duration: 0.4 } },
        });

        controls.start({
          backgroundColor: [
            "var(--color-jam-500)",
            "color-mix(in srgb, var(--color-jam-500) 40%, white)",
            "var(--color-jam-500)",
          ],
          transition: {
            ...thisTransition,
            backgroundColor: {
              delay: 1,
              duration: 0.4,
              repeat: 2,
            },
          },
        });
      };
      runSequence();
    } else controls.start(variant);
  }, [boosted, controls, thisTransition, variant, active]);

  if (variant !== storedVariant) setVariantHistory([storedVariant, variant]);

  return (
    <motion.div
      {...props}
      layoutId={layoutId}
      transition={thisTransition}
      initial={{
        backgroundColor: t("toast-500", disabled ? 35 : 80),
        color: disabled ? t("bread-dark", 60) : "var(--color-bread-dark)",
      }}
      animate={controls}
      whileHover={disabled || active ? undefined : "hover"}
      variants={variants}
      className={twMerge(
        "h-full flex items-center justify-center text-xl lg:text-3xl font-bold rounded-full select-none cursor-pointer",
        disabled && "cursor-not-allowed",
        expanded && "pointer-events-none",
      )}
    >
      <motion.div
        layoutId={`points-${layoutId}`}
        transition={thisTransition}
        className="font-mono"
      >
        {points}
      </motion.div>
    </motion.div>
  );
}
