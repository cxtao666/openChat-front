import { Group, User, UserId } from "store/state/singleChat";
import { GroupChatInput } from "./groupChatInput";
import { GroupChatList } from "./groupChatList";
import { Drawer } from "antd";
import { useEffect, useState } from "react";
import { GroupMemberList } from "./groupMemberList";
import { updateNewMessageId } from "api/updateNewMessageId";
import {Test} from "./test"

interface GroupChatWindowProps {
  id: UserId;
  room: Group;
  user: User;
  sendMessage(data: any): void;
  updateGroupMessageId(data: any): void;
  skipMap: Map<string, number>;
  pullGroupMessage(data: {
    roomId: string;
    take: number;
    skip: number | undefined;
    startId: number| undefined ;
  }): void;
  messageIdMap: Map<string, number>;
}

export const GroupChatWindow = ({
  id,
  room,
  user,
  sendMessage,
  updateGroupMessageId,
  skipMap,
  pullGroupMessage,
  messageIdMap,
}: GroupChatWindowProps) => {
  useEffect(() => {
    if (!room) {
      return;
    }
    const length = room.groupMessageList.length;
    if (length > 0) {
      updateNewMessageId({
        roomId: room.room.id as string,
        userId: id as string,
        id: room.groupMessageList[length - 1].id,
      });
      updateGroupMessageId({
        roomId: room.room.id,
        id: room.groupMessageList[length - 1].id,
      });
    }
  }, [room]);

  const [visible, setVisible] = useState(false);
  return (
    <div>
      {room === null ? (
        <div>
           <h2 style={{marginTop:"20px"}}>欢迎使用!</h2> 
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>{room.room.roomUsername}</h1>
            <h1
              style={{ fontSize: "20px", marginRight: "30px" }}
              onClick={() => {
                setVisible(true);
              }}
            >
              . . .
            </h1>
          </div>
          <GroupChatList
            userId={id}
            messageList={room.groupMessageList}
            roomId={room.room.id as string}
            skipMap={skipMap}
            pullGroupMessage={pullGroupMessage}
            messageIdMap={messageIdMap}
          ></GroupChatList>
          <GroupChatInput
            userId={id}
            roomId={room.room.id}
            sendMessage={sendMessage}
            setHasSendMessage={() => {}}
            hasSendMessage={false}
            user={user}
          ></GroupChatInput>
          <Drawer
            title="群聊设置"
            placement="right"
            onClose={() => {
              setVisible(false);
            }}
            visible={visible}
          >
            <GroupMemberList
              room={room.room}
              userId={user.id}
              setVisible={setVisible}
            ></GroupMemberList>
          </Drawer>
        </div>
      )}
    </div>
  );
};
