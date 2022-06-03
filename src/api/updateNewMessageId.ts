import { get } from "util/api";

export const updateNewMessageId = async (data: {
  roomId: string;
  userId: string;
  id: number;
}) => {
  return get("group/updateNewMessageId", data);
};
