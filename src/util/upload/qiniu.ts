import * as qiniu from "qiniu-js";

export const QiNiuConfig = {
  accessKey: "qPS0LtHq36FygyAnzWsBzGeL-5SFSNNuOYpQzm7F",
  secretKey: "vwOlc1x0wFolANGMht6auUeyO4PjpXDa5QBZx4o9",
  bucket: "imagecxtao",
  prefix: "http://image.myblog-tao.cn/",
  action:"https://upload-z2.qiniup.com/"
};

interface ObserverProps{
  next(res:any):void,
  error(err:any):void,
  complete(res:any):void
} 


export const upLoadQiNiu = (observer:ObserverProps , file:File,key:string,token:string) => {
  const observable = qiniu.upload(file, key, token);
  const subscription = observable.subscribe(observer); // 上传开始
};
