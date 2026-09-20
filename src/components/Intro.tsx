export default function Intro({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-around w-full">
      <div className="text-bread-dark font-bread text-8xl font-semibold w-full">
        Breaded
      </div>
      {children}
    </div>
  );
}
