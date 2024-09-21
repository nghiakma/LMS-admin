"use client";
import React from "react";
import Heading from "../utils/Heading";
import AdminProtected from "../hook/adminProtected";
type Props = {};

const page = (props: Props) => {
  return (
    <div>
     <AdminProtected>
     <Heading
          title="Admin"
          description="Hỗ trợ học tập"
          keywords="Nextjs, tailwind"
        />

        
     </AdminProtected>
    </div>
  );
};

export default page;
