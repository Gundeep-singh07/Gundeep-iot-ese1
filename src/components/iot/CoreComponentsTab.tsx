import { SectionTitle } from "./GlowCard";
import { motion } from "framer-motion";

const components = [
  {
    title: "Sensors",
    items: [
      "Temperature",
      "Motion & Proximity",
      "Humidity & Pressure",
      "Light & Image",
    ],
    desc: "The perception layer",
    hsl: "210 100% 56%",
    bx: 900,
    by: 120,
    leafDir: "right" as const,
  },
  {
    title: "Actuators",
    items: [
      "Motors & Servos",
      "Relays & Switches",
      "Displays",
      "Speakers & Buzzers",
    ],
    desc: "Digital → Physical",
    hsl: "185 100% 50%",
    bx: 1300,
    by: 310,
    leafDir: "right" as const,
  },
  {
    title: "Embedded",
    items: ["Arduino", "Raspberry Pi", "ESP32 / ESP8266", "STM32 MCUs"],
    desc: "Processing at the edge",
    hsl: "152 76% 48%",
    bx: 1200,
    by: 570,
    leafDir: "right" as const,
  },
  {
    title: "Connectivity",
    items: [
      "WiFi (802.11)",
      "Bluetooth / BLE",
      "Cellular (4G/5G)",
      "LoRa / Zigbee",
    ],
    desc: "Bridging to networks",
    hsl: "42 100% 58%",
    bx: 500,
    by: 570,
    leafDir: "left" as const,
  },
  {
    title: "Cloud",
    items: [
      "AWS IoT Core",
      "Azure IoT Hub",
      "Google Cloud IoT",
      "Edge Servers",
    ],
    desc: "Scalable compute",
    hsl: "270 76% 60%",
    bx: 400,
    by: 310,
    leafDir: "left" as const,
  },
];

const CX = 850;
const CY = 370;
const BR = 56;
const LEAF_W = 170;
const LEAF_H = 32;
const LEAF_GAP = 12;
const LEAF_DIST = 90;

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

