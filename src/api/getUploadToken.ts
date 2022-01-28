import { get } from "util/api";
export const getUploadToken =async () => {
  return get("getUpLoadToken", {}).then((data) => {
    console.log("token", data);
    return data;
  });
};
