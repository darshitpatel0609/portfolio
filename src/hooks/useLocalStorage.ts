import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(nextValue));
        } catch {
          // Ignore storage quota errors in private contexts
        }
        return nextValue;
      });
    },
    [key]
  );

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      try {
        setStoredValue(
          event.newValue !== null ? (JSON.parse(event.newValue) as T) : initialValue
        );
      } catch {
        setStoredValue(initialValue);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, initialValue]);

  return [storedValue, setValue] as const;
}
