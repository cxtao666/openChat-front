export const func = () => {
  const baseDate = "2021-09-13 00:00:00";
  const date = new Date(baseDate);
  const arr = ["+5d"];
  let now = date.getTime();

  now = arr.reduce((now, item) => {
    if (item.search(/[+]/) !== -1 && item.search("d") !== -1) {
      now += Math.abs(parseInt(item)) * 1000 * 24 * 60 * 60;
    } else if (item.search(/[-]/) !== -1 && item.search("d") !== -1) {
      now -= Math.abs(parseInt(item)) * 1000 * 24 * 60 * 60;
    } else if (item.search(/[-]/) !== -1 && item.search("h") !== -1) {
      now -= Math.abs(parseInt(item)) * 60 * 1000 * 60;
    } else if (item.search(/[+]/) !== -1 && item.search("h") !== -1) {
      now += Math.abs(parseInt(item)) * 60 * 1000 * 60;
    } else if (item.search(/[+]/) !== -1 && item.search("m") !== -1) {
      now += Math.abs(parseInt(item)) * 60 * 1000;
    } else if (item.search(/[-]/) !== -1 && item.search("m") !== -1) {
      now -= Math.abs(parseInt(item)) * 60 * 1000;
    } else if (item.search(/[-]/) !== -1 && item.search("s") !== -1) {
      now -= Math.abs(parseInt(item)) * 60;
    } else if (item.search(/[+]/) !== -1 && item.search("s") !== -1) {
      now += Math.abs(parseInt(item)) * 60;
    } else if (item.search(/[+]/) !== -1 && item.search("W") !== -1) {
      now += Math.abs(parseInt(item)) * 1000 * 24 * 60 * 60 * 7;
    } else if (item.search(/[-]/) !== -1 && item.search("W") !== -1) {
      now -= Math.abs(parseInt(item)) * 1000 * 24 * 60 * 60 * 7;
    }
    return now;
  }, now);
  return now;
};

export const timeStampToString = (now: any) => {
  const newDate = new Date(now);
  const year = newDate.getFullYear();
  const month =
    newDate.getMonth() + 1 > 10
      ? newDate.getMonth() + 1
      : "0" + (newDate.getMonth() + 1);
  const day =
    newDate.getDate() >= 10 ? newDate.getDate() : "0" + newDate.getDate();
  const hour =
    newDate.getHours() > 10 ? newDate.getHours() : "0" + newDate.getHours();
  const minute =
    newDate.getMinutes() > 10
      ? newDate.getMinutes()
      : "0" + newDate.getMinutes();
  const second =
    newDate.getSeconds() > 10
      ? newDate.getSeconds()
      : "0" + newDate.getSeconds();
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
