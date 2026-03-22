import { GlowCard, SectionTitle } from "./GlowCard";
import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck } from "lucide-react";

const threats = [
  { name: "Data Breaches", desc: "Unauthorized access to sensitive IoT data streams" },
  { name: "Device Hijacking", desc: "Taking control of IoT devices remotely" },
  { name: "DDoS Attacks", desc: "Overwhelming networks via compromised IoT botnets" },
  { name: "Privacy Violations", desc: "Unauthorized collection and misuse of personal data" },
];

const solutions = [
  { name: "Encryption", desc: "End-to-end data encryption (AES-256, TLS)" },
  { name: "Authentication", desc: "Multi-factor auth and device certificates" },
  { name: "Secure Protocols", desc: "DTLS, MQTT over TLS, secure boot" },
  { name: "Firmware Updates", desc: "OTA updates with signed, verified patches" },
];

export const SecurityTab = () => (
  <div className="max-w-5xl mx-auto pt-8">
    <SectionTitle color="text-iot-red text-glow-red" subtitle="Security connects to every layer — it's not optional, it's foundational">
      Security
    </SectionTitle>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-8 p-4 rounded-xl border border-iot-red/20 bg-iot-red/5 text-center"
    >
      <p className="text-xs text-iot-red/80">⚠ Security is a cross-cutting concern — it touches sensors, protocols, architecture, data, and applications</p>
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Threats */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <ShieldAlert className="w-4 h-4 text-iot-red" />
          <h3 className="text-sm font-semibold text-iot-red text-glow-red">Threat Landscape</h3>
        </div>
        <div className="space-y-3">
          {threats.map((t, i) => (
            <GlowCard key={t.name} color="red" delay={0.1 + i * 0.08}>
              <h4 className="text-sm font-medium text-foreground">{t.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
            </GlowCard>
          ))}
        </div>
      </div>

      {/* Solutions */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-4 h-4 text-iot-green" />
          <h3 className="text-sm font-semibold text-iot-green text-glow-green">Defense Strategies</h3>
        </div>
        <div className="space-y-3">
          {solutions.map((s, i) => (
            <GlowCard key={s.name} color="green" delay={0.1 + i * 0.08}>
              <h4 className="text-sm font-medium text-foreground">{s.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </div>
  </div>
);
