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

const isCloseMenu = ref(false);
const toggleMenu = () => {
  isCloseMenu.value = !isCloseMenu.value;
};
</script>

<template>
  <main class="h-dvh">
    <div class="row g-0">
      <div class="col-12 h-dvh">
        <div class="d-flex">
          <div
            class="menu text-bg-dark h-dvh p-3"
            :style="{ width: isCloseMenu ? '80px' : '292px' }"
          >
            <NuxtLink class="navbar-brand d-block" to="/" style="height: 72px">
              <!-- 這邊圖片路徑要注意，不然會出現 Hydration 錯誤，而且不能使用 ClientOnly -->
              <img
                src="~@/public/images/logo-white.svg"
                alt="logo"
                class="logo img-fluid ps-4 mb-4"
                :class="{ invisible: isCloseMenu }"
              />
            </NuxtLink>
            <ul class="navbar-nav gap-1 ms-auto fw-bold">
              <li class="nav-item">
                <NuxtLink
                  to="/backend/news"
                  class="nav-link p-4 text-neutral-0"
                >
                  <Icon class="icon" name="mdi:newspaper-variant-outline" />
                  <span
                    class="text-nowrap"
                    :class="[isCloseMenu ? 'd-none' : 'd-block']"
                  >
                    最新消息
                  </span>
                </NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink
                  to="/backend/foods"
                  class="nav-link p-4 text-neutral-0"
                >
                  <Icon class="icon" name="mdi:food-outline" />
                  <span
                    class="text-nowrap"
                    :class="[isCloseMenu ? 'd-none' : 'd-block']"
                  >
                    美食佳餚
                  </span>
                </NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink
                  to="/backend/rooms"
                  class="nav-link p-4 text-neutral-0"
                >
                  <Icon class="icon" name="mdi:bathroom" />
                  <span
                    class="text-nowrap"
                    :class="[isCloseMenu ? 'd-none' : 'd-block']"
                  >
                    客房旅宿
                  </span>
                </NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink
                  to="/backend/orders"
                  class="nav-link p-4 text-neutral-0"
                >
                  <Icon class="icon" name="mdi:paper-text-outline" />
                  <span
                    class="text-nowrap"
                    :class="[isCloseMenu ? 'd-none' : 'd-block']"
                  >
                    訂單
                  </span>
                </NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink to="/" class="nav-link p-4 text-neutral-0">
                  <Icon class="icon" name="mdi:logout" />
                  <span
                    class="text-nowrap"
                    :class="[isCloseMenu ? 'd-none' : 'd-block']"
                  >
                    回前台
                  </span>
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div class="w-100">
            <div
              class="sticky-top d-flex w-100 border-bottom pe-5 py-3 justify-content-between"
            >
              <button
                type="button"
                class="btn text-bg-dark rounded-0 rounded-end-2 pt-3"
                @click="toggleMenu"
              >
                <Icon class="icon" name="mdi:menu-open" />
              </button>
              <div class="d-flex align-items-center">
                <img
                  class="avatar me-1"
                  src="~@/public/images/avatar-5.png"
                  alt="avatar"
                />
                <p class="fw-bold mb-0">{{ username }}</p>
              </div>
            </div>
            <div class="main p-5 overflow-scroll">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.h-dvh {
  height: 100dvh;
}

.avatar {
  width: 36px;
  height: 36px;
}

.menu {
  transition: all 0.3s;
}

.icon {
  font-size: 24px;
}

.nav-link {
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    background-color: #a2856a;
  }

  &.active {
    background-color: #bf9d7d;
  }
}

.main {
  height: 90%;
}
</style>
