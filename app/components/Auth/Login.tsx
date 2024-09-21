"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { styles } from "../../../app/styles/style";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";



//xác thực dữ liệu(yup)
//Quản lý trạng thái form(useFormilk)

type Props = {
    setRoute: (route: string) => void;
    setOpen?: (open: boolean) => void;
    refetch?: any;
  };
  
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ!")
      .required("Vui lòng nhập email của bạn!"),
    password: Yup.string().required("Vui lòng nhập password của bạn!").min(6),
  });
  
  const Login: FC<Props> = ({ setRoute, setOpen, refetch }) => {
    const [show, setShow] = useState(false);
    const [login, { isSuccess, error }] = useLoginMutation();
    const formik = useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: schema,
      onSubmit: async ({ email, password }) => {
        await login({ email, password });
      },
    });
  
    useEffect(() => {
      if (isSuccess) {
        toast.success("Đăng nhập thành công!");
        redirect("/admin");
      }
      if (error) {
        if ("data" in error) {
          const errorData = error as any;
          toast.error(errorData.data.message);
        }
      }
    }, [isSuccess, error]);
  
    const { errors, touched, values, handleChange, handleSubmit } = formik;
  
    return (
      <div className="w-full">
        <h1 className={`${styles.title}`}>Đăng Nhập</h1>
        <form onSubmit={handleSubmit}>
          <label className={`${styles.label}`} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name=""
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="loginmail@gmail.com"
            className={`${errors.email && touched.email && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
          <div className="w-full mt-5 relative mb-1">
            <label className={`${styles.label}`} htmlFor="email">
              Mật khẩu
            </label>
            <input
              type={!show ? "password" : "text"}
              name="password"
              value={values.password}
              onChange={handleChange}
              id="password"
              placeholder="password!@%"
              className={`${
                errors.password && touched.password && "border-red-500"
              } ${styles.input}`}
            />
            {!show ? (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setShow(false)}
              />
            )}
            {errors.password && touched.password && (
              <span className="text-red-500 pt-2 block">{errors.password}</span>
            )}
          </div>
          <div className="w-full mt-5">
            <input type="submit" value="Đăng nhập" className={`${styles.button}`} />
          </div>
          <br />
        </form>
        <br />
      
      </div>
    );
  };
  
  export default Login;