<script setup lang="ts">
import type { GetResult, Result } from "~/api/types";

definePageMeta({
  layout: "backend-layout",
  middleware: ["auth"],
});

const baseURL = process.env.BASE_URL;
const token = useCookie("auth");
const newsList = ref<Result[]>([]);

// 取得全部消息
const { data } = await useFetch<GetResult<Result[]>>(`${baseURL}/admin/news/`, {
  method: "GET",
  baseURL,
  headers: {
    Authorization: token.value || "",
  },
  onResponseError({ response }) {
    const { message } = response._data;
    console.error("Error:", message);
  },
});

newsList.value = data.value?.result!;
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-5">
      <h1 class="fs-3 fw-bold">管理最新消息</h1>
      <button type="button" class="btn btn-outline-primary-100">新增</button>
    </div>
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col" width="200">id</th>
          <th scope="col" width="100">圖片</th>
          <th scope="col">標題</th>
          <th scope="col" width="600">描述</th>
          <th scope="col">管理</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in newsList" :key="item._id">
          <td>{{ item._id }}</td>
          <td>
            <img :src="item.smallImage" :alt="item.title" />
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>
            <div class="d-flex gap-2">
              <button type="button" class="btn btn-sm btn-outline-success">
                編輯
              </button>
              <button type="button" class="btn btn-sm btn-outline-danger">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
img {
  width: 100px;
  height: auto;
}
</style>
