import { useEffect, useRef } from "react";
import { Cpu, Radio, Layers, Globe, Database, Shield, Zap } from "lucide-react";

const CENTER_X = 300;
const CENTER_Y = 300;
const RADIUS = 200;

const nodes = [
  {
    label: "Core Components",
    icon: Cpu,
    angle: 0,
    color: "#378ADD",
    bg: "#E6F1FB",
    text: "#0C447C",
  },
  {
    label: "Communication",
    icon: Radio,
    angle: 51.4,
    color: "#1D9E75",
    bg: "#E1F5EE",
    text: "#085041",
  },
  {
    label: "Architecture",
    icon: Layers,
    angle: 102.8,
    color: "#7F77DD",
    bg: "#EEEDFE",
    text: "#3C3489",
  },
  {
    label: "Applications",
    icon: Globe,
    angle: 154.3,
    color: "#BA7517",
    bg: "#FAEEDA",
    text: "#633806",
  },
  {
    label: "Data Management",
    icon: Database,
    angle: 205.7,
    color: "#D4537E",
    bg: "#FBEAF0",
    text: "#4B1528",
  },
  {
    label: "Security",
    icon: Shield,
    angle: 257.1,
    color: "#E24B4A",
    bg: "#FCEBEB",
    text: "#501313",
  },
  {
    label: "Emerging Trends",
    icon: Zap,
    angle: 308.6,
    color: "#7F77DD",
    bg: "#EEEDFE",
    text: "#3C3489",
  },
];

const stats = [
  { value: "75B+", label: "Connected devices by 2030" },
  { value: "$1.6T", label: "Market value projection" },
  { value: "7", label: "Knowledge domains" },
];

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

