import type { GetResult, UserInfo } from "~/api/types";

export const useAuthStore = defineStore("auth", () => {
  const token = useCookie("auth");
  const baseURL = process.env.BASE_URL;

  // 取得用戶
  const getAuth = async () => {
    try {
      const res = await $fetch<GetResult<UserInfo>>(`/user/`, {
        method: "GET",
        baseURL,
        headers: {
          Authorization: token.value || "",
        },
        onResponseError({ response }) {
          token.value = null; // 清除 token
          console.error(response._data.message);
        },
      });

      return res.result;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getAuth,
  };
});
