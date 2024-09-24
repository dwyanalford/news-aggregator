// app/hooks/useActiveState.ts
import { useState } from 'react';

// managing the active/inactive state logic, not the UI details.
export default function useActiveState<T>(defaultActive: T) {
  const [activeItem, setActiveItem] = useState<T>(defaultActive);

  const handleItemClick = (item: T) => {
    setActiveItem(item);
  };

  return {
    activeItem,
    handleItemClick,
  };
}
