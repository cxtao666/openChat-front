import { message } from "antd";
import { createEvent } from "util/event";

export const pcConfig = {
    'iceServers': [{
        'urls': 'stun:stun.l.google.com:19302'
    }]
};

const SINGALINT_STATUS = {
  SINGALINT_ANSWER: 0,
  SINGALINT_OFFER: 1,
  SINGALINT_CANDIDATE: 2,
  SINGALINT_CLOSE: 3,
};

interface DataToPeerViaSignalingServer {
  userId: string;
  offer?: RTCSessionDescriptionInit;
  targetUserId: string;
  answer?: RTCSessionDescriptionInit;
  candidate?: any;
}

const sendToPeerViaSignalingServer = (
  status: number,
  data: DataToPeerViaSignalingServer
) => {
  if (status === SINGALINT_STATUS.SINGALINT_OFFER)
    window.CHAT_BASIC.sendOffer(data);
  else if (status === SINGALINT_STATUS.SINGALINT_ANSWER) {
    window.CHAT_BASIC.sendAnswer(data);
  } else if (status === SINGALINT_STATUS.SINGALINT_CLOSE) {
    window.CHAT_BASIC.sendClose(data);
  } else {
    window.CHAT_BASIC.sendCandidate(data);
  }
};

let pc = new RTCPeerConnection(pcConfig);

/* const userCache = {
    userId:'',
    targetUserId:'',
} */

let videoCache: any;
let userCache: any;

export const setVideoCache = (data: any) => {
  console.log(data);
  videoCache = data;
};

export const setUserCache = (data: {
  userId: string;
  targetUserId: string;
}) => {
  if (userCache) {
    return;
  }
  userCache = data;
};

export const destroyUserCache = () => {
  userCache = null;
};

// RTC 发送端
export const createRTCConnection = async (
  userId: string,
  targetUserId: string,
  localVideo: any,
  remoteVideo: any
) => {
  await start();
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  sendToPeerViaSignalingServer(SINGALINT_STATUS.SINGALINT_OFFER, {
    offer,
    userId,
    targetUserId,
  });
};

// RTC 接收端
export const receiveRTCConnection = async (
  userId: string,
  targetUserId: string,
  offer: RTCSessionDescriptionInit
) => {
  setUserCache({ userId: targetUserId, targetUserId: userId });

  // 让组件展示框询问用户是否同意,告诉是哪个人call过来的
  createEvent().emit("showVideoCall", userId);

  // 在此处设置事件，只要当用户同意了才会触发事件，开始视频通话
  createEvent().on("receiveVideoCall", async () => {
    console.log("接收到的offer信息", offer);
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    await start();
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    sendToPeerViaSignalingServer(SINGALINT_STATUS.SINGALINT_ANSWER, {
      userId,
      targetUserId,
      answer,
    });
  });
};

// 设置answer
export const setAnswer = (answer: RTCSessionDescriptionInit) => {
  pc.setRemoteDescription(new RTCSessionDescription(answer));
};

// 发起视频通话连接
export const start = async () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error("the getUserMedia is not supported!");
    return;
  } else {
    var constraints = {
      video: true,
      audio: false,
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      getMediaStream(stream);
    } catch (error) {
      handleError(error);
    }
  }
};

function handleError(err: any) {
  console.error("Failed to get Media Stream!", err);
}

// 打开摄像头，然后视频信息展示到video标签
function getMediaStream(stream: MediaStream) {
  let localStream = stream;
  console.log("发送出去的视频信息", localStream);
  videoCache.localVideo.srcObject = localStream;
  videoCache.localVideo.play();
  console.log(videoCache.localVideo.srcObject);
  // localVideo.srcObject = localStream;
  localStream.getTracks().forEach((track: any) => {
    pc.addTrack(track, localStream);
  });
}

// 把接收到的视频流信息通过video标签展示出来
pc.ontrack = getRemoteStream;
function getRemoteStream(e: RTCTrackEvent) {
  console.log("视频对象", videoCache);
  console.log(e);
  const remoteStream = e.streams[0];
  console.log("接收到的视频信息", remoteStream);
  videoCache.remoteVideo.srcObject = e.streams[0];
  videoCache.remoteVideo.play();

  /* if (playPromise !== undefined) {
    console.log(playPromise)
    playPromise
      .then((data: any) => {
        // 这个时候可以安全的暂停
        video.play();
      })
      .catch((err: any) => {
        console.log(err);
      });
    // remoteVideo.srcObject = e.streams[0];
  } */
}
// 接收cecandidate
pc.onicecandidate = (e) => {
  console.log("接收到系统的cecandidate", e);
  console.log("用户id缓存", userCache);
  if (e.candidate) {
    sendToPeerViaSignalingServer(SINGALINT_STATUS.SINGALINT_CANDIDATE, {
      candidate: e.candidate,
      userId: userCache.userId,
      targetUserId: userCache.targetUserId,
    });
  } else {
    console.log("this is the end candidate");
  }
};

//系统接收cecandidate,并发给对端
export const receiveCandidate = (data: any) => {
  console.log("candidate", data);
  const candidate = new RTCIceCandidate(data.candidate);
  pc.addIceCandidate(candidate)
    .then(() => {
      console.log("Successed to add ice candidate");
    })
    .catch((err) => {
      console.error(err);
    });
};

// 关闭rtc
export const close = () => {
  sendToPeerViaSignalingServer(SINGALINT_STATUS.SINGALINT_CLOSE, userCache);
//  videoCache.remoteVideo.pause();
// videoCache.localVideo.pause();
  pc.close();
  pc = new RTCPeerConnection(pcConfig);
};

export const receiveClose = () => {
 // videoCache.remoteVideo.pause();
 // videoCache.localVideo.pause();
  pc.close();
  pc = new RTCPeerConnection(pcConfig);
  destroyUserCache();
  message.success("对方已经挂断通话");
  createEvent().emit("closeVideo");
};
