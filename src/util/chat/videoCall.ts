export const pcConfig = {
  iceServers: [
    {
      urls: "turn:stun.al.learningrtc.cn:3478",
      credential: "mypasswd",
      username: "garrylea",
    },
  ],
  sdpSemantics: "plan-b",
};
const SINGALINT_STATUS = {
  SINGALINT_ANSWER: 0,
  SINGALINT_OFFER: 1,
  SINGALINT_CANDIDATE: 2,
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
  } else {
    window.CHAT_BASIC.sendCandidate(data);
  }
};

const pc = new RTCPeerConnection(pcConfig);

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
  userCache = data;
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
  console.log(offer);
  await pc.setRemoteDescription(new RTCSessionDescription(offer));
  await start();
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  sendToPeerViaSignalingServer(SINGALINT_STATUS.SINGALINT_ANSWER, {
    userId,
    targetUserId,
    answer,
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
  videoCache.localVideo.play()
  console.log(videoCache.localVideo.srcObject);
  // localVideo.srcObject = localStream;
  localStream.getTracks().forEach((track: any) => {
    pc.addTrack(track, localStream);
  });
}

// 把接收到的视频流信息通过video标签展示出来
pc.ontrack = getRemoteStream;
function getRemoteStream(e: RTCTrackEvent) {
  console.log(e);
  const remoteStream = e.streams[0];
  console.log("接收到的视频信息", remoteStream);
  videoCache.remoteVideo.srcObject = e.streams[0];
  videoCache.remoteVideo.play();
  // remoteVideo.srcObject = e.streams[0];
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
  const candidate = new RTCIceCandidate(
    data.candidate,
  );
  pc.addIceCandidate(candidate)
    .then(() => {
      console.log("Successed to add ice candidate");
    })
    .catch((err) => {
      console.error(err);
    });
};
