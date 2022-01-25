import { useEffect, useState } from "react";
// 页面初始化的时候执行这个hook
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const debounce = (func: (newValue: string) => void, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (arg: string) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      console.log("newValue", arg[0]);
      func(arg);
    }, delay);
  };
};

export const throttle = (func: (newValue: any) => void, delay: number) => {
  let timeout:any;
  return (arg: any) => {
    if (timeout) {
      return;
    }
    timeout = setTimeout(function () {
      func(arg);
      timeout = null;
    }, delay);
  };
};

export const useDebounce = (value: string, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  const delaySetValue = debounce((newValue: string) => {
    setDebounceValue(newValue);
  }, delay);
  useEffect(() => {
    console.log(value);
    delaySetValue(value);
  }, [value, delay, delaySetValue]);
  return debounceValue;
};

// 对map进行深拷贝
export const deepCloneMap = <K, V>(map: Map<K, V> | undefined) => {
  if (map === undefined) {
    return map;
  }
  const newMap = new Map<K, V>();
  for (let key of map.keys()) {
    const value = map.get(key);
    newMap.set(key, value as V);
  }
  return newMap;
};
