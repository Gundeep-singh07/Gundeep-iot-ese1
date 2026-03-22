import { SectionTitle } from "./GlowCard";
import { motion } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────
const protocols = [
  {
    name: "MQTT",
    speed: "Low bandwidth",
    power: "Very Low",
    use: "Telemetry, M2M",
    desc: "Lightweight pub/subscribe messaging",
    hsl: "185 100% 50%",
    bx: 780,
    by: 100,
    leafDir: "right" as const,
  },
  {
    name: "HTTP/HTTPS",
    speed: "High bandwidth",
    power: "High",
    use: "Web APIs, REST",
    desc: "Standard web protocol for IoT gateways",
    hsl: "210 100% 56%",
    bx: 1180,
    by: 200,
    leafDir: "right" as const,
  },
  {
    name: "CoAP",
    speed: "Low bandwidth",
    power: "Very Low",
    use: "Constrained devices",
    desc: "UDP-based for resource-limited nodes",
    hsl: "152 76% 48%",
    bx: 1280,
    by: 430,
    leafDir: "right" as const,
  },
  {
    name: "WebSockets",
    speed: "High bandwidth",
    power: "Medium",
    use: "Real-time streams",
    desc: "Full-duplex persistent connections",
    hsl: "42 100% 58%",
    bx: 1000,
    by: 620,
    leafDir: "right" as const,
  },
  {
    name: "Zigbee",
    speed: "Low bandwidth",
    power: "Ultra Low",
    use: "Smart home mesh",
    desc: "Short-range mesh networking protocol",
    hsl: "330 80% 60%",
    bx: 580,
    by: 620,
    leafDir: "left" as const,
  },
  {
    name: "LoRaWAN",
    speed: "Very Low",
    power: "Ultra Low",
    use: "Long-range IoT",
    desc: "Wide-area network for remote sensors",
    hsl: "270 76% 60%",
    bx: 330,
    by: 430,
    leafDir: "left" as const,
  },
  {
    name: "BLE",
    speed: "Medium",
    power: "Very Low",
    use: "Wearables, beacons",
    desc: "Bluetooth Low Energy for proximity",
    hsl: "0 84% 60%",
    bx: 430,
    by: 200,
    leafDir: "left" as const,
  },
];

const CX = 800;
const CY = 370;
const BR = 52;

// leaf detail card dimensions
const CARD_W = 190;
const CARD_H = 88;
const CARD_DIST = 82; // gap from branch edge to card

function bezier(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
}

function cardBezier(
  bx: number,
  by: number,
  cx2: number,
  cy2: number,
  dir: "left" | "right"
) {
  const s = dir === "right" ? 1 : -1;
  return `M${bx + s * BR},${by} C${bx + s * (BR + 55)},${by} ${
    cx2 - s * 30
  },${cy2} ${cx2},${cy2}`;
}

const powerColor: Record<string, string> = {
  "Ultra Low": "hsl(152 76% 48%)",
  "Very Low": "hsl(185 100% 50%)",
  Low: "hsl(185 100% 60%)",
  Medium: "hsl(42 100% 58%)",
  High: "hsl(0 84% 60%)",
};

const speedColor = (s: string) =>
  s.includes("Very Low") || s.includes("Low")
    ? "hsl(185 100% 50%)"
    : s.includes("Medium")
    ? "hsl(42 100% 58%)"
    : "hsl(0 84% 60%)";

