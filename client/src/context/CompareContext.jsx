import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState(() => {
    try {
      const saved = localStorage.getItem('rockstar_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem('rockstar_compare', JSON.stringify(compareItems));
  }, [compareItems]);

  const isInCompare = (productId) => {
    return compareItems.some((item) => (item._id || item.productId) === productId);
  };

  const addToCompare = (product) => {
    if (!product) return;
    const id = product._id || product.productId;

    if (isInCompare(id)) {
      setCompareItems((prev) => prev.filter((item) => (item._id || item.productId) !== id));
      addToast(`Removed "${product.name}" from comparison`, 'info');
      return;
    }

    if (compareItems.length >= 4) {
      addToast('You can compare a maximum of 4 instruments at once.', 'warning');
      return;
    }

    // Category consistency check: warn if comparing unrelated products
    if (compareItems.length > 0) {
      const primaryCategory = compareItems[0].category;
      if (primaryCategory.toLowerCase() !== product.category.toLowerCase()) {
        addToast(
          `Comparison works best within the same instrument family (${primaryCategory}). Comparing ${product.category} may show mismatched specs.`,
          'warning',
          4500
        );
      }
    }

    setCompareItems((prev) => [...prev, product]);
    addToast(`Added "${product.name}" to comparison matrix`, 'success');
  };

  const removeFromCompare = (productId) => {
    setCompareItems((prev) => prev.filter((item) => (item._id || item.productId) !== productId));
    addToast('Product removed from comparison', 'info');
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        compareCount: compareItems.length,
        isInCompare,
        addToCompare,
        removeFromCompare,
        clearCompare
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
