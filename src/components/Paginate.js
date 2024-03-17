import React from "react";

function Pagination({ totalPages, currentPage, onPageChange }) {
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPagination = (onPageChange) => {
    const pagination = [];
    for (let i = 1; i <= totalPages; i++) {
      pagination.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
          role="button"
        >
          <span className="page-link">{i}</span>
        </li>
      );
    }
    return pagination;
  };

  return (
    <nav aria-label="...">
      <ul className="pagination pagination-sm">{renderPagination(handlePageChange)}</ul>
    </nav>
  );
}

export default Pagination;
