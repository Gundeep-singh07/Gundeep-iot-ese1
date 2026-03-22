import { SectionTitle } from "./GlowCard";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Smart Homes",
    desc: "Connected living spaces",
    hsl: "42 100% 58%",
    examples: [
      "Voice assistants",
      "Smart thermostats",
      "Automated lighting",
      "Security cameras",
    ],
    bx: 800,
    by: 100,
    leafDir: "right" as const,
  },
  {
    title: "Healthcare",
    desc: "Connected patient care",
    hsl: "330 80% 60%",
    examples: [
      "Remote monitoring",
      "Wearable trackers",
      "Smart pills",
      "Asset tracking",
    ],
    bx: 1250,
    by: 290,
    leafDir: "right" as const,
  },
  {
    title: "Smart Cities",
    desc: "Urban intelligence",
    hsl: "185 100% 50%",
    examples: [
      "Traffic management",
      "Waste management",
      "Smart parking",
      "Env. monitoring",
    ],
    bx: 1150,
    by: 560,
    leafDir: "right" as const,
  },
  {
    title: "Agriculture",
    desc: "Precision farming",
    hsl: "152 76% 48%",
    examples: [
      "Precision irrigation",
      "Soil monitoring",
      "Drone surveillance",
      "Livestock tracking",
    ],
    bx: 550,
    by: 560,
    leafDir: "left" as const,
  },
  {
    title: "Industrial IoT",
    desc: "Smart manufacturing",
    hsl: "210 100% 56%",
    examples: [
      "Predictive maintenance",
      "Supply chain",
      "Quality control",
      "Energy management",
    ],
    bx: 450,
    by: 290,
    leafDir: "left" as const,
  },
];

const CX = 850;
const CY = 350;
const BR = 54;
const LEAF_W = 172;
const LEAF_H = 30;
const LEAF_GAP = 11;
const LEAF_DIST = 85;

function bezier(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
}

function leafBezier(
  bx: number,
  by: number,
  lx: number,
  ly: number,
  dir: "left" | "right"
) {
  const s = dir === "right" ? 1 : -1;
  return `M${bx},${by} C${bx + s * 55},${by} ${lx - s * 28},${ly} ${lx},${ly}`;
}

