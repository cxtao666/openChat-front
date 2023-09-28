import { Button, message } from "antd";
import { getUploadToken } from "api/getUploadToken";
import { useState } from "react";
import { getRandomNumber } from "util/upload/getRandomNumber";
import { QiNiuConfig, upLoadQiNiu } from "util/upload/qiniu";
import { getRecorderStream } from "util/upload/recorder";

interface RecorderProps {
  setPercent(val: number): void;
  sendMessage(data: any): void;
  userId: string;
  targetUserId: string;
  setHasSendMessage(data: boolean): void;
  hasSendMessage: boolean;
}

export const Recorder = ({
  setPercent,
  sendMessage,
  userId,
  targetUserId,
  setHasSendMessage,
  hasSendMessage,
}: RecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  // 上传语音到七牛云
  const observer = {
    next(res: any) {
      // ...
      const percent = res.total.percent; // 获取上传进度
      setPercent(percent);
    },
    error(err: any) {
      // ...
      if (err.QiniuError.name) {
        console.log(err.QiniuError.message);
      }
    },
    complete(res: any) {
      // ...
      setPercent(0);
      console.log("结果", res);
      sendMessage({
        userId,
        targetUserId,
        message: QiNiuConfig.prefix + res.key,
        msgId: "audio/wav",
      });
      setHasSendMessage(!hasSendMessage);
    },
  };
  return (
    <div>
      {isRecording ? (
        <div>
          录制中
          <Button
            type="primary"
            onClick={() => {
              getRecorderStream().stop();
              setIsRecording(false);
            }}
          >
            停止录制
          </Button>
        </div>
      ) : (
        <Button
          type="primary"
          onClick={async () => {
            setIsRecording(true);
            getRecorderStream().start();
          }}
        >
          录制语音
        </Button>
      )}
      {
        <Button
          type="primary"
          onClick={() => {
            getRecorderStream().play();
          }}
        >
          播放
        </Button>
      }
      {
        <Button
          type="primary"
          onClick={async () => {
            if (getRecorderStream().duration <= 0) {
              message.info("请录制语音后再发送");
              return;
            }

            const token = (await getUploadToken()) as string;
            const key = getRandomNumber() + "";
            console.log(getRecorderStream().getWAVBlob());
            upLoadQiNiu(
              observer,
              new window.File([getRecorderStream().getWAVBlob()], key, {
                type: "audio/wav",
              }),
              key,
              token
            );
          }}
        >
          发送语音
        </Button>
      }
    </div>
  );
};
