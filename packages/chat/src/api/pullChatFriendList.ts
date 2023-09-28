import { get } from "util/api";
export const pullChatFriendList =async (id: string) => {
  return get("myFriend/pullFriendList", { id }).then((data:any) => {
   return data.map((item: any) => {
      return item;
    });
  });
};