export const OverviewTab = () => {
  const svgRef = useRef(null);

  // Animate lines and nodes on mount
  useEffect(() => {
    const lines = svgRef.current?.querySelectorAll(".spoke");
    const nodeGroups = svgRef.current?.querySelectorAll(".orbit-node");
    const center = svgRef.current?.querySelector(".center-node");

    if (center) {
      center.style.opacity = "0";
      center.style.transform = "scale(0.7)";
      center.style.transformOrigin = `${CENTER_X}px ${CENTER_Y}px`;
      center.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      requestAnimationFrame(() => {
        center.style.opacity = "1";
        center.style.transform = "scale(1)";
      });
    }

    lines?.forEach((line, i) => {
      line.style.opacity = "0";
      line.style.transition = `opacity 0.4s ease ${0.3 + i * 0.07}s`;
      requestAnimationFrame(() => {
        line.style.opacity = "1";
      });
    });

    nodeGroups?.forEach((g, i) => {
      g.style.opacity = "0";
      g.style.transform = "scale(0.8)";
      g.style.transition = `opacity 0.4s ease ${
        0.4 + i * 0.08
      }s, transform 0.4s ease ${0.4 + i * 0.08}s`;
      const node = nodes[i];
      const rad = toRad(node.angle);
      const cx = CENTER_X + RADIUS * Math.cos(rad);
      const cy = CENTER_Y + RADIUS * Math.sin(rad);
      g.style.transformOrigin = `${cx}px ${cy}px`;
      requestAnimationFrame(() => {
        g.style.opacity = "1";
        g.style.transform = "scale(1)";
      });
    });
  }, []);

  return (
    <div
      style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: "2.5rem 1rem 2rem",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "hsl(215 12% 52%)",
            marginBottom: 10,
          }}
        >
          Interactive Knowledge System
        </p>
        <h2
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            margin: 0,
            color: "hsl(210 100% 56%)",
            textShadow: "0 0 24px hsl(210 100% 56% / 0.35)",
          }}
        >
          Internet of Things
        </h2>
        <p
          style={{
            color: "hsl(215 12% 52%)",
            fontSize: 13,
            maxWidth: 380,
            margin: "10px auto 0",
            lineHeight: 1.6,
          }}
        >
          Explore the interconnected ecosystem of IoT — from sensors to cloud
          intelligence
        </p>
      </div>

      {/* Mind Map SVG */}
      <div style={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
        <svg
          ref={svgRef}
          width="100%"
          viewBox="0 0 600 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Spoke lines */}
          {nodes.map((node, i) => {
            const rad = toRad(node.angle);
            const x2 = CENTER_X + RADIUS * Math.cos(rad);
            const y2 = CENTER_Y + RADIUS * Math.sin(rad);
            // Stop line at center circle edge (r=52) and node box edge (~55px away)
            const stopFactor = 52 / RADIUS;
            const x1 = CENTER_X + RADIUS * stopFactor * Math.cos(rad);
            const y1 = CENTER_Y + RADIUS * stopFactor * Math.sin(rad);
            const endFactor = 0.72;
            const ex = CENTER_X + RADIUS * endFactor * Math.cos(rad);
            const ey = CENTER_Y + RADIUS * endFactor * Math.sin(rad);
            return (
              <line
                key={i}
                className="spoke"
                x1={x1}
                y1={y1}
                x2={ex}
                y2={ey}
                stroke="hsl(225 12% 28%)"
                strokeWidth={1}
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Center node */}
          <g className="center-node">
            <circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r={52}
              fill="hsl(210 100% 56% / 0.08)"
              stroke="hsl(210 100% 56% / 0.5)"
              strokeWidth={1.5}
            />
            <circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r={44}
              fill="hsl(210 100% 56% / 0.06)"
              stroke="hsl(210 100% 56% / 0.2)"
              strokeWidth={1}
            />
            <text
              x={CENTER_X}
              y={CENTER_Y - 6}
              textAnchor="middle"
              dominantBaseline="central"
              fill="hsl(210 100% 56%)"
              fontSize={18}
              fontWeight={700}
              style={{ textShadow: "0 0 16px hsl(210 100% 56% / 0.5)" }}
            >
              IoT
            </text>
            <text
              x={CENTER_X}
              y={CENTER_Y + 14}
              textAnchor="middle"
              fill="hsl(215 12% 55%)"
              fontSize={10}
            >
              Ecosystem
            </text>
          </g>

          {/* Orbital nodes */}
          {nodes.map((node, i) => {
            const rad = toRad(node.angle);
            const cx = CENTER_X + RADIUS * Math.cos(rad);
            const cy = CENTER_Y + RADIUS * Math.sin(rad);
            const boxW = node.label.length > 12 ? 130 : 110;
            const boxH = 46;
            const Icon = node.icon;
            return (
              <g
                key={node.label}
                className="orbit-node"
                style={{ cursor: "pointer" }}
              >
                <rect
                  x={cx - boxW / 2}
                  y={cy - boxH / 2}
                  width={boxW}
                  height={boxH}
                  rx={8}
                  fill={node.bg}
                  stroke={node.color}
                  strokeWidth={0.8}
                  opacity={0.95}
                />
                {/* Icon rendered as foreignObject for Lucide */}
                <foreignObject
                  x={cx - boxW / 2 + 8}
                  y={cy - 9}
                  width={18}
                  height={18}
                >
                  <Icon
                    xmlns="http://www.w3.org/1999/xhtml"
                    style={{
                      width: 14,
                      height: 14,
                      color: node.color,
                      marginTop: 2,
                    }}
                  />
                </foreignObject>
                <text
                  x={cx - boxW / 2 + 28}
                  y={cy + 1}
                  dominantBaseline="central"
                  fill={node.text}
                  fontSize={11}
                  fontWeight={600}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          maxWidth: 480,
          margin: "1.5rem auto 0",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              textAlign: "center",
              padding: "1rem 0.5rem",
              borderRadius: 10,
              background: "hsl(225 15% 9%)",
              border: "1px solid hsl(225 12% 16%)",
            }}
          >
            <div
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "hsl(210 20% 92%)",
                letterSpacing: "-0.01em",
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "hsl(215 12% 52%)",
                marginTop: 4,
                lineHeight: 1.4,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
