import { Button } from "antd";
import { useEffect, useRef } from "react";

import {
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
      <div style={{ paddingLeft: "100px", display: "flex" }}>
        <div>
          <h2
            style={{
              textAlign: "center",
              marginTop: "50px",
              marginBottom: "-10px",
            }}
          >
            对方信号
          </h2>
          <video ref={remoteVideo} height="350" width="400"></video>
        </div>
        <div>
          <h2
            style={{
              textAlign: "center",
              marginTop: "50px",
              marginBottom: "-10px",
            }}
          >
            自己信号
          </h2>
          <video
            ref={localVideo}
            height="350"
            width="400"
            style={{ marginLeft: "10px" }}
          ></video>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="primary"
          onClick={async () => {
            const targetId = targetUserId;
            sendRequest(userId, targetId);
          }}
          style={{ marginRight: "20px" }}
        >
          开始通话
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setMode(true);
            //todo 断开连接，关闭音视频，销毁rtc对象
            close();
            destroyUserCache();
          }}
        >
          取消通话
        </Button>
      </div>
    </div>
  );
};
