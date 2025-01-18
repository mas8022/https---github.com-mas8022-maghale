import React from "react";
import WorkToolNav from "../_components/template/workToolNav";
import Hr from "../_components/modules/hr";

const layout = ({ children }) => {
  return (
    <div className="w-full sm:pt-0 pt-12">
      <WorkToolNav />
      {children}
      <Hr />
    </div>
  );
};

export default layout;
