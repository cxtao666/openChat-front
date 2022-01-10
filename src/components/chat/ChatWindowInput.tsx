import { useState } from "react";

interface ChatWindowInputProps {
  userId: string;
  targetUserId: string;
  sendMessage(data: any): void;
  setMode(data: any): void;
}

// 发送消息，调用websocket，并且消息存入本地
export const ChatWindowInput = ({
  userId,
  targetUserId,
  sendMessage,
  setMode,
}: ChatWindowInputProps) => {
  const [message, setMessage] = useState("");
  return (
    <div>
      <textarea
        style={{ width: "100%", height: "110px", paddingTop: "10px" }}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button
        style={{ position: "absolute", bottom: "10px", right: "50px" }}
        onClick={() => {
          sendMessage({ userId, targetUserId, message });
          setMessage("");
        }}
      >
        发送
      </button>
      <button
        style={{ position: "absolute", bottom: "92px", right: "50px" }}
        onClick={() => {
          setMode(false);
        }}
      >
        音视频通话
      </button>
    </div>
  );
};
