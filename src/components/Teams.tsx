import { twMerge } from "tailwind-merge";
import { useRef, useState, type ComponentProps } from "react";
import { motion } from "framer-motion";
import { useTeamStore, type Team } from "../hooks/useTeamStore";

function MiniInput({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={twMerge(
        "field-sizing-content rounded-md hover:bg-toast-500/60 focus:outline-none focus:ring-2 focus:bg-toast-500/60 transition-colors",
        className,
      )}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.currentTarget.blur();
      }}
      onClick={(e) => e.stopPropagation()}
      {...props}
    />
  );
}

function isInteger(str: string) {
  return /^-?\d+$/.test(str);
}

function TeamCard({
  team,
  setTeam,
}: {
  team: Team;
  setTeam: (team: Partial<Team>) => void;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [score, setScore] = useState<string>(`${team.score}`);
  const [scoreError, setScoreError] = useState(false);
  return (
    <form
      className="flex items-center flex-col min-w-36"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const newTeam = Object.fromEntries(data) as unknown as Partial<Team>;
        if (isInteger(score)) newTeam.score = Number(score);
        else {
          setScoreError(false);
          setScore(`${team.score}`);
        }
        setTeam(newTeam);
      }}
      ref={formRef}
      onBlur={(e) => {
        if (formRef.current?.contains(e.relatedTarget)) return;
        formRef.current?.requestSubmit();
      }}
    >
      <MiniInput
        name="name"
        key={team.name}
        defaultValue={team.name}
        className="font-bread px-1 text-xl"
      />
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        key={team.score}
      >
        <MiniInput
          value={score}
          onChange={(e) => {
            setScore(e.target.value);
            if (!isInteger(e.target.value)) setScoreError(true);
            else setScoreError(false);
          }}
          className={`font-mono px-0.5 text-2xl ${scoreError ? "ring-1 ring-jam-500 text-jam-500" : ""}`}
        />
      </motion.div>
    </form>
  );
}

export default function Teams() {
  const teams = useTeamStore((state) => state.teams);
  const updateTeam = useTeamStore((state) => state.updateTeam);
  return (
    <div className="flex gap-8">
      {teams.map((t, idx) => (
        <TeamCard
          key={`${idx} ${teams[idx].score}`}
          team={t}
          setTeam={(team) => updateTeam(idx, team)}
        />
      ))}
    </div>
  );
}
