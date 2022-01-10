import { ChatMessageList } from "./ChatMessageList";
import { ChatWindowInput } from "./ChatWindowInput";
import { Friend, User } from "../../store/state/singleChat";
import { useState } from "react";
import { AvChat } from "pages/AvChat";

interface ChatMessageWindowProps {
  targetUser: Friend;
  host: User;
  sendMessage(data: any): void;
  setMessageListHasRead(data: User): void;
}

export const ChatMessageWindow = ({
  targetUser,
  host,
  sendMessage,
  setMessageListHasRead
}: ChatMessageWindowProps) => {
  const [mode, setMode] = useState(true);
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
            messageList={targetUser?.messageList}
            user={host}
            targetUser={targetUser.user}
            setMessageListHasRead={setMessageListHasRead}
          ></ChatMessageList>
          <ChatWindowInput
            setMode={setMode}
            userId={host.id}
            targetUserId={targetUser.user.id}
            sendMessage={sendMessage}
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
