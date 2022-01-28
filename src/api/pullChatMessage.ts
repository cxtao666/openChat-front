import { get } from "util/api";
export const pullChatMessage = async (
  userId: string,
  targetUserId: string,
  skip: number,
  take: number
) => {
  return get("msg/pullFriendMessage", {
    id: userId,
    targetId: targetUserId,
    skip,
    take,
  }).then((data: any) => {
    console.log(data);
    return data.map((item: any) => {
      return item;
    });
  });
};
