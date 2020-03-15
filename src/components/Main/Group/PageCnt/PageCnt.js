import React from "react";
import PropTypes from "prop-types";

function PageCnt({ pageCnt, currentPage }) {
  return (
    <div>
      Page {currentPage} of {pageCnt}
    </div>
  );
}

PageCnt.propTypes = {
  pageCnt: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default PageCnt;
