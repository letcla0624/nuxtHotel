<script setup lang="ts">
import type { GetResult, UserInfo } from "~/api/types";

const route = useRoute();
const router = useRouter();
const transparentBgRoute = ["index", "rooms"];

const isTransparentRoute = computed(() =>
  transparentBgRoute.includes(route.name as string)
);

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// 取得用戶
const authCookie = useCookie("auth");
const username = ref("");
const userId = ref("");
if (authCookie.value) {
  const baseURL = process.env.BASE_URL;
  const { data: user } = await useFetch<GetResult<UserInfo>>(`/user/`, {
    method: "GET",
    baseURL,
    headers: {
      Authorization: authCookie.value!,
    },
    onResponseError({ response }) {
      authCookie.value = null; // 清除 token
      console.error(response._data.message);
    },
  });

  // 取得用戶名稱
  if (user.value?.result.name) {
    const spiltName = user.value?.result.name.split(" ");
    username.value = spiltName[0];
  }

  // 取得用戶 ID
  if (user.value?.result._id) {
    userId.value = user.value.result._id;
  }
}

// 登出
const { sweetAlert } = useSweetAlert();
const logout = () => {
  authCookie.value = null; // 清除 token
  sweetAlert("success", "登出成功");
  router.push("/");
};
</script>

<template>
  <header
    :class="{
      scrolled: isScrolled,
      'bg-transparent': isTransparentRoute,
      'bg-neutral-120': !isTransparentRoute,
    }"
    class="position-fixed top-0 z-3 w-100"
  >
    <nav class="navbar navbar-expand-md p-0 px-3 py-4 px-md-20 py-md-6">
      <div class="container-fluid justify-content-between p-0">
        <NuxtLink class="navbar-brand p-0" to="/">
          <img src="/images/logo-white.svg" alt="logo" class="logo img-fluid" />
        </NuxtLink>
        <button
          class="navbar-toggler collapsed p-2 text-white border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <Icon class="fs-1" name="mdi:close" />
          <Icon class="fs-1" name="mdi:menu" />
        </button>
        <div class="collapse navbar-collapse" id="navbar">
          <ul class="navbar-nav gap-4 ms-auto fw-bold">
            <li class="nav-item">
              <NuxtLink to="/rooms" class="nav-link p-4 text-neutral-0">
                客房旅宿
              </NuxtLink>
            </li>
            <li v-if="authCookie" class="nav-item dropdown">
              <button
                type="button"
                class="nav-link d-flex gap-2 p-4 text-neutral-0 mx-auto"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Icon class="fs-4" name="mdi:account-circle-outline" />
                {{ username }}
              </button>
              <ul
                class="dropdown-menu py-3 overflow-hidden"
                style="right: 0; left: auto; border-radius: 20px"
              >
                <li>
                  <NuxtLink
                    :to="`/user/${userId}/profile`"
                    class="dropdown-item px-6 py-4"
                  >
                    我的帳戶
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/"
                    class="dropdown-item px-6 py-4"
                    @click="logout"
                  >
                    登出
                  </NuxtLink>
                </li>
              </ul>
            </li>
            <li v-else class="nav-item">
              <NuxtLink to="/account/login" class="nav-link p-4 text-neutral-0">
                會員登入
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink
                to="/rooms"
                class="btn btn-primary-100 px-8 py-4 text-white fw-bold border-0 rounded-3"
              >
                立即訂房
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import "bootstrap/scss/mixins/breakpoints";

$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px,
  xxxl: 1537px,
);

.logo {
  max-width: 27vw;
}

header {
  transition: background-color 0.3s;
}

header.scrolled {
  background-color: #000 !important;
}

@include media-breakpoint-down(md) {
  .navbar-toggler {
    z-index: 1;
    visibility: hidden;

    .iconify {
      transition: opacity 0.3s;
    }

    .iconify:nth-child(1) {
      position: absolute;
      opacity: 1;
      visibility: visible;
    }
    .iconify:nth-child(2) {
      opacity: 0;
      visibility: hidden;
    }
  }
  .navbar-toggler.collapsed {
    .iconify:nth-child(1) {
      opacity: 0;
      visibility: hidden;
    }
    .iconify:nth-child(2) {
      opacity: 1;
      visibility: visible;
    }
  }

  .navbar-collapse {
    min-height: 100vh;
    background-color: #140f0a;
    position: fixed;
    inset: 0;
    opacity: 0;
    overflow: hidden;
    transition: opacity 0.05s;
  }
  .navbar-collapse.show {
    opacity: 1;
  }
  .navbar-nav {
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;

    a {
      width: 90vw;
    }
  }
}

.dropdown-menu {
  --bs-dropdown-min-width: 16rem;
  --bs-dropdown-link-hover-color: #bf9d7d;
  --bs-dropdown-link-hover-bg: #f7f2ee;
  --bs-dropdown-link-active-color: #fff;
  --bs-dropdown-link-active-bg: #bf9d7d;
}
</style>
