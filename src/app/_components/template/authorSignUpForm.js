import useSanitizeInput from "@/utils/useSanitizeInput";
import { useFormik } from "formik";
import Link from "next/link";
import React, { memo, useState } from "react";
import toast from "react-hot-toast";
import { MoonLoader } from "react-spinners";
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

const AuthorSignUpForm = memo(({ setFormMode }) => {
  const [loading, setLoading] = useState(false);

  const authorSignUp = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      job: "",
      ruleImage: null,
    },
    validate: (values) => {
      const errors = {};
      if (!values.name.trim() || !isNaN(values.name)) {
        errors.name = "نام تان را به درستی وارد کنید";
      } else if (!emailRegex.test(values.email)) {
        errors.email = "ایمیل تان را به درستی وارد کنید";
      } else if (!values.phone.trim() || isNaN(values.phone)) {
        errors.phone = "شماره همراهتان را به درستی وارد کنید";
      } else if (values.password.length > 15 || values.password.length < 8) {
        errors.password = "رمز عبور شما باید بین 8 تا 15 کاراکتر داشته باشد";
      } else if (!values.job.trim()) {
        errors.job = "تخصص مورد نظرتان را بنویسید در یک الی سه کلمه";
      } else if (!values.ruleImage) {
        errors.ruleImage = "عکس قوانین تایید شده را بارگذاری کنید";
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("password", values.password);
      formData.append("job", values.job);
      formData.append("ruleImage", values.ruleImage);

      setTimeout(async () => {
        await fetch("/api/authorSignUp", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((result) => {

            if (result.status === 201) {
              values.email = "";
              values.password = "";
              location.pathname = "/coWorker";
            } else if (result.status === 403) {
              toast.error(result.message);
            } else {
              toast.error(result.message);
            }
            setLoading(false);
          });

        setSubmitting(false);
      }, 3000);
    },
  });

  return (
    <>
      <p className="describe w-full p-8 text-[1.4rem] font-light dark:bg-[#0f172a] leading-[27px] dark:text-first text-justify shadow-md dark:shadow-2xl rounded-3xl">
        ممنون از علاقه‌مندی‌تان به همکاری با سایت مقالات ما. برای تکمیل فرآیند
        ثبت‌نام و بررسی اولیه، لطفاً ابتدا قوانین سایت را به دقت مطالعه کنید و
        پس از قبول شرایط، فرم ثبت‌نام را پر کنید. همچنین لازم است یک عکس واضح از
        خودتان ارسال کنید که در آن کارت ملی خود را در دست راست و متنی از{" "}
        <Link
          href={"/employmentRule"}
          className="text-[1.5rem] font-bold text-blue-600"
        >
          قوانین سایت
        </Link>{" "}
        که بر روی برگه نوشته‌اید را در دست چپ داشته باشید. این عکس جهت تأیید
        هویت و موافقت شما با قوانین سایت الزامی است.
      </p>
      <form
        className="lgg:w-full ld:w-3/5 xm:w-4/5 w-full flex flex-col gap-7 p-[2rem] sm:p-[3rem] md:sm:p-[5rem]  py-[4rem] items-center bg-second/30 dark:bg-black/30 dark:shadow-2xl rounded-3xl child:h-16 child:outline-none child:focus:outline-none"
        onSubmit={authorSignUp.handleSubmit}
      >
        <input
          className="w-full rounded-lg border-0 px-[1.5rem] text-[1.3rem] bg-white dark:bg-[#1e293b] text-black/70 dark:text-[#e2e8f0]"
          id="name"
          name="name"
          type="text"
          onChange={(e) => {
            const sanitizedValue = useSanitizeInput(e.target.value);
            authorSignUp.setFieldValue("name", sanitizedValue);
          }}
          value={authorSignUp.values.name}
          placeholder="نام و نام خانوادگی"
        />
        {authorSignUp.touched.name && authorSignUp.errors.name && (
          <span className="text-xl text-red-600">
            {authorSignUp.errors.name}
          </span>
        )}
        <input
          className="w-full rounded-lg border-0 px-[1.5rem] text-[1.3rem] bg-white dark:bg-[#1e293b] text-black/70 dark:text-[#e2e8f0]"
          id="email"
          name="email"
          type="text"
          onChange={(e) => {
            const sanitizedValue = useSanitizeInput(e.target.value);
            authorSignUp.setFieldValue("email", sanitizedValue);
          }}
          value={authorSignUp.values.email}
          placeholder="ایمیل"
        />
        {authorSignUp.touched.email && authorSignUp.errors.email && (
          <span className="text-xl text-red-600">
            {authorSignUp.errors.email}
          </span>
        )}
        <input
          className="w-full rounded-lg border-0 px-[1.5rem] text-[1.3rem] bg-white dark:bg-[#1e293b] text-black/70 dark:text-[#e2e8f0]"
          id="phone"
          name="phone"
          type="text"
          onChange={(e) => {
            const sanitizedValue = useSanitizeInput(e.target.value);
            authorSignUp.setFieldValue("phone", sanitizedValue);
          }}
          value={authorSignUp.values.phone}
          placeholder="شماره همراه"
        />
        {authorSignUp.touched.phone && authorSignUp.errors.phone && (
          <span className="text-xl text-red-600">
            {authorSignUp.errors.phone}
          </span>
        )}
        <input
          className="w-full rounded-lg border-0 px-[1.5rem] text-[1.3rem] bg-white dark:bg-[#1e293b] text-black/70 dark:text-[#e2e8f0]"
          id="password"
          name="password"
          type="text"
          onChange={(e) => {
            const sanitizedValue = useSanitizeInput(e.target.value);
            authorSignUp.setFieldValue("password", sanitizedValue);
          }}
          value={authorSignUp.values.password}
          placeholder="رمز عبور"
        />

        {authorSignUp.touched.password && authorSignUp.errors.password && (
          <span className="text-xl text-red-600">
            {authorSignUp.errors.password}
          </span>
        )}
        <input
          className="w-full rounded-lg border-0 px-[1.5rem] text-[1.3rem] bg-white dark:bg-[#1e293b] text-black/70 dark:text-[#e2e8f0]"
          id="job"
          name="job"
          type="text"
          onChange={(e) => {
            const sanitizedValue = useSanitizeInput(e.target.value);
            authorSignUp.setFieldValue("job", sanitizedValue);
          }}
          value={authorSignUp.values.job}
          placeholder="نام تخصص"
        />

        {authorSignUp.touched.job && authorSignUp.errors.job && (
          <span className="text-xl text-red-600">
            {authorSignUp.errors.job}
          </span>
        )}
        <label
          htmlFor="fileInput"
          className="w-full bg-second/70 text-first text-[1.5rem] font-light rounded-lg flex items-center justify-center"
        >
          بارگذاری عکس طبق قوانین بالا
          <input
            onChange={(e) =>
              authorSignUp.setFieldValue("ruleImage", e.currentTarget.files[0])
            }
            type="file"
            id="fileInput"
            name="ruleImage"
            hidden
          />
        </label>
        {authorSignUp.touched.ruleImage && authorSignUp.errors.ruleImage && (
          <span className="text-xl text-red-600">
            {authorSignUp.errors.ruleImage}
          </span>
        )}

        <button
          type="submit"
          className="w-full rounded-lg border-0 h-[4.5rem] text-[1.8rem] bg-second active:bg-second/70 text-white flex items-center justify-center"
        >
          {loading ? (
            <MoonLoader size={20} color="#fff" />
          ) : (
            <span> ثبت نام</span>
          )}
        </button>

        <p className="text-[1.4rem] dark:text-first">
          در صورت داشتن حساب کاربری{" "}
          <span
            onClick={() => setFormMode("loginForm")}
            className="text-blue-700 cursor-pointer"
          >
            وارد
          </span>{" "}
          شوید
        </p>
      </form>
    </>
  );
});

export default AuthorSignUpForm;
