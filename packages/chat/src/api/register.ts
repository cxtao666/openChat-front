import { post } from "util/api";
import { message } from "antd";

export const register = async (data: {
  username: string;
  password: string;
  nickname: string;
}) => {
  let resData = null;
  try {
    resData = await post("user/register", data); // 登录成功
    message.success("注册成功");
  } catch (error: any) {
    console.log(error); // 注册失败或者其它网络错误
    message.error(error);
  }
  return resData;
};
