// Board.tsx
import { useState, useEffect, useCallback, useRef } from "react";
import CategoryCard from "./CategoryCard";
import QuestionCard from "./QuestionCard";
import { AnimatePresence, type Transition } from "framer-motion";
import { useBoardStore } from "../hooks/useBoardStore";
import { ActiveQuestionCard } from "./ActiveQuestionCard";
import { CATEGORIES, QUESTIONS } from "../constants/questions";

function is(checker: (c: number, q: number) => boolean, aq: number[] | null) {
  if (aq === null) return false;
  return checker(aq[0], aq[1]);
}

export default function Board() {
  useBoardStore((state) => state.completedQuestions);
  const currentBoard = useBoardStore((state) => state.currentBoard);
  const toggleQuestion = useBoardStore((state) => state.toggleQuestion);
  const isQuestionCompleted = useBoardStore(
    (state) => state.isQuestionCompleted,
  );
  const isBoosted = useBoardStore((state) => state.isBoosted);

  const [activeQuestion, setActiveQuestion] = useState<number[] | null>(null);
  const hoveredQuestionRef = useRef<number[] | null>(null);
  const isAqBoosted = is(isBoosted, activeQuestion);

  const expandTransition: Transition = {
    layout: {
      type: "spring",
      duration: 1,
      delay: activeQuestion ? (isAqBoosted ? 3 : 0.6) : 0,
      damping: activeQuestion ? 14 : 20,
    },
  };

  const closeQuestion = useCallback(() => {
    if (!activeQuestion) return;
    toggleQuestion(activeQuestion[0], activeQuestion[1]);
    setActiveQuestion(null);
  }, [toggleQuestion, setActiveQuestion, activeQuestion]);

  const keyHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "c")
        if (hoveredQuestionRef.current)
          toggleQuestion(
            hoveredQuestionRef.current[0],
            hoveredQuestionRef.current[1],
          );
    },
    [toggleQuestion, hoveredQuestionRef],
  );

  useEffect(() => {
    const hoverHandler = () => {
      hoveredQuestionRef.current = null;
    };
    window.addEventListener("keydown", keyHandler);
    window.addEventListener("mouseover", hoverHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
      window.removeEventListener("mouseover", hoverHandler);
    };
  }, [closeQuestion, keyHandler]);

  const expanded = activeQuestion !== null;

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full flex flex-col gap-4">
        <div className="border-b border-bread-dark" />
        <div className="w-full grid grid-cols-5 gap-4 flex-1 items-center">
          {CATEGORIES[currentBoard].map((c, idx) => (
            <CategoryCard
              key={c}
              text={c}
              expanded={expanded}
              active={expanded && activeQuestion[0] === idx}
              boosted={isAqBoosted}
            />
          ))}
        </div>
        <div className="border-b border-bread-dark" />
        <div
          className="grid grid-cols-5 h-full gap-4 relative flex-8"
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait">
            {activeQuestion && (
              <ActiveQuestionCard
                onClose={closeQuestion}
                question={activeQuestion}
                isBoosted={isAqBoosted}
                transition={expandTransition}
              />
            )}
          </AnimatePresence>
          {QUESTIONS[currentBoard].map((category, cIdx) => (
            <div
              key={cIdx}
              className="flex flex-col justify-around gap-4 lg:gap-8"
            >
              {category.map((_, qIdx) => {
                const id = [cIdx, qIdx];
                const disabled = isQuestionCompleted(cIdx, qIdx);
                const active =
                  expanded &&
                  activeQuestion[0] === cIdx &&
                  activeQuestion[1] === qIdx;
                return (
                  <QuestionCard
                    key={id.toString()}
                    layoutId={id.toString()}
                    transition={expandTransition}
                    points={(qIdx + 1) * 100 * (currentBoard + 1)}
                    expanded={expanded}
                    active={active}
                    disabled={disabled}
                    boosted={isBoosted(cIdx, qIdx)}
                    onClick={
                      !disabled
                        ? (e) => {
                            e.stopPropagation();
                            setActiveQuestion([cIdx, qIdx]);
                          }
                        : undefined
                    }
                    onMouseOver={
                      disabled
                        ? (e) => {
                            e.stopPropagation();
                            hoveredQuestionRef.current = id;
                          }
                        : undefined
                    }
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
