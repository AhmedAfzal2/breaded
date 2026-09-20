import { Minus, Plus } from "lucide-react";

const circledClassName =
  "w-6 h-6 rounded-full p-0.5 bg-bread-dark text-bread-light cursor-pointer hover:bg-butter-500/80 hover:text-bread-dark transition-colors";
export default function PlusMinus({
  onPlus,
  onMinus,
  text,
}: {
  onPlus: () => void;
  onMinus: () => void;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4 bg-toast-500/60 px-3 py-1 rounded-full">
      <Minus className={circledClassName} onClick={onMinus} />
      <div className="text-xl">{text}</div>
      <Plus className={circledClassName} onClick={onPlus} />
    </div>
  );
}
