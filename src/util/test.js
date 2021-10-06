const debounce = (func, delay) => { 
    let timeout;
    return (...arg) => {
        console.log(timeout)
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(function () {
        func(...arg);
      }, delay);
    };
  };
  
  const func = debounce((num) =>{
    console.log(num)
  },1000)

  func(1)
  func(2)
  func(3)