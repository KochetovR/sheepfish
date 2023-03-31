export const getList = state => state.products.listProducts;
export const getFilter = state => state.products.filter;

export const getFilterProducts = state => {
  const list = getList(state);
  const filter = getFilter(state);

  const normalizeFilter = filter.toLowerCase();
  return list.filter(l =>
    l.title.toLowerCase().includes(normalizeFilter) || l.description.toLowerCase().includes(normalizeFilter),
  );
};

export const getMessage = state => state.products.message;