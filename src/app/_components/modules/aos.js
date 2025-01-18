"use client";
import { memo, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Aos = memo(() => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);
});

export default Aos;
