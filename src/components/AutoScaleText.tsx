import { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface AutoScaleTextProps {
  text: string;
  maxFontSize?: number; // In pixels
  minFontSize?: number; // In pixels
  className?: string;
}

export default function AutoScaleText({
  text,
  maxFontSize = 72,
  minFontSize = 14,
  className,
}: AutoScaleTextProps) {
  const [fontSize, setFontSize] = useState(maxFontSize);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  // Reset font size to max when text changes, so it recalculates fresh
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFontSize(maxFontSize);
  }, [text, maxFontSize]);

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    // Check if the text width or height is bigger than the container
    const isOverflowing =
      textEl.scrollWidth > container.clientWidth ||
      textEl.scrollHeight > container.clientHeight;

    // Step down by 1px if it overflows and we haven't hit the minimum safety floor
    if (isOverflowing && fontSize > minFontSize) {
      setFontSize((prev) => prev - 1);
    }
  }, [text, fontSize, minFontSize]);

  return (
    <div
      ref={containerRef}
      className={twMerge(
        "w-full h-full flex items-center justify-center overflow-hidden p-4",
        className,
      )}
    >
      <span
        ref={textRef}
        style={{ fontSize: `${fontSize}px`, lineHeight: "1.2" }}
        className="font-black text-center inline-block"
      >
        {text}
      </span>
    </div>
  );
}
