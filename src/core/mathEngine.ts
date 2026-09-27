export const roundTo = (num: number, decimals: number = 2): number => {
  return Number(num.toFixed(decimals));
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

export const saveToLocalStorage = (key: string, value: any): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const loadFromLocalStorage = (key: string, defaultValue: any): any => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  }
  return defaultValue;
};
