export const judeFileType = (type: string) => {
  if (type.search("image") !== -1) {
    return "[图片]";
  } else if (type.search("video") !== -1) {
    return "[视频]";
  } else if (type.search("audio") !== -1) {
    return "[语音]";
  } else {
    return "[文件]";
  }
};
