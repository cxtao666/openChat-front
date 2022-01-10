import { useRef } from "react";

import {
  createRTCConnection,
  setVideoCache,
  setUserCache,
} from "../util/chat/videoCall";

interface AvChatProps {
  userId:string;
  targetUserId:string;
  setMode(data: any): void;
}

export const AvChat = ({userId,targetUserId,setMode}:AvChatProps) => {
  setUserCache({
    userId,
    targetUserId,
  });
  let remoteVideo = useRef(null);
  let localVideo = useRef(null);
  return (
    <div>
      <video ref={remoteVideo} height="400" width="400"></video>
      <video ref={localVideo} height="400" width="400"></video>
      <div style={{display:"flex",justifyContent:"center"}}>
      <button
        onClick={async () => {
          const targetId = targetUserId
          await createRTCConnection(
            userId,
            targetId,
            localVideo,
            remoteVideo
          );     
        }}
      >开始通话</button>
      <button onClick={()=>{
        setVideoCache({
          remoteVideo: remoteVideo.current,
          localVideo: localVideo.current,
        });
      }}>打开视频</button>
      <button onClick={()=>{setMode(true)}}>取消通话</button>
      </div>
     
    </div>
  );
};
