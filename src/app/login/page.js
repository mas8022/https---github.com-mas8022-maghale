"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import { MoonLoader } from "react-spinners";
import Link from "next/link";
import toast from "react-hot-toast";
import useSanitizeInput from "@/utils/useSanitizeInput";
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

export default function page() {
  const [loading, setLoading] = useState(false);

  const login = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!emailRegex.test(values.email)) {
        errors.email = "ایمیل تان را به درستی وارد کنید";
      } else if (values.password.length > 15 || values.password.length < 8) {
        errors.password = "رمز عبور شما باید بین 8 تا 15 کاراکتر داشته باشد";
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      setTimeout(async () => {
        await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((res) => {
            setLoading(false);
            return res.json();
          })
          .then((result) => {
            if (result.status === 200) {
              toast.success(result.message);

              setTimeout(() => {
                location.pathname = "/";
              }, 2000);
            } else {
              toast.error(result.message);
            }
          });
        values.email = "";
        values.password = "";
        setSubmitting(false);
      }, 3000);
    },
  });

  return (
    <div className="w-full flex items-center justify-center lg:justify-start gap-32 lgg:p-0 py-32 !pb-36">
      <form
        className="w-[100%] sm:w-[70%] md:w-[60%] lg:w-[45%] flex flex-col gap-7 p-[2rem] sm:p-[3rem] md:sm:p-[5rem]  py-[4rem] items-center bg-second/30 dark:bg-black/30 dark:shadow-2xl rounded-3xl child:h-16 child:outline-none child:focus:outline-none"
        onSubmit={login.handleSubmit}
      >
        <input
          className="w-full rounded-lg border-0 px-[1.5rem] text-[1.3rem] bg-white dark:bg-[#1e293b] text-black/70 dark:text-[#e2e8f0]"
          id="email"
          name="email"
          type="text"
          onChange={(e) => {
            const sanitizedValue = useSanitizeInput(e.target.value);
            login.setFieldValue("email", sanitizedValue);
          }}
          value={login.values.email}
          placeholder="ایمیل"
        />
        {login.touched.email && login.errors.email && (
          <span className="text-xl text-red-600">{login.errors.email}</span>
        )}

        <input
          className="w-full rounded-lg border-0 px-[1.5rem] text-[1.3rem] bg-white dark:bg-[#1e293b] text-black/70 dark:text-[#e2e8f0]"
          id="password"
          name="password"
          type="text"
          onChange={(e) => {
            const sanitizedValue = useSanitizeInput(e.target.value);
            login.setFieldValue("password", sanitizedValue);
          }}
          value={login.values.password}
          placeholder="رمز عبور"
        />
        {login.touched.password && login.errors.password && (
          <span className="text-xl text-red-600">{login.errors.password}</span>
        )}
        <button
          type="submit"
          className="w-full rounded-lg border-0 h-[4.5rem] text-[1.8rem] bg-second active:bg-second/70 text-white flex items-center justify-center"
        >
          {loading ? <MoonLoader size={20} color="#fff" /> : <span>ورود</span>}
        </button>
        <p className="text-[1.4rem] dark:text-first">
          در صورت نداشتن حساب کاربری{" "}
          <Link href={"/signUp"} className="text-blue-700">
            ثبت نام
          </Link>{" "}
          کنید
        </p>
      </form>
      <Image
        src={"/images/login.png"}
        width={1000}
        height={1000}
        alt="login image"
        className="w-1/2 object-cover lg:block hidden"
      />
    </div>
  );
}
