import { get } from "util/api";
export const pullGroupList = async (id: string) => {
  return get("group/queryUserGroup", {
    userId: id,
  }).then((data: any) => {
    console.log("群聊信息", data);
    return data;
  });
};
