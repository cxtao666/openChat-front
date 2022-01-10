import { post } from "util/api";
import { message } from "antd";

export const login = async (data: { username: string; password: string }) => {
  let resData = null;
  try {
    resData = await post("user/login", data); // 登录成功
    message.success("登录成功");
  } catch (error: any) {
    console.log(error); // 登录失败 或者其它网络错误
    message.error(error);
  }
  return resData;
};
