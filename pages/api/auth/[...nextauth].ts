import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
console.log(process.env.GOOGLE_CLIENT_ID,'red');

//quản lý xác thực người dùng
//đăng nhập với google github
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        })
    ],
    //bảo mật thông tin phiên người dùng
  secret: process.env.SECRET,
}

export default NextAuth(authOptions);