// ─── Component ────────────────────────────────────────────────────────────────
export const CommunicationTab = () => (
  <div className="w-full pt-8">
    <SectionTitle
      color="text-iot-cyan text-glow-cyan"
      subtitle="Protocols that enable devices to communicate across networks"
    >
      Communication Protocols
    </SectionTitle>

    {/* HORIZONTAL SCROLL WRAPPER */}
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
        viewBox="0 0 1800 760"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",
          width: "1800px",
          height: "760px",
          flexShrink: 0,
        }}
      >
        <defs>
          {protocols.map((p) => (
            <radialGradient
              key={p.name}
              id={`halo-${p.name}`}
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop
                offset="0%"
                stopColor={`hsl(${p.hsl})`}
                stopOpacity="0.22"
              />
              <stop offset="100%" stopColor={`hsl(${p.hsl})`} stopOpacity="0" />
            </radialGradient>
          ))}
          <radialGradient id="center-halo" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="hsl(185 100% 50%)"
              stopOpacity="0.38"
            />
            <stop offset="100%" stopColor="hsl(185 100% 50%)" stopOpacity="0" />
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
          <circle cx="1" cy="1" r="1" fill="hsl(210 100% 80% / 0.045)" />
        </pattern>
        <rect width="1800" height="760" fill="url(#dots)" />

        {/* center glow */}
        <circle cx={CX} cy={CY} r="150" fill="url(#center-halo)" />

        {/* trunk lines */}
        {protocols.map((p, i) => (
          <motion.path
            key={p.name + "-trunk"}
            d={bezier(CX, CY, p.bx, p.by)}
            fill="none"
            stroke={`hsl(${p.hsl})`}
            strokeWidth="2.2"
            strokeOpacity="0.45"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              delay: 0.15 + i * 0.09,
              duration: 0.65,
              ease: "easeOut",
            }}
          />
        ))}

        {/* branch → card connector lines */}
        {protocols.map((p, i) => {
          const s = p.leafDir === "right" ? 1 : -1;
          const cardX =
            p.leafDir === "right"
              ? p.bx + BR + CARD_DIST
              : p.bx - BR - CARD_DIST - CARD_W;
          const anchorX = p.leafDir === "right" ? cardX : cardX + CARD_W;
          const anchorY = p.by - CARD_H / 2 + CARD_H / 2; // center of card
          return (
            <motion.path
              key={p.name + "-conn"}
              d={cardBezier(p.bx, p.by, anchorX, anchorY, p.leafDir)}
              fill="none"
              stroke={`hsl(${p.hsl})`}
              strokeWidth="1.4"
              strokeOpacity="0.3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.09, duration: 0.45 }}
            />
          );
        })}

        {/* branch halos */}
        {protocols.map((p) => (
          <circle
            key={p.name + "-halo"}
            cx={p.bx}
            cy={p.by}
            r="85"
            fill={`url(#halo-${p.name})`}
          />
        ))}

        {/* branch nodes */}
        {protocols.map((p, i) => (
          <motion.g
            key={p.name + "-node"}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.14 + i * 0.09,
              type: "spring",
              stiffness: 210,
            }}
            style={{ transformOrigin: `${p.bx}px ${p.by}px` }}
          >
            <circle
              cx={p.bx}
              cy={p.by}
              r={BR + 10}
              fill="none"
              stroke={`hsl(${p.hsl})`}
              strokeWidth="1"
              strokeOpacity="0.14"
              filter="url(#gf)"
            />
            <circle
              cx={p.bx}
              cy={p.by}
              r={BR}
              fill="hsl(225 15% 8%)"
              stroke={`hsl(${p.hsl})`}
              strokeWidth="2"
              strokeOpacity="0.72"
              filter="url(#sf)"
            />
            <circle cx={p.bx} cy={p.by} r={BR - 2} fill="hsl(225 15% 11%)" />
            {/* inner dashed ring */}
            <circle
              cx={p.bx}
              cy={p.by}
              r={BR - 12}
              fill="none"
              stroke={`hsl(${p.hsl})`}
              strokeWidth="0.6"
              strokeOpacity="0.2"
              strokeDasharray="3 5"
            />
            {/* protocol name */}
            <text
              x={p.bx}
              y={p.by + 5}
              textAnchor="middle"
              fill={`hsl(${p.hsl})`}
              fontSize="12.5"
              fontWeight="800"
              fontFamily="Inter,sans-serif"
              letterSpacing="0.8"
            >
              {p.name}
            </text>
          </motion.g>
        ))}

        {/* detail cards */}
        {protocols.map((p, i) => {
          const cardX =
            p.leafDir === "right"
              ? p.bx + BR + CARD_DIST
              : p.bx - BR - CARD_DIST - CARD_W;
          const cardY = p.by - CARD_H / 2;

          return (
            <motion.g
              key={p.name + "-card"}
              initial={{ opacity: 0, x: p.leafDir === "right" ? -14 : 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.72 + i * 0.09,
                duration: 0.38,
                ease: "easeOut",
              }}
            >
              {/* card bg */}
              <rect
                x={cardX}
                y={cardY}
                width={CARD_W}
                height={CARD_H}
                rx="12"
                fill={`hsl(${p.hsl} / 0.07)`}
                stroke={`hsl(${p.hsl})`}
                strokeWidth="1"
                strokeOpacity="0.35"
              />

              {/* top accent bar */}
              <rect
                x={cardX + 12}
                y={cardY + 1}
                width={CARD_W - 24}
                height="2.5"
                rx="2"
                fill={`hsl(${p.hsl})`}
                fillOpacity="0.4"
              />

              {/* desc text */}
              <text
                x={cardX + 12}
                y={cardY + 18}
                fill="hsl(210 20% 75%)"
                fontSize="8.5"
                fontFamily="Inter,sans-serif"
                fontWeight="500"
              >
                {p.desc}
              </text>

              {/* divider */}
              <line
                x1={cardX + 12}
                y1={cardY + 26}
                x2={cardX + CARD_W - 12}
                y2={cardY + 26}
                stroke={`hsl(${p.hsl})`}
                strokeOpacity="0.18"
                strokeWidth="0.8"
              />

              {/* Bandwidth row */}
              <text
                x={cardX + 12}
                y={cardY + 42}
                fill="hsl(215 12% 52%)"
                fontSize="8"
                fontFamily="Inter,sans-serif"
              >
                Bandwidth
              </text>
              <text
                x={cardX + CARD_W - 12}
                y={cardY + 42}
                textAnchor="end"
                fill={speedColor(p.speed)}
                fontSize="8"
                fontWeight="600"
                fontFamily="Inter,sans-serif"
              >
                {p.speed}
              </text>

              {/* Power row */}
              <text
                x={cardX + 12}
                y={cardY + 57}
                fill="hsl(215 12% 52%)"
                fontSize="8"
                fontFamily="Inter,sans-serif"
              >
                Power
              </text>
              <text
                x={cardX + CARD_W - 12}
                y={cardY + 57}
                textAnchor="end"
                fill={powerColor[p.power] || "hsl(210 20% 75%)"}
                fontSize="8"
                fontWeight="600"
                fontFamily="Inter,sans-serif"
              >
                {p.power}
              </text>

              {/* Use case row */}
              <text
                x={cardX + 12}
                y={cardY + 72}
                fill="hsl(215 12% 52%)"
                fontSize="8"
                fontFamily="Inter,sans-serif"
              >
                Use Case
              </text>
              <text
                x={cardX + CARD_W - 12}
                y={cardY + 72}
                textAnchor="end"
                fill="hsl(210 20% 80%)"
                fontSize="8"
                fontWeight="500"
                fontFamily="Inter,sans-serif"
              >
                {p.use}
              </text>
            </motion.g>
          );
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
            stroke="hsl(185 100% 50%)"
            strokeWidth="1.2"
            strokeOpacity="0.13"
            animate={{ r: [92, 100, 92], strokeOpacity: [0.08, 0.25, 0.08] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle
            cx={CX}
            cy={CY}
            r="85"
            fill="hsl(225 15% 8%)"
            stroke="hsl(185 100% 50%)"
            strokeWidth="2.2"
            strokeOpacity="0.6"
            filter="url(#gf)"
          />
          <circle cx={CX} cy={CY} r="82" fill="hsl(225 15% 10%)" />
          <circle
            cx={CX}
            cy={CY}
            r="66"
            fill="none"
            stroke="hsl(185 100% 50%)"
            strokeWidth="0.7"
            strokeOpacity="0.16"
            strokeDasharray="4 8"
          />
          <text
            x={CX}
            y={CY - 16}
            textAnchor="middle"
            fill="hsl(185 100% 50%)"
            fontSize="11"
            fontWeight="700"
            fontFamily="Inter,sans-serif"
            letterSpacing="3"
            filter="url(#gf)"
          >
            COMM
          </text>
          <text
            x={CX}
            y={CY + 4}
            textAnchor="middle"
            fill="hsl(185 100% 50%)"
            fontSize="20"
            fontWeight="800"
            fontFamily="Inter,sans-serif"
            letterSpacing="2"
            filter="url(#gf)"
          >
            PROTOCOLS
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
            7 STANDARDS
          </text>
          <text
            x={CX}
            y={CY + 38}
            textAnchor="middle"
            fill="hsl(215 12% 44%)"
            fontSize="7.5"
            fontFamily="Inter,sans-serif"
          >
            Devices → Gateway → Cloud
          </text>
        </motion.g>

        {/* connector dots at branch center */}
        {protocols.map((p, i) => (
          <motion.circle
            key={p.name + "-dot"}
            cx={p.bx}
            cy={p.by}
            r="5"
            fill={`hsl(${p.hsl})`}
            fillOpacity="0.75"
            filter="url(#sf)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 + i * 0.09 }}
          />
        ))}
      </svg>
    </div>
  </div>
);
