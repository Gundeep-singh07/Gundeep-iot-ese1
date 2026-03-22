import { SectionTitle } from "./GlowCard";
import { motion } from "framer-motion";
import { Download, Send, HardDrive, BrainCircuit, BarChart3, ArrowRight } from "lucide-react";

const pipeline = [
  { label: "Collection", icon: Download, desc: "Sensors gather raw data from the physical world" },
  { label: "Transmission", icon: Send, desc: "Data is routed through gateways and networks" },
  { label: "Storage", icon: HardDrive, desc: "Cloud and edge databases persist the data" },
  { label: "Processing", icon: BrainCircuit, desc: "AI/ML models extract insights and patterns" },
  { label: "Visualization", icon: BarChart3, desc: "Dashboards present actionable intelligence" },
];

export const DataManagementTab = () => (
  <div className="max-w-4xl mx-auto pt-8">
    <SectionTitle color="text-iot-pink text-glow-pink" subtitle="The journey of data from collection to insight">
      Data Management
    </SectionTitle>

    <div className="space-y-3">
      {pipeline.map((step, i) => {
        const Icon = step.icon;
        return (
          <div key={step.label}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl border border-iot-pink/20 bg-iot-pink/5 p-5 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-iot-pink/10 border border-iot-pink/20 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-iot-pink" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-iot-pink text-glow-pink">{step.label}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
              </div>
              <span className="text-xs text-muted-foreground font-mono">{String(i + 1).padStart(2, "0")}</span>
            </motion.div>
            {i < pipeline.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex justify-center py-1"
              >
                <ArrowRight className="w-3 h-3 text-iot-pink/30 rotate-90" />
              </motion.div>
            )}
          </div>
        );
      })}
    </div>

    {/* Supporting tech */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className="mt-8 grid grid-cols-3 gap-3"
    >
      {[
        { label: "AI / ML", desc: "Pattern recognition & prediction" },
        { label: "Big Data", desc: "Handling massive data volumes" },
        { label: "Cloud Computing", desc: "Scalable infrastructure" },
      ].map((tech) => (
        <div key={tech.label} className="text-center p-4 rounded-xl bg-iot-pink/5 border border-iot-pink/10">
          <div className="text-sm font-semibold text-iot-pink text-glow-pink">{tech.label}</div>
          <div className="text-[10px] text-muted-foreground mt-1">{tech.desc}</div>
        </div>
      ))}
    </motion.div>
  </div>
);
