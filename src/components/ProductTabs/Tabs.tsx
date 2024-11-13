import React, { useCallback } from "react";

type Tab = {
  label: string;
  value: string;
};

type TabsProps = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  tabs: Tab[];
};

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, tabs }) => {
  const handleTabChange = useCallback(
    (tabValue: string) => {
      setActiveTab(tabValue);
    },
    [setActiveTab]
  );

  return (
    <div className="flex space-x-4 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleTabChange(tab.value)}
          className={`p-2 ${
            activeTab === tab.value ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
