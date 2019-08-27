import "./Pagination.scss";
import React from "react";

const Pagination = ({ page, onPageChange, people, maxLength }) => {
  const lastPage = Math.ceil(people.length / maxLength);
  const isLastPage = page === lastPage;

  const backBtn =
    page > 1 ? (
      <li className="page-item" onClick={() => onPageChange(1)}>
        <p className="page-link" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </p>
      </li>
    ) : null;

  const firstPageLink = () => {
    const num =
      page === 1 ? page : isLastPage && page > 2 ? page - 2 : page - 1;
    return (
      <li
        className={`page-item ${page === 1 ? "active" : ""}`}
        onClick={() => {
          if (page > 1) {
            onPageChange(num);
          }
        }}
      >
        <p className="page-link">{num}</p>
      </li>
    );
  };

  const secondPageLink = () => {
    const num =
      page === 1 ? page + 1 : isLastPage && page > 2 ? page - 1 : page;
    return (
      <li
        className={`page-item ${num === page ? "active" : ""}`}
        onClick={() => {
          if (num !== page) {
            onPageChange(num);
          }
        }}
      >
        <p className="page-link">{num}</p>
      </li>
    );
  };

  const thirdPageLink = () => {
    const num = !isLastPage ? (page === 1 ? page + 2 : page + 1) : page;
    return lastPage > 2 ? (
      <li
        className={`page-item ${isLastPage ? "active" : ""}`}
        onClick={() => {
          if (!isLastPage) {
            onPageChange(num);
          }
        }}
      >
        <p className="page-link">{num}</p>
      </li>
    ) : null;
  };

  const forwardBtn = !isLastPage ? (
    <li className="page-item" onClick={() => onPageChange(lastPage)}>
      <p className="page-link" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </p>
    </li>
  ) : null;

  return (
    <nav aria-label="Page navigation" className="text-center">
      <ul className="pagination">
        {backBtn}
        {firstPageLink()}
        {secondPageLink()}
        {thirdPageLink()}
        {forwardBtn}
      </ul>
    </nav>
  );
};

export default Pagination;
