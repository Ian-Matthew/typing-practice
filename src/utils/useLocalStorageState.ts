import React from "react";
export function useLocalStorageState(defaultValue: any, key: string) {
  const [value, setValue] = React.useState(() => {
    if (typeof window === "undefined") return defaultValue;
    let fromStorage = window.localStorage.getItem(key);
    if (fromStorage) fromStorage = JSON.parse(fromStorage);
    return fromStorage || defaultValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
