import React from "react";
import "./loading.scss";

export const Loading = () => {
  return (
    <div className="loading-screen">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
