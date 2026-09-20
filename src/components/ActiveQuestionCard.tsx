import { AnimatePresence, motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useBoardStore } from "../hooks/useBoardStore";
import AutoScaleText from "./AutoScaleText";
import { useEffect, useState } from "react";
import { useTeamStore } from "../hooks/useTeamStore";
import PlusMinus from "./PlusMinus";
import { QUESTIONS } from "../constants/questions";
import Timer from "./Timer";

const isImageUrl = (value: string): boolean => {
  const urlPattern = /^(https?:\/\/|\/|data:image\/)/i;
  const imageExtensionPattern = /\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i;
  return urlPattern.test(value) || imageExtensionPattern.test(value);
};

interface ActiveQuestionCardProps {
  question: number[];
  isBoosted: boolean;
  transition: Transition;
  onClose: () => void;
}

type Showable = "points" | "question" | "answer" | "wager";

export function ActiveQuestionCard({
  question: qId,
  isBoosted,
  transition,
  onClose,
}: ActiveQuestionCardProps) {
  const teams = useTeamStore((state) => state.teams);
  const addTeamScore = useTeamStore((state) => state.addScore);

  const currentBoard = useBoardStore((state) => state.currentBoard);
  const [showing, setShowing] = useState<Showable>("points");
  const [timerShown, setTimerShown] = useState(false);
  const points = (qId[1] + 1) * 100 * (currentBoard + 1);

  let show: string = "";
  const q = QUESTIONS[currentBoard][qId[0]][qId[1]];

  const isQuestionImg = isImageUrl(q.prompt);
  const isAnswerImg = isImageUrl(q.answer);

  switch (showing) {
    case "question":
      show = q.prompt;
      break;
    case "answer":
      show = q.answer;
      break;
    case "wager":
      show = "Make Your Wager";
      break;
  }

  useEffect(() => {
    async function startFlow() {
      await setTimeout(
        () => {
          if (isBoosted) setShowing("wager");
          else setShowing("question");
        },
        isBoosted ? 4000 : 1600,
      );
    }
    startFlow();
  }, [qId, isBoosted]);

  useEffect(() => {
    function clickHandler(e: MouseEvent) {
      if (e.target instanceof HTMLInputElement) return;
      onClose();
    }

    function keyHandler(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === " ") {
        if (showing === "wager") setShowing("question");
        else if (showing === "question") {
          setTimerShown(false);
          setShowing("answer");
        } else if (showing === "answer") onClose();
      } else if (e.key === "t" && showing === "question")
        setTimerShown((timerShown) => !timerShown);
    }

    window.addEventListener("keydown", keyHandler);
    window.addEventListener("click", clickHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
      window.removeEventListener("click", clickHandler);
    };
  }, [showing, onClose]);

  return (
    <motion.div
      className={twMerge(
        "absolute left-0 right-0 top-0 bottom-0 px-12 py-16 rounded-[8rem] gap-4 flex items-center flex-col text-3xl font-bold font-mono justify-center text-bread-light bg-bread-dark overflow-hidden z-50",
        isBoosted ? "bg-jam-500" : "",
      )}
      layoutId={qId.toString()}
      transition={transition}
    >
      <AnimatePresence>
        {timerShown && <Timer className="absolute top-16 right-20" />}
      </AnimatePresence>
      <div className="flex-1 w-full flex items-center justify-center relative">
        <motion.div
          layoutId={`points-${qId.toString()}`}
          transition={{
            ...transition,
            opacity: { delay: 0.2, duration: 0 },
          }}
          animate={{
            opacity: showing === "points" ? 1 : 0,
            transform: showing === "points" ? undefined : "translateY(-400px)",
            transitionEnd: { transform: "translateY(0px)" },
          }}
          className="font-mono text-[72px]"
        >
          {points}
        </motion.div>

        <AnimatePresence mode="popLayout">
          {showing !== "points" && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center w-full justify-center gap-2"
              key={showing}
              initial={
                isQuestionImg && isAnswerImg && showing === "answer"
                  ? { opacity: 0 }
                  : { scale: 0, translateY: 20 }
              }
              animate={{ scale: 1, translateY: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 13 }}
              exit={
                isQuestionImg && isAnswerImg
                  ? { opacity: 0 }
                  : { translateY: -500 }
              }
            >
              {(isQuestionImg && showing === "question") ||
              (isAnswerImg && showing === "answer") ? (
                <img
                  src={show}
                  alt={show}
                  className="max-w-[50%] max-h-[80%] object-contain"
                />
              ) : (
                <AutoScaleText className="w-[90%]" text={show} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isBoosted && (
        <div className="flex justify-between gap-24">
          {teams.map((t, idx) => (
            <PlusMinus
              key={idx}
              text={t.name}
              onPlus={() => addTeamScore(idx, points)}
              onMinus={() => addTeamScore(idx, points * -1)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
