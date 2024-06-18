import React from "react";

interface IPaginationProps {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  onPageChange,
  totalPages,
}) => {
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  //   const renderPageNumbers = () => {
  //     const pageNumbers = [];
  //     for (let i = 1; i <= totalPages; i++) {
  //       pageNumbers.push(
  //         <button
  //           key={i}
  //           onClick={() => handlePageChange(i)}
  //           className={
  //             i === currentPage
  //               ? "border border-solid bg-blue-400 border-blue-400 w-8 h-8 rounded-md"
  //               : "border border-solid border-blue-400 w-8 h-8 rounded-md"
  //           }
  //         >
  //           {i}
  //         </button>
  //       );
  //     }
  //     return pageNumbers;
  //   };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const delta = 9; // Number of pages to show around the current page

    // Determine the range of page numbers to show
    const range = {
      start: Math.max(2, currentPage - delta),
      end: Math.min(totalPages - 1, currentPage + delta),
    };

    // Push the first page
    pageNumbers.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={
          currentPage === 1
            ? "border border-solid bg-blue-400 border-blue-400 w-8 h-8 rounded-md"
            : "border border-solid border-blue-400 w-8 h-8 rounded-md"
        }
      >
        1
      </button>
    );

    // Show ellipsis if needed
    if (range.start > 2) {
      pageNumbers.push(<span key="start-ellipsis">...</span>);
    }

    // Push pages within the range
    for (let i = range.start; i <= range.end; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={
            i === currentPage
              ? "border border-solid bg-blue-400 border-blue-400 w-8 h-8 rounded-md"
              : "border border-solid border-blue-400 w-8 h-8 rounded-md"
          }
        >
          {i}
        </button>
      );
    }

    // Show ellipsis if needed
    if (range.end < totalPages - 1) {
      pageNumbers.push(<span key="end-ellipsis">...</span>);
    }
    pageNumbers.push(
      <button
        key={totalPages}
        onClick={() => handlePageChange(totalPages)}
        className={
          currentPage === totalPages
            ? "border border-solid bg-blue-400 border-blue-400 w-8 h-8 rounded-md"
            : "border border-solid border-blue-400 w-8 h-8 rounded-md"
        }
      >
        {totalPages}
      </button>
    );

    return pageNumbers;
  };

  return (
    <div className="pagination my-6 flex items-center gap-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={
          currentPage === 1
            ? "border border-solid bg-gray-400 border-gray-400 h-8 rounded-md px-2 text-xs"
            : "border border-solid border-blue-400 h-8 rounded-md px-2 text-white text-xs"
        }
      >
        Previous
      </button>
      <div className="flex items-center gap-2">{renderPageNumbers()}</div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={
          currentPage === totalPages
            ? "border border-solid bg-gray-400 border-gray-400 h-8 rounded-md px-2 text-xs"
            : "border border-solid border-blue-400 h-8 rounded-md px-2 text-white text-xs"
        }
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
