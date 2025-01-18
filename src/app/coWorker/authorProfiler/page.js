"use client";
import React, { memo, useEffect, useState } from "react";
import { useFormik } from "formik";
import { MoonLoader } from "react-spinners";
import Uploader from "../../_components/modules/uploader";
import useSanitizeInput from "@/utils/useSanitizeInput";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

const page = memo(() => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const editProfile = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values?.fullName?.trim() || !isNaN(values?.fullName)) {
        errors.fullName = "نام تان را به درستی وارد کنید";
      } else if (!emailRegex.test(values.email)) {
        errors.email = "ایمیل تان را به درستی وارد کنید";
      } else if (isNaN(values.phone)) {
        errors.phone = "شماره موبایل تان را به درستی وارد کنید";
      }
      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", values.fullName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("file", values.file);

      setTimeout(async () => {
        await fetch(`/api/author`, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.status === 200) {
              toast.success(result.message);
              router.refresh();
            } else {
              toast.error(result.message);
            }
            setLoading(false);
          });
        values.fullName = "";
        values.email = "";
        values.phone = "";
        setSubmitting(false);
      }, 3000);
    },
  });

  useEffect(() => {
    fetch("/api/author")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          editProfile.setFieldValue("fullName", data.data.name);
          editProfile.setFieldValue("email", data.data.email);
          editProfile.setFieldValue("phone", data.data.phone);
          setProfile(data.data?.profile || "");
        }
      });
  }, []);

  function logoutHandler() {
    swal({
      icon: "warning",
      title: "هشدار...",
      text: "ایا مطمعنین که میخواهید از حسابتان خارج شوید",
      buttons: ["لغو", "تایید"],
    }).then((response) => {
      if (response) {
        fetch("/api/logoutAuthor", {
          method: "POST",
        })
          .then((res) => res.json())
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
      }
    });
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Uploader
        image={true}
        name="file"
        formHandler={editProfile}
        profile={profile}
        customclassName="size-[20rem] rounded-full !z-10 overflow-hidden bg-[url('/images/profile.jpg')] bg-center bg-cover bg-no-repeat active:scale-95 shadow-lg cursor-pointer"
        label={"ویرایش"}
      />
      <div className="mt-[6rem] bg-second/30 dark:bg-black/30 rounded-2xl w-[100%] sm:w-[70%] md:w-[60%] lg:w-[45%] p-[2rem] sm:p-[3rem] md:sm:p-[5rem]  py-[4rem] flex flex-col gap-8 items-center">
        <form
          onSubmit={editProfile.handleSubmit}
          className="w-full flex flex-col items-center gap-7 bg-black/0 child:text-[1.4rem] child:text-black/60 dark:child:text-first/80 child:outline-none child:focus:outline-none"
        >
          <input
            id="fullName"
            name="fullName"
            type="text"
            onChange={(e) => {
              const sanitizedValue = useSanitizeInput(e.target.value);
              editProfile.setFieldValue("fullName", sanitizedValue);
            }}
            value={editProfile.values.fullName}
            placeholder="نام و نام خانوادگی"
            className="w-full rounded-lg bg-white dark:bg-[#1e293b] border-0 h-16 px-[1.5rem] text-[1.3rem] text-black/70"
          />
          {editProfile.touched.fullName &&
            editProfile.errors.fullName &&
            editProfile.errors.fullName}
          <input
            className="w-full rounded-lg bg-white dark:bg-[#1e293b] border-0 h-16 px-[1.5rem] text-[1.3rem] text-black/70"
            id="email"
            name="email"
            type="text"
            onChange={(e) => {
              const sanitizedValue = useSanitizeInput(e.target.value);
              editProfile.setFieldValue("email", sanitizedValue);
            }}
            value={editProfile.values.email}
            placeholder="ایمیل"
          />
          {editProfile.touched.email &&
            editProfile.errors.email &&
            editProfile.errors.email}

          <input
            className="w-full rounded-lg bg-white dark:bg-[#1e293b] border-0 h-16 px-[1.5rem] text-[1.3rem] text-black/70"
            id="phone"
            name="phone"
            type="text"
            onChange={(e) => {
              const sanitizedValue = useSanitizeInput(e.target.value);
              editProfile.setFieldValue("phone", sanitizedValue);
            }}
            value={editProfile.values.phone}
            placeholder="شماره همراه"
          />
          {editProfile.touched.phone &&
            editProfile.errors.phone &&
            editProfile.errors.phone}
          <button
            type="submit"
            className="w-full rounded-lg border-0 h-[4.5rem] font-light bg-second/80 !text-[1.8rem] active:bg-second/50 !text-first flex items-center justify-center"
          >
            {loading ? (
              <MoonLoader size={20} color="#fff" />
            ) : (
              <span> ویرایش اطلاعات </span>
            )}
          </button>
        </form>
        <button
          onClick={logoutHandler}
          type="submit"
          className="w-full rounded-lg border-0 h-[4.5rem] bg-red-600 font-light text-[1.8rem] active:bg-second/50 text-first flex items-center justify-center"
        >
          خروج از حساب
        </button>
      </div>
    </div>
  );
});

export default page;
