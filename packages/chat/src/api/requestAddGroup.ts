import { post } from "util/api";
import { message } from "antd";
export const requestAddGroup = async (data: {
  roomId: string;
  userId: string;
  message: string;
}) => {
  let resData = null;
  try {
    resData = await post("group/requestJoinGroup", data); //发送加入群聊的请求
    message.success(resData as string);
  } catch (error: any) {
    console.log(error); // 发送或者其它网络错误
    message.error(error);
  }
  return resData;
};
