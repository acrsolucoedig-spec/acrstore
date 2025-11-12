import { useEffect, useState } from "react";

const colors = [
  "from-neon-blue to-neon-purple",
  "from-neon-purple to-neon-pink",
  "from-neon-pink to-neon-green",
  "from-neon-green to-neon-blue",
];

export const NeonBackground = () => {
  const [currentColor, setCurrentColor] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColor((prev) => (prev + 1) % colors.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors[currentColor]} opacity-10 transition-all duration-3000 ease-in-out`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),transparent_50%)]" />
    </div>
  );
};
