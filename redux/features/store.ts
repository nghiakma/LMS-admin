"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authSlice from "./auth/authSlice";

export const store = configureStore({
//apiSlice.reducerPath: Sử dụng tên đường dẫn của apiSlice làm key cho reducer API.
//auth: Sử dụng authSlice làm reducer cho xác thực.
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  devTools: false,
  // Thêm middleware của apiSlice vào danh sách middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// gọi load user mỗi khi trang được tải
const initializeApp = async () => {
  await store.dispatch(
    //đảm bảo thông tin người dùng được cập nhật mới nhất
    //bỏ qua cache và thực hiện lại yêu cầu tới server
    apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};

initializeApp();
