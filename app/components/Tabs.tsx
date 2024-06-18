"use client";

interface TabsProps {
  tabs: { label: string; value: string }[];
  selectedTabValue: string;
  onTabChange: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, selectedTabValue, onTabChange }) => {
  return (
    <div className="flex justify-between w-full mt-4 p-1 rounded bg-slate-200">
      {tabs.map((tab) => (
        <div
          key={tab.value}
          className={`flex-1 text-center text-xs p-2 cursor-pointer rounded ${
            selectedTabValue === tab.value
              ? "bg-white font-semibold"
              : "opacity-30 font-medium"
          }`}
          onClick={() => onTabChange(tab.value)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
