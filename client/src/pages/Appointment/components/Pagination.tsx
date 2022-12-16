import React from "react";
import "./pagination.scss";
const Pagination = () => {
  return (
    <div className="pagination-container">
      <div className="pagination-body">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="pagination-item  active"></div>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