export const CoreComponentsTab = () => (
  <div className="w-full pt-8">
    <SectionTitle
      color="text-iot-blue text-glow-blue"
      subtitle="The fundamental building blocks that make IoT systems possible"
    >
      Core Components
    </SectionTitle>

    {/* HORIZONTAL SCROLL WRAPPER */}
    <div
      style={{
        overflowX: "auto",
        overflowY: "hidden",
        WebkitOverflowScrolling: "touch",
        cursor: "grab",
        paddingBottom: "8px",
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
          {components.map((c) => (
            <radialGradient
              key={c.title}
              id={`h-${c.title}`}
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop
                offset="0%"
                stopColor={`hsl(${c.hsl})`}
                stopOpacity="0.25"
              />
              <stop offset="100%" stopColor={`hsl(${c.hsl})`} stopOpacity="0" />
            </radialGradient>
          ))}
          <radialGradient id="ch" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(210 100% 56%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(210 100% 56%)" stopOpacity="0" />
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
          <circle cx="1" cy="1" r="1" fill="hsl(210 100% 80% / 0.05)" />
        </pattern>
        <rect width="1800" height="720" fill="url(#dots)" />

        {/* center glow */}
        <circle cx={CX} cy={CY} r="140" fill="url(#ch)" />

        {/* trunk lines */}
        {components.map((comp, i) => (
          <motion.path
            key={comp.title + "-t"}
            d={bezier(CX, CY, comp.bx, comp.by)}
            fill="none"
            stroke={`hsl(${comp.hsl})`}
            strokeWidth="2.5"
            strokeOpacity="0.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              delay: 0.18 + i * 0.1,
              duration: 0.65,
              ease: "easeOut",
            }}
          />
        ))}

        {/* branch → leaf lines */}
        {components.map((comp, i) => {
          const total =
            comp.items.length * LEAF_H + (comp.items.length - 1) * LEAF_GAP;
          const sy = comp.by - total / 2;
          const s = comp.leafDir === "right" ? 1 : -1;
          const edgeX = comp.bx + s * BR;
          const anchorX =
            comp.leafDir === "right" ? edgeX + LEAF_DIST : edgeX - LEAF_DIST;

          return comp.items.map((item, j) => {
            const ly = sy + j * (LEAF_H + LEAF_GAP) + LEAF_H / 2;
            return (
              <motion.path
                key={item + "-l"}
                d={leafBezier(edgeX, comp.by, anchorX, ly, comp.leafDir)}
                fill="none"
                stroke={`hsl(${comp.hsl})`}
                strokeWidth="1.3"
                strokeOpacity="0.3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.65 + i * 0.1 + j * 0.07, duration: 0.4 }}
              />
            );
          });
        })}

        {/* branch halos */}
        {components.map((comp) => (
          <circle
            key={comp.title + "-hl"}
            cx={comp.bx}
            cy={comp.by}
            r="90"
            fill={`url(#h-${comp.title})`}
          />
        ))}

        {/* branch nodes */}
        {components.map((comp, i) => (
          <motion.g
            key={comp.title + "-n"}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.16 + i * 0.1,
              type: "spring",
              stiffness: 210,
            }}
            style={{ transformOrigin: `${comp.bx}px ${comp.by}px` }}
          >
            <circle
              cx={comp.bx}
              cy={comp.by}
              r={BR + 10}
              fill="none"
              stroke={`hsl(${comp.hsl})`}
              strokeWidth="1"
              strokeOpacity="0.15"
              filter="url(#gf)"
            />
            <circle
              cx={comp.bx}
              cy={comp.by}
              r={BR}
              fill="hsl(225 15% 8%)"
              stroke={`hsl(${comp.hsl})`}
              strokeWidth="2"
              strokeOpacity="0.75"
              filter="url(#sf)"
            />
            <circle
              cx={comp.bx}
              cy={comp.by}
              r={BR - 2}
              fill="hsl(225 15% 11%)"
            />
            <circle
              cx={comp.bx}
              cy={comp.by - 16}
              r="7"
              fill={`hsl(${comp.hsl} / 0.18)`}
              stroke={`hsl(${comp.hsl})`}
              strokeWidth="1.2"
              strokeOpacity="0.55"
            />
            <text
              x={comp.bx}
              y={comp.by + 5}
              textAnchor="middle"
              fill={`hsl(${comp.hsl})`}
              fontSize="12"
              fontWeight="700"
              fontFamily="Inter,sans-serif"
              letterSpacing="1"
            >
              {comp.title.toUpperCase()}
            </text>
            <text
              x={comp.bx}
              y={comp.by + 20}
              textAnchor="middle"
              fill="hsl(215 12% 52%)"
              fontSize="8"
              fontFamily="Inter,sans-serif"
            >
              {comp.desc}
            </text>
          </motion.g>
        ))}

        {/* leaf pills */}
        {components.map((comp, i) => {
          const total =
            comp.items.length * LEAF_H + (comp.items.length - 1) * LEAF_GAP;
          const sy = comp.by - total / 2;
          const s = comp.leafDir === "right" ? 1 : -1;
          const edgeX = comp.bx + s * BR;
          const colX =
            comp.leafDir === "right"
              ? edgeX + LEAF_DIST
              : edgeX - LEAF_DIST - LEAF_W;

          return comp.items.map((item, j) => {
            const ly = sy + j * (LEAF_H + LEAF_GAP);
            return (
              <motion.g
                key={item}
                initial={{ opacity: 0, x: comp.leafDir === "right" ? -12 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.8 + i * 0.1 + j * 0.08,
                  duration: 0.35,
                  ease: "easeOut",
                }}
              >
                <rect
                  x={colX}
                  y={ly}
                  width={LEAF_W}
                  height={LEAF_H}
                  rx="16"
                  fill={`hsl(${comp.hsl} / 0.09)`}
                  stroke={`hsl(${comp.hsl})`}
                  strokeWidth="1.1"
                  strokeOpacity="0.42"
                />
                <rect
                  x={comp.leafDir === "right" ? colX + 1 : colX + LEAF_W - 5}
                  y={ly + 7}
                  width="4"
                  height={LEAF_H - 14}
                  rx="2"
                  fill={`hsl(${comp.hsl})`}
                  fillOpacity="0.6"
                />
                <text
                  x={colX + LEAF_W / 2}
                  y={ly + LEAF_H / 2 + 4.5}
                  textAnchor="middle"
                  fill={`hsl(${comp.hsl})`}
                  fillOpacity="0.92"
                  fontSize="10.5"
                  fontWeight="500"
                  fontFamily="Inter,sans-serif"
                >
                  {item}
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
            r="92"
            fill="none"
            stroke="hsl(210 100% 56%)"
            strokeWidth="1.2"
            strokeOpacity="0.15"
            animate={{ r: [88, 96, 88], strokeOpacity: [0.1, 0.28, 0.1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle
            cx={CX}
            cy={CY}
            r="82"
            fill="hsl(225 15% 8%)"
            stroke="hsl(210 100% 56%)"
            strokeWidth="2.2"
            strokeOpacity="0.65"
            filter="url(#gf)"
          />
          <circle cx={CX} cy={CY} r="79" fill="hsl(225 15% 10%)" />
          <circle
            cx={CX}
            cy={CY}
            r="64"
            fill="none"
            stroke="hsl(210 100% 56%)"
            strokeWidth="0.7"
            strokeOpacity="0.18"
            strokeDasharray="4 8"
          />
          <text
            x={CX}
            y={CY - 12}
            textAnchor="middle"
            fill="hsl(210 100% 56%)"
            fontSize="24"
            fontWeight="800"
            fontFamily="Inter,sans-serif"
            letterSpacing="5"
            filter="url(#gf)"
          >
            IoT
          </text>
          <text
            x={CX}
            y={CY + 8}
            textAnchor="middle"
            fill="hsl(210 20% 78%)"
            fontSize="10"
            fontFamily="Inter,sans-serif"
            letterSpacing="4"
          >
            SYSTEM
          </text>
          <text
            x={CX}
            y={CY + 26}
            textAnchor="middle"
            fill="hsl(215 12% 44%)"
            fontSize="8"
            fontFamily="Inter,sans-serif"
          >
            5 Core Layers
          </text>
        </motion.g>

        {/* connector dots */}
        {components.map((comp, i) => (
          <motion.circle
            key={comp.title + "-cd"}
            cx={comp.bx}
            cy={comp.by}
            r="5"
            fill={`hsl(${comp.hsl})`}
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
