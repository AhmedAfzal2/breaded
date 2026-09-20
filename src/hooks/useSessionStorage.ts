import { useEffect, useState } from "react";

export default function useSessionStorage<T>(defaultValue: T, name: string) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return defaultValue;

    const saved = sessionStorage.getItem(name);
    return saved ? JSON.parse(saved) : defaultValue;
  });

  useEffect(() => {
    sessionStorage.setItem(name, JSON.stringify(value));
  }, [name, value]);

  return [value, setValue] as const;
}
