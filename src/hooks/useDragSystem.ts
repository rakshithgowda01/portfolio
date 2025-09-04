import { useState, useCallback } from 'react';

export interface DragItem {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface UseDragSystemProps {
  gridSize?: number;
  minSpacing?: number;
}

export const useDragSystem = ({ gridSize = 20, minSpacing = 10 }: UseDragSystemProps = {}) => {
  const [items, setItems] = useState<DragItem[]>([]);

  // Check if a position would cause overlap with existing items
  const checkCollision = useCallback((newItem: DragItem, excludeId?: string) => {
    return items.some(item => {
      if (excludeId && item.id === excludeId) return false;
      
      const horizontalOverlap = newItem.x < item.x + item.width + minSpacing && 
                               newItem.x + newItem.width + minSpacing > item.x;
      
      const verticalOverlap = newItem.y < item.y + item.height + minSpacing && 
                             newItem.y + newItem.height + minSpacing > item.y;
      
      return horizontalOverlap && verticalOverlap;
    });
  }, [items, minSpacing]);

  // Snap position to grid
  const snapToGrid = useCallback((x: number, y: number) => {
    return {
      x: Math.round(x / gridSize) * gridSize,
      y: Math.round(y / gridSize) * gridSize
    };
  }, [gridSize]);

  // Find the nearest non-colliding position
  const findValidPosition = useCallback((item: DragItem, preferredX: number, preferredY: number) => {
    const snapped = snapToGrid(preferredX, preferredY);
    let testItem = { ...item, x: snapped.x, y: snapped.y };

    if (!checkCollision(testItem, item.id)) {
      return snapped;
    }

    // Try positions in expanding spiral pattern
    const maxAttempts = 100;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const radius = attempt * gridSize;
      const positions = [
        { x: snapped.x + radius, y: snapped.y },
        { x: snapped.x - radius, y: snapped.y },
        { x: snapped.x, y: snapped.y + radius },
        { x: snapped.x, y: snapped.y - radius },
        { x: snapped.x + radius, y: snapped.y + radius },
        { x: snapped.x - radius, y: snapped.y - radius },
        { x: snapped.x + radius, y: snapped.y - radius },
        { x: snapped.x - radius, y: snapped.y + radius },
      ];

      for (const pos of positions) {
        testItem = { ...item, x: pos.x, y: pos.y };
        if (!checkCollision(testItem, item.id) && pos.x >= 0 && pos.y >= 0) {
          return pos;
        }
      }
    }

    return snapped; // Fallback to preferred position
  }, [snapToGrid, checkCollision, gridSize]);

  // Register an item in the drag system
  const registerItem = useCallback((item: DragItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev;
      
      const validPosition = findValidPosition(item, item.x, item.y);
      const newItem = { ...item, ...validPosition };
      
      return [...prev, newItem];
    });
  }, [findValidPosition]);

  // Update item position
  const updateItemPosition = useCallback((id: string, x: number, y: number) => {
    setItems(prev => 
      prev.map(item => {
        if (item.id !== id) return item;
        
        const validPosition = findValidPosition(item, x, y);
        return { ...item, ...validPosition };
      })
    );
  }, [findValidPosition]);

  // Remove item from system
  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  return {
    items,
    registerItem,
    updateItemPosition,
    removeItem,
    checkCollision,
    snapToGrid
  };
};