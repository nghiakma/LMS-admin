import type { AppProps } from "next/app";
import 'tailwindcss/tailwind.css';
//component gốc của ứng dụng nhận 2 props:
//Component: Component hiện tại mà nextjs đang render
//Props mà component nhận từ server or từ dữ liệu tĩnh
//Render Component với các props của compoent
export default function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
  }