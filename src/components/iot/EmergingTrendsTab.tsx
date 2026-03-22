import { SectionTitle } from "./GlowCard";
import { motion } from "framer-motion";

const trends = [
  {
    title: "AIoT",
    desc: "AI-powered edge intelligence",
    hsl: "270 76% 60%",
    tags: ["On-device ML", "Federated Learning", "Neural Processing Units"],
    bx: 850,
    by: 95,
    leafDir: "right" as const,
  },
  {
    title: "Edge Computing",
    desc: "Processing at source, ms latency",
    hsl: "210 100% 56%",
    tags: ["Edge AI", "Fog Computing", "MEC"],
    bx: 1240,
    by: 280,
    leafDir: "right" as const,
  },
  {
    title: "5G Networks",
    desc: "Ultra-low latency at scale",
    hsl: "185 100% 50%",
    tags: ["mMTC", "URLLC", "Network Slicing"],
    bx: 1150,
    by: 550,
    leafDir: "right" as const,
  },
  {
    title: "Digital Twins",
    desc: "Virtual replicas for simulation",
    hsl: "330 80% 60%",
    tags: ["Predictive Models", "Real-time Sync", "Simulation"],
    bx: 550,
    by: 550,
    leafDir: "left" as const,
  },
  {
    title: "Smart Ecosystems",
    desc: "Interconnected systems in harmony",
    hsl: "152 76% 48%",
    tags: ["Interoperability", "Sustainability", "Autonomous Systems"],
    bx: 460,
    by: 280,
    leafDir: "left" as const,
  },
];

const CX = 850;
const CY = 340;
const BR = 54;
const TAG_W = 178;
const TAG_H = 30;
const TAG_GAP = 12;
const TAG_DIST = 86;

function bezier(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
}

function tagBezier(
  bx: number,
  by: number,
  lx: number,
  ly: number,
  dir: "left" | "right"
) {
  const s = dir === "right" ? 1 : -1;
  return `M${bx},${by} C${bx + s * 55},${by} ${lx - s * 28},${ly} ${lx},${ly}`;
}

