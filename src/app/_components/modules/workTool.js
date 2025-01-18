"use client";
import { useFormik } from "formik";
import { memo, useReducer, useState } from "react";
import SelectBox from "./selectBox";
import useSanitizeInput from "@/utils/useSanitizeInput";
import Uploader from "./uploader";
import Button from "./Button";
import GetVideoDuration from "./getVideoDuration";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Editor = dynamic(() => import("../modules/ck"), {
  ssr: false,
});

const WorkTool = memo(
  ({ apiPath = "", initialValues = null, sendBtn = true }) => {
    const router = useRouter();
    const [articleText, setArticleText] = useState(
      initialValues ? initialValues.articleText : ""
    );
    const [duration, setDuration] = useState(
      initialValues ? initialValues.duration : 0
    );

    const [states, dispatch] = useReducer(
      (states, action) => {
        switch (action.type) {
          case "readAblePriceClose":
            return { ...states, isReadAblePrice: false };
          case "readAblePriceOpen":
            return { ...states, isReadAblePrice: true };
          case "readAbleDiscountClose":
            return { ...states, isReadAbleDiscount: false };
          case "readAbleDiscountOpen":
            return { ...states, isReadAbleDiscount: true };
          case "setTag":
            return { ...states, tag: action.value };
          case "clearTag":
            return { ...states, tag: "" };
          case "setLoaderClose":
            return { ...states, loader: false };
          case "setLoaderOpen":
            return { ...states, loader: true };
          case "setTags":
            return states.tag.trim()
              ? { ...states, tags: [...states.tags, states.tag] }
              : states;
          case "addTag":
            if (states.tag.trim()) {
              return { ...states, tags: [...states.tags, states.tag], tag: "" };
            }
            return states;
          case "setFile":
            return { ...states, file: action.value };
          default:
            throw new Error(`Unhandled action type: ${action.type}`);
        }
      },
      {
        isReadAblePrice: false,
        isReadAbleDiscount: false,
        tag: initialValues ? initialValues.tag : "",
        tags: initialValues ? initialValues.tags : [],
        loader: initialValues ? initialValues.loader : false,
        file: initialValues ? initialValues.file : null,
      }
    );

    const generateProductFormik = useFormik({
      initialValues: {
        group: initialValues ? initialValues.group : "",
        title: initialValues ? initialValues.title : "",
        price: initialValues ? initialValues.price : "",
        articleVideo: initialValues ? initialValues.articleVideo : "",
        discount: initialValues ? initialValues.discount : "",
        cover: initialValues ? initialValues.cover : "",
      },
      validate: (values) => {
        const errors = {};
        if (!values.group) {
          errors.group = "یک دسته برای محتوا خود انتخاب کنید";
        } else if (!values.title.trim()) {
          errors.title = "عنوان محتوا را وارد کن";
        } else if (!values.cover) {
          errors.cover = "عکس کاور محتوا را بارگذاری کنید";
        } else if (!states.tags?.length) {
          errors.tags = "هی�� تگی برای محتوا انتخاب نشده ا��ت";
        } else if (!articleText.trim() && !values.articleVideo) {
          swal({
            icon: "error",
            text: "ابتدا محتوا اموزشی خود را تولید کنید",
          });
        }
        dispatch({ type: "setFile", value: values?.articleVideo });
        return errors;
      },
      onSubmit: async (values, { setSubmitting }) => {
        dispatch({ type: "setLoaderOpen" });

        const formData = new FormData();

        formData.append("id", initialValues ? initialValues._id : "");
        formData.append("group", values.group);
        formData.append("title", values.title);
        formData.append("price", values.price);
        formData.append("articleText", articleText);
        formData.append("articleVideo", values.articleVideo);
        formData.append("tags", JSON.stringify(states.tags));
        formData.append("discount", values.discount);
        formData.append("cover", values.cover);
        formData.append("duration", duration);

        setTimeout(async () => {
          await fetch(`/api/product/${apiPath}`, {
            method: "POST",
            body: formData,
          })
            .then((res) => {
              dispatch({ type: "setLoaderClose" });
              return res.json();
            })
            .then((result) => {
              if (result.status === 201) {
                swal({
                  icon: "success",
                  title: "مقاله با موفقیت فرستاده شد",
                  text: result.message,
                });
              } else {
                swal({
                  icon: "error",
                  title: result.message,
                });
              }
              router.refresh();
            });
          setSubmitting(false);
        }, 3000);
      },
    });

    const sendProductForConfirmation = () => {
      const formData = new FormData();

      formData.append("id", initialValues ? initialValues._id : "");
      formData.append("group", generateProductFormik.values.group);
      formData.append("title", generateProductFormik.values.title);
      formData.append("price", generateProductFormik.values.price);
      formData.append("articleText", articleText);
      formData.append(
        "articleVideo",
        generateProductFormik.values.articleVideo
      );
      formData.append("tags", JSON.stringify(states.tags));
      formData.append("discount", generateProductFormik.values.discount);
      formData.append("cover", generateProductFormik.values.cover);
      formData.append("duration", duration);

      swal({
        icon: "info",
        text: "ایا مقاله شما به پایان رسید و می خواهید به مدیر سایت بدید جهت تایید ؟",
        buttons: ["لغو", "ارسال"],
      }).then((res) => {
        if (res) {
          fetch("/api/sendProductForConfirmation", {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.status === 200) {
                swal({
                  icon: "success",
                  title: "با موفقیت انجام شد",
                  text: result.message,
                });
                router.refresh();
              }
            });
        }
      });
    };

    return (
      <div className="w-full pb-20 pt-5 flex flex-col gap-16">
        <form
          onSubmit={generateProductFormik.handleSubmit}
          className="flex flex-col gap-16"
        >
          <div className="w-full flex flex-wrap justify-between gap-8">
            <div className="flex flex-col gap-12">
              <div className="flex flex-wrap gap-10">
                <div className="flex flex-col flex-wrap gap-2">
                  <SelectBox formikInstance={generateProductFormik} />
                  <span className="text-[1.2rem] font-light text-red-500">
                    {generateProductFormik.touched.group &&
                      generateProductFormik.errors.group &&
                      generateProductFormik.errors.group}
                  </span>
                </div>
                <div className="flex flex-col flex-wrap gap-2">
                  <input
                    type="text"
                    name="title"
                    value={generateProductFormik.values.title}
                    onChange={(e) => {
                      const sanitizedValue = useSanitizeInput(e.target.value);
                      generateProductFormik.setFieldValue(
                        "title",
                        sanitizedValue
                      );
                    }}
                    className="w-[30rem] h-[4.2rem] dark:bg-[#0d141f] text-[1.3rem] text-black dark:text-first rounded-md border-[1px] outline-none border-gray-600/30 px-6 focus:outline-none"
                    placeholder="سر تیتر مقاله خود را بنویسید..."
                  />
                  <span className="text-[1.2rem] text-red-500">
                    {generateProductFormik.touched.title &&
                      generateProductFormik.errors.title &&
                      generateProductFormik.errors.title}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="priceProduct"
                  className="text-xl text-black dark:text-first"
                >
                  قیمت مقاله به تومان:
                </label>

                <div className="flex flex-col flex-wrap gap-2">
                  <div
                    id="priceProduct"
                    className="xxl:w-[62.5rem] md:w-[56.5rem] px-5 xm:w-[40rem] w-[32rem] h-[4.2rem] flex items-center dark:bg-[#0d141f] rounded-md border-[1px] border-gray-600/30"
                  >
                    <input
                      type="number"
                      name="price"
                      value={generateProductFormik.values.price}
                      onChange={(e) => {
                        const sanitizedValue = useSanitizeInput(e.target.value);
                        generateProductFormik.setFieldValue(
                          "price",
                          sanitizedValue
                        );
                      }}
                      min="0"
                      className={`w-full bg-black/0 pl-6 focus:outline-none outline-none text-[1.3rem] text-black dark:text-first ${
                        states.isReadAblePrice && "text-first/55"
                      }`}
                      placeholder="قیمت مقاله خود را به ریال بنویسید (مانند: 150000)"
                      readOnly={states.isReadAblePrice}
                    />
                    <div className="flex gap-6 h-full py-2">
                      <div
                        onClick={() => dispatch({ type: "readAblePriceClose" })}
                        className="px-6 py-3 flex items-center justify-center text-[1.4rem] text-first font-light bg-second/60 rounded-lg active:"
                      >
                        ویرایش
                      </div>
                      <div
                        onClick={() => dispatch({ type: "readAblePriceOpen" })}
                        className="px-6 py-3 flex items-center justify-center text-[1.4rem] text-first font-light bg-second/80 rounded-lg active:"
                      >
                        تایید
                      </div>
                    </div>
                  </div>
                  <span className="text-[1.2rem] text-red-500">
                    {generateProductFormik.touched.price &&
                      generateProductFormik.errors.price &&
                      generateProductFormik.errors.price}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="discountProduct"
                  className="text-xl text-black dark:text-first"
                >
                  تخفیف مقاله به درصد:
                </label>
                <div className="flex flex-col flex-wrap gap-2">
                  <div
                    id="discountProduct"
                    className="xxl:w-[62.5rem] md:w-[56.5rem] px-5 xm:w-[40rem] w-[32rem] h-[4.2rem] flex items-center dark:bg-[#0d141f] rounded-md border-[1px] border-gray-600/30"
                  >
                    <input
                      type="number"
                      name="discount"
                      value={generateProductFormik.values.discount}
                      onChange={(e) => {
                        const sanitizedValue = useSanitizeInput(e.target.value);
                        generateProductFormik.setFieldValue(
                          "discount",
                          sanitizedValue
                        );
                      }}
                      min="0"
                      max="100"
                      className={`w-full bg-black/0 pl-6 focus:outline-none outline-none text-[1.3rem] text-black dark:text-first ${
                        states.isReadAbleDiscount && "text-first/55"
                      }`}
                      placeholder="از 0 تا 100 مقدار تخفیف برای مقاله خود در نظر بگیرید"
                      readOnly={states.isReadAbleDiscount}
                    />

                    <div className="flex gap-6 h-full py-2">
                      <div
                        onClick={() =>
                          dispatch({ type: "readAbleDiscountClose" })
                        }
                        className="px-6 py-3 flex items-center justify-center text-[1.4rem] text-first font-light bg-second/60 rounded-lg active:"
                      >
                        ویرایش
                      </div>
                      <div
                        onClick={() =>
                          dispatch({ type: "readAbleDiscountOpen" })
                        }
                        className="px-6 py-3 flex items-center justify-center text-[1.4rem] text-first font-light bg-second/80 rounded-lg active:"
                      >
                        تایید
                      </div>
                    </div>
                  </div>
                  <span className="text-[1.2rem] text-red-500">
                    {generateProductFormik.touched.discount &&
                      generateProductFormik.errors.discount &&
                      generateProductFormik.errors.discount}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-wrap gap-2 w-[50rem] dark:bg-[#0d141f] rounded-md border-[1px] border-gray-600/30 dark:shadow-2xl">
              <div className="flex flex-col">
                <div className="w-full h-[4.2rem] flex">
                  <input
                    type="search"
                    value={states.tag}
                    onChange={(e) =>
                      dispatch({
                        type: "setTag",
                        value: useSanitizeInput(e.target.value),
                      })
                    }
                    placeholder="برچسب های مورد نظر خود را وارد کنید..."
                    className="w-3/4 h-full rounded-md outline-none focus:outline-none px-6 border-b-[1px] border-gray-600/35 text-[1.3rem] text-black dark:text-first dark:bg-[#0d141f]"
                  />
                  <div
                    onClick={() => dispatch({ type: "addTag" })}
                    type="button"
                    className="w-1/4 h-full flex items-center justify-center bg-second/80 active:bg-second/50 rounded-md text-[1.3rem] font-bold text-first"
                  >
                    اضافه کردن
                  </div>
                </div>

                <div className="w-full h-auto flex flex-wrap p-6 gap-5 child:text-[1.2rem] font-light bg-black/0">
                  {states.tags?.length
                    ? states.tags.map((item, index) => (
                        <span
                          key={index}
                          className="text-black dark:text-first"
                        >
                          {item}
                        </span>
                      ))
                    : null}
                </div>
              </div>
              {!states.tags?.length && (
                <span className="self-center text-[1.2rem] text-red-500">
                  حداقل یک برچسب بنویسید
                </span>
              )}
            </div>
          </div>
          <Editor
            setArticleText={setArticleText}
            articleText={
              articleText
                ? articleText
                : "<p>در این قسمت مقاله خود را بنویسید</p>"
            }
          />
          <div className="w-full flex sm:flex-row flex-col items-center gap-8">
            <Uploader
              formHandler={generateProductFormik}
              label="در صورت علاقه فیلم اموزشی خود را اپلود کنید"
              name="articleVideo"
              customclassName="xm:w-2/3 w-full h-24 !rounded-3xl flex items-center justify-center !text-[1.4rem] sm:!text-[1.7rem] !font-light cursor-pointer !text-first !bg-second/60 !hover:bg-second/80"
            />
            <div className="w-1/3 flex flex-col gap-2 items-center">
              <Uploader
                formHandler={generateProductFormik}
                label="کاور مقاله"
                name="cover"
                customclassName="w-full h-24 rounded-3xl flex items-center justify-center sm:text-[1.9rem] text-[1.6rem] font-bold bg-second/70 text-first cursor-pointer active:bg-second/80"
              />
              <span className="text-[1.2rem] text-red-500">
                {generateProductFormik.touched.cover &&
                  generateProductFormik.errors.cover &&
                  generateProductFormik.errors.cover}
              </span>
            </div>
          </div>

          <Button
            buttonType="submit"
            label="ذخیره کردن"
            loader={states.loader}
            customclass="w-full h-24 rounded-3xl flex items-center justify-center sm:text-[1.9rem] text-[1.6rem] font-bold bg-second/80 text-first cursor-pointer active:bg-second/80"
          >
            ذخیره کردن
          </Button>
          {sendBtn ? (
            <div
              onClick={sendProductForConfirmation}
              className="w-full h-24 rounded-3xl flex items-center justify-center sm:text-[1.9rem] text-[1.6rem] font-bold bg-second text-first cursor-pointer active:bg-second/80"
            >
              {initialValues?.status === "wait"
                ? "لغو ارسال مقاله"
                : " ارسال مقاله"}
            </div>
          ) : null}

          {initialValues?.articleVideo?.length ? (
            <div className="w-full">
              {initialValues.articleVideo.map((item, index) => (
                <Link
                  href={`/preview/${item}`}
                  className="px-8 py-5 rounded-lg flex flex-col ld:flex-row items-center gap-8 justify-between border-2 border-black/40 dark:border-first/40"
                  key={index}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-12 dark:stroke-white opacity-80"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                  <span className="w-full text-xl text-black/70 dark:text-first/70 overflow-hidden">
                    {item}
                  </span>
                </Link>
              ))}
            </div>
          ) : null}
        </form>
        <GetVideoDuration file={states.file} setDuration={setDuration} />
      </div>
    );
  }
);

export default WorkTool;
