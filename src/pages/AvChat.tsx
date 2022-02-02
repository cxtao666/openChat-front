import { useEffect, useRef } from "react";

import {
  createRTCConnection,
  setVideoCache,
  setUserCache,
  destroyUserCache,
  close,
  sendRequest,
} from "../util/chat/videoCall";

interface AvChatProps {
  userId: string;
  targetUserId: string;
  setMode(data: any): void;
}

export const AvChat = ({ userId, targetUserId, setMode }: AvChatProps) => {
  setUserCache({
    userId,
    targetUserId,
  });
  let remoteVideo = useRef(null);
  let localVideo = useRef(null);
  useEffect(() => {
    setVideoCache({
      remoteVideo: remoteVideo.current,
      localVideo: localVideo.current,
    });
  });
  return (
    <div>
      <video ref={remoteVideo} height="400" width="400"></video>
      <video ref={localVideo} height="400" width="400"></video>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={async () => {
            const targetId = targetUserId;
            sendRequest(userId,targetId)
          }}
        >
          开始通话
        </button>
        <button
          onClick={() => {
            setMode(true);
            //todo 断开连接，关闭音视频，销毁rtc对象
          //  close()
          // destroyUserCache();
          }}
        >
          取消通话
        </button>
      </div>
    </div>
  );
};
