import { get } from "util/api";

export const pullGroupMessage = (data: { roomId: string ; take:number ; skip:number | undefined ; startId: number | undefined}) => {
  return get("group/pullGroupMessage", data).then((data: any) => {
    console.log("群聊信息", data);
    return data;
  });
};
