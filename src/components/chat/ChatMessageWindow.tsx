import { ChatMessageList } from "./ChatMessageList";
import { ChatWindowInput } from "./ChatWindowInput";
import { Friend, User } from "../../store/state/singleChat";
import { useState } from "react";
import { AvChat } from "pages/AvChat";

interface ChatMessageWindowProps {
  targetUser: Friend;
  host: User;
  sendMessage(data: any): void;
  setMessageListHasRead(data: User, targetUser: User): void;
  pullConcatMessage(
    id: string,
    targetUserId: string,
    skip: number,
    take: number
  ): void;
  skipMap: Map<string, number>;
}

export const ChatMessageWindow = ({
  targetUser,
  host,
  sendMessage,
  setMessageListHasRead,
  pullConcatMessage,
  skipMap
}: ChatMessageWindowProps) => {
  const [mode, setMode] = useState(true); 
  const [hasSendMessage , setHasSendMessage] = useState(false);
  return targetUser != null ? (
    <div
      style={{
        paddingLeft: "30px",
        paddingRight: "50px",
        backgroundColor: "#fafafa",
      }}
    >
      <h2 style={{ marginTop: "10px" }}>{targetUser.user.nickname}</h2>
      {mode ? (
        <div>
          <ChatMessageList
            skipMap={skipMap}
            messageList={targetUser?.messageList}
            user={host}
            targetUser={targetUser.user}
            setMessageListHasRead={setMessageListHasRead}
            pullConcatMessage={pullConcatMessage}
            hasSendMessage={hasSendMessage}
          ></ChatMessageList>
          <ChatWindowInput
            setMode={setMode}
            userId={host.id}
            targetUserId={targetUser.user.id}
            sendMessage={sendMessage}
            hasSendMessage={hasSendMessage}
            setHasSendMessage={setHasSendMessage}
          ></ChatWindowInput>
        </div>
      ) : (
        <AvChat
          targetUserId={targetUser.user.id}
          userId={host.id}
          setMode={setMode}
        ></AvChat>
      )}
    </div>
  ) : (
    <h1>欢迎使用!</h1>
  );
};
