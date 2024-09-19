"use client";
import React, { FC, useEffect, useState } from "react";
import Heading from "./utils/Heading";
import Login from "./components/Auth/Login";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

interface Props {}

const Page: FC<Props> = (props) => {
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  // useEffect(() => {
  //   if (user) {
  //     redirect("/admin");
  //   }
  // }, [user]);
  
  return (
    <div>
      <Heading
        title="Admin"
        description="nền tảng cho học sinh học trực tuyến"
        keywords="Nextjs,Tailwind"
      />
      <div className="w-[90%] md:w-[420px] m-auto h-screen flex items-center justify-center">
        {route === "Login" && <Login setRoute={setRoute} />}
      </div>
    </div>
  );
};

export default Page;
