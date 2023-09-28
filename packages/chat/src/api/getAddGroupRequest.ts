import { get } from "util/api";

export const getAddGroupRequest = async (id: string) => {
  return get("group/getAddGroupRequest", { id }).then((data) => {
    console.log("申请入群信息", data);
    return data;
  });
};
