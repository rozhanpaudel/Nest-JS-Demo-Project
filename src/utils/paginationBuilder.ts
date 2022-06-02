interface PaginationFieldsInput {
  perPage: number;
  pageNumber: number;
}

interface PaginationFunctionReturns {
  offset: number;
  perPage: number;
}

const createPagination = (
  PaginationFieldsInput: PaginationFieldsInput,
): PaginationFunctionReturns => {
  const { perPage, pageNumber } = PaginationFieldsInput;

  if (pageNumber <= 0 || (!pageNumber && !perPage))
    return { offset: 0, perPage: 5 };

  return {
    offset: Number((pageNumber - 1) * perPage),
    perPage: Number(perPage ? perPage : 5),
  };
};

export default createPagination;
