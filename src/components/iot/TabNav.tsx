import { motion } from "framer-motion";

interface Tab {
  id: string;
  label: string;
}

interface TabNavProps {
  tabs: readonly Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export const TabNav = ({ tabs, activeTab, onTabChange }: TabNavProps) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center h-16 gap-6">
          <h1 className="text-lg font-bold tracking-tight text-foreground whitespace-nowrap hidden sm:block">
            <span className="text-iot-blue text-glow-blue">IoT</span>{" "}
            <span className="text-muted-foreground font-medium">Explorer</span>
          </h1>
          <div className="w-px h-8 bg-border hidden sm:block" />
          <nav className="flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex gap-1 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className="relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 whitespace-nowrap"
                  style={{ color: activeTab === tab.id ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))" }}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-secondary rounded-lg"
                      transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
