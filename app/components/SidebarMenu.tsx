// app/components/SidebarMenu.tsx

"use client";

import { useState } from 'react';

interface SidebarMenuProps {
  items: { id: string; name: string }[]; 
  onItemClick: (id: string) => void;
  activeItem: string;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  tabs?: { name: string; onClick: () => void }[];  // Optional tabs for more complex sidebars
}

export default function SidebarMenu({
  items,
  onItemClick,
  activeItem,
  isSidebarOpen,
  toggleSidebar,
  tabs = [],
}: SidebarMenuProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.name || '');

  const handleItemClick = (name: string) => {
    console.log('Clicked Item:', name);  // Debugging: Log clicked item
    onItemClick(name);
  };

  return (
    <div className="sidebar">
      {items.map(item => (
        <button
          key={item.name}
          onClick={() => handleItemClick(item.name)}
          className={`button-2 ${activeItem === item.name ? 'button-active' : 'button-inactive'}`}
        >
          {item.name}
        </button>
      ))}

    </div>
  );
}
