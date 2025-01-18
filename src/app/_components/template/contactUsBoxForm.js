"use client";
import React, { memo, useState } from "react";
import Image from "next/image";
import CustomInput from "../modules/customInput";
import SelectBox from "../modules/selectBox";
import { useFormik } from "formik";
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
import { MoonLoader } from "react-spinners";
import swal from "sweetalert";
import useSanitizeInput from "@/utils/useSanitizeInput";

const ContactUsBoxForm = memo(() => {
  const [loading, setLoading] = useState(false);

  const contactForm = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      group: "",
      phone: "",
      message: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.fullName.trim() || !isNaN(values.fullName)) {
        errors.name = "نام و نام خانوادگی را به درستی وارد کنید";
      } else if (!values.email.trim() || !emailRegex.test(values.email)) {
        errors.email = "ایمیل تان را به درستی وارد کنید";
      } else if (!values.phone.trim() || isNaN(values.phone)) {
        errors.phone = "شماره موبایل تان را به درستی وارد کنید";
      } else if (values.message.trim().length < 10) {
        errors.message = "پیام شما باید حداقل 10 کاراکتر داشته باشد";
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);

      const formData = new FormData();

      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("group", values.group);
      formData.append("phone", values.phone);
      formData.append("message", values.message);

      setTimeout(async () => {
        await fetch("/api/contactUsMessage", {
          method: "POST",
          body: formData,
        })
          .then((res) => {
            setLoading(false);
            return res.json();
          })
          .then((result) => {
            if (result.status === 201) {
              swal({
                icon: "success",
                title: "با موفقیت ارسال شد",
                text: result.message,
              });
            } else {
              swal({
                icon: "error",
                title: result.message,
              });
            }
          });
        setSubmitting(false);
        values.fullName = "";
        values.email = "";
        values.group = "";
        values.phone = "";
        values.message = "";
      }, 3000);
    },
  });

  return (
    <div className="w-full h-auto lgg:h-[50rem] flex flex-col lgg:flex-row items-center justify-between shadow-lg rounded-3xl overflow-hidden">
      <div className="w-full lgg:w-2/5 h-full bg-second/90 rounded-2xl rounded-bl-none lgg:rounded-tl-2xl dark:rounded-tl-none flex flex-col xxm:flex-row lgg:flex-col py-12 px-8 justify-between">
        <div className="hidden lgg:block">
          <p className="text-[2.3rem] text-first/90 font-bold">اطلاعات کاربر</p>
          <p className="text-[2rem] font-light text-first/50 tracking-tight">
            برای شروع یک چت زنده چیزی بگویید
          </p>
        </div>

        <div className="lgg:w-full flex flex-col justify-between gap-6 xxm:mb-0 mb-6">
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-7 xm:size-10 text-first"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .[30rem]6.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
              />
            </svg>
            <p className="text-first/90 text-[1.25rem] xm:text-[1.5rem] font-bold ltr">
              0111 3202 24 18
            </p>
          </div>
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-7 xm:size-10 text-first"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>

            <p className="text-first/90 text-[1.25rem] xm:text-[1.5rem] font-bold ltr">
              maghaleh@gmail.com
            </p>
          </div>
        </div>

        <div className="lgg:w-full flex items-center gap-6">
          <Image
            src={"/images/instagram-svgrepo-com.svg"}
            placeholder="blur"
            blurDataURL={"/images/instagram-svgrepo-com.svg"}
            width={100}
            height={100}
            alt="instagram"
            className="size-10 xm:size-14"
          />
          <Image
            src={"/images/twitter-svgrepo-com.svg"}
            placeholder="blur"
            blurDataURL={"/images/twitter-svgrepo-com.svg"}
            width={100}
            height={100}
            alt="twitter"
            className="size-9 xm:size-12"
          />
          <Image
            src={"/images/telegram-svgrepo-com.svg"}
            placeholder="blur"
            blurDataURL={"/images/telegram-svgrepo-com.svg"}
            width={100}
            height={100}
            alt="telegram"
            className="size-10 xm:size-14"
          />
        </div>
      </div>

      <form
        onSubmit={contactForm.handleSubmit}
        className="w-full h-full bg-first dark:bg-black/20 py-12 sm:px-16 pt-20 flex flex-col gap-y-8"
      >
        <div className="w-full flex flex-wrap gap-16 justify-center lgg:justify-end mb-12 lgg:mb-0">
          <div className="flex flex-col gap-1">
            <CustomInput
              formHandler={contactForm}
              value={contactForm.values.fullName}
              name="fullName"
              id="fullName"
              label={"نام و نام خانوادگی"}
            />
            {contactForm.touched.fullName &&
              contactForm.errors.fullName &&
              contactForm.errors.fullName}
          </div>
          <div className="flex flex-col gap-1">
            <CustomInput
              formHandler={contactForm}
              value={contactForm.values.email}
              name="email"
              id={"email"}
              label={"ایمیل"}
            />{" "}
            {contactForm.touched.email &&
              contactForm.errors.email &&
              contactForm.errors.email}
          </div>
          <div className="flex flex-col gap-1">
            <SelectBox formikInstance={contactForm} />
            {contactForm.touched.group &&
              contactForm.errors.group &&
              contactForm.errors.group}
          </div>
          <div className="flex flex-col gap-1">
            <CustomInput
              formHandler={contactForm}
              value={contactForm.values.phone}
              name="phone"
              id={"phone"}
              label={"شماره همراه"}
            />
            {contactForm.touched.phone &&
              contactForm.errors.phone &&
              contactForm.errors.phone}
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 ld:h-[20rem] h-[15rem]">
          <textarea
            name="message"
            value={contactForm.values.message}
            onChange={(e) => {
              const sanitizedValue = useSanitizeInput(e.target.value);
              contactForm.setFieldValue("message", sanitizedValue);
            }}
            placeholder="سوال مورد نظر خود را بنویسید..."
            className="sm:w-full w-[95%] ld:h-[30rem] h-[15rem] rounded-3xl p-9 text-[1.5rem] text-black dark:text-first font-light bg-black/5 dark:bg-black/30 focus:outline-1 focus:outline-second/50 transition-all duration-1000 self-center"
          ></textarea>
          {contactForm.touched.message &&
            contactForm.errors.message &&
            contactForm.errors.message}
        </div>
        <button
          type="submit"
          className="lgg:w-[13rem] w-[12rem] lgg:h-[5rem] h-[4rem] flex items-center justify-center bg-second/90 active:bg-second/60 text-[1.5rem] text-first font-bold rounded-2xl tracking-tight sm:ml-0 ml-7 self-center xm:self-end"
        >
          {loading ? (
            <MoonLoader size={20} color="#fff" />
          ) : (
            <span> ارسال سوال</span>
          )}
        </button>
      </form>
    </div>
  );
});

export default ContactUsBoxForm;
