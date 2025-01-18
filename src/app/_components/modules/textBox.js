"use client";

import React, { memo } from "react";

const TextBox = ({ text="" }) => {
  return (
    <div className="w-full px-12 py-24 flex items-center justify-center border-y-2 border-second/70 bg-second/15 dark:bg-second/5 text-second sm:text-4xl text-3xl text-center rounded-lg">
    {text}
  </div>
  );
}

export default TextBox;