export const EmergingTrendsTab = () => (
  <div className="w-full pt-8">
    <SectionTitle
      color="text-iot-purple text-glow-purple"
      subtitle="The frontier technologies shaping the next generation of IoT"
    >
      Emerging Trends
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
        viewBox="0 0 1800 700"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",
          width: "1800px",
          height: "700px",
          flexShrink: 0,
        }}
      >
        <defs>
          {trends.map((t) => (
            <radialGradient
              key={t.title}
              id={`halo-${t.title.replace(/\s/g, "")}`}
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop
                offset="0%"
                stopColor={`hsl(${t.hsl})`}
                stopOpacity="0.22"
              />
              <stop offset="100%" stopColor={`hsl(${t.hsl})`} stopOpacity="0" />
            </radialGradient>
          ))}
          <radialGradient id="ch" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(270 76% 60%)" stopOpacity="0.38" />
            <stop offset="100%" stopColor="hsl(270 76% 60%)" stopOpacity="0" />
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

        <pattern
          id="dots"
          x="0"
          y="0"
          width="44"
          height="44"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill="hsl(270 76% 80% / 0.045)" />
        </pattern>
        <rect width="1800" height="700" fill="url(#dots)" />
        <circle cx={CX} cy={CY} r="148" fill="url(#ch)" />

        {/* trunk lines */}
        {trends.map((t, i) => (
          <motion.path
            key={t.title + "-trunk"}
            d={bezier(CX, CY, t.bx, t.by)}
            fill="none"
            stroke={`hsl(${t.hsl})`}
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

        {/* branch → tag lines */}
        {trends.map((t, i) => {
          const total = t.tags.length * TAG_H + (t.tags.length - 1) * TAG_GAP;
          const sy = t.by - total / 2;
          const s = t.leafDir === "right" ? 1 : -1;
          const edgeX = t.bx + s * BR;
          const anchorX =
            t.leafDir === "right" ? edgeX + TAG_DIST : edgeX - TAG_DIST;
          return t.tags.map((tag, j) => {
            const ly = sy + j * (TAG_H + TAG_GAP) + TAG_H / 2;
            return (
              <motion.path
                key={tag + "-line"}
                d={tagBezier(edgeX, t.by, anchorX, ly, t.leafDir)}
                fill="none"
                stroke={`hsl(${t.hsl})`}
                strokeWidth="1.3"
                strokeOpacity="0.28"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.62 + i * 0.1 + j * 0.08, duration: 0.4 }}
              />
            );
          });
        })}

        {/* halos */}
        {trends.map((t) => (
          <circle
            key={t.title + "-hl"}
            cx={t.bx}
            cy={t.by}
            r="90"
            fill={`url(#halo-${t.title.replace(/\s/g, "")})`}
          />
        ))}

        {/* branch nodes */}
        {trends.map((t, i) => (
          <motion.g
            key={t.title + "-node"}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.14 + i * 0.1,
              type: "spring",
              stiffness: 210,
            }}
            style={{ transformOrigin: `${t.bx}px ${t.by}px` }}
          >
            <circle
              cx={t.bx}
              cy={t.by}
              r={BR + 10}
              fill="none"
              stroke={`hsl(${t.hsl})`}
              strokeWidth="1"
              strokeOpacity="0.14"
              filter="url(#gf)"
            />
            <circle
              cx={t.bx}
              cy={t.by}
              r={BR}
              fill="hsl(225 15% 8%)"
              stroke={`hsl(${t.hsl})`}
              strokeWidth="2"
              strokeOpacity="0.72"
              filter="url(#sf)"
            />
            <circle cx={t.bx} cy={t.by} r={BR - 2} fill="hsl(225 15% 11%)" />
            <circle
              cx={t.bx}
              cy={t.by}
              r={BR - 14}
              fill="none"
              stroke={`hsl(${t.hsl})`}
              strokeWidth="0.6"
              strokeOpacity="0.2"
              strokeDasharray="3 5"
            />
            <circle
              cx={t.bx}
              cy={t.by - 15}
              r="6"
              fill={`hsl(${t.hsl} / 0.2)`}
              stroke={`hsl(${t.hsl})`}
              strokeWidth="1.2"
              strokeOpacity="0.55"
            />
            {t.title.includes(" ") ? (
              <>
                <text
                  x={t.bx}
                  y={t.by + 1}
                  textAnchor="middle"
                  fill={`hsl(${t.hsl})`}
                  fontSize="10"
                  fontWeight="800"
                  fontFamily="Inter,sans-serif"
                  letterSpacing="0.5"
                >
                  {t.title.split(" ")[0].toUpperCase()}
                </text>
                <text
                  x={t.bx}
                  y={t.by + 13}
                  textAnchor="middle"
                  fill={`hsl(${t.hsl})`}
                  fontSize="10"
                  fontWeight="800"
                  fontFamily="Inter,sans-serif"
                  letterSpacing="0.5"
                >
                  {t.title.split(" ").slice(1).join(" ").toUpperCase()}
                </text>
              </>
            ) : (
              <text
                x={t.bx}
                y={t.by + 7}
                textAnchor="middle"
                fill={`hsl(${t.hsl})`}
                fontSize="12"
                fontWeight="800"
                fontFamily="Inter,sans-serif"
                letterSpacing="0.8"
              >
                {t.title.toUpperCase()}
              </text>
            )}
          </motion.g>
        ))}

        {/* desc beneath node */}
        {trends.map((t, i) => (
          <motion.text
            key={t.title + "-desc"}
            x={t.bx}
            y={t.by + BR + 18}
            textAnchor="middle"
            fill="hsl(215 12% 50%)"
            fontSize="8"
            fontFamily="Inter,sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            {t.desc}
          </motion.text>
        ))}

        {/* tag pills */}
        {trends.map((t, i) => {
          const total = t.tags.length * TAG_H + (t.tags.length - 1) * TAG_GAP;
          const sy = t.by - total / 2;
          const s = t.leafDir === "right" ? 1 : -1;
          const edgeX = t.bx + s * BR;
          const colX =
            t.leafDir === "right" ? edgeX + TAG_DIST : edgeX - TAG_DIST - TAG_W;

          return t.tags.map((tag, j) => {
            const ly = sy + j * (TAG_H + TAG_GAP);
            return (
              <motion.g
                key={tag}
                initial={{ opacity: 0, x: t.leafDir === "right" ? -12 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.8 + i * 0.1 + j * 0.09,
                  duration: 0.35,
                  ease: "easeOut",
                }}
              >
                <rect
                  x={colX}
                  y={ly}
                  width={TAG_W}
                  height={TAG_H}
                  rx="15"
                  fill={`hsl(${t.hsl} / 0.09)`}
                  stroke={`hsl(${t.hsl})`}
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
                <rect
                  x={t.leafDir === "right" ? colX + 1 : colX + TAG_W - 5}
                  y={ly + 7}
                  width="4"
                  height={TAG_H - 14}
                  rx="2"
                  fill={`hsl(${t.hsl})`}
                  fillOpacity="0.55"
                />
                <text
                  x={colX + TAG_W / 2}
                  y={ly + TAG_H / 2 + 4.5}
                  textAnchor="middle"
                  fill={`hsl(${t.hsl})`}
                  fillOpacity="0.92"
                  fontSize="10"
                  fontWeight="500"
                  fontFamily="Inter,sans-serif"
                >
                  {tag}
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
            stroke="hsl(270 76% 60%)"
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
            stroke="hsl(270 76% 60%)"
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
            stroke="hsl(270 76% 60%)"
            strokeWidth="0.7"
            strokeOpacity="0.18"
            strokeDasharray="4 8"
          />
          <text
            x={CX}
            y={CY - 16}
            textAnchor="middle"
            fill="hsl(270 76% 60%)"
            fontSize="10"
            fontWeight="700"
            fontFamily="Inter,sans-serif"
            letterSpacing="3"
            filter="url(#gf)"
          >
            NEXT-GEN
          </text>
          <text
            x={CX}
            y={CY + 5}
            textAnchor="middle"
            fill="hsl(270 76% 60%)"
            fontSize="17"
            fontWeight="800"
            fontFamily="Inter,sans-serif"
            letterSpacing="1"
            filter="url(#gf)"
          >
            IoT TRENDS
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
            5 FRONTIERS
          </text>
          <text
            x={CX}
            y={CY + 38}
            textAnchor="middle"
            fill="hsl(215 12% 44%)"
            fontSize="7.5"
            fontFamily="Inter,sans-serif"
          >
            Shaping tomorrow's IoT
          </text>
        </motion.g>

        {/* connector dots */}
        {trends.map((t, i) => (
          <motion.circle
            key={t.title + "-dot"}
            cx={t.bx}
            cy={t.by}
            r="5"
            fill={`hsl(${t.hsl})`}
            fillOpacity="0.75"
            filter="url(#sf)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.42 + i * 0.1 }}
          />
        ))}
      </svg>
    </div>
  </div>
);
