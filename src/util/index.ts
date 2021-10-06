import { useEffect, useState } from "react";
// 页面初始化的时候执行这个hook
export const useMount = (callback:()=>void) => {
  useEffect(() => {
    callback();
  }, []);
};

let timeout:NodeJS.Timeout ;
export const debounce = (func:(newValue:string)=>void, delay:number) => { 
  return (arg:string) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      console.log("newValue", arg[0]);
      func(arg);
    }, delay);
  };
};

export const useDebounce = (value:string, delay:number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  const delaySetValue = debounce((newValue:string) => {
    setDebounceValue(newValue);
  }, delay);
  useEffect(() => {
    console.log(value);
    delaySetValue(value);
  }, [value, delay,delaySetValue]);
  return debounceValue;
};
