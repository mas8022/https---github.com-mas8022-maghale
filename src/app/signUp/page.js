"use client";
import useSanitizeInput from "@/utils/useSanitizeInput";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MoonLoader } from "react-spinners";
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

const page = () => {
  const [loading, setLoading] = useState(false);

  const signUp = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      phone: "",
      check: false,
    },
    validate: (values) => {
      const errors = {};
      if (!values.fullName.trim() || !isNaN(values.fullName)) {
        errors.fullName = "نام تان را به درستی وارد کنید";
      } else if (!emailRegex.test(values.email)) {
        errors.email = "ایمیل تان را به درستی وارد کنید";
      } else if (values.password.length > 15 || values.password.length < 8) {
        errors.password = "رمز عبور شما باید بین 8 تا 15 کاراکتر داشته باشد";
      } else if (isNaN(values.phone) || !values.phone.trim()) {
        errors.phone = "شماره موبایل تان را به درستی وارد کنید";
      } else if (!values.check) {
        errors.check =
          "پس از خواندن قوانین سایت در صورت قبول قوانین تیک را بزنید";
      }
      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      setLoading(true);
      setTimeout(async () => {
        await fetch("/api/signUp", {
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
            if (result.status === 201) {
              toast.success(result.message);
              setTimeout(() => {
                location.pathname = "/";
              }, 2000);
            } else if (result.status === 403) {
              toast.error(result.message);
            } else {
              toast.error(result.message);
            }
          });
        values.fullName = "";
        values.email = "";
        values.password = "";
        values.phone = "";
        values.check = false;
        setSubmitting(false);
      }, 3000);
    },
  });

  return (
    <div className="w-full flex items-center justify-center lg:justify-start gap-32 lgg:p-0 py-32 !pb-36">
      <form
        className="bg-second/30 dark:bg-black/30 dark:shadow-2xl rounded-3xl w-[100%] sm:w-[70%] md:w-[60%] lg:w-[45%] flex flex-col gap-7 p-[2rem] sm:p-[3rem] md:sm:p-[5rem]  py-[4rem] items-center justify-center child:border-0 child:h-16 child:outline-none child:focus:outline-none"
        onSubmit={signUp.handleSubmit}
      >
        <input
          className="w-full rounded-lg bg-white dark:bg-[#1e293b] px-[1.5rem] text-[1.3rem] text-black/70 dark:text-[#e2e8f0]"
          id="fullName"
          name="fullName"
          type="text"
          onChange={(e) => {
            const sanitizedValue = useSanitizeInput(e.target.value);
            signUp.setFieldValue("fullName", sanitizedValue);
          }}
          value={signUp.values.fullName}
          placeholder="نام و نام خانوادگی"
        />
        {signUp.touched.fullName && signUp.errors.fullName && (
          <span className="text-xl text-red-600">{signUp.errors.fullName}</span>
        )}
        <input
          className="w-full rounded-lg bg-white dark:bg-[#1e293b] px-[1.5rem] text-[1.3rem] text-black/70 dark:text-[#e2e8f0]"
          id="email"
          name="email"
          type="text"
          onChange={(e) => {
            const sanitizedValue = useSanitizeInput(e.target.value);
            signUp.setFieldValue("email", sanitizedValue);
          }}
          value={signUp.values.email}
          placeholder="ایمیل"
        />
        {signUp.touched.email && signUp.errors.email && (
          <span className="text-xl text-red-600">{signUp.errors.email}</span>
        )}
        <input
          className="w-full rounded-lg bg-white dark:bg-[#1e293b] px-[1.5rem] text-[1.3rem] text-black/70 dark:text-[#e2e8f0]"
          id="password"
          name="password"
          type="text"
          onChange={(e) => {
            const sanitizedValue = useSanitizeInput(e.target.value);
            signUp.setFieldValue("password", sanitizedValue);
          }}
          value={signUp.values.password}
          placeholder="رمز عبور"
        />
        {signUp.touched.password && signUp.errors.password && (
          <span className="text-xl text-red-600">{signUp.errors.password}</span>
        )}
        <input
          className="w-full rounded-lg bg-white dark:bg-[#1e293b] px-[1.5rem] text-[1.3rem] text-black/70 dark:text-[#e2e8f0]"
          id="phone"
          name="phone"
          type="text"
          onChange={(e) => {
            const sanitizedValue = useSanitizeInput(e.target.value);
            signUp.setFieldValue("phone", sanitizedValue);
          }}
          value={signUp.values.phone}
          placeholder="شماره موبایل"
        />
        {signUp.touched.phone && signUp.errors.phone && (
          <span className="text-xl text-red-600">{signUp.errors.phone}</span>
        )}
        <div className="w-full h-[2rem] px-[0.5rem] flex items-center gap-4">
          <p className="text-[1.2rem] dark:text-first">
            ایا موافق با{" "}
            <Link
              href={"/regulation"}
              className="text-blue-600 font-bold text-[1.4rem]"
            >
              قوانین
            </Link>{" "}
            این سایت هستید
          </p>
          <input
            type="checkbox"
            name="check"
            onChange={signUp.handleChange}
            value={signUp.values.check}
            className="size-[1.5rem]"
          />
        </div>
        {signUp.touched.check && signUp.errors.check && (
          <span className="text-xl text-red-600">{signUp.errors.check}</span>
        )}
        <button
          type="submit"
          className="w-full rounded-lg border-0 h-20 bg-second/80 text-[1.8rem] active:bg-second/50 text-first flex items-center justify-center"
        >
          {loading ? (
            <MoonLoader size={20} color="#fff" />
          ) : (
            <span> ثبت نام</span>
          )}
        </button>
        <p className="text-[1.4rem] dark:text-first">
          در صورت داشتن حساب کاربری{" "}
          <Link href={"/login"} className="text-blue-700">
            وارد
          </Link>{" "}
          شوید
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
};

export default page;
