import { SectionTitle } from "./GlowCard";
import { motion } from "framer-motion";
import { Eye, Network, Cpu, AppWindow } from "lucide-react";

const layers = [
  {
    name: "Application Layer",
    icon: AppWindow,
    color: "iot-gold",
    desc: "User-facing services and dashboards",
    items: ["Smart Home Apps", "Industrial Dashboards", "Healthcare Portals", "Analytics Platforms"],
  },
  {
    name: "Processing Layer",
    icon: Cpu,
    color: "iot-green",
    desc: "Data analytics, ML models, decision engines",
    items: ["Edge Computing", "Cloud Analytics", "AI/ML Models", "Rule Engines"],
  },
  {
    name: "Network Layer",
    icon: Network,
    color: "iot-cyan",
    desc: "Data routing, protocol translation, gateways",
    items: ["Gateways", "Routers", "Protocol Translation", "Load Balancing"],
  },
  {
    name: "Perception Layer",
    icon: Eye,
    color: "iot-blue",
    desc: "Physical sensors, actuators, and embedded devices",
    items: ["Sensors", "Actuators", "RFID Tags", "Microcontrollers"],
  },
];

const colorClasses: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  "iot-gold": { bg: "bg-iot-gold/10", border: "border-iot-gold/20", text: "text-iot-gold", glow: "text-glow-gold" },
  "iot-green": { bg: "bg-iot-green/10", border: "border-iot-green/20", text: "text-iot-green", glow: "text-glow-green" },
  "iot-cyan": { bg: "bg-iot-cyan/10", border: "border-iot-cyan/20", text: "text-iot-cyan", glow: "text-glow-cyan" },
  "iot-blue": { bg: "bg-iot-blue/10", border: "border-iot-blue/20", text: "text-iot-blue", glow: "text-glow-blue" },
};

export const ArchitectureTab = () => (
  <div className="max-w-3xl mx-auto pt-8">
    <SectionTitle color="text-iot-green text-glow-green" subtitle="The layered stack that structures every IoT system">
      Layered Architecture
    </SectionTitle>

    {/* Data flow indicator */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex justify-center mb-6"
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>↑ Data flows upward</span>
        <span className="text-border">|</span>
        <span>Commands flow downward ↓</span>
      </div>
    </motion.div>

    <div className="space-y-3">
      {layers.map((layer, i) => {
        const c = colorClasses[layer.color];
        const Icon = layer.icon;
        return (
          <motion.div
            key={layer.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`relative rounded-xl border ${c.border} ${c.bg} p-5 backdrop-blur-sm`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${c.text}`} />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold text-sm ${c.text} ${c.glow}`}>{layer.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{layer.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {layer.items.map((item) => (
                    <span key={item} className={`text-[10px] px-2 py-0.5 rounded-full ${c.bg} border ${c.border} ${c.text}/80`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Connector line */}
            {i < layers.length - 1 && (
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-px h-3 bg-border" />
            )}
          </motion.div>
        );
      })}
    </div>
  </div>
);
