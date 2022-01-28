import { get } from "util/api";
export const updateMessageIsReadStatus = async (
  userId: string,
  targetUserId: string
) => {
  return get("msg/centerMessageIsRead", {
    id: userId,
    targetId: targetUserId,
  }).then((data: any) => {
    console.log(data);
  });
};
