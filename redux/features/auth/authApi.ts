import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut} from "./authSlice";
import Cookies from "js-cookie";

//thêm mới các endpoint vào apislice
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //thay đổi dữ liệu(t,s,x)
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: {
          email,
          password,
        },
        //các cookie (chứa token) sẽ tự động được trình duyệt gửi trong mỗi yêu cầu
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          Cookies.set("accessToken", result.data.accessToken);
          Cookies.set("refreshToken", result.data.refreshToken);
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
    }),
    logOut: builder.query({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogOutQuery,
} = authApi;
