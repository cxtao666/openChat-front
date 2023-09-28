import { message } from "antd";
import { get } from "util/api";
export const searchGroup = async (roomId: string) => {
  const data = await get("room/queryRoom", { roomName: roomId });
  if (!data) {
    message.warn("对不起，找不到该群");
  }
  return data;
};
