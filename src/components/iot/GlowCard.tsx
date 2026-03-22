import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowCardProps {
  color: "blue" | "cyan" | "green" | "gold" | "pink" | "red" | "purple";
  children: ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

const colorMap = {
  blue: { bg: "bg-iot-blue/10", border: "border-iot-blue/20", text: "text-iot-blue", glow: "glow-blue", textGlow: "text-glow-blue" },
  cyan: { bg: "bg-iot-cyan/10", border: "border-iot-cyan/20", text: "text-iot-cyan", glow: "glow-cyan", textGlow: "text-glow-cyan" },
  green: { bg: "bg-iot-green/10", border: "border-iot-green/20", text: "text-iot-green", glow: "glow-green", textGlow: "text-glow-green" },
  gold: { bg: "bg-iot-gold/10", border: "border-iot-gold/20", text: "text-iot-gold", glow: "glow-gold", textGlow: "text-glow-gold" },
  pink: { bg: "bg-iot-pink/10", border: "border-iot-pink/20", text: "text-iot-pink", glow: "glow-pink", textGlow: "text-glow-pink" },
  red: { bg: "bg-iot-red/10", border: "border-iot-red/20", text: "text-iot-red", glow: "glow-red", textGlow: "text-glow-red" },
  purple: { bg: "bg-iot-purple/10", border: "border-iot-purple/20", text: "text-iot-purple", glow: "glow-purple", textGlow: "text-glow-purple" },
};

export const GlowCard = ({ color, children, className = "", delay = 0, onClick }: GlowCardProps) => {
  const c = colorMap[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative rounded-xl border ${c.border} ${c.bg} p-5 backdrop-blur-sm cursor-pointer group transition-shadow duration-300 hover:${c.glow} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const SectionTitle = ({ color, children, subtitle }: { color: string; children: ReactNode; subtitle?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="mb-8"
  >
    <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${color}`}>{children}</h2>
    {subtitle && <p className="text-muted-foreground mt-2 text-sm max-w-xl">{subtitle}</p>}
  </motion.div>
);

export { colorMap };
