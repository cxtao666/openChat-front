import { post } from "util/api";
import { message } from "antd";

export const createRoom = async (data: {
  masterId: string;
  roomName: string;
  roomUsername: string;
  notice: string;
  avator:string;
  joinGroupUserList:any[]
}) => {
  let resData = null;
  try {
    resData = await post("room/newRoom", data);
    message.success("群聊创建成功");
  } catch (error: any) {
    console.log(error); // 注册失败或者其它网络错误
    message.error(error);
  }
  return resData as any;
};
