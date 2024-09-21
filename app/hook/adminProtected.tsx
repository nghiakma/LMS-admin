import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

interface ProtectedProps {
  children: React.ReactNode; //bất cứ thứ gì đặt bên trong adminprotected
}

export default function AdminProtected({ children }: ProtectedProps) {
  //lấy user từ redux store
  const { user } = useSelector((state: any) => state.auth);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (user) {
      const isAdminUser = user?.role === "admin";
      if (isAdminUser) {
        setIsAdmin(true);
      } else {
        redirect("/");
      }
    } else {
      redirect("/");
    }
  }, [user]);

  if (isAdmin === null) {
    return null;
  }
  //render các component con
  return isAdmin ? <>{children}</> : null;
}
