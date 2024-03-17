interface Props {
  page: number;
  take: number;
  count: number;
}

export const createPagination = ({ page, take, count }: Props) => {
  const totalPages = Math.ceil(count / take);

  return {
    currentPage: page,
    totalPages: totalPages,
    nextPage: totalPages > page ? page + 1 : null,
    prevPage: page - 1 > 0 ? page - 1 : null,
  };
};
