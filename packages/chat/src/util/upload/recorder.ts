import Recorder from "js-audio-recorder";
// 使用单例模式管理录音机
let recorder: any;

// 创建实例
export const getRecorderStream = () => {
  if (recorder) {
    return recorder;
  } else {
    recorder = new Recorder({
      sampleBits: 16,         // 采样位数，范围8或16
      sampleRate: 16000,      // 采样率，范围11025、16000、22050、24000、44100、48000
      numChannels: 2,         // 声道，范围1或2
  });
    return recorder;
  }
};

// 销毁实例
export const destroyRecorder = () => {
  if (recorder) {
    recorder.destory();
    recorder = null;
  }
};
