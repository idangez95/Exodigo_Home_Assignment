interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  }
  
  const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => {
    return (
      <div className="pagination">
        <button onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;  