"use client";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import React, { memo, useMemo } from "react";

const pathDataRoute = [
  {
    path: "products",
    valuePath: "محصولات",
    href: "/products/همه محصولات",
  },
  {
    path: "همه محصولات",
    valuePath: "همه محصولات",
    href: "/products/همه محصولات",
  },
  {
    path: "نرم افزار و فناوری اطلاعات",
    valuePath: "نرم افزار و فناوری اطلاعات",
    href: "/products/نرم افزار و فناوری اطلاعات",
  },
  {
    path: "اقتصاد و حسابداری",
    valuePath: "اقتصاد و حسابداری",
    href: "/products/اقتصاد و حسابداری",
  },
  {
    path: "کسب و کار",
    valuePath: "کسب و کار",
    href: "/products/کسب و کار",
  },
  {
    path: "کودک و نوجوان",
    valuePath: "کودک و نوجوان",
    href: "/products/کودک و نوجوان",
  },
  { path: "اموزش زبان", valuePath: "اموزش زبان", href: "/products/اموزش زبان" },
  {
    path: "هنر طراحی",
    valuePath: "هنر طراحی",
    href: "/products/هنر طراحی",
  },

  { path: "coWorker", valuePath: "همکاری باما", href: "/coWorker" },
  { path: "contactUs", valuePath: "تماس با ما", href: "/contactUs" },
  { path: "aboutUs", valuePath: "درباره ما", href: "/aboutUs" },
  { path: "author-bio", valuePath: "اطلاعات استاد", href: "/author-bio" },
  { path: "profile", valuePath: "پروفایل", href: "/profile" },
  { path: "myCourses", valuePath: "دوره های من", href: "/myCourses" },
  { path: "favorites", valuePath: "علاقه مندی ها", href: "/favorites" },
];

const BreadCrumb = memo(() => {
  let pathes = useSelectedLayoutSegments();
  let pathNames = [];

  useMemo(() => {
    pathDataRoute.filter((route) => {
      pathes.forEach((pathName) => {
        if (decodeURIComponent(pathName) === decodeURIComponent(route.path)) {
          pathNames.push(route);
        }
      });
    });
  }, [pathes]);

  return pathNames?.length ? (
    <div className="w-full h-16 px-8 mb-4 bg-black/5 dark:bg-first/10 rounded-full flex items-center gap-1 sm:gap-4 child:text-xl child:text-black/40 dark:child:text-first/60 ltr mt-10 sm:mt-0">
      <Link href="/">خانه</Link>

      {pathNames?.length
        ? pathNames.map((path, index) => (
            <div className="flex gap-1 items-center" key={index}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
              <Link href={path.href}>{decodeURIComponent(path.valuePath)}</Link>
            </div>
          ))
        : null}
    </div>
  ) : null;
});

export default BreadCrumb;