export const ApplicationsTab = () => (
  <div className="w-full pt-8">
    <SectionTitle
      color="text-iot-gold text-glow-gold"
      subtitle="How IoT transforms industries and daily life"
    >
      Real-World Applications
    </SectionTitle>

    <div
      style={{
        overflowX: "auto",
        overflowY: "hidden",
        WebkitOverflowScrolling: "touch",
        paddingBottom: "8px",
        cursor: "grab",
      }}
    >
      <svg
        viewBox="0 0 1800 720"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",
          width: "1800px",
          height: "720px",
          flexShrink: 0,
        }}
      >
        <defs>
          {categories.map((c) => (
            <radialGradient
              key={c.title}
              id={`halo-${c.title.replace(/\s/g, "")}`}
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop
                offset="0%"
                stopColor={`hsl(${c.hsl})`}
                stopOpacity="0.22"
              />
              <stop offset="100%" stopColor={`hsl(${c.hsl})`} stopOpacity="0" />
            </radialGradient>
          ))}
          <radialGradient id="center-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(42 100% 58%)" stopOpacity="0.36" />
            <stop offset="100%" stopColor="hsl(42 100% 58%)" stopOpacity="0" />
          </radialGradient>
          <filter id="gf" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="sf" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* dot grid */}
        <pattern
          id="dots"
          x="0"
          y="0"
          width="44"
          height="44"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill="hsl(42 100% 80% / 0.04)" />
        </pattern>
        <rect width="1800" height="720" fill="url(#dots)" />

        {/* center glow */}
        <circle cx={CX} cy={CY} r="145" fill="url(#center-halo)" />

        {/* trunk lines */}
        {categories.map((cat, i) => (
          <motion.path
            key={cat.title + "-t"}
            d={bezier(CX, CY, cat.bx, cat.by)}
            fill="none"
            stroke={`hsl(${cat.hsl})`}
            strokeWidth="2.2"
            strokeOpacity="0.45"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              delay: 0.15 + i * 0.1,
              duration: 0.65,
              ease: "easeOut",
            }}
          />
        ))}

        {/* branch → leaf lines */}
        {categories.map((cat, i) => {
          const total =
            cat.examples.length * LEAF_H + (cat.examples.length - 1) * LEAF_GAP;
          const sy = cat.by - total / 2;
          const s = cat.leafDir === "right" ? 1 : -1;
          const edgeX = cat.bx + s * BR;
          const anchorX =
            cat.leafDir === "right" ? edgeX + LEAF_DIST : edgeX - LEAF_DIST;

          return cat.examples.map((ex, j) => {
            const ly = sy + j * (LEAF_H + LEAF_GAP) + LEAF_H / 2;
            return (
              <motion.path
                key={ex + "-l"}
                d={leafBezier(edgeX, cat.by, anchorX, ly, cat.leafDir)}
                fill="none"
                stroke={`hsl(${cat.hsl})`}
                strokeWidth="1.3"
                strokeOpacity="0.28"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.62 + i * 0.1 + j * 0.07, duration: 0.4 }}
              />
            );
          });
        })}

        {/* branch halos */}
        {categories.map((cat) => (
          <circle
            key={cat.title + "-hl"}
            cx={cat.bx}
            cy={cat.by}
            r="88"
            fill={`url(#halo-${cat.title.replace(/\s/g, "")})`}
          />
        ))}

        {/* branch nodes */}
        {categories.map((cat, i) => (
          <motion.g
            key={cat.title + "-n"}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.14 + i * 0.1,
              type: "spring",
              stiffness: 210,
            }}
            style={{ transformOrigin: `${cat.bx}px ${cat.by}px` }}
          >
            <circle
              cx={cat.bx}
              cy={cat.by}
              r={BR + 10}
              fill="none"
              stroke={`hsl(${cat.hsl})`}
              strokeWidth="1"
              strokeOpacity="0.15"
              filter="url(#gf)"
            />
            <circle
              cx={cat.bx}
              cy={cat.by}
              r={BR}
              fill="hsl(225 15% 8%)"
              stroke={`hsl(${cat.hsl})`}
              strokeWidth="2"
              strokeOpacity="0.72"
              filter="url(#sf)"
            />
            <circle
              cx={cat.bx}
              cy={cat.by}
              r={BR - 2}
              fill="hsl(225 15% 11%)"
            />
            <circle
              cx={cat.bx}
              cy={cat.by}
              r={BR - 14}
              fill="none"
              stroke={`hsl(${cat.hsl})`}
              strokeWidth="0.6"
              strokeOpacity="0.2"
              strokeDasharray="3 5"
            />
            {/* icon dot */}
            <circle
              cx={cat.bx}
              cy={cat.by - 15}
              r="6"
              fill={`hsl(${cat.hsl} / 0.2)`}
              stroke={`hsl(${cat.hsl})`}
              strokeWidth="1.2"
              strokeOpacity="0.55"
            />
            <text
              x={cat.bx}
              y={cat.by + 3}
              textAnchor="middle"
              fill={`hsl(${cat.hsl})`}
              fontSize="10.5"
              fontWeight="800"
              fontFamily="Inter,sans-serif"
              letterSpacing="0.6"
            >
              {cat.title.toUpperCase()}
            </text>
            <text
              x={cat.bx}
              y={cat.by + 17}
              textAnchor="middle"
              fill="hsl(215 12% 52%)"
              fontSize="7.5"
              fontFamily="Inter,sans-serif"
            >
              {cat.desc}
            </text>
          </motion.g>
        ))}

        {/* leaf pills */}
        {categories.map((cat, i) => {
          const total =
            cat.examples.length * LEAF_H + (cat.examples.length - 1) * LEAF_GAP;
          const sy = cat.by - total / 2;
          const s = cat.leafDir === "right" ? 1 : -1;
          const edgeX = cat.bx + s * BR;
          const colX =
            cat.leafDir === "right"
              ? edgeX + LEAF_DIST
              : edgeX - LEAF_DIST - LEAF_W;

          return cat.examples.map((ex, j) => {
            const ly = sy + j * (LEAF_H + LEAF_GAP);
            return (
              <motion.g
                key={ex}
                initial={{ opacity: 0, x: cat.leafDir === "right" ? -12 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.78 + i * 0.1 + j * 0.08,
                  duration: 0.35,
                  ease: "easeOut",
                }}
              >
                <rect
                  x={colX}
                  y={ly}
                  width={LEAF_W}
                  height={LEAF_H}
                  rx="15"
                  fill={`hsl(${cat.hsl} / 0.09)`}
                  stroke={`hsl(${cat.hsl})`}
                  strokeWidth="1"
                  strokeOpacity="0.38"
                />
                {/* accent bar */}
                <rect
                  x={cat.leafDir === "right" ? colX + 1 : colX + LEAF_W - 5}
                  y={ly + 7}
                  width="4"
                  height={LEAF_H - 14}
                  rx="2"
                  fill={`hsl(${cat.hsl})`}
                  fillOpacity="0.55"
                />
                {/* bullet dot */}
                <circle
                  cx={cat.leafDir === "right" ? colX + 18 : colX + LEAF_W - 18}
                  cy={ly + LEAF_H / 2}
                  r="3"
                  fill={`hsl(${cat.hsl})`}
                  fillOpacity="0.5"
                />
                <text
                  x={colX + LEAF_W / 2}
                  y={ly + LEAF_H / 2 + 4.5}
                  textAnchor="middle"
                  fill={`hsl(${cat.hsl})`}
                  fillOpacity="0.92"
                  fontSize="10"
                  fontWeight="500"
                  fontFamily="Inter,sans-serif"
                >
                  {ex}
                </text>
              </motion.g>
            );
          });
        })}

        {/* center node */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 175 }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          <motion.circle
            cx={CX}
            cy={CY}
            r="96"
            fill="none"
            stroke="hsl(42 100% 58%)"
            strokeWidth="1.2"
            strokeOpacity="0.13"
            animate={{ r: [92, 100, 92], strokeOpacity: [0.08, 0.26, 0.08] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle
            cx={CX}
            cy={CY}
            r="84"
            fill="hsl(225 15% 8%)"
            stroke="hsl(42 100% 58%)"
            strokeWidth="2.2"
            strokeOpacity="0.6"
            filter="url(#gf)"
          />
          <circle cx={CX} cy={CY} r="81" fill="hsl(225 15% 10%)" />
          <circle
            cx={CX}
            cy={CY}
            r="65"
            fill="none"
            stroke="hsl(42 100% 58%)"
            strokeWidth="0.7"
            strokeOpacity="0.16"
            strokeDasharray="4 8"
          />
          <text
            x={CX}
            y={CY - 16}
            textAnchor="middle"
            fill="hsl(42 100% 58%)"
            fontSize="10"
            fontWeight="700"
            fontFamily="Inter,sans-serif"
            letterSpacing="3"
            filter="url(#gf)"
          >
            IoT
          </text>
          <text
            x={CX}
            y={CY + 4}
            textAnchor="middle"
            fill="hsl(42 100% 58%)"
            fontSize="18"
            fontWeight="800"
            fontFamily="Inter,sans-serif"
            letterSpacing="1.5"
            filter="url(#gf)"
          >
            APPLICATIONS
          </text>
          <text
            x={CX}
            y={CY + 22}
            textAnchor="middle"
            fill="hsl(210 20% 78%)"
            fontSize="9"
            fontFamily="Inter,sans-serif"
            letterSpacing="3"
          >
            5 INDUSTRIES
          </text>
          <text
            x={CX}
            y={CY + 38}
            textAnchor="middle"
            fill="hsl(215 12% 44%)"
            fontSize="7.5"
            fontFamily="Inter,sans-serif"
          >
            Transforming daily life
          </text>
        </motion.g>

        {/* connector dots */}
        {categories.map((cat, i) => (
          <motion.circle
            key={cat.title + "-dot"}
            cx={cat.bx}
            cy={cat.by}
            r="5"
            fill={`hsl(${cat.hsl})`}
            fillOpacity="0.75"
            filter="url(#sf)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
          />
        ))}
      </svg>
    </div>
  </div>
);
