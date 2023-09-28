export const saveInfoToStorage = (token: string, user: any) => {
  // 存token 和 用户信息
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getInfoFromStorage = () => {
  const token = localStorage.getItem("token");
  const data = localStorage.getItem("user");
  const user = data && JSON.parse(data);
  return {
    token,
    user,
  };
};

export const removeInfoFromStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
