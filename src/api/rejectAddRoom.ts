import { message } from "antd";
import { get } from "util/api";
export const rejectAddRoom = (data: { roomId: string; userId: string }) => {
  return get("group/rejectAddRoom", data).then((infoMessage: any) => {
    message.info(infoMessage);
  });
};
