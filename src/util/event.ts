// 定义的接口是函数
interface Event {
  (data: any): void;
}

class EventHub {
  private cache: { [key: string]: Array<Event> } = {}; // 缓存订阅的事件
  // {
  //     'xxx事件': [fn1, fn2, fn3]
  // }

  // 把fn 推进this.cache[eventName]数组里
  on(eventName: string, fn: Event) {
    // 如果订阅的事件缓存里不存在任何处理函数，则初始化订阅事件名为一个空数组
    this.cache[eventName] = [fn]
  }

  // 依次执行this.cache[eventName]数组里的函数
  emit(eventName: string, params?: unknown) {
    (this.cache[eventName] || []).forEach((fn) => fn(params));
  }

  // 取消订阅的事件
  off(eventName: string, fn: Event) {
    // 检查需要取消的事件是否存在, 如果存在则把该事件从this.cache[eventName]数组里面移除
    let index = indexOf(this.cache[eventName], fn);
    index !== -1 && this.cache[eventName].splice(index, 1);
  }

  offAll(eventName: string) {
    // 检查需要取消的事件是否存在, 如果存在则把该事件从this.cache[eventName]数组里面移除
     this.cache[eventName] = []
  }
}

let event: EventHub;

export const createEvent = () => {
  if (event) {
    return event;
  } else {
    event = new EventHub();
    return event;
  }
};

/**
 * 帮助函数
 * @param array
 * @param item
 */
function indexOf(array: Array<Event> | undefined, item: unknown) {
  if (array === undefined) return -1;
  let index = -1;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) {
      index = i;
      break;
    }
  }
  return index;
}
