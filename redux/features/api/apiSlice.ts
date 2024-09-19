import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";
import Cookies from "js-cookie";

//Thực hiện yêu cầu api và quản lý trạng thái đến dữ liệu
//Tạo ra slide cho api
//định nghĩa các endpoint cho api
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
      prepareHeaders: (headers) => {
        const accessToken = Cookies.get("accessToken");
        const refreshToken = Cookies.get("refreshToken");
  
        if (accessToken) {
          headers.set("access-token", accessToken);
        }
        if (refreshToken) {
          headers.set("refresh-token", refreshToken);
        }
        return headers;
      },
    }),
    //url hoặc đường dẫn cụ thể
    endpoints: (builder) => ({
        refreshToken: builder.query({
          query: (data) => ({
            url: "refresh",
            method: "GET",
            credentials: "include" as const,
          }),
        }),
        loadUser: builder.query({
          query: (data) => ({
            url: "me",
            method: "GET",
            //thông tin xác thực sẽ được gửi đi
            credentials: "include" as const,
          }),
            //hàm này được gọi khi truy vấn bắt đầu
            //sau khi truy vấn thành công thì dispatch action userLoggedIn để lưu thng tin người dùng vào redux store
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                  const result = await queryFulfilled;
                  dispatch(
                    userLoggedIn({
                      accessToken: result.data.accessToken,
                      refreshToken: result.data.refreshToken,
                      user: result.data.user,
                    })
                  );
                } catch (error: any) {
                  console.log(error);
                }
              },
        })
    })
})

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;
