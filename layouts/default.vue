<script setup lang="ts">
import type { UserInfo } from "~/api/types";

const baseURL = process.env.BASE_URL;
const token = useCookie("auth");

// 取得用戶
const authStore = useAuthStore();
const { getAuth } = authStore;
const user = ref<UserInfo>();

// 驗證 token 是否正確
if (token.value) {
  try {
    await useFetch("/user/check", {
      method: "GET",
      baseURL,
      headers: {
        Authorization: token.value,
      },
    });

    user.value = await getAuth();
  } catch (error) {
    console.dir(error);
    token.value = null; // 刪除 token
    navigateTo("/account/login", { redirectCode: 302 });
  }
}

// 取得簡易用戶名稱
const username = ref("");
if (user.value?.name) {
  const splitName = user.value.name.split(" ");
  username.value = splitName[0];
}
</script>

<template>
  <div>
    <AppHeader :user="user" :username="username" />
    <slot />
    <AppFooter />
  </div>
</template>

<style scoped></style>
