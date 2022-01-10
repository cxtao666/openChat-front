import { get } from "util/api";
export const pullChatMessage = (userId: string,targetUserId:string) => {
  return get("msg/pullChatMessage", { userId, targetUserId}).then((data:any) => {
   return JSON.parse(data).map((item: any) => {
      return item;
    });
  });
};