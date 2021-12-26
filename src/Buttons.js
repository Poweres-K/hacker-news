import React from "react";
import { useGlobalContext } from "./context";

const Buttons = () => {
  const { loading, totalPages, currentPage, handleChangePage } =
    useGlobalContext();
  return (
    <div className="btn-container">
      <button
        disabled={loading ? true : false}
        onClick={() => {
          handleChangePage("DECREASE");
        }}
      >
        prev
      </button>
      <p>
        {currentPage + 1} of {totalPages}
      </p>
      <button
        disabled={loading ? true : false}
        onClick={() => {
          handleChangePage("INCREASE");
        }}
      >
        next
      </button>
    </div>
  );
};

export default Buttons;
