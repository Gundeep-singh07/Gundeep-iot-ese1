import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TabNav } from "@/components/iot/TabNav";
import { OverviewTab } from "@/components/iot/OverviewTab";
import { CoreComponentsTab } from "@/components/iot/CoreComponentsTab";
import { CommunicationTab } from "@/components/iot/CommunicationTab";
import { ArchitectureTab } from "@/components/iot/ArchitectureTab";
import { ApplicationsTab } from "@/components/iot/ApplicationsTab";
import { DataManagementTab } from "@/components/iot/DataManagementTab";
import { SecurityTab } from "@/components/iot/SecurityTab";
import { EmergingTrendsTab } from "@/components/iot/EmergingTrendsTab";
import { DetailedMindMap } from "@/components/iot/DetailedMindMap"; // ← ADD THIS

const tabs = [
  { id: "mindmap", label: "Mind Map" },
  { id: "overview", label: "Overview" },
  { id: "core", label: "Core Components" },
  { id: "communication", label: "Communication" },
  { id: "architecture", label: "Architecture" },
  { id: "applications", label: "Applications" },
  { id: "data", label: "Data Management" },
  { id: "security", label: "Security" },
  { id: "trends", label: "Emerging Trends" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const tabComponents: Record<TabId, React.FC> = {
  overview: OverviewTab,
  core: CoreComponentsTab,
  communication: CommunicationTab,
  architecture: ArchitectureTab,
  applications: ApplicationsTab,
  data: DataManagementTab,
  security: SecurityTab,
  trends: EmergingTrendsTab,
  mindmap: DetailedMindMap, // ← ADD THIS
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const ActiveComponent = tabComponents[activeTab];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-iot-blue/[0.03] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-iot-purple/[0.03] blur-[120px]" />
      </div>
      <div className="relative z-10">
        <TabNav
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(id) => setActiveTab(id as TabId)}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="px-4 sm:px-8 pb-16"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
