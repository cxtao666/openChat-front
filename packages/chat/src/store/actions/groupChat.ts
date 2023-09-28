import { pullGroupList } from "api/pullGroupList";
import { pullGroupMessage } from 'api/pullGroupMessage';
import { groupChat } from "store/const/groupChat";


export const pullGroup = (id: string) => {
  return (dispatch: any) => {
    return pullGroupList(id).then((data: any[]) => {
      for (const item of data) {
        dispatch({ type: groupChat.ADD_GROUP, data: item });
      }
    });
  };
};

export function sendGroupMessage(data: any) {
  return (dispatch: any) => {
    window.CHAT_BASIC.sendRoomChat(data);
  };
}

export const updateGroupMessageId = (data: { roomId: string; id: number }) => {
  return (dispatch: any) => {
    return dispatch({ type: groupChat.UPDATE_MESSAGE_ISREAD, data });
  };
};

// 拉取后端的群聊消息
export const pullGroupChatMessage = (data:{roomId: string ; take:number ; skip:number | undefined ; startId: number | undefined})=> {
  return (dispatch:any)=> {
    return pullGroupMessage(data).then((data)=>{
      return dispatch({type:groupChat.PULL_GROUP_MESSAGE,data})
    })
  }
}